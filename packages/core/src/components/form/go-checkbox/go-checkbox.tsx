import { Component, Host, h, Element } from '@stencil/core';
import { inheritAttributes } from '../../../utils/helper';
import { uniqueId } from 'lodash-es';
@Component({
  tag: 'go-checkbox',
  styleUrl: 'go-checkbox.scss',
  shadow: false,
})
export class GoCheckbox {
  @Element() el: HTMLElement;

  private id = uniqueId();

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
  }

  render() {
    return (
      <Host>
        <label htmlFor="">{}</label>
        <input type="checkbox" id="" />
        <slot></slot>
      </Host>
    );
  }
}
