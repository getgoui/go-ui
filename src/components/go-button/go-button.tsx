import { Component, h, Prop, Element, Host } from '@stencil/core';
import { ColorVariants } from '../../types';
import { inheritAttributes } from '../../utils/helper';
@Component({
  tag: 'go-button',
  styleUrl: 'go-button.scss',
  shadow: false,
})
export class GovButton {
  @Element() button: HTMLElement;

  /**
   * Html type of the button
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';

  /**
   * If this button is disabled
   */
  @Prop({ reflect: true }) disabled?: boolean = null;

  /**
   * Button variant
   */
  @Prop() variant?: ColorVariants = 'primary';

  /**
   * If `outlined` is true, the button will have a border based on selected variant
   * @see `variant` property
   */
  @Prop() outlined?: boolean = false;

  /**
   * If set, the button will take up the full width of its parent
   */
  @Prop() block?: boolean = false;

  private interitedAttributes = {};
  componentWillLoad() {
    this.interitedAttributes = inheritAttributes(this.button, ['aria-checked']);
  }

  render() {
    const { type, disabled, interitedAttributes } = this;
    return (
      <Host>
        <button type={type} disabled={disabled} aria-disabled={disabled ? 'true' : null} {...interitedAttributes}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
