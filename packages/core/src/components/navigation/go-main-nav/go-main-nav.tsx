import { Component, Element, h, Method, Prop, State, Host, EventEmitter, Event, Watch } from '@stencil/core';
import { INavItem } from '../../../interfaces';
import { onClickOutside } from '../../../utils/dom';
import { inheritAttributes } from '../../../utils/helper';
import { parseItems } from '../../../utils';
import { renderIcon } from '../nav-helpers';

@Component({
  tag: 'go-main-nav',
  styleUrl: 'go-main-nav.scss',
  shadow: false,
})
export class GoMainNav {
  @Element() el: HTMLElement;

  /**
   * Navigation items to be rendered
   * if provided, slot content will not be rendered.
   */
  @Prop() items?: INavItem[] | string;

  @State() navItems: INavItem[] = null;

  /**
   * Label for the navigation.
   * This helps screen reader users to quickly navigate to teh correct nav landmark
   */
  @Prop() label = 'Main';

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  async componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style', 'items']);
    this.navItems = parseItems(this.items);
    // click outside to close menus
    onClickOutside(this.el, () => {
      this.closeAllSubMenus();
    });
    // esc to close menus
    this.el.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.closeAllSubMenus();
      }
    });
  }

  /**
   * Initialise the menu
   * @param items {INavItem[]} menu items to be rendered
   */
  @Method()
  async init(newItems: INavItem[] | string) {
    this.navItems = parseItems(newItems);
  }

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseItems(newItems);
  }

  private closeAllSubMenus() {
    this.el.querySelectorAll('.nav-menu-root > li.open').forEach((item) => {
      this.closeSubMenu(item as HTMLElement);
    });
  }

  private toggleSubMenu(e: MouseEvent) {
    const triggerBtn = e.currentTarget as HTMLElement;
    const menuItem = triggerBtn.closest('.nav-item.has-children') as HTMLElement;

    if (menuItem.classList.contains('open')) {
      this.closeSubMenu(menuItem);
    } else {
      // close any open menus
      this.closeAllSubMenus();
      menuItem.classList.add('open');
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
  }

  private closeSubMenu(menuItem: HTMLElement) {
    const triggerBtn = menuItem.querySelector('.nav-item-inner');
    menuItem.classList.remove('open');
    triggerBtn.setAttribute('aria-expanded', 'false');
  }

  @Event({
    eventName: 'navigate',
    cancelable: true,
    bubbles: true,
  })
  navEvent: EventEmitter;

  renderNavLink(item: INavItem, isSubmenuParentLink = false) {
    let Tag = item.isCurrent ? 'span' : 'a';
    let attrs = item?.url
      ? {
          href: item.url,
          onClick: (event) => {
            this.navEvent.emit({ event, item });
          },
          ...item.linkAttrs,
        }
      : {};

    attrs.class = `${attrs.class ? attrs.class : ''} nav-item-link${item.isCurrent ? ' current' : ''}`;
    return (
      <Tag {...attrs}>
        {renderIcon(item.icon)}
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
      attrs = {
        href: item.url,
        onClick: (event) => {
          console.log('clicked');
          this.navEvent.emit({ event, item });
        },
        ...item.linkAttrs,
      };
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
            {renderIcon(item.icon)}
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
          <slot name="submenu">
            <div class="submenu-container">
              <div class="submenu-header">
                <go-nav-link block item={item} showDescription showArrow></go-nav-link>
              </div>
              <div class="submenu-list">{item.children.map((child) => this.renderSubMenu(child))}</div>
            </div>
          </slot>
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
        <div class="container">
          <ul class="nav-menu-root">{items.map((item) => this.renderRootNavItem(item))}</ul>
        </div>
      </div>
    );
  }

  render() {
    let { label, navItems, inheritedAttrs } = this;

    return (
      <Host {...inheritedAttrs}>
        <nav aria-label={label}>{navItems ? this.renderRootNav(navItems) : <slot></slot>}</nav>
      </Host>
    );
  }
}
