import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';
import { GO_UI_SITE_URL } from './consts';
import copy from 'copy-text-to-clipboard';

@Component({
  tag: 'go-playground-header',
})
export class GoPlaygroundHeader {
  @Prop() logoSrc: any;

  darkModeEl: any;

  shareDialog: any;

  @State() message = '';

  @State() currentLocation = window.location.href;

  handleShare() {
    this.shareDialog?.open();
    this.currentLocation = window.location.href;
  }
  handleCopy() {
    copy(window.location.href);
    this.shareDialog?.close();
    this.message = `URL has been copied to clipboard`;
  }

  @Event()
  darkModeChange: EventEmitter<any>;

  @State() isDark = false;

  setDarkTheme(e) {
    this.isDark = e.detail.theme === 'dark';
    this.darkModeChange.emit({ theme: e.detail.theme });
  }
  toggleDarkTheme(e) {
    this.darkModeEl.setTheme(e.target.checked ? 'dark' : 'light');
  }

  render() {
    const { logoSrc, message, currentLocation } = this;
    return (
      <div>
        {message ? (
          <go-banner
            global={true}
            variant="success"
            heading="Success!"
            dismissible={true}
            onDismissed={() => (this.message = '')}
          >
            {message}
          </go-banner>
        ) : null}
        <header>
          <div>
            <go-gov-au-logo href={GO_UI_SITE_URL}>
              {this.logoSrc
                ? [
                    <img slot="main-brand" src={logoSrc} alt="Go UI logo" />,
                    <img
                      slot="main-brand-on-dark"
                      src={logoSrc}
                      alt="Go UI logo"
                    />,
                  ]
                : null}
              <div slot="co-brand">
                <div class="text-size-1">
                  <b>Playground</b>
                </div>
              </div>
            </go-gov-au-logo>
          </div>
          <div class="actions">
            <go-dark-mode
              ref={el => (this.darkModeEl = el)}
              onThemechange={e => this.setDarkTheme(e)}
            ></go-dark-mode>
            <go-switch
              checked={this.isDark}
              label="Dark Mode"
              onChange={e => this.toggleDarkTheme(e)}
            ></go-switch>
            <go-button
              variant="primary"
              type="button"
              onClick={() => this.handleShare()}
              round
              id="share-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 48 48"
                slot="prefix"
                fill="currentColor"
              >
                <path d="M36 5c-3.848 0-7 3.152-7 7 0 .586.199 1.11.336 1.654l-11.99 5.998C16.059 18.074 14.182 17 12 17c-3.848 0-7 3.152-7 7s3.152 7 7 7c2.182 0 4.06-1.074 5.346-2.652l11.99 5.998C29.199 34.89 29 35.414 29 36c0 3.848 3.152 7 7 7s7-3.152 7-7-3.152-7-7-7c-2.182 0-4.06 1.074-5.346 2.652l-11.99-5.998C18.801 25.11 19 24.586 19 24c0-.586-.199-1.11-.336-1.654l11.99-5.998C31.941 17.926 33.818 19 36 19c3.848 0 7-3.152 7-7s-3.152-7-7-7zm0 3c2.227 0 4 1.773 4 4 0 2.227-1.773 4-4 4-2.227 0-4-1.773-4-4 0-2.227 1.773-4 4-4zM12 20c2.227 0 4 1.773 4 4 0 2.227-1.773 4-4 4-2.227 0-4-1.773-4-4 0-2.227 1.773-4 4-4zm24 12c2.227 0 4 1.773 4 4 0 2.227-1.773 4-4 4-2.227 0-4-1.773-4-4 0-2.227 1.773-4 4-4z" />
              </svg>
              Share
            </go-button>

            <go-dialog
              ref={el => (this.shareDialog = el)}
              heading="Share your code"
            >
              <div>
                <go-input readonly value={currentLocation}></go-input>
                <go-button
                  variant="primary"
                  type="button"
                  onClick={() => this.handleCopy()}
                >
                  Copy shareable URL
                </go-button>
              </div>
            </go-dialog>
          </div>
        </header>
      </div>
    );
  }
}
