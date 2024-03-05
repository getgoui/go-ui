import { INavItem } from '@/interfaces';
import { hasSlot, onClickOutside, onEscape, parseJsonProp } from '@/utils';
import { Component, Host, Prop, State, h, Event, EventEmitter, Method, Element, Watch } from '@stencil/core';
import { renderIcon } from '../nav-helpers';

@Component({
  tag: 'go-nav-item',
})
export class GoNavItem {
  @Element() el: HTMLElement;

  @Prop() item: INavItem | string;

  @Watch('item')
  parseItemProp() {
    this.parsedItem = parseJsonProp(this.item);
  }

  @State() parsedItem: INavItem;

  clickOutsideCleanUp = null;
  escapeCleanUp = null;
  @State() hasSubmenuSlot = false;

  componentWillLoad() {
    this.parseItemProp();

    // click outside to close menus
    this.clickOutsideCleanUp = onClickOutside(this.el, () => {
      if (this.parsedItem?.children && this.open) {
        this.closeSubmenu();
      }
    });
    // esc to close menus
    this.escapeCleanUp = onEscape(this.el, () => this.closeSubmenu());
    this.hasSubmenuSlot = hasSlot(this.el, 'submenu');
  }

  disconnectedCallback() {
    this.clickOutsideCleanUp && this.clickOutsideCleanUp();
    this.escapeCleanUp && this.escapeCleanUp();
  }

  /**
   * open state of the submenu, only applicable if
   * - the `item` property has `children` key, or
   * - go-nav-item has `submenu` slot
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  @Event({
    eventName: 'navigate',
    cancelable: true,
    bubbles: true,
  })
  navEvent: EventEmitter;

  @Event({
    eventName: 'submenutoggle',
    cancelable: true,
    bubbles: true,
  })
  subMenuToggleEvent: EventEmitter;

  handleSubmenuToggle(item: INavItem) {
    this.toggleSubmenu();
    this.subMenuToggleEvent.emit({ item });
  }

  @Method()
  async closeSubmenu() {
    this.open = false;
  }

  @Method()
  async openSubmenu() {
    this.open = true;
  }

  @Method()
  async toggleSubmenu() {
    this.open = !this.open;
  }

  renderSubMenu(parent: INavItem) {
    if (!parent) {
      return;
    }
    // if submenu item has children, render the current item and its children
    if (parent.children?.length > 0) {
      return (
        <div class="submenu">
          <div class="submenu-header">
            <go-nav-link block item={parent}></go-nav-link>
            {parent.description ? <p class="description">{parent.description}</p> : null}
          </div>
          <ul>
            {parent.children.map((child) => (
              <li>
                <go-nav-link block item={child}></go-nav-link>
                {child.description ? <p class="description">{child.description}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div class="nav-item">
        <go-nav-link block showDescription item={parent}></go-nav-link>
      </div>
    );
  }

  render() {
    const { parsedItem: item } = this;
    let Tag = 'a';

    const hasChildren = item?.children?.length > 0 || this.hasSubmenuSlot;
    if (item?.isCurrent) {
      Tag = 'span';
    }
    if (hasChildren) {
      Tag = 'button';
    }

    let attrs = null;

    if (Tag === 'a') {
      attrs = {
        href: item?.url,
        onClick: (event) => {
          this.navEvent.emit({ event, item });
        },
        ...item?.linkAttrs,
      };
    }
    if (Tag === 'button') {
      attrs = {
        'type': 'button',
        'aria-expanded': 'false',
        'onClick': () => this.handleSubmenuToggle(item),
      };
    }
    return (
      <Host
        role="listitem"
        class={{ 'nav-item': true, 'has-children': hasChildren, 'current': item?.isCurrent, 'open': this.open }}>
        <slot name="default">
          <Tag class="nav-item-inner" {...attrs}>
            <span class="nav-item-label">
              {renderIcon(item?.icon)}
              <span>{item?.label}</span>
            </span>
            {hasChildren ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            ) : null}
          </Tag>
        </slot>
        <slot name="submenu">
          {item?.children ? (
            <div class="submenu-container" style={{ '--submenu-columns': item?.columns ? String(item.columns) : '1' }}>
              <div class="submenu-header">
                <go-nav-link block item={item} showDescription showArrow></go-nav-link>
              </div>
              <div class="submenu-list">{item.children.map((child) => this.renderSubMenu(child))}</div>
            </div>
          ) : null}
        </slot>
      </Host>
    );
  }
}
