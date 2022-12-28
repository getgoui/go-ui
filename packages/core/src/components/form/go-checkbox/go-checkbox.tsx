import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { uniqueId } from 'lodash-es';
import { CheckboxProps } from '../../../interfaces';
import { hasSlot } from '../../../utils';
@Component({
  tag: 'go-checkbox',
  styleUrl: 'go-checkbox.scss',
  shadow: false,
})
export class GoCheckbox implements CheckboxProps {
  @Element() el: HTMLElement;

  @Prop() checked?: boolean;
  @Prop() indeterminate?: boolean;
  @Prop() name: string;
  @Prop() disabled?: boolean;
  @Prop() value: any;
  @Prop() label: string;
  @Prop() hint?: string;
  @Prop({ reflect: true }) error?: string;

  @Prop()
  id: string = uniqueId('go-checkbox-');

  /**
   * DOM id for hint message
   */
  @Prop()
  hintId? = `${this.id}-hint`;

  /**
   * DOM id for error
   */
  @Prop()
  errorId? = `${this.id}-error`;

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
    this.hasHintSlot = hasSlot(this.el, 'hint');
    this.updateErrorState();
  }

  render() {
    const { label, error, id, hint, hintId, hasHintSlot, checked, indeterminate, name, disabled, value, hasError, errorId } = this;
    const props = {
      id,
      checked,
      indeterminate,
      name,
      disabled,
      value,
    };
    return (
      <Host
        class={{
          error: hasError,
          disabled: !!disabled,
          indeterminate: !!indeterminate,
        }}>
        <div class="control-wrapper">
          <div class="box">
            <input class="hidden-control" type="checkbox" {...props} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="mark minus">
              <path d="M5 12h14" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="mark tick">
              <path d="M20 6 9 17l-5-5" />
            </svg>
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
