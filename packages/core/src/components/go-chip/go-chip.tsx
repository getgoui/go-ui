import { Component, Host, h, Element, Prop, Event, EventEmitter } from '@stencil/core';
import { ChipVariants } from '../../interfaces/variants';
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
   * Make chip clickable, `chipClick` event will be emitted on click
   */
  @Prop() clickable?: boolean = false;

  /**
   * Make chip dismissible, close button will be shown and `chipDismiss` event will be emitted when close button is clicked
   */
  @Prop() dismissible?: boolean = false;

  /**
   * Emitted on chip click, only if `clickable` is true
   */
  @Event() chipClick: EventEmitter;

  /**
   * Emitted on chip dismiss, only if `dismissible` is true
   */
  @Event() chipDismissed: EventEmitter;

  onChipClickHandler() {
    this.chipClick.emit();
  }

  onChipDismissedHandler() {
    this.chipDismissed.emit();
  }

  private hasPrefix = false;

  private hasSuffix = false;

  componentWillLoad() {
    this.hasPrefix = hasSlot(this.el, 'prefix');
    this.hasSuffix = hasSlot(this.el, 'suffix');
  }

  render() {
    const { hasPrefix, hasSuffix, clickable, dismissible } = this;
    const Tag = clickable ? 'button' : 'div';
    return (
      <Host
        class={{
          dismissible,
          clickable,
        }}>
        <Tag type={clickable ? 'button' : null} class="chip-main" onClick={clickable ? () => this.onChipClickHandler() : undefined}>
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
        {dismissible ? (
          <button class="dismiss-btn" onClick={() => this.onChipDismissedHandler()}>
            <span class="visually-hidden">Dismiss</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : null}
      </Host>
    );
  }
}
