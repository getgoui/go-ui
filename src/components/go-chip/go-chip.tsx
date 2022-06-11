import { Component, Host, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
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

  /**
   * Make chip clickable
   */
  @Prop() clickable?: boolean = false;

  /**
   * If true, the chip will become a toggle button, checkmark will be displayed in `prefix` slot when selected
   */
  @Prop() toggle?: boolean = false;

  /**
   * Emitted on chip click, only if `clickable` is true
   */
  @Event() chipClick: EventEmitter<GoChip>;

  onChipClickHandler() {
    this.chipClick.emit(this);
  }

  private hasPrefix = false;

  private hasSuffix = false;

  componentWillLoad() {
    this.hasPrefix = hasSlot(this.el, 'prefix');
    this.hasSuffix = hasSlot(this.el, 'suffix');
  }

  render() {
    const { hasPrefix, hasSuffix, clickable, toggle } = this;
    const Tag = clickable ? 'button' : 'div';
    return (
      <Host>
        <Tag
          class={{
            chip: true,
            clickable,
          }}
          onClick={clickable ? () => this.onChipClickHandler() : undefined}>
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
        </Tag>
        {toggle ? <input type="checkbox" /> : null}
      </Host>
    );
  }
}
