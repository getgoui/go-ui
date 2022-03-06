import { Component, Host, h, Element, Prop } from '@stencil/core';
import { Breakpoints } from '../../types';

@Component({
  tag: 'go-button-group',
  styleUrl: 'go-button-group.scss',
  shadow: false,
})
export class GoButtonGroup {
  @Element() el: HTMLElement;

  @Prop({ reflect: true }) block?: Breakpoints = 'mobile';

  componentWillLoad() {
    // Make buttons inside take up full width on mobile.
    this.el.querySelectorAll('go-button').forEach((button) => {
      button.block = this.block;
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
