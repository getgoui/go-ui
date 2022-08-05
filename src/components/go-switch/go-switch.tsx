import { Component, Host, h, Element, Prop } from '@stencil/core';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-switch',
  styleUrl: 'go-switch.scss',
  shadow: false,
})
export class GoSwitch {
  @Element() el: HTMLElement;

  @Prop() label: string;

  @Prop() id: string;

  @Prop() name: string;

  // Store attributes inherited from the host element
  private attrs = {};
  componentWillLoad() {
    this.attrs = inheritAttributes(this.el, []);
  }

  render() {
    return (
      <Host>
        <input type="checkbox" name="" id="" />
      </Host>
    );
  }
}
