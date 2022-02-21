import { Component, h, Prop, Element, Host, Watch, State } from '@stencil/core';
import { Breakpoints, ColorVariants } from '../../types';
import { inheritAttributes, warning } from '../../utils/helper';

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
  @Prop({ reflect: true }) color?: ColorVariants = 'primary';

  /**
   * If set, the button will take up the full width of its parent
   * If block="{breakpoint}" is set, the button will take up the full width for the specified breakpoint. e.g. a `block="mobile"` button will display full width on mobile devices.
   */
  @Prop({ reflect: true }) block?: Breakpoints | '';

  /**
   * If `outline` is true, the button will have a border based on selected variant
   * @see `variant` property
   */
  @Prop({ reflect: true }) outline?: boolean = false;

  /**
   * Outline style with filled background
   */
  @Prop({ reflect: true }) outlineFill?: boolean = false;

  /**
   * If `flat` is set, the button will have no shadow and will be filled with the background color of the selected variant
   */
  @Prop({ reflect: true }) flat?: boolean = false;

  /**
   * If button should have pill-shaped corners
   */
  @Prop({ reflect: true }) round?: boolean = false;

  /**
   * Circle shaped icon only button that has min size of 40px for touch devices
   */
  @Prop({ reflect: true }) icon?: boolean = false;

  /**
   * Stack elements inside the button
   */
  @Prop({ reflect: true }) stack?: boolean = false;

  /**
   * Reduce inner gaps and outer paddings
   */
  @Prop({ reflect: true }) compact?: boolean = false;

  /**
   * If the button has an href, it will be rendered as an anchor tag
   */
  @Prop() href?: string;

  private inheritedAttributes = {} as any;
  componentWillLoad() {
    // a11y check
    if (this.icon) {
      if (!this.root.hasAttribute('aria-label') && !this.root.hasAttribute('aria-labelledby')) {
        warning(`go-button with icon must have either aria-label or aria-labelledby attribute`, this.root);
      }
    }

    this.inheritedAttributes = inheritAttributes(this.root, [
      'block',
      'color',
      'disabled',
      'style',
      'invert',
      'outline',
      'outline-fill',
      'flat',
      'round',
      'icon',
      'stack',
      'compact',
      'href',
    ]);
  }

  @State() blockClasses: string;
  @Watch('block')
  handleBlockChange(block: Breakpoints | '') {
    this.blockClasses = typeof block !== 'undefined' ? `${block === '' ? 'block' : `block-${block}`}` : '';
  }

  render() {
    const { type, disabled, color, blockClasses, outline, outlineFill, inheritedAttributes, href } = this;
    const Tag = href ? 'a' : 'button';
    const rootClasses = `${color} ${blockClasses}`;

    const inheritedClasses = inheritedAttributes['class'] || '';
    const innerBtnClasses = {
      'inner-button': true,
      [inheritedClasses]: !!inheritedClasses,
    };

    return (
      <Host
        class={{
          [rootClasses]: true,
          outline,
          'outline outline-fill': outlineFill,
        }}>
        <Tag
          href={href ? href : null}
          type={href ? null : type}
          aria-disabled={disabled ? 'true' : null}
          disabled={disabled}
          {...inheritedAttributes}
          class={innerBtnClasses}>
          <slot name="start"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </Tag>
      </Host>
    );
  }
}
