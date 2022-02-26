import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'go-button-group',
  styleUrl: 'go-button-group.scss',
  shadow: false,
})
export class GoButtonGroup {
  @Element() el: HTMLElement;

  componentWillLoad() {
    // Make buttons inside take up full width on mobile.
    this.el.querySelectorAll('go-button').forEach((button) => {
      // button.setAttribute('block', 'mobile');
      button.block = 'mobile';
    });
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
