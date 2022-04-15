import { Component, Host, h, Element, Prop, Event, EventEmitter, State } from '@stencil/core';
import { BannerVariants } from '../../types';
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
    const { hasIcon, heading, dismissible } = this;
    return (
      <Host class={{ 'has-icon': hasIcon }}>
        {hasIcon ? (
          <div class="icon-bar">
            <slot name="icon"></slot>
          </div>
        ) : null}

        <section class="banner-content">
          {heading ? <h2 class="h5">{heading}</h2> : null}
          <slot></slot>
        </section>
        {dismissible ? <go-button></go-button> : null}
      </Host>
    );
  }
}
