import { Component, Host, h, Element, Prop, Event, EventEmitter, State } from '@stencil/core';
import { BannerVariants } from '../../interfaces';
import { hasSlot } from '../../utils/helper';

@Component({
  tag: 'go-banner',
  styleUrl: 'go-banner.scss',
  shadow: false,
})
export class GoBanner {
  @Element() el: HTMLElement;
  /**
   * Type of banner
   */
  @Prop({ reflect: true }) variant: BannerVariants = 'info';
  /**
   * Heading of banner
   */
  @Prop() heading?: string;

  /**
   * If the banner can be dismissed, a close button will be rendered
   */
  @Prop() dismissible?: boolean = false;

  @Event() dismissed: EventEmitter<void>;

  @State() isShowing = true;

  // emit dismissed event on close button click
  handleClose() {
    this.isShowing = false;
    this.dismissed.emit();
  }

  @State() hasIcon: boolean = false;

  // Store attributes inherited from the host element
  componentWillLoad() {
    this.hasIcon = hasSlot(this.el, 'icon');
  }

  render() {
    const { hasIcon, heading, dismissible, isShowing } = this;
    return (
      <Host class={{ 'has-icon': hasIcon, dismissible, 'is-showing': isShowing }}>
        {hasIcon ? (
          <div class="icon-col">
            <slot name="icon"></slot>
          </div>
        ) : null}

        <section class="banner-content">
          {heading ? <h2 class="h5">{heading}</h2> : null}
          <slot></slot>
        </section>
        {dismissible ? (
          <div class="dismissible-col">
            <go-button variant="text" class="dismissible-btn" flat={true} icon={true} onClick={() => this.handleClose()} round={true}>
              <span class="visually-hidden">Dismiss</span>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </go-button>
          </div>
        ) : null}
      </Host>
    );
  }
}
