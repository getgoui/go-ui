import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'gov-button',
  styleUrl: 'gov-button.scss',
  shadow: false,
})
export class GovButton {
  /**
   * Button type
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
   */
  @Prop() type: 'button' | 'submit' | 'reset' = null;

  render() {
    const { type } = this;
    return (
      <Host>
        <button type={type}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
