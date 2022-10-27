import { Component, h, Element, Prop, State, Method, Event, EventEmitter, Watch } from '@stencil/core';

import { inheritAttributes } from '../../../utils/helper';
import { INavItem } from '../../../interfaces';
import { trapFocus } from '../../../utils/trap-focus';
import { parseItems } from '../../../utils/nav';
import { renderIcon } from '../nav-helpers';

@Component({
  tag: 'go-nav-drawer',
  styleUrl: 'go-nav-drawer.scss',
  shadow: false,
})
export class GoNavDrawer {
  @Element() el: HTMLElement;

  /**
   * Position where the navigation should appear from
   */
  @Prop({ reflect: true }) position?: 'left' | 'right' = 'left';

  /**
   * Navigation items to be rendered
   */
  @Prop() items?: INavItem[] | string;

  @State() navItems: INavItem[] = null;

  // keep track of open state of drawer
  @Prop({ mutable: true, reflect: true }) active = false;

  @Prop() label = 'Menu';

  /**
   * if true, clicking on nav item will close the drawer automatically
   */
  @Prop() autoClose = false;

  // keep track of open submenus
  @State() currentSubMenus: HTMLElement[] = [];

  /**
   * Initialise the menu
   * @param items {INavItem[]} menu items to be rendered
   */
  @Method()
  @Watch('items')
  async init(newItems: INavItem[] | string) {
    this.navItems = parseItems(newItems);
  }

  /**
   * Emitted when the nav drawer is opened
   */
  @Event({
    eventName: 'open',
    cancelable: true,
    bubbles: true,
  })
  openEvent: EventEmitter<void>;

  @Method()
  async open() {
    this.active = true;
    this.openEvent.emit();
  }

  /**
   * Emitted when the nav drawer is closed
   */
  @Event({
    eventName: 'close',
    cancelable: true,
    bubbles: true,
  })
  closeEvent: EventEmitter<void>;

  /**
   * Emitted when the nav item is clicked
   */
  @Event({
    eventName: 'navItemClick',
    cancelable: true,
    bubbles: true,
  })
  navItemClickEvent: EventEmitter<INavItem>;

  @Method()
  async close() {
    while (this.currentSubMenus.length > 0) {
      await this.closeCurrentSubMenu();
    }
    this.active = false;
    this.closeEvent.emit();
  }

  @Method()
  async toggle() {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  }

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style', 'items', 'active', 'position'], false);
    try {
      this.navItems = parseItems(this.items);
    } catch (e) {
      console.warn('Could not parse nav items.', e);
    }
  }

  async closeCurrentSubMenu() {
    if (this.currentSubMenus.length === 0) {
      return;
    }
    const lastSubMenu = this.currentSubMenus.slice(-1)[0];
    lastSubMenu.classList.remove('active');
    lastSubMenu.querySelector('.nav-item-inner').setAttribute('aria-expanded', 'false');
    this.currentSubMenus = this.currentSubMenus.slice(0, -1);
  }

  private openSubMenu(e: MouseEvent) {
    const triggerBtn = e.target as HTMLElement;
    const menuItem = triggerBtn.closest('li');
    menuItem.classList.add('active');
    triggerBtn.setAttribute('aria-expanded', 'true');
    trapFocus(menuItem.querySelector('.nav-menu') as HTMLElement);
    this.currentSubMenus = [...this.currentSubMenus, menuItem];
  }

  subMenus: { string: INavItem[] } = null;

  handleNavItemClick(e, item: INavItem) {
    if (item.linkAttrs?.onClick) {
      item.linkAttrs.onClick(e);
    }
    if (this.autoClose) {
      this.close();
    }
    this.navItemClickEvent.emit(item);
  }

  renderNavItems(items: INavItem[], parentItem?: INavItem) {
    const isSubNav = !!parentItem;

    return (
      <div class={{ 'nav-menu': true, 'is-sub-nav': isSubNav }}>
        <div class="nav-drawer-header">
          <div class="header-row">
            {parentItem ? (
              <go-button class="back-btn" flat stack variant="text" compact onClick={() => this.closeCurrentSubMenu()}>
                <svg
                  slot="prefix"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </go-button>
            ) : (
              <span></span>
            )}

            {/* <div class="title">{isSubNav ? parentItem.label : this.label}</div> */}
            {!isSubNav && <div class="title">{this.label}</div>}
            <go-button class="close-btn" flat stack variant="text" compact onClick={() => this.close()}>
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
              <span>Close</span>
            </go-button>
          </div>
        </div>
        {items?.length > 0 ? (
          <nav aria-label={isSubNav ? parentItem.label : this.label}>
            {isSubNav && parentItem.url ? (
              <div class="parent-link">
                <go-link href={parentItem.url} {...parentItem.linkAttrs} onClick={(e) => this.handleNavItemClick(e, parentItem)}>
                  <span class="nav-item-label">
                    {renderIcon(parentItem.icon)}
                    <span>{parentItem.label}</span>
                  </span>
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
                </go-link>
              </div>
            ) : null}
            <ul>{items.map((item) => this.renderNavItem(item))}</ul>
          </nav>
        ) : null}
      </div>
    );
  }

  renderNavItem(item: INavItem) {
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
        ...item.linkAttrs,
        onClick: (e) => this.handleNavItemClick(e, item),
      };
    }
    if (Tag === 'button') {
      attrs = {
        'type': 'button',
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
        'onClick': (e) => this.openSubMenu(e),
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
              class="children-indicator"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : null}
        </Tag>
        {item.children ? this.renderNavItems(item.children, item) : null}
      </li>
    );
  }

  render() {
    let { navItems, active, position, inheritedAttrs } = this;
    return (
      <go-overlay active={active} {...inheritedAttrs} onOverlayClose={() => this.close()}>
        <div class={{ 'nav-drawer': true, 'open': active, [position]: !!position }}>
          {navItems ? <div class="nav-container">{this.renderNavItems(navItems)}</div> : <slot></slot>}
        </div>
      </go-overlay>
    );
  }
}
