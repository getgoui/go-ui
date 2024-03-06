import { INavItem } from '@/interfaces';
import { hasSlot, parseJsonProp } from '@/utils';
import { Component, Host, Prop, State, h, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { renderIcon } from '../nav-helpers';
import { uniqueId } from 'lodash-es';

@Component({
  tag: 'go-nav-item',
})
export class GoNavItem {
  @Element() el: HTMLElement;

  @Prop() item: INavItem | string;

  submenuId?: string;
  @Watch('item')
  parseItemProp() {
    this.parsedItem = parseJsonProp(this.item);
    if (this.parsedItem?.children?.length) {
      this.submenuId = uniqueId('go-nav-item-submenu-');
    }
  }

  @State() parsedItem: INavItem;

  @State() hasSubmenuSlot = false;

  componentWillLoad() {
    this.parseItemProp();

    this.hasSubmenuSlot = hasSlot(this.el, 'submenu');
  }

  /**
   * open state of the submenu, only applicable if
   * - the `item` property has `children` key, or
   * - go-nav-item has `submenu` slot
   */
  @State() isOpen: boolean = false;

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

  handleSubmenuToggle(isOpen: boolean) {
    console.log('event triggered', isOpen);
    this.isOpen = !!isOpen;
  }

  renderSubMenu(parent: INavItem) {
    if (!parent) {
      return;
    }
    // if submenu item has children, render the current item and its children
    if (parent.children?.length > 0) {
      return (
        <div class="submenu-list-container">
          <div class="submenu-header">
            <go-nav-link block item={parent}></go-nav-link>
          </div>
          <ul class="submenu-list">
            {parent.children.map((child) => (
              <li>
                <go-nav-link block item={child}></go-nav-link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div class="nav-item">
        <go-nav-link block item={parent}></go-nav-link>
      </div>
    );
  }

  render() {
    const { parsedItem: item, submenuId } = this;
    let Tag = 'a';

    const hasChildren = item?.children?.length > 0 || this.hasSubmenuSlot;
    if (item?.isCurrent) {
      Tag = 'span';
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
    return (
      <Host role="listitem" class={{ 'nav-item': true, 'current': item?.isCurrent }}>
        <slot>
          {hasChildren ? (
            [
              <go-nav-submenu-trigger controls={submenuId}>
                <span class="nav-item-label">
                  {renderIcon(item?.icon)}
                  <span>{item?.label}</span>
                </span>
              </go-nav-submenu-trigger>,
              <go-nav-submenu id={submenuId} columns={item?.columns}>
                <go-nav-link slot="submenu-header" block item={item} showArrow></go-nav-link>
                {item.children.map((child) => this.renderSubMenu(child))}
              </go-nav-submenu>,
            ]
          ) : (
            <Tag class="nav-item-inner" {...attrs}>
              <span class="nav-item-label">
                {renderIcon(item?.icon)}
                <span>{item?.label}</span>
              </span>
            </Tag>
          )}
        </slot>
      </Host>
    );
  }
}
