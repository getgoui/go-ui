import { Component, Host, Prop, h, State } from '@stencil/core';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
// import { indentWithTab } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { vscodeKeymap } from '@replit/codemirror-vscode-keymap';
import { Compartment, EditorState } from '@codemirror/state';
import { dracula as darkTheme } from 'thememirror/dist/themes/dracula';
import { debounce } from 'lodash-es';
import { GO_UI_HEAD, PLACEHOLDER_CONTENT } from './consts';

@Component({
  tag: 'go-playground',
  styleUrl: 'go-playground.scss',
  shadow: false,
})
export class GoPlayground {
  editorEl: HTMLElement;
  headEditorEl: HTMLElement;
  iframeEl: HTMLIFrameElement;
  iframeContainerEl: HTMLElement;
  view: EditorView;
  headView: EditorView;
  isDirty: boolean = false;

  /**
   * initial code
   */
  @Prop({ mutable: true }) code: string = PLACEHOLDER_CONTENT;

  @Prop() logoSrc: string = ``;

  @Prop({ mutable: true })
  head: string = `${GO_UI_HEAD}
<!-- Load default icons font: Material Icon (optional for consuming apps) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<!-- Load the component configurator component inside the demo frame (optional for consuming apps) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@go-ui/demo-frame/dist/demo-frame/demo-frame.esm.js"></script>
`;

  @State() currentTheme = 'dark';

  @State() isFullScreen = false;
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
  }

  componentWillLoad() {
    this.syncUrlToContent();
  }

  componentDidLoad() {
    this.view = this.setupEditor(this.editorEl, html(), this.code, update => {
      if (update.docChanged) {
        this.isDirty = true;
        this.debouncedUpdateContent({
          head: this.head,
          code: update.state.doc.toString(),
        });
      }
    });
    this.headView = this.setupEditor(
      this.headEditorEl,
      html(),
      this.head,
      update => {
        if (update.docChanged) {
          this.debouncedUpdateContent({
            head: update.state.doc.toString(),
            code: this.code,
          });
        }
      },
    );
    // set initial theme
    this.setDarkMode({ detail: { theme: this.currentTheme } });
    // set initial content
    this.setPreviewContent({ code: this.code, head: this.head });
  }

  editorConfig = {
    theme: new Compartment(),
    language: new Compartment(),
    updateListener: null,
  };

  setupEditor(parent, lang, code, onChangeCallback) {
    this.editorConfig.language = new Compartment();

    this.editorConfig.updateListener =
      EditorView.updateListener.of(onChangeCallback);

    this.editorConfig.theme = new Compartment();

    const state = EditorState.create({
      extensions: [
        basicSetup,
        keymap.of(vscodeKeymap),
        this.editorConfig.language.of(lang),
        this.editorConfig.updateListener,
        this.editorConfig.theme.of(darkTheme),
      ],
      doc: code,
    });

    return new EditorView({
      state,
      parent,
    });
  }

  private debouncedUpdateContent = debounce(content => {
    this.setPreviewContent(content);
  }, 500);

  setPreviewContent(content: { head?: string; code?: string }) {
    const { head = '', code = '' } = content;
    this.iframeEl?.remove();

    if (this.isDirty) {
      this.syncContentToUrl(content);
    }
    if (head) {
      this.head = head;
    }
    if (code) {
      this.code = code;
    }

    this.iframeEl = document.createElement('iframe');
    this.iframeContainerEl.appendChild(this.iframeEl);
    const doc = this.iframeEl.contentDocument;
    const dir: 'ltr' | 'rtl' = 'ltr';
    const lang = 'en';

    const { currentTheme } = this;
    const html = `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}" data-theme="${currentTheme}">
  <head>
    ${GO_UI_HEAD}
    <!-- custom head -->
    ${head}
  </head>
  <body>
    <!-- #region demo start -->
${code}
    <!-- #endregion demo finish -->
  </body>
</html>
`;
    doc.open();
    doc.write(html);
    doc.close();
  }

  syncContentToUrl(content: { head?: string; code?: string }) {
    const url = new URL(window.location.href);
    const { head = '', code = '' } = content;
    if (head) {
      url.searchParams.set('head', window.btoa(head));
    }
    if (code) {
      url.searchParams.set('code', window.btoa(code));
    }
    window.history.pushState(null, '', url.toString());
  }

  syncUrlToContent() {
    const url = new URL(window.location.href);
    const paramCode = url.searchParams.get('code');
    const paramHead = url.searchParams.get('head');
    if (paramCode) {
      this.code = window.atob(paramCode);
    }
    if (paramHead) {
      this.head = window.atob(paramHead);
    }
  }

  setDarkMode(e) {
    this.currentTheme = e.detail.theme;

    // refresh preview frame to trigger theme change
    this.setPreviewContent({ code: this.code, head: this.head });
  }

  render() {
    const { logoSrc, isFullScreen } = this;
    return (
      <Host>
        <go-playground-header
          logoSrc={logoSrc}
          onDarkModeChange={e => this.setDarkMode(e)}
        ></go-playground-header>
        <main class="playground-main">
          {/* editor */}
          <div class="editor">
            <go-tabs>
              <go-tab label="HTML">
                <div class="h-100" ref={el => (this.editorEl = el)}></div>
              </go-tab>
              <go-tab label="Head">
                <div class="h-100" ref={el => (this.headEditorEl = el)}></div>
              </go-tab>
            </go-tabs>
          </div>
          {/* preview */}
          <div class={{ 'preview-wrapper': true, 'fullscreen': isFullScreen }}>
            <div class="preview-actions">
              <go-button
                variant="text"
                icon
                compact
                flat
                aria-label="Expand demo to fullscreen"
                type="button"
                onClick={() => this.toggleFullScreen()}
              >
                {
                  /* prettier-ignore */
                  isFullScreen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-minimize" viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-maximize" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                  )
                }
              </go-button>
            </div>
            <div
              class="preview"
              ref={el => (this.iframeContainerEl = el)}
            ></div>
          </div>
        </main>
      </Host>
    );
  }
}
