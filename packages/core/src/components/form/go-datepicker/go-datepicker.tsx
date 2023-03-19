import { Component, h, Prop, Element, State, Watch } from '@stencil/core';
import { uniqueId } from 'lodash-es';
import '@duetds/date-picker';
import { fieldSlotNames, hasSlot, parseItems } from '../../../utils';
import { FormFieldProps } from '../../../interfaces';
import { DuetDatePickerProps } from './duet-date-picker';
@Component({
  tag: 'go-datepicker',
  styleUrl: 'go-datepicker.scss',
  shadow: false,
})
export class GoDatepicker implements FormFieldProps {
  @Element() el: HTMLElement;
  @Prop() labelId?: string;
  @Prop() prefixId?: string;
  @Prop() suffixId?: string;
  @Prop() hintId?: string;
  @Prop() errorId?: string;
  @Prop() name: string;
  @Prop() label: string;
  @Prop() disabled?: boolean;
  @Prop() hint?: string;
  @Prop() error?: string | boolean;
  @Prop() readonly?: boolean;
  @Prop() value?: string;

  /**
   * Duet Date Picker options
   * https://www.npmjs.com/package/@duetds/date-picker#properties
   */
  @Prop() options?: string | DuetDatePickerProps;

  @Prop() autoFlip?: boolean;

  @State() parsedOptions: DuetDatePickerProps;

  @Watch('options')
  loadOptions() {
    this.parsedOptions = parseItems(this.options);
  }

  prefix = 'go-datepicker-';
  hasNamedSlot: { [key: string]: boolean } = {};
  id = uniqueId(this.prefix);
  componentWillLoad() {
    this.loadOptions();
    fieldSlotNames.forEach((slotName) => {
      this.hasNamedSlot[slotName] = hasSlot(this.el, slotName);
    });

    // get parent scroll positions
    if (this.autoFlip) {
      const parent = this.el;
      console.log(parent);
    }
  }

  render() {
    const { prefix: idPrefix, id, value, labelId, prefixId, suffixId, hintId, errorId, name, label, disabled, hint, error, readonly, parsedOptions } = this;
    const fieldProps = {
      idPrefix,
      controlId: id,
      labelId,
      prefixId,
      suffixId,
      hintId,
      errorId,
      name,
      label,
      disabled,
      hint,
      error,
      readonly,
    };
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
        <duet-date-picker class="control" id={id} value={value} name={name} disabled={disabled} {...parsedOptions}></duet-date-picker>
      </go-field>
    );
  }
}
