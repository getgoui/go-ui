import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'go-action-menu',
  styleUrl: 'go-action-menu.scss',
  shadow: false,
})
export class GoActionMenu {
  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
