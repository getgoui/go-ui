import { Component, Host, h, Element, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { CheckboxProps } from '../../../interfaces';
import { hasSlot, initIdProps } from '../../../utils';
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

  controlId: string;
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

  @Event() goChange: EventEmitter<{ checked: boolean; value?: string }>;
  handleChange(e) {
    this.goChange.emit({
      checked: e.target.checked,
      value: e.target.value,
    });
  }

  hasHintSlot: boolean;
  componentWillLoad() {
    this.hasHintSlot = hasSlot(this.el, 'hint');
    initIdProps(this, this.el, ['hint', 'error', 'control'], 'go-checkbox-');
    this.updateErrorState();
  }

  render() {
    const {
      label,
      error,
      controlId,
      hint,
      hintId,
      hasHintSlot,
      checked,
      indeterminate,
      name,
      disabled,
      value,
      hasError,
      errorId,
    } = this;

    const describedByIds = [];
    if (hasHintSlot || hint) {
      describedByIds.push(hintId);
    }
    if (hasError) {
      describedByIds.push(errorId);
    }
    const props = {
      id: controlId,
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
            <input
              class="hidden-control"
              type="checkbox"
              {...props}
              aria-invalid={String(hasError)}
              aria-describedby={describedByIds.join(' ')}
              onChange={(e) => this.handleChange(e)}
            />
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
            <label htmlFor={controlId}>{label}</label>
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
