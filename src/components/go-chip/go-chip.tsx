import { Component, Host, h, Element, Prop } from '@stencil/core';
import { ChipVariants } from '../../types/variants';
import { hasSlot } from '../../utils/helper';

@Component({
  tag: 'go-chip',
  styleUrl: 'go-chip.scss',
  shadow: false,
})
export class GoChip {
  @Element() el: HTMLElement;

  /**
   * Colour variant of the chip
   */
  @Prop({ reflect: true }) variant: ChipVariants = 'neutral';

  /**
   * If `outline` is true, the button will have a border based on selected variant
   * @see `variant` property
   */
  @Prop({ reflect: true }) outline?: boolean = false;

  private hasPrefix = false;

  private hasSuffix = false;

  componentWillLoad() {
    this.hasPrefix = hasSlot(this.el, 'prefix');
    this.hasSuffix = hasSlot(this.el, 'suffix');
  }

  render() {
    const { hasPrefix, hasSuffix } = this;
    return (
      <Host>
        <div class="chip">
          {hasPrefix ? (
            <span class="prefix">
              <slot name="prefix"></slot>
            </span>
          ) : null}
          <span class="label">
            <slot></slot>
          </span>
          {hasSuffix ? (
            <span class="suffix">
              <slot name="suffix"></slot>
            </span>
          ) : null}
        </div>
      </Host>
    );
  }
}
