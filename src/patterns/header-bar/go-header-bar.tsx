import { Component, Host, h, Element, Prop } from '@stencil/core';
import { Breakpoints } from '../../interfaces';

@Component({
  tag: 'go-header-bar',
  styleUrl: 'go-header-bar.scss',
  shadow: false,
})
export class GoHeaderBar {
  @Element() el: HTMLElement;

  /**
   * Controls at which breakpoint the mobile menu (go-nav-drawer) becomes main nav menu (go-main-nav)
   */
  @Prop() breakpoint: Breakpoints = 'desktop';

  render() {
    const { breakpoint } = this;
    return (
      <Host>
        <div class="container">
          <div class={{ 'header-bar': true, [`responsive-${breakpoint}`]: true }}>
            <div
              class={{
                'mobile-menu-trigger': true,
                [`d-none-${breakpoint}`]: true,
              }}>
              <slot name="mobile-menu-trigger"></slot>
            </div>
            <div class="logo">
              <slot name="logo"></slot>
            </div>
            <div class="actions">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
        <div
          class={{
            'main-nav d-none': true,
            [`d-block-${breakpoint}`]: true,
          }}>
          <slot name="main-nav"></slot>
        </div>
      </Host>
    );
  }
}
