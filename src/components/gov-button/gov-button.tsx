import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gov-button',
  styleUrl: 'gov-button.scss',
  shadow: false,
})
export class GovButton {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
