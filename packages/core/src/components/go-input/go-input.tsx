import { Component, Host, h, Element } from '@stencil/core';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-input',
  styleUrl: 'go-input.scss',
  shadow: false,
})
export class GoInput {
  @Element() el: HTMLElement;

  // Store attributes inherited from the host element
  private attrs = {};
  componentWillLoad() {
    this.attrs = inheritAttributes(this.el, ['class', 'style'], false);
  }

  render() {
    const { attrs } = this;
    return (
      <Host>
        <input {...attrs} />
      </Host>
    );
  }
}
