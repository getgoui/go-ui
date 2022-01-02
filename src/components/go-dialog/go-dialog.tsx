import { Component, h, Element, Prop, Method, Watch } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-dialog',
  styleUrl: 'go-dialog.scss',
  shadow: false,
})
export class GoDialog {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /**
   * If persistent, the overlay will not be closed when the user clicks outside of it or presses the escape key.
   */
  @Prop() persistent: boolean = false;
  /**
   * Heading of the overlay content
   */
  @Prop() heading?: string;

  // aria-labelledby https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html
  headingId: string = uniqueId('overlay-label-');

  overlayEl: HTMLElement;

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
  }

  @Method()
  async close() {
    this.active = false;
  }

  @Method()
  async open() {
    this.active = true;
  }

  @Watch('active')
  watchActiveHandler(isActive: boolean): void {
    if (isActive) {
      this.open();
      return;
    }
    this.close();
  }
  render() {
    const { active, heading, persistent, headingId, inheritedAttrs } = this;
    return (
      <go-overlay
        persistent={persistent}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        active={active}
        aria-hidden={active ? false : true}
        ref={(el) => (this.overlayEl = el)}
        {...inheritedAttrs}>
        {!persistent ? (
          <div class="close-btn-wrapper">
            <go-button flat stack color="tertiary" compact onClick={() => this.close()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              <span>Close</span>
            </go-button>
          </div>
        ) : null}

        <div class="overlay-heading" id={headingId}>
          <slot name="heading">
            <h3>{heading}</h3>
          </slot>
        </div>
        <slot></slot>
      </go-overlay>
    );
  }
}
