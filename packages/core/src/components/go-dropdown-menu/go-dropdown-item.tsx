import { Component, h, Event, EventEmitter, Element, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'go-dropdown-item',
  styleUrl: 'go-dropdown-item.scss',
})
export class GoDropdownItem {
  @Element() el: HTMLElement;

  /**
   * customise width of the dropdown item
   */
  @Prop() width?: string = '100%';

  /**
   * Emitted when a menu item is selected
   */
  @Event({
    bubbles: true,
  })
  selected: EventEmitter<HTMLElement>;

  @State() hasFocus = false;

  @Method()
  async focusInControl() {
    this.controlEl?.focus();
    this.controlEl.tabIndex = 0;
  }

  @Method()
  async focusOutControl() {
    this.controlEl.tabIndex = -1;
  }

  controlEl: HTMLElement;

  render() {
    const { width, hasFocus } = this;

    return (
      <button
        type="button"
        role="menuitem"
        tabindex={hasFocus ? '0' : '-1'}
        ref={(el) => (this.controlEl = el)}
        onClick={() => {
          this.selected.emit(this.el);
        }}
        style={{ '--dd-item-width': width }}>
        <slot></slot>
      </button>
    );
  }
}
