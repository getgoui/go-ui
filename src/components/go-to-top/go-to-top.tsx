import { Component, Host, h, Element, State, Prop } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import debounce from 'lodash.debounce';
@Component({
  tag: 'go-to-top',
  styleUrl: 'go-to-top.scss',
  shadow: false,
})
export class GoToTop {
  @Element() el: HTMLElement;

  /**
   * how far from the top of the page the button should be shown (in px)
   */
  @Prop() offset: number = 200;
  private targetId: string;

  componentWillLoad() {
    // get body id or generate a new one if it doesn't exist
    this.targetId = document.body.getAttribute('id');
    if (!this.targetId) {
      this.targetId = uniqueId('body-');
      document.body.setAttribute('id', this.targetId);
    }
  }

  componentDidLoad() {
    window.onscroll = debounce(() => {
      this.active = window.scrollY > this.offset;
    }, 200);
  }

  @State() active = false;

  render() {
    const { active } = this;
    return (
      <Host class={{ active }}>
        <go-button color="primary" flat href={`#${this.targetId}`} id="go-to-top-btn" type="button" icon round aria-labelledby="go-to-top-btn-tooltip">
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
