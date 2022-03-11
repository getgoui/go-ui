import { Component, Host, h, Element, Prop } from '@stencil/core';
import { Breakpoints } from '../../types';

@Component({
  tag: 'go-button-group',
  styleUrl: 'go-button-group.scss',
  shadow: false,
})
export class GoButtonGroup {
  @Element() el: HTMLElement;

  /**
   * If specified, buttons within group will be full width on smaller devices and auto-width going forward. e.g. having `block="tablet"` will make all buttons in group take up full width on mobile and tablet sizes and auto-width on larger devices.
   */
  @Prop({ reflect: true }) block?: Breakpoints;

  /**
   * No gap between buttons.
   */
  @Prop() connected?: boolean = false;

  async componentWillLoad() {
    // Make buttons inside take up full width on mobile.
    if (this.block) {
      this.el.querySelectorAll('go-button').forEach((button) => {
        button.setAttribute('block', this.block);
      });
    }
  }
  render() {
    const { connected } = this;
    return (
      <Host role="group" class={{ connected }}>
        <slot></slot>
      </Host>
    );
  }
}
