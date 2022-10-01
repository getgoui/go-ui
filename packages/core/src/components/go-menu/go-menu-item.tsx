import { Component, Host, h, Element } from '@stencil/core';
import { trapFocus } from '../../utils';

@Component({
  tag: 'go-menu',
  styleUrl: 'go-menu.scss',
  shadow: false,
})
export class GoMenu {
  @Element() el: HTMLElement;

  componentDidLoad() {
    trapFocus(this.el);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
