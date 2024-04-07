import { Component, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import pretty from 'pretty';
import { uniqueId } from 'lodash-es';
// import { getCurrentTheme, Theme } from '../../utils/helpers';
@Component({
  tag: 'go-demo-box',
  styleUrl: 'go-demo-box.scss',
  shadow: false,
})
export class GoDemoBox {
  /**
   * custom code to be injected into demo frame
   */
  @Prop() code: string;
  @State() demoSource: string;

  @Prop() hideSource: boolean = false;

  /**
   * Custom head html inside iframe
   */
  @Prop() head: string = '';

  @Prop() darkModeSwitch: boolean = false;

  @Prop() hideControlBar: boolean = false;

  @Prop() disableResizeX: boolean = false;

  @Prop() disableResizeY: boolean = false;

  @State() currentTheme: 'light' | 'dark' = 'light';

  private iframe: HTMLIFrameElement;

  private demoId: string = uniqueId('go-demo-');

  componentWillLoad() {
    if (this.code) {
      this.demoSource = pretty(this.code);
      return;
    }
    // this.currentTheme = getCurrentTheme();
  }

  componentDidLoad() {
    if (this.iframe?.contentWindow) {
      this.setDemoContent(this.iframe.contentWindow, this.demoSource);
    }
  }

  updateIframeRootAttr(key: string, value: string) {
    this.iframe?.contentDocument?.documentElement.setAttribute(key, value);
  }

  @Watch('currentTheme')
  handleThemeChange(value) {
    this.updateIframeRootAttr('data-theme', value);
  }

  startMonitoringFrame(iframe) {
    const docRoot = iframe.contentDocument.documentElement;
    const observer = new MutationObserver(entries => {
      entries.map(entry => {
        const htmlEl = entry.target as HTMLElement;
        if (htmlEl.classList.contains('hydrated')) {
          const height = htmlEl.getBoundingClientRect().height;
          if (height > this.minFrameHeight) {
            this.frameHeight = Math.round(height + 50) + 'px';
          }
        }
      });
    });
    observer.observe(docRoot, {
      attributes: true,
      attributeOldValue: true,
    });
  }

  async setDemoContent(window: Window, code) {
    const doc = window.document;
    const dir: 'ltr' | 'rtl' = 'ltr';
    const lang = 'en';

    const { head, currentTheme } = this;
    const html = `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}" data-theme="${currentTheme}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <title>Demo</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@go-ui/core/dist/go-ui/go-ui.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/@go-ui/core/dist/go-ui/go-ui.esm.js"></script>

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
    // doc.documentElement.innerHTML = html;
    if (this.iframe) {
      this.startMonitoringFrame(this.iframe);
    }
  }

  @Method()
  async setContent(code: string) {
    this.setDemoContent(this.iframe.contentWindow, code);
  }

  @Method()
  async reload() {
    this.setDemoContent(this.iframe.contentWindow, this.demoSource);
  }

  openNewWindow() {
    var win = window.open('', 'Demo');
    this.setDemoContent(win, this.demoSource);
  }

  resizeToDevice(device) {
    const widthMap = {
      mobile: '375px',
      tablet: '600px',
      desktop: '1024px',
      large: '1440px',
    };
    let width = `calc(${widthMap[device]} + var(--browser-resize-handle-size))` || '100%';
    this.frameWidth = width;
  }

  @State() isFullScreen = false;
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.frameWidth = '100%';
  }

  toggleDarkTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
  }

  @State() resizingX = false;
  @State() resizingY = false;
  @State() frameWidth = '100%';
  @State() frameHeight = '100%';
  private minFrameHeight: number = 200;
  private frameWrapperEl: HTMLElement;

  startResizeX() {
    this.resizingX = true;
    const onResizeX = e => {
      if (!this.frameWrapperEl) {
        return;
      }
      const frameWidth = Math.round(e.clientX - this.frameWrapperEl.getBoundingClientRect().left);
      this.frameWidth = frameWidth + 'px';
    };

    document.addEventListener('mousemove', onResizeX);
    document.addEventListener('mouseup', () => {
      this.resizingX = false;
      document.removeEventListener('mousemove', onResizeX);
    });
  }
  startResizeY() {
    this.resizingY = true;
    const onResizeY = e => {
      if (!this.frameWrapperEl) {
        return;
      }
      let height = e.clientY - this.frameWrapperEl.getBoundingClientRect().top;
      if (height <= this.minFrameHeight) {
        height = this.minFrameHeight;
      }
      this.frameHeight = Math.round(height) + 'px';
    };
    document.addEventListener('mousemove', onResizeY);
    document.addEventListener('mouseup', () => {
      this.resizingY = false;
      document.removeEventListener('mousemove', onResizeY);
    });
  }

  render() {
    const { demoSource, hideControlBar, hideSource, frameWidth, frameHeight, resizingX, resizingY, isFullScreen, demoId, disableResizeX, disableResizeY } = this;
    // if (!demoSource) {
    //   return (
    //     <p class="text-size--1">
    //       <em>Source code not found.</em>
    //     </p>
    //   );
    // }
    return (
      <Host>
        <div
          class={{
            'demo-frame': true,
            'fullscreen': isFullScreen,
            'disable-resize-x': disableResizeX,
            'disable-resize-y': disableResizeY,
          }}
        >
          {hideControlBar ? null : (
            <div class="top-bar">
              <div class="left">
                <go-button-group connected>
                  {/* reload */}
                  <go-button variant="secondary" id={`${demoId}-reload`} flat icon compact aria-label="Reload demo" type="button" onClick={() => this.reload()}>
                    {/* prettier-ignore */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-refresh-cw" viewBox="0 0 24 24"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                  </go-button>

                  <go-tooltip arrow trigger-id={`${demoId}-reload`}>
                    Reload demo
                  </go-tooltip>
                  {/* new window */}
                  {/* prettier-ignore */}

                  <go-button variant="secondary" id={`${demoId}-new-window`} flat icon compact aria-label="Open in new window" type="button" onClick={() => this.openNewWindow()}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 19H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h5c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55-.45 1-1 1zM14 4c0 .55.45 1 1 1h2.59l-9.13 9.13c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L19 6.41V9c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1h-5c-.55 0-1 .45-1 1z"/></svg>
                    </go-button>

                  <go-tooltip arrow trigger-id={`${demoId}-new-window`}>
                    Open in new tab
                  </go-tooltip>

                  {/* full screen */}
                  <go-button
                    variant="secondary"
                    id={`${demoId}-fullscreen`}
                    flat
                    icon
                    compact
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

                  <go-tooltip arrow trigger-id={`${demoId}-fullscreen`}>
                    Fullscreen
                  </go-tooltip>
                </go-button-group>
                {/* theme switcher */}
                {this.darkModeSwitch ? (
                  <go-switch
                    class="ml-2"
                    onChange={() => this.toggleDarkTheme()}
                    checked={this.currentTheme === 'dark'}
                    name="dark-theme-switch"
                    show-on-off
                    active-label="on"
                    inactive-label="off"
                    label="Dark mode"
                  ></go-switch>
                ) : null}
              </div>
              <div class="controls">
                <go-button-group class="d-none d-block-desktop" connected>
                  <go-button variant="secondary" flat icon compact aria-label="Mobile view" type="button" onClick={() => this.resizeToDevice('mobile')}>
                    {/* prettier-ignore */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"/></svg>
                  </go-button>

                  <go-button variant="secondary" flat icon compact aria-label="Tablet view" type="button" onClick={() => this.resizeToDevice('tablet')}>
                    {/* prettier-ignore */}
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M18,0H6C4.34,0,3,1.34,3,3v18c0,1.66,1.34,3,3,3h12c1.66,0,3-1.34,3-3V3C21,1.34,19.66,0,18,0z M14,22h-4v-1h4V22z M19.25,19H4.75V3h14.5V19z"/></g></g></g></svg>
                  </go-button>
                  <go-button variant="secondary" flat icon compact aria-label="Desktop view" type="button" onClick={() => this.resizeToDevice('desktop')}>
                    {/* prettier-ignore */}
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><g><path d="M20,18c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v10c0,1.1,0.9,2,2,2H0v2h24v-2H20z M4,6h16v10H4V6z"/></g></g></g></svg>
                  </go-button>
                  <go-button variant="secondary" flat icon compact aria-label="Large view" type="button" onClick={() => this.resizeToDevice('large')}>
                    {/* prettier-ignore */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
                  </go-button>
                </go-button-group>
              </div>
            </div>
          )}
          <div
            class={{
              'frame-wrapper': true,
              'no-transition': resizingX || resizingY,
            }}
            ref={el => (this.frameWrapperEl = el)}
            style={{
              width: frameWidth,
              height: frameHeight,
            }}
          >
            <iframe title="demo frame" ref={el => (this.iframe = el)}></iframe>

            {resizingX || resizingY ? (
              <div class="resize-overlay">
                <div>
                  {frameWidth} x {frameHeight}
                </div>
              </div>
            ) : null}

            {disableResizeX ? null : (
              <button type="button" onMouseDown={() => this.startResizeX()} class="resize-handle x-axis">
                <span>||</span>
              </button>
            )}
            {disableResizeY ? null : (
              <button type="button" onMouseDown={() => this.startResizeY()} class="resize-handle y-axis">
                <span>||</span>
              </button>
            )}
          </div>
          {!hideSource && (
            <go-accordion>
              <go-accordion-item heading="Source">
                <code-block language="html" code={demoSource}></code-block>
              </go-accordion-item>
            </go-accordion>
          )}
        </div>
      </Host>
    );
  }
}
