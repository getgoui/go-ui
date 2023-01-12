import { Component, h, Event, EventEmitter, Element, Method, Prop } from '@stencil/core';

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

  @Method()
  async focusOnControl() {
    this.controlEl?.focus();
  }

  controlEl: HTMLElement;

  render() {
    const { width } = this;

    return (
      <button
        type="button"
        role="menuitem"
        tabindex="-1"
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
