import { Component, h, Prop, Element, State, Watch } from '@stencil/core';
import { uniqueId } from 'lodash-es';
import '@duetds/date-picker';
import { fieldSlotNames, loadFieldProps, loadFieldSlots, parseItems } from '../../../utils';
import { FormFieldProps } from '../../../interfaces';
import { DuetDatePickerProps } from './duet-date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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
  @Prop({ mutable: true }) value?: string;

  /**
   * Duet Date Picker options
   * https://www.npmjs.com/package/@duetds/date-picker#properties
   */
  @Prop() options?: string | DuetDatePickerProps;

  @Prop() format?: string = 'YYYY-MM-DD';

  @State() parsedOptions: DuetDatePickerProps;

  @Watch('options')
  loadOptions() {
    this.parsedOptions = parseItems(this.options);
    const dateFormat = this.format;
    const defaultDateAdapter = {
      parse: (input: string): Date => {
        return dayjs(input, this.format).toDate();
      },
      format: (date: Date): string => {
        return dayjs(date).format(dateFormat);
      },
    };
    this.parsedOptions = {
      ...this.parsedOptions,
      dateAdapter: this.parsedOptions?.dateAdapter ?? defaultDateAdapter,
    };
  }

  prefixer = 'go-datepicker-';
  hasNamedSlot: { [key: string]: boolean } = {};
  controlId = uniqueId(this.prefixer);
  datepickerInputEl: HTMLInputElement;
  datepickerEl: HTMLDuetDatePickerElement;
  componentWillLoad() {
    this.loadOptions();
    this.hasNamedSlot = loadFieldSlots(this.el);
    this.datepickerInputEl = this.el.querySelector('.duet-date__input');
  }

  @Watch('value')
  handleValueChange(val, oldVal) {
    console.log('1');
    console.log({ val, oldVal });
    if (val === oldVal) {
      console.log('no change, return');
      return;
    }
    const date = val;
    this.validateDate(date);
  }

  validateDate(date) {
    console.log('2');
    if (dayjs(date, 'YYYY-MM-DD').isValid()) {
      console.log(`date ${date} is valid`);
      this.value = date;
    } else {
      console.log(`date ${date} is INVALID`);
      this.value = '';
    }
  }

  render() {
    const { controlId: id, value, name, disabled, parsedOptions } = this;
    const fieldProps = loadFieldProps(this);
    return (
      <go-field
        {...fieldProps}
        value={value}
        onChange={(e) => {
          console.log(`go-field hidden input change event`, e);
        }}>
        {fieldSlotNames.map((slotName) => {
          if (this.hasNamedSlot[slotName]) {
            return (
              <template slot={slotName}>
                <slot name={slotName}></slot>
              </template>
            );
          }
        })}
        <duet-date-picker
          ref={(el) => (this.datepickerEl = el)}
          class="control"
          identifier={id}
          value={value}
          name={name}
          disabled={disabled}
          onDuetChange={(e) => this.validateDate(e.detail.value)}
          {...parsedOptions}></duet-date-picker>
      </go-field>
    );
  }
}
