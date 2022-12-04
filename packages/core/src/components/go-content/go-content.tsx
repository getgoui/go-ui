import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'go-content',
  styleUrl: 'go-content.scss',
  shadow: false,
})
export class GoContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
