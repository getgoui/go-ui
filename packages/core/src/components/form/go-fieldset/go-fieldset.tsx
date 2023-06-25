import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { hasSlot, initIdProps } from '../../../utils';

@Component({
  tag: 'go-fieldset',
  styleUrl: 'go-fieldset.scss',
  shadow: false,
})
export class GoFieldset {
  /**
   * Label of the input field
   */
  @Prop() label: string;
  /**
   * Hint message for the input
   */
  @Prop() hint?: string;
  /**
   * Error state of input, text provided will be shown as error message
   */
  @Prop() error?: boolean | string;

  id: string;

  /**
   * DOM id for label
   */
  @Prop({ mutable: true })
  labelId?: string;

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
   * Wrap direct DOM children in an unordered list so they are announced by screen readers, good for checkboxes and radio buttons
   */
  @Prop()
  isList?: boolean = false;

  @Element() el: HTMLElement;

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
    initIdProps(this, this.el, ['label', 'hint', 'error'], 'go-fieldset-');
    this.updateErrorState();
  }

  wrapChildrenInUl(div) {
    // Create a new ul element
    const ul = document.createElement('ul');
    ul.classList.add('fieldset-content');
    // Get the div's direct children
    // we need to modify html structure, this will change the div.children reference.
    // so make a new array to iterate against.

    const children = [...div.children];
    // Iterate over the children
    for (let i = 0; i < children.length; i++) {
      // Create a new li element
      const li = document.createElement('li');
      // Append the current child to the li element
      li.appendChild(children[i]);
      // Append the li element to the ul element
      ul.appendChild(li);
    }

    // Replace the div with the ul element
    div.parentNode.replaceChild(ul, div);
  }

  componentDidLoad() {
    if (this.isList) {
      this.wrapChildrenInUl(this.el.querySelector('.fieldset-content'));
    }
  }

  render() {
    const { label, error, hint, hasError, hasHintSlot, labelId, errorId, hintId } = this;
    return (
      <Host>
        <fieldset
          class={{
            'go-field': true,
            'error': hasError,
          }}
          aria-invalid={hasError}>
          <legend>
            {/* screen reader announcements */}
            <span class="label" id={labelId}>
              {label}
            </span>
            {hasHintSlot || hint ? (
              <span class="hint" id={hintId}>
                <slot name="hint">{hint}</slot>
              </span>
            ) : null}
            <span class="visually-hidden">{hasError ? <span id={errorId}>Invalid: {error}</span> : null}</span>
          </legend>
          <div class="fieldset-content">
            <slot></slot>
          </div>
          {hasError ? (
            <div class="error-msg" id={errorId}>
              {error}
            </div>
          ) : null}
        </fieldset>
      </Host>
    );
  }
}
