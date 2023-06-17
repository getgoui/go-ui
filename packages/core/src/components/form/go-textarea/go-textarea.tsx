import { Component, h, Element, Prop, Watch, State } from '@stencil/core';
import { TextareaProps } from '../../../interfaces';
import { uniqueId } from 'lodash-es';
import { fieldSlotNames, inheritNonFieldAttrs, loadFieldProps, loadFieldSlots } from '../../../utils';
@Component({
  tag: 'go-textarea',
  styleUrl: 'go-textarea.scss',
  shadow: false,
})
export class GoTextarea implements TextareaProps {
  @Element() el: HTMLElement;
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
  @Prop({ mutable: true }) value?: string;

  /**
   * If set, grow textarea based on its content
   */
  @Prop() autoGrow?: boolean = false;

  hasNamedSlot: { [key: string]: boolean } = {};
  prefixer = 'go-textarea-';
  controlId = uniqueId(this.prefixer);
  controlEl: HTMLTextAreaElement;
  /**
   * keep track of non-field attrs
   */
  @State() attrs: any;

  componentWillLoad() {
    this.attrs = inheritNonFieldAttrs(this, ['auto-grow']);
    this.hasNamedSlot = loadFieldSlots(this.el);
  }

  @Watch('value')
  updateControlHeight() {
    if (this.autoGrow && this.controlEl) {
      this.controlEl.style.height = 'auto';
      this.controlEl.style.height = this.controlEl.scrollHeight + 'px';
    }
  }

  render() {
    const { value, controlId: id, attrs } = this;
    const fieldProps = loadFieldProps(this);
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

        <textarea
          {...fieldProps}
          {...attrs}
          ref={(el) => (this.controlEl = el)}
          id={id}
          class="control"
          rows={5}
          onInput={(e) => (this.value = (e.target as HTMLTextAreaElement).value)}>
          {value}
        </textarea>
        {attrs.maxlength && attrs.maxlength > 0 ? (
          <span class="textarea-count">
            {value?.length ?? 0}/{attrs.maxlength}
            <span class="visually-hidden" aria-live="assertive" role="alert">
              {value?.length === Number(attrs.maxlength)
                ? `Limit reached, you can only enter ${attrs.maxlength} characters in this field.`
                : ''}
            </span>
          </span>
        ) : null}
      </go-field>
    );
  }
}
