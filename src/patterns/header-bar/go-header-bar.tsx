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
        <div class="slot menu">
          <slot name="menu"></slot>
        </div>
        <div class="slot logo">
          <slot name="logo"></slot>
        </div>
        <div class="slot actions">
          <slot name="actions"></slot>
        </div>
      </Host>
    );
  }
}
