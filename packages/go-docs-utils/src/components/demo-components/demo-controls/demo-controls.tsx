import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'demo-controls',
  styleUrl: 'demo-controls.scss',
  shadow: false,
})
export class DemoControls {
  @State() isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  render() {
    return (
      <Host>
        <go-button class="demo-control-btn" type="button" onClick={() => this.open()} compact>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span>Demo controls</span>
        </go-button>
        <go-nav-drawer position="right" active={this.isOpen} label="Demo controls" onClose={() => this.close()}>
          <div class="demo-control-drawer">
            <div class="demo-control-header">
              <h4>Demo controls</h4>
              <go-button type="button" onClick={() => this.close()} stack flat compact color="tertiary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </go-button>
            </div>
            <div class="demo-control-content">
              <dark-mode-toggle></dark-mode-toggle>
            </div>
          </div>
        </go-nav-drawer>
      </Host>
    );
  }
}
