import { Component, Host, h, Element } from '@stencil/core';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-card',
  styleUrl: 'go-card.scss',
  shadow: false,
})
export class GoCard {
  @Element() el: HTMLElement;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
