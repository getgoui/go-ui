import { Component, h, Element, Prop, State, Method } from '@stencil/core';
import JSON5 from 'json5';

import { inheritAttributes } from '../../utils/helper';
import { INavItem, INavMenu } from '../../types/';

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
  @Prop() position?: 'left' | 'right' = 'left';

  /**
   * Navigation items to be rendered
   */
  @Prop({
    mutable: true,
  })
  items: INavMenu | string;

  // keep track of open state of drawer
  @State() isOpen = false;

  // keep track of open submenus
  @State() currentSubMenus: HTMLElement[] = [];

  /**
   * Initialise the menu
   * @param items {INavMenu} menu items to be rendered
   */
  @Method()
  async init(items: INavMenu) {
    this.items = items;
  }

  @Method()
  async open() {
    this.isOpen = true;
    console.log('open');
  }

  @Method()
  async close() {
    this.isOpen = false;
  }

  @Method()
  async toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style', 'items'], false);
  }

  closeCurrentSubMenu() {
    if (this.currentSubMenus.length === 0) {
      return;
    }
    const lastSubMenu = this.currentSubMenus.slice(-1)[0];
    lastSubMenu.classList.remove('active');

    this.currentSubMenus = this.currentSubMenus.slice(0, -1);
  }

  private openSubMenu(e: MouseEvent) {
    const menuItem = (e.target as HTMLElement).closest('li');
    menuItem.classList.add('active');

    this.currentSubMenus = [...this.currentSubMenus, menuItem];
  }

  subMenus: { string: INavMenu } = null;

  renderNavItems(items: INavItem[] | string, isSubNav = false) {
    let renderItems: INavItem[] = [];
    if (typeof items === 'string') {
      try {
        renderItems = JSON5.parse(items) as INavItem[];
      } catch (e) {
        console.warn('Invalid JSON string for main navigation items.');
        console.warn(e);
        return;
      }
    } else {
      renderItems = items;
    }
    return <ul class={{ 'is-sub-nav': isSubNav }}>{renderItems.map((item) => this.renderNavItem(item))}</ul>;
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
      attrs = { href: item.url, ...item.linkAttrs };
    }
    if (Tag === 'button') {
      attrs = {
        onClick: (e) => this.openSubMenu(e),
      };
    }
    return (
      <li class={{ 'nav-item': true, 'has-children': hasChildren }}>
        <Tag class="nav-item-inner" {...attrs}>
          <span>
            {item.icon && <i class={item.icon}></i>}
            {item.label}
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
        {item.children ? this.renderNavItems(item.children, true) : null}
      </li>
    );
  }

  render() {
    let { items, isOpen, position, currentSubMenus, inheritedAttrs } = this;

    return (
      <go-overlay active={isOpen} {...inheritedAttrs} onOverlayClose={() => this.close()}>
        <div class={{ 'nav-drawer': true, 'open': isOpen, [position]: !!position }} role="navigation" aria-label="Menu">
          <div class="nav-drawer-header">
            <div class="header-row">
              {currentSubMenus.length > 0 ? (
                <go-button class="back-btn" flat stack color="tertiary" compact onClick={() => this.closeCurrentSubMenu()}>
                  <svg
                    slot="start"
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

              <div class="title">{currentSubMenus.length > 0 ? currentSubMenus[currentSubMenus.length - 1].innerText : 'Menu'}</div>

              <go-button class="close-btn" flat stack color="tertiary" compact onClick={() => this.close()}>
                <svg
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

            {/* if sub levels, show title */}

            <slot name="pre-nav"></slot>
          </div>

          <nav aria-label="Main navigation" {...inheritedAttrs}>
            {/* render navigation items from prop */}
            {items && this.renderNavItems(items)}
          </nav>
        </div>
      </go-overlay>
    );
  }
}
