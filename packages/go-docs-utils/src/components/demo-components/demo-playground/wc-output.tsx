import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'wc-output',
})
export class WcOutput {
  @Prop() usage: string = '';

  @State() textCopied: boolean = false;

  @Event() copyCode: EventEmitter<any>;
  copyClick() {
    this.copyCode.emit();
    this.textCopied = true;
    setTimeout(() => {
      this.textCopied = false;
    }, 2000);
  }

  render() {
    const { textCopied, usage } = this;
    return (
      <div class="usage">
        <go-accordion multiple>
          <go-accordion-item heading="Usage">
            <div class="output">
              <div class="output-controls">
                <go-button compact outlineFill disabled={textCopied} onClick={() => this.copyClick()}>
                  {textCopied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                  <span>{textCopied ? 'Copied' : 'Copy'}</span>
                </go-button>
              </div>
              <pre>
                <code>{usage}</code>
              </pre>
            </div>
          </go-accordion-item>
        </go-accordion>
      </div>
    );
  }
}
