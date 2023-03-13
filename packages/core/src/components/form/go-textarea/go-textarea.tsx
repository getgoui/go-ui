import { Component, h, Element, Prop, Watch } from '@stencil/core';
import { TextareaProps } from '../../../interfaces';
import { hasSlot, inheritComponentAttrs } from '../../../utils/helper';
import { uniqueId } from 'lodash-es';
import { fieldSlotNames } from '../../../utils';
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

  prefix = 'go-textarea-';
  attrs: any;
  hasNamedSlot: { [key: string]: boolean } = {};
  id = uniqueId(this.prefix);

  nativeControlEl: HTMLTextAreaElement;

  componentWillLoad() {
    this.attrs = inheritComponentAttrs(this, ['value', 'auto-grow', 'error']); // ignore dynamic/changeable props
    fieldSlotNames.forEach((slotName) => {
      this.hasNamedSlot[slotName] = hasSlot(this.el, slotName);
    });
  }

  @Watch('value')
  updateControlHeight() {
    if (this.autoGrow && this.nativeControlEl) {
      this.nativeControlEl.style.height = 'auto';
      this.nativeControlEl.style.height = this.nativeControlEl.scrollHeight + 'px';
    }
  }

  render() {
    const { prefix, value, id, error, attrs } = this;

    return (
      <go-field controlId={id} idPrefix={prefix} error={error} {...attrs}>
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
          ref={(el) => (this.nativeControlEl = el)}
          id={id}
          class="control"
          rows={5}
          {...attrs}
          onInput={(e) => (this.value = (e.target as HTMLTextAreaElement).value)}>
          {value}
        </textarea>
        {attrs.maxlength && attrs.maxlength > 0 ? (
          <span class="textarea-count">
            {value?.length ?? 0}/{attrs.maxlength}
          </span>
        ) : null}
      </go-field>
    );
  }
}
