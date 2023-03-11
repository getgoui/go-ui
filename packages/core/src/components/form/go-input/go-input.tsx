import { Component, h, Element, Prop } from '@stencil/core';
import { InputProps, InputType } from '../../../interfaces';
import { hasSlot, inheritComponentAttrs } from '../../../utils/helper';

@Component({
  tag: 'go-input',
  shadow: false,
})
export class GoInput implements InputProps {
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

  @Element() el: HTMLElement;

  attrs: any;
  passSlots = ['icon-before', 'icon-after', 'prefix', 'suffix', 'hint'];
  hasNamedSlot: { [key: string]: boolean } = {};

  componentWillLoad() {
    this.attrs = inheritComponentAttrs(this);
    this.passSlots.forEach((slotName) => {
      this.hasNamedSlot[slotName] = hasSlot(this.el, slotName);
    });
  }

  render() {
    const { label, ...props } = this;
    const { id, name, value, disabled, readonly, type, ...attrs } = this.attrs;
    const controlAttrs = {
      id,
      type,
      name,
      value,
      disabled: typeof disabled !== 'undefined',
      readonly,
    };
    return (
      <go-field label={label} controlId={id} readonly={readonly} disabled={disabled} {...props} {...attrs}>
        {this.passSlots.map((slotName) => {
          if (this.hasNamedSlot[slotName]) {
            return (
              <template slot={slotName}>
                <slot name={slotName}></slot>
              </template>
            );
          }
        })}

        <input class="control" {...controlAttrs} />
      </go-field>
    );
  }
}
