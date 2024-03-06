import { onClickOutside, onEscape, warning } from '@/utils';
import { Component, Method, Prop, h, State, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'go-nav-submenu',
})
export class GoNavSubmenu {
  @Element() el: HTMLElement;

  @Prop() columns: number = 1;

  @State() isOpen: boolean = false;

  @Event({
    eventName: 'toggle',
    cancelable: true,
    bubbles: true,
  })
  toggleEvent: EventEmitter;

  @Method()
  async open() {
    this.isOpen = true;
    this.toggleEvent.emit({ isOpen: true });

    window.requestAnimationFrame(() => {
      // click outside to close menus
      this.clickOutsideCleanUp = onClickOutside(this.el, () => this.close());
      // esc to close menus
      this.escapeCleanUp = onEscape(document, () => this.close());
    });
  }

  @Method()
  async close() {
    this.isOpen = false;
    this.toggleEvent.emit({ isOpen: false });

    this.clickOutsideCleanUp && this.clickOutsideCleanUp();
    this.escapeCleanUp && this.escapeCleanUp();
  }

  @Method()
  async toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  parentNavItem: HTMLGoNavItemElement;
  clickOutsideCleanUp = null;
  escapeCleanUp = null;
  componentWillLoad() {
    this.parentNavItem = this.el.closest('go-nav-item');
    if (!this.parentNavItem) {
      warning('<go-nav-submenu> must be a child of <go-nav-item>', this.el);
      return;
    }
  }

  render() {
    const { columns, isOpen } = this;
    return (
      <div class={{ 'submenu-container': true, 'open': isOpen }} style={{ '--submenu-columns': String(columns) }}>
        <div class="submenu-header">
          <slot name="submenu-header"></slot>
        </div>
        <div class="submenu-body">
          <slot></slot>
        </div>
      </div>
    );
  }
}
