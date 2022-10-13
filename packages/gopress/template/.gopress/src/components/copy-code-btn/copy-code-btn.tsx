import { Prop, State, Event, EventEmitter, Component, h } from '@stencil/core';
import copy from 'copy-text-to-clipboard';
import uniqueId from 'lodash.uniqueid';

@Component({
  tag: 'copy-code-btn',
  styleUrl: 'copy-code-btn.scss',
})
export class CopyCodeBtn {
  @Prop() code: string = '';
  @State() textCopied: boolean = false;

  @Event() copyCode: EventEmitter<any>;
  copyClick() {
    copy(this.code);

    this.copyCode.emit();
    this.textCopied = true;
    setTimeout(() => {
      this.textCopied = false;
    }, 4000);
  }

  private id = uniqueId('copy-code-');

  render() {
    const { textCopied, id } = this;
    const label = textCopied ? 'Copied' : 'Copy';
    return [
      <go-button id={id} icon compact onClick={() => this.copyClick()} aria-label={label}>
        {textCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24">
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
            viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </go-button>,
      <go-tooltip trigger-id={id}>{label}</go-tooltip>,
    ];
  }
}
