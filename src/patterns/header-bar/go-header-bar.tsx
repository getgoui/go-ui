import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-header-bar',
  styleUrl: 'go-header-bar.scss',
  shadow: false,
})
export class GoHeaderBar {
  @Element() el: HTMLElement;

  @Prop() breakpoint: string = '1200px';

  render() {
    return (
      <Host>
        <div class="header-bar">
          <div class="slot mobile-menu-trigger">
            <slot name="mobile-menu-trigger"></slot>
          </div>
          <div class="slot logo">
            <slot name="logo"></slot>
          </div>
          <div class="slot actions">
            <slot name="actions"></slot>
          </div>
        </div>
        <div class="main-nav">
          <slot name="main-nav"></slot>
        </div>
      </Host>
    );
  }
}
