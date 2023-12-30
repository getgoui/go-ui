import { Component, h, Prop, Element, Host, Watch, State } from '@stencil/core';
import { Breakpoints, ColorVariants } from '../../interfaces';
import { $attrs, warning } from '../../utils/helper';

/**
 * @slot default - Button text
 * @slot prefix - Use this slot to prepend content to the button.
 * @slot suffix - Use this slot to append content to the button.
 */
@Component({
  tag: 'go-button',
  styleUrl: 'go-button.scss',
  shadow: false,
})
export class GoButton {
  @Element() el: HTMLElement;

  /**
   * Html type of the button
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';

  /**
   * If this button is disabled
   */
  @Prop({ reflect: true }) disabled?: boolean = null;

  /**
   * Button variants
   */
  @Prop({ reflect: true }) variant?: ColorVariants | 'text' = 'neutral';

  /**
   * If set, the button will take up the full width of its parent
   * If block="{breakpoint}" is set, the button will take up the full width for the specified breakpoint. e.g. a `block="mobile"` button will display full width on mobile devices.
   * If block="all", the button will take full width on all devices.
   */
  @Prop({ reflect: true }) block?: Breakpoints;

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

  /**
   * If the button is loading
   */
  @Prop() loading: boolean = false;

  /**
   * Screen reader announcement for loading state
   */
  @Prop() loadingAnouncement?: string = 'Loading';

  @State() blockClasses: string;

  @State() inheritedAttributes = {} as any;

  public nativeEl: HTMLElement = null;

  componentWillLoad() {
    // a11y check
    if (this.icon) {
      if (!this.el.hasAttribute('aria-label') && !this.el.hasAttribute('aria-labelledby')) {
        warning(`go-button with icon must have either aria-label or aria-labelledby attribute`, this.el);
      }
    }

    if (this.block) {
      this.handleBlockChange(this.block);
    }
    this.updateInnerButtonAttributes();
  }
  updateInnerButtonAttributes() {
    this.inheritedAttributes = {
      ...$attrs.bind(this)(true),
    };
  }

  @Watch('block')
  handleBlockChange(block: Breakpoints) {
    this.blockClasses = typeof block !== 'undefined' ? `block-${block}` : '';
  }

  render() {
    const {
      type,
      disabled,
      variant,
      blockClasses,
      outline,
      outlineFill,
      inheritedAttributes,
      href,
      loading,
      loadingAnouncement,
    } = this;
    console.log(inheritedAttributes);
    const Tag = href ? 'a' : 'button';
    const rootClasses = `${variant} ${blockClasses}`;
    return (
      <Host
        class={{
          [rootClasses]: true,
          outline,
          'outline outline-fill': outlineFill,
        }}>
        <Tag
          ref={(el) => {
            this.nativeEl = el;
          }}
          href={href ? href : null}
          type={href ? null : type}
          aria-disabled={disabled ? 'true' : null}
          disabled={disabled ? 'true' : null}
          class="inner-button"
          aria-busy={loading ? 'true' : null}
          {...inheritedAttributes}>
          <go-spinner loading={loading} loadingAnnouncement={loadingAnouncement}></go-spinner>
          <slot name="prefix"></slot>
          <span class="btn-text">
            <slot></slot>
          </span>
          <slot name="suffix"></slot>
        </Tag>
      </Host>
    );
  }
}
