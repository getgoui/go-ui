import { Component, Host, h, Element, Prop, Watch, State } from '@stencil/core';
import { InputProps, InputType } from '../../../interfaces';
import { hasSlot, initIdProps } from '../../../utils/helper';

@Component({
  tag: 'go-input',
  shadow: false,
})
export class GoInput implements InputProps {
  @Element() el: HTMLElement;

  id: string;

  /**
   * DOM id for label
   */
  @Prop({ mutable: true })
  labelId?: string;

  /**
   * DOM id for prefix
   */
  @Prop({ mutable: true })
  prefixId?: string;

  /**
   * DOM id for suffix
   */
  @Prop({ mutable: true })
  suffixId?: string;
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
   * Value of the input
   */
  @Prop() value: any;
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
   * Type of this input field
   * `go-input` support only the types that is considered "single-line of text"
   * For other types, check other form components.
   */
  @Prop() type?: InputType = 'text';

  /**
   * Allow empty value for `error` attribute and show error state
   */
  @State() hasError = false;

  @Watch('error')
  updateErrorState() {
    this.hasError = typeof this.error !== 'undefined';
  }

  hasIconBefore: boolean;
  hasIconAfter: boolean;
  hasPrefix: boolean;
  hasSuffix: boolean;
  hasHintSlot: boolean;

  componentWillLoad() {
    this.hasIconBefore = hasSlot(this.el, 'icon-before');
    this.hasIconAfter = hasSlot(this.el, 'icon-after');
    this.hasPrefix = hasSlot(this.el, 'prefix');
    this.hasSuffix = hasSlot(this.el, 'suffix');
    this.hasHintSlot = hasSlot(this.el, 'hint');
    initIdProps(this, this.el, ['label', 'prefix', 'suffix', 'hint', 'error'], 'go-input-');
    this.updateErrorState();
  }

  render() {
    const {
      id,
      name,
      label,
      hint,
      disabled,
      value,
      hasError,
      error,
      readonly,
      type,
      hasIconAfter,
      hasIconBefore,
      hasPrefix,
      hasSuffix,
      hasHintSlot,
      labelId,
      hintId,
      prefixId,
      suffixId,
      errorId,
    } = this;

    const attrs = {
      id,
      name,
      disabled,
      value,
      readonly,
      type,
    };

    const labelledByIds = [];
    if (hasPrefix) {
      labelledByIds.push(prefixId);
    }
    labelledByIds.push(labelId);
    if (hasSuffix) {
      labelledByIds.push(suffixId);
    }

    const describedByIds = [];
    if (hasHintSlot || hint) {
      describedByIds.push(hintId);
    }
    if (hasError) {
      describedByIds.push(errorId);
    }

    return (
      <Host
        class={{
          'go-field': true,
          'error': hasError,
          'readonly': !!readonly,
          'disabled': !!disabled,
          'has-prefix': hasPrefix,
          'has-suffix': hasSuffix,
          'has-icon-before': hasIconBefore,
          'has-icon-after': hasIconAfter,
        }}>
        <label class="label" htmlFor={id} id={labelId}>
          {label}
        </label>
        {hasHintSlot || hint ? (
          <div class="hint" id={hintId}>
            <slot name="hint">{hint}</slot>
          </div>
        ) : null}

        <div class="control-wrapper">
          {hasPrefix ? (
            <span class="prefix presuf" aria-hidden="true" id={prefixId}>
              <slot name="prefix"></slot>
            </span>
          ) : null}

          {hasIconBefore ? (
            <span class="control-icon icon-before">
              <slot name="icon-before"></slot>
            </span>
          ) : null}

          <input
            class="control"
            {...attrs}
            aria-disabled={disabled ? 'true' : 'false'}
            aria-labelledby={labelledByIds.join(' ')}
            aria-invalid={String(hasError)}
            aria-describedby={describedByIds.join(' ')}
          />

          {hasSuffix ? (
            <span class="suffix presuf" aria-hidden="true" id={suffixId}>
              <slot name="suffix"></slot>
            </span>
          ) : null}

          {readonly || hasIconAfter ? (
            <span class="control-icon icon-after">
              {readonly ? (
                // prettier-ignore
                <svg class="lock-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
              ) : (
                <slot name="icon-after"></slot>
              )}
            </span>
          ) : null}
        </div>
        {hasError ? (
          <div id={errorId} class="error-msg">
            {error}
          </div>
        ) : null}
      </Host>
    );
  }
}
