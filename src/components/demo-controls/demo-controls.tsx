import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'demo-controls',
  styleUrl: 'demo-controls.scss',
  shadow: false,
})
export class DemoControls {
  render() {
    return (
      <Host>
        <dark-mode-toggle></dark-mode-toggle>
      </Host>
    );
  }
}
