import { Component, Element, h, Method, Prop, State, Host } from '@stencil/core';
import JSON5 from 'json5';
import { INavItem, INavMenu } from '../../types';
import { inheritAttributes } from '../../utils/helper';

@Component({
  tag: 'go-main-nav',
  styleUrl: 'go-main-nav.scss',
  shadow: false,
})
export class GoMainNav {
  @Element() el: HTMLElement;

  /**
   * Navigation items to be rendered
   */
  @Prop() items?: INavMenu | string;

  @State() navItems: INavMenu = null;

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style', 'items', 'active', 'position']);
    try {
      this.navItems = typeof this.items === 'string' ? JSON5.parse(this.items) : this.items;
    } catch (e) {
      console.log({ e });
    }
    console.log(this.navItems);
  }

  /**
   * Initialise the menu
   * @param items {INavMenu} menu items to be rendered
   */
  @Method()
  async init(items: INavMenu) {
    this.navItems = items;
  }

  // private handleArrowKeys(e: KeyboardEvent) {
  //   e.preventDefault();
  //   const currentTrigger = e.target as HTMLElement;
  //   const currentItem = currentTrigger.closest('li');
  //   let targetItem = null;
  //   if (e.code === 'ArrowUp') {
  //     targetItem = currentItem.previousElementSibling;
  //   }
  //   if (e.code === 'ArrowDown') {
  //     targetItem = currentItem.nextElementSibling;
  //   }
  //   if (targetItem) {
  //     (targetItem.querySelector('.nav-item-inner') as HTMLElement).focus();
  //   }
  // }

  private toggleSubMenu(e: MouseEvent) {
    const triggerBtn = e.currentTarget as HTMLElement;
    const menuItem = triggerBtn.closest('.nav-item.has-children') as HTMLElement;

    if (menuItem.classList.contains('active')) {
      this.closeSubMenu(menuItem);
    } else {
      // close any open menus
      this.el.querySelectorAll('.nav-menu-root > li.active').forEach((item) => {
        this.closeSubMenu(item as HTMLElement);
      });
      menuItem.classList.add('active');
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
  }

  private closeSubMenu(menuItem: HTMLElement) {
    const triggerBtn = menuItem.querySelector('.nav-item-inner');
    menuItem.classList.remove('active');
    triggerBtn.setAttribute('aria-expanded', 'false');
  }

  renderNavLink(item: INavItem, isSubmenuParentLink = false) {
    let Tag = item.isCurrent ? 'span' : 'a';
    let attrs = item?.url ? { href: item.url, ...item.linkAttrs } : {};

    attrs.class = `${attrs.class ? attrs.class : ''} nav-item-link${item.isCurrent ? ' current' : ''}`;
    return (
      <Tag {...attrs}>
        {item.icon && <go-icon name={item.icon}></go-icon>}
        <span>{item.label}</span>
        {isSubmenuParentLink ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        ) : null}
      </Tag>
    );
  }

  renderSubMenu(parent: INavItem) {
    const hasChildren = parent?.children?.length > 0;
    // if submenu item has children, render the current item and its children
    if (hasChildren) {
      return (
        <div class="submenu">
          <div class="submenu-header">{this.renderNavLink(parent)}</div>
          <ul>
            {parent.children.map((child) => (
              <li>{this.renderNavLink(child)}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <div class="nav-item">{this.renderNavLink(parent)}</div>;
  }

  renderRootNavItem(item: INavItem) {
    let Tag = 'a';
    const hasChildren = item?.children?.length > 0;
    if (item.isCurrent) {
      Tag = 'span';
    }
    if (hasChildren) {
      Tag = 'button';
    }

    let attrs = null;

    if (Tag === 'a') {
      attrs = { href: item.url, ...item.linkAttrs };
    }
    if (Tag === 'button') {
      attrs = {
        'type': 'button',
        'aria-expanded': 'false',
        'onClick': (e) => this.toggleSubMenu(e),
      };
    }
    return (
      <li class={{ 'nav-item': true, 'has-children': hasChildren, 'current': item.isCurrent }}>
        <Tag class="nav-item-inner" {...attrs}>
          <span class="nav-item-label">
            {item.icon && <go-icon name={item.icon}></go-icon>}
            <span>{item.label}</span>
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
        {item.children ? (
          <div class="submenu-container">
            <div class="submenu-header">
              <h4>{this.renderNavLink(item, true)}</h4>
              {item?.description ? <p>{item.description}</p> : null}
            </div>
            <div class="submenu-list">{item.children.map((child) => this.renderSubMenu(child))}</div>
          </div>
        ) : null}
      </li>
    );
  }
  /**
   * render top level nav items
   */
  renderRootNav(items: INavItem[]) {
    return (
      <div class={{ 'nav-menu': true }}>
        <ul class="nav-menu-root">{items.map((item) => this.renderRootNavItem(item))}</ul>
      </div>
    );
  }

  render() {
    let { navItems, inheritedAttrs } = this;

    return <Host {...inheritedAttrs}>{navItems ? <nav aria-label="Main navigation">{this.renderRootNav(navItems)}</nav> : <slot></slot>}</Host>;
  }
}
