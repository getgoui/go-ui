import { Component, Host, h, Element, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import MarkdownIt, { Options } from 'markdown-it';
import DOMPurify from 'dompurify';
import JSON5 from 'json5';
import { goUiPlugin } from '../../utils/go-ui-md-plugin';
@Component({
  tag: 'go-md',
  styleUrl: 'go-md.scss',
  shadow: false,
})
export class GoMd {
  @Element() el: HTMLElement;

  /**
   * Render inline markdown
   */
  @Prop() inline?: boolean = false;

  /**
   * Markdown content to be rendered
   */
  @Prop({ mutable: true }) content: string;

  /**
   * url to load remote markdown content
   * if `src` is set, content in the `content` prop will be overwritten
   */
  @Prop() src: string;

  /**
   * [markdown-it](https://github.com/markdown-it/markdown-it) options
   * **Note**: if `use-go-ui` is set to true, these options will be overwritten
   */
  @Prop() mdOptions?: Options | string;

  /**
   * If set to true, `go-md` will use [DOMPurify](https://nodei.co/npm/dompurify/) to sanitise the output HTML before inserting it into the DOM
   */
  @Prop() sanitise?: boolean = false;

  /**
   * Use go-ui markdown renderer:
   * - Only `typographer` is enabled in markdown-it options
   *
   * - linkify with [`go-link`](https://go-ui.com/docs/components/go-link)
   * - [container](https://github.com/markdown-it/markdown-it-container) banners with [`go-banner`](https://go-ui.com/docs/components/go-banner)
   */
  @Prop() useGoUi?: boolean = false;

  @Event() init: EventEmitter;

  @Event() rendered: EventEmitter;

  private md: MarkdownIt;

  private createMdInstance(): void {
    const { mdOptions, useGoUi } = this;
    let options: Options = null;
    if (typeof mdOptions === 'string') {
      try {
        options = JSON5.parse(mdOptions);
      } catch (e) {
        console.error('Could not parse md-options, using default.', e);
      }
    }

    if (useGoUi) {
      options = {
        linkify: true,
      };
    }

    this.md = new MarkdownIt(options);

    // emit initialise event
    this.init.emit(this.md);
  }

  private async initialiseRenderer() {
    if (!this.md) {
      this.createMdInstance();
    }
    if (this.useGoUi) {
      this.md.use(goUiPlugin);
    }
  }

  /**
   * Get the rendered HTML
   * @returns output html
   */
  async getRenderedContent(input?: string): Promise<string> {
    if (!input) {
      return '';
    }
    await this.initialiseRenderer();

    let output = '';

    // get html output
    if (this.inline) {
      output = this.md.renderInline(input);
    } else {
      output = this.md.render(input);
    }
    // sanitise if needed
    if (this.sanitise) {
      output = DOMPurify.sanitize(output);
    }

    return output;
  }

  async renderSrc() {
    // try fetching remote markdown content from this.src
    const response = await fetch(this.src);
    if (response.ok) {
      const data = await response.text();
      this.content = data;
    }
  }

  async renderContent() {
    this.el.innerHTML = await this.getRenderedContent(this.content);
    this.rendered.emit(this.md);
  }

  async componentWillLoad() {
    await this.initialiseRenderer();
    if (this.src) {
      await this.renderSrc();
      return;
    }
    this.renderContent();
  }

  @Watch('src')
  async handleSrcChange() {
    await this.renderSrc();
  }

  @Watch('content')
  async handleContentChange() {
    this.renderContent();
  }

  @Watch('mdOptions')
  async handleMdOptionsChange() {
    this.createMdInstance();
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
