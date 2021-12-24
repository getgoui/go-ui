import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'go-button-group',
  styleUrl: 'go-button-group.scss',
  shadow: false,
})
export class GoButtonGroup {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
