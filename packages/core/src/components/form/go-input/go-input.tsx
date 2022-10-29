import { Component, Host, h, Element, Prop } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import { InputProps } from '../../../interfaces';

@Component({
  tag: 'go-input',
  styleUrl: 'go-input.scss',
  shadow: false,
})
export class GoInput implements InputProps {
  @Element() el: HTMLElement;

  private id = uniqueId('go-input-');

  /**
   * Name of the input field
   */
  @Prop() name: string;

  /**
   * Label of the input field
   */
  @Prop() label: string;

  /**
   * If the input is disabled
   */
  @Prop() disabled?: boolean;
  /**
   * Value of the input
   */
  @Prop() value: any;
  /**
   * Hint message for the input
   */
  @Prop() hint?: string;
  /**
   * Error state of input, text provided will be shown as error message
   */
  @Prop() error?: boolean | string;

  componentWillLoad() {}

  render() {
    const { id, name, label, disabled, value, error } = this;

    const attrs = {
      id,
      name,
      disabled,
      value,
    };

    return (
      <Host class={{ error: !!error }}>
        <label htmlFor={id}>{label}</label>
        <input class="control" {...attrs} />
        {typeof error === 'string' ? <div class="error-msg">{error}</div> : null}
      </Host>
    );
  }
}
