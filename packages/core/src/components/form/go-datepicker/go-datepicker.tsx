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

  @Prop() format?: string = 'YYYY-MM-DD';

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

  @Event() goChange: EventEmitter<GoChangeEventDetail>;

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
    console.log('readonly', this.readonly);
    this.passThroughReadonly(this.readonly);
  }

  toISO(str: string) {
    return dayjs(str, this.format).format('YYYY-MM-DD');
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

  render() {
    const { controlId: id, value, name, disabled, parsedOptions } = this;
    const fieldProps = loadFieldProps(this);
    const hint = `${this.hint ?? ''}${this.hintFormat ? ` (${this.format})` : ''}`;
    return (
      <go-field {...fieldProps} hint={hint}>
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
          name={name}
          disabled={disabled}
          onDuetBlur={() => this.handleDuetBlur()}
          onDuetChange={(e) => this.handleDuetChange(e)}
          {...parsedOptions}></duet-date-picker>
      </go-field>
    );
  }
}
