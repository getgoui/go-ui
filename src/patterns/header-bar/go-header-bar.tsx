import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'go-header-bar',
  styleUrl: 'go-header-bar.scss',
  shadow: false,
})
export class GoHeaderBar {
  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <div class="menu">
          <slot name="menu"></slot>
        </div>
        <div class="logo">
          <slot name="logo"></slot>
        </div>
        <div class="search-bar">
          <slot name="search-bar"></slot>
        </div>
      </Host>
    );
  }
}
