import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-fieldset',
  styleUrl: 'go-fieldset.scss',
  shadow: false,
})
export class GoFieldset {
  /**
   * Label of the input field
   */
  @Prop() label: string;
  /**
   * Hint message for the input
   */
  @Prop() hint?: string;
  /**
   * Error state of input, text provided will be shown as error message
   */
  @Prop() error?: boolean | string;

  @Element() el: HTMLElement;

  render() {
    const { label, error, hint } = this;
    return (
      <Host>
        <fieldset
          class={{
            'go-field': true,
            'error': !!error,
          }}>
          <legend class="label">{label}</legend>
          <div class="hint">{hint}</div>
          <div class="control-list">
            <slot></slot>
          </div>
        </fieldset>
      </Host>
    );
  }
}
