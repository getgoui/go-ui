import { Component, Host, h, Element, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { hasSlot, initIdProps } from '../../../utils';
import { GoChangeEventDetail } from '@/interfaces';

@Component({
  tag: 'go-radio',
  styleUrl: 'go-radio.scss',
  shadow: false,
})
export class GoRadio {
  @Element() el: HTMLElement;

  @Prop() checked?: boolean;
  @Prop() indeterminate?: boolean;
  @Prop() name: string;
  @Prop() disabled?: boolean;
  @Prop() value: any;
  @Prop() label: string;
  @Prop() hint?: string;
  @Prop({ reflect: true }) error?: string;

  id: string;

  @Prop() defaultValue: any;
  /**
   * DOM id for hint message
   */
  @Prop({ mutable: true })
  hintId?: string;

  /**
   * DOM id for error
   */
  @Prop({ mutable: true })
  errorId?: string;

  /**
   * Allow empty value for `error` attribute and show error state
   */
  @State() hasError = false;

  @Watch('error')
  updateErrorState() {
    this.hasError = typeof this.error !== 'undefined';
  }

  hasHintSlot: boolean;
  componentWillLoad() {
    // record original "value" attribute
    if (!this.defaultValue) {
      this.defaultValue = this.value;
    }

    this.hasHintSlot = hasSlot(this.el, 'hint');
    initIdProps(this, this.el, ['hint', 'error'], 'go-radio-');
    this.updateErrorState();
  }

  /**
   * Emit custom event with selected value
   */
  @Event({
    eventName: 'gochange',
  })
  goChange: EventEmitter<GoChangeEventDetail<string>>;

  handleChange(e) {
    console.log(e.target.value);
    console.log('this.value', this.value);
    console.log('defaultValue', this.defaultValue);
    this.goChange.emit({ value: this.defaultValue });
  }

  render() {
    const { label, error, id, hint, hintId, hasHintSlot, checked, name, disabled, hasError, errorId } = this;

    const describedByIds = [];
    if (hasHintSlot || hint) {
      describedByIds.push(hintId);
    }
    if (hasError) {
      describedByIds.push(errorId);
    }
    const props = {
      id,
      checked,
      name,
      disabled,
      value: this.defaultValue, // value shouldn't change
    };

    return (
      <Host
        class={{
          error: hasError,
          disabled: !!disabled,
        }}>
        <div class="control-wrapper">
          <div class="box">
            <input
              class="hidden-control"
              onChange={(e) => this.handleChange(e)}
              type="radio"
              {...props}
              aria-invalid={String(hasError)}
              aria-describedby={describedByIds.join(' ')}
            />
            <span class="mark">
              <span class="dot"></span>
            </span>
          </div>
          <div class="text">
            <label htmlFor={id}>{label}</label>
            {hasHintSlot || hint ? (
              <div class="hint" id={hintId}>
                <slot name="hint">{hint}</slot>
              </div>
            ) : null}
          </div>
        </div>
        {hasError ? (
          <div class="error-msg" id={errorId}>
            {error}
          </div>
        ) : null}
      </Host>
    );
  }
}
