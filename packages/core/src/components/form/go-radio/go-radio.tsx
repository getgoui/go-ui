import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { hasSlot, initIdProps } from '../../../utils';

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
    this.hasHintSlot = hasSlot(this.el, 'hint');
    initIdProps(this, this.el, ['hint', 'error'], 'go-radio-');
    this.updateErrorState();
  }
  render() {
    const { label, error, id, hint, hintId, hasHintSlot, checked, indeterminate, name, disabled, value, hasError, errorId } = this;

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
            <input class="hidden-control" type="radio" {...props} aria-invalid={String(hasError)} aria-describedby={describedByIds.join(' ')} />
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
