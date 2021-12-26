import { Component, h, Prop, Element, Host } from '@stencil/core';
import { Breakpoints, ColorVariants } from '../../types';
import { inheritAttributes } from '../../utils/helper';

/**
 * @slot start - Use this slot to prepend content to the button.
 * @slot end - Use this slot to append content to the button.
 */
@Component({
  tag: 'go-button',
  styleUrl: 'go-button.scss',
  shadow: false,
})
export class GoButton {
  @Element() root: HTMLElement;

  /**
   * Html type of the button
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';

  /**
   * If this button is disabled
   */
  @Prop({ reflect: true }) disabled?: boolean = null;

  /**
   * Color variants
   */
  @Prop() color?: ColorVariants = 'primary';

  /**
   * If set, the button will take up the full width of its parent
   * If block="{breakpoint}" is set, the button will take up the full width for the specified breakpoint. e.g. a `block="mobile"` button will display full width on mobile devices.
   */
  @Prop() block?: Breakpoints | '';

  /**
   * If `outlined` is true, the button will have a border based on selected variant
   * @see `variant` property
   */
  @Prop({ reflect: true }) outlined?: boolean = false;

  /**
   * If `flat` is set, the button will have no shadow and will be filled with the background color of the selected variant
   */
  @Prop({ reflect: true }) flat?: boolean = false;

  @Prop({ reflect: true }) rounded?: boolean = false;

  /**
   * If the button has an href, it will be rendered as an anchor tag
   */
  @Prop() href?: string;

  private inheritedAttributes = {} as any;
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.root, ['block', 'color', 'disabled', 'style'], false);
  }

  render() {
    const { type, disabled, color, block, inheritedAttributes } = this;
    const Tag = this.href ? 'a' : 'button';
    const blockClass = typeof block !== 'undefined' ? `${block === '' ? 'block' : `block-${block}`}` : '';
    const rootClasses = `${color} ${blockClass}`;

    // filter inherited attributes to remove class

    return (
      <Host class={rootClasses}>
        <Tag type={this.href ? null : type} aria-disabled={disabled ? 'true' : null} disabled={disabled} {...inheritedAttributes} class="inner-button">
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </Tag>
      </Host>
    );
  }
}
