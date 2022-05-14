import { Component, Host, h, Element } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';

@Component({
  tag: 'go-to-top',
  styleUrl: 'go-to-top.scss',
  shadow: false,
})
export class GoToTop {
  @Element() el: HTMLElement;

  private targetId: string;

  componentWillLoad() {
    // get body id or generate a new one if it doesn't exist
    this.targetId = document.body.getAttribute('id');
    if (!this.targetId) {
      this.targetId = uniqueId('body-');
      document.body.setAttribute('id', this.targetId);
    }
  }

  componentDidLoad() {}

  render() {
    return (
      <Host>
        <go-button color="secondary" flat href={`#${this.targetId}`} id="go-to-top-btn" type="button" icon round aria-labelledby="go-to-top-btn-tooltip">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </go-button>
        <go-tooltip id="go-to-top-btn-tooltip" placement="left" trigger-id="go-to-top-btn">
          Back to top
        </go-tooltip>
      </Host>
    );
  }
}
