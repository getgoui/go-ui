import { Component, h, Element, Prop, State } from '@stencil/core';
import { InputProps, InputType } from '../../../interfaces';
import { uniqueId } from 'lodash-es';
import { loadFieldProps, fieldSlotNames, inheritNonFieldAttrs, loadFieldSlots } from '../../../utils';
@Component({
  tag: 'go-input',
  shadow: false,
})
export class GoInput implements InputProps {
  @Element() el: HTMLElement;
  /**
   * Type of this input field
   * `go-input` support only the types that is considered "single-line of text"
   * For other types, check other form components.
   */
  @Prop() type?: InputType = 'text';

  /**
   * DOM id for label
   */
  @Prop() labelId?: string;

  /**
   * DOM id for prefix
   */
  @Prop() prefixId?: string;

  /**
   * DOM id for suffix
   */
  @Prop() suffixId?: string;
  /**
   * DOM id for hint message
   */
  @Prop() hintId?: string;

  /**
   * DOM id for error
   */
  @Prop() errorId?: string;

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
   * Hint message for the input
   */
  @Prop() hint?: string;
  /**
   * Error state of input, text provided will be shown as error message
   */
  @Prop() error?: boolean | string;
  /**
   * If this input is read-only
   */
  @Prop() readonly?: boolean;

  /**
   * Value of the input field
   */
  @Prop() value?: string;

  prefix = 'go-input-';
  @State() attrs: any;
  hasNamedSlot: { [key: string]: boolean } = {};
  id = uniqueId(this.prefix);
  controlEl: HTMLElement;
  componentWillLoad() {
    this.attrs = inheritNonFieldAttrs(this);
    this.hasNamedSlot = loadFieldSlots(this.el);
  }

  render() {
    const { attrs } = this;
    const fieldProps = loadFieldProps(this);
    return (
      <go-field {...fieldProps}>
        {fieldSlotNames.map((slotName) => {
          if (this.hasNamedSlot[slotName]) {
            return (
              <template slot={slotName}>
                <slot name={slotName}></slot>
              </template>
            );
          }
        })}
        <input {...attrs} ref={(el) => (this.controlEl = el)} class="control" id={this.id} value={this.value} />
      </go-field>
    );
  }
}
