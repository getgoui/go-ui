import { Component, h, Prop, Element, State, Watch, EventEmitter, Event } from '@stencil/core';
import { uniqueId } from 'lodash-es';
import '@duetds/date-picker';
import { fieldSlotNames, loadFieldProps, loadFieldSlots, parseItems } from '../../../utils';
import { FormFieldProps, GoChangeEventDetail } from '../../../interfaces';
import { DuetDatePickerProps } from './duet-date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DuetDatePickerChangeEvent } from '@duetds/date-picker/dist/types/components/duet-date-picker/duet-date-picker';
import { getDefaultDateAdapter, getDefaultLocalization } from './utils';

const ISO_DATE_FORMAT = 'YYYY-MM-DD';
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
   * add date format into hint message
   */
  @Prop() hintFormat?: boolean = true;

  /**
   * Placeholder text
   */
  @Prop() placeholder?: string = '';

  /**
   * Duet Date Picker options
   * https://www.npmjs.com/package/@duetds/date-picker#properties
   */
  @Prop() options?: string | DuetDatePickerProps;

  /**
   * Specify the expected date format
   * Supported formats: https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens
   */
  @Prop() format?: string = ISO_DATE_FORMAT;

  @State() parsedOptions: DuetDatePickerProps;

  @Watch('options')
  loadOptions() {
    this.parsedOptions = parseItems(this.options);
    const dateFormat = this.format;
    this.parsedOptions = {
      ...this.parsedOptions,
      localization: this.parsedOptions?.localization ?? getDefaultLocalization(this.placeholder),
      dateAdapter: this.parsedOptions?.dateAdapter ?? getDefaultDateAdapter(dayjs, dateFormat),
    };
  }

  @Event({
    bubbles: true,
    eventName: 'gochange',
  })
  goChange: EventEmitter<GoChangeEventDetail<string>>;

  prefixer = 'go-datepicker-';
  hasNamedSlot: { [key: string]: boolean } = {};
  controlId = uniqueId(this.prefixer);
  datepickerInputEl: HTMLInputElement;
  datepickerEl: HTMLDuetDatePickerElement;
  componentWillLoad() {
    dayjs.extend(customParseFormat);
    this.loadOptions();
    this.hasNamedSlot = loadFieldSlots(this.el);
  }

  componentDidLoad() {
    this.datepickerInputEl = this.el.querySelector('.duet-date__input');
    this.passThroughReadonly(this.readonly);
    this.removeDuetInputName();
  }

  toISO(value: string) {
    return dayjs(value, this.format).format(ISO_DATE_FORMAT);
  }

  handleDuetChange(e: CustomEvent<DuetDatePickerChangeEvent>) {
    const { valueAsDate } = e.detail;
    if (!valueAsDate) {
      return;
    }
    this.setValueIfValid(valueAsDate);
  }

  /**
   * on datepicker blur check
   * at this point
   * the duet input field might have invalid values based on user input,
   * this.value will have the last valid ISO date string
   * we need to set the input value to that string
   * or empty string if no valid value available
   */
  handleDuetBlur() {
    const inputEl = this.el.querySelector('.duet-date__input') as HTMLInputElement;
    if (inputEl) {
      if (inputEl.value === '') {
        // user cleared out input value
        this.value = '';
        return;
      }
      inputEl.value = this.value || '';
    }
  }

  setValueIfValid(date: Date) {
    const dateObj = dayjs(date);
    if (!dateObj.isValid()) {
      return;
    }
    this.value = dateObj.format(this.format);
    this.goChange.emit({ value: this.value });
  }

  @Watch('readonly')
  watchReadonlyProp(readonly) {
    this.passThroughReadonly(readonly);
  }

  passThroughReadonly(readonly) {
    if (!this.datepickerInputEl) {
      return;
    }
    if (readonly) {
      this.datepickerInputEl.setAttribute('readonly', 'true');
    } else {
      this.datepickerInputEl.removeAttribute('readonly');
    }
  }

  /**
   * removes duet hidden input in form data
   * go-field is used to do this
   * duet hidden input doesn't store formatted date
   */
  removeDuetInputName() {
    if (!this.datepickerInputEl) {
      return;
    }
    this.datepickerInputEl.removeAttribute('name');
    const duetHiddenInput = this.datepickerEl.querySelector(`input[type="hidden"][name="${this.name}-duet-hidden"]`);
    if (duetHiddenInput) {
      duetHiddenInput.removeAttribute('name');
    }
  }

  render() {
    const { controlId: id, value, name, disabled, parsedOptions } = this;
    const fieldProps = loadFieldProps(this);
    const hint = `${this.hint ?? ''}${this.hintFormat ? ` ${this.format}` : ''}`;
    return (
      <go-field {...fieldProps} hint={hint} hiddenInputName={name} hiddenInputValue={value}>
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
          value={this.toISO(value)}
          name={`${name}-duet-hidden`}
          disabled={disabled}
          onDuetBlur={() => this.handleDuetBlur()}
          onDuetChange={(e) => this.handleDuetChange(e)}
          {...parsedOptions}></duet-date-picker>
      </go-field>
    );
  }
}
