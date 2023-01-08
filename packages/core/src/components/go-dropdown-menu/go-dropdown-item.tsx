import { Component, h, Event, EventEmitter, Element, Method } from '@stencil/core';

@Component({
  tag: 'go-dropdown-item',
  styleUrl: 'go-dropdown-item.scss',
})
export class GoDropdownItem {
  @Element() el: HTMLElement;

  /**
   * Emitted when a menu item is selected
   */
  @Event() selected: EventEmitter<HTMLElement>;

  @Method()
  focusOnControl() {
    this.controlEl?.focus();
  }

  controlEl: HTMLElement;

  render() {
    return (
      <button
        type="button"
        role="menuitem"
        ref={(el) => (this.controlEl = el)}
        onClick={() => {
          this.selected.emit(this.el);
        }}>
        <slot></slot>
      </button>
    );
  }
}
