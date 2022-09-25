import { Component, Element, h, Method, Prop, State, Host, EventEmitter, Event, Watch } from '@stencil/core';
import { INavItem } from '../../../interfaces';
import { parseItems } from '../../../utils/nav';
import uniqueId from 'lodash.uniqueid';
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

  @State() activeSubMenuId: string = '';

  private mainNavId = '';

  // Store attributes inherited from the host element
  async componentWillLoad() {
    this.mainNavId = uniqueId('main-nav-');
    this.navItems = parseItems(this.items);
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
        {item.icon && <go-icon decorative={true} name={item.icon}></go-icon>}
        <span>{item.label}</span>
        {isSubmenuParentLink ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true">
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
          <div class="submenu-header">
            <go-nav-link block item={parent}></go-nav-link>
          </div>
          <ul>
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

  renderRootNavItem(item: INavItem) {
    let Tag = 'a';
    const slug = item.label.toLowerCase().trim().replace(/\s/g, '-');
    let submenuId = `submenu-${slug}`;
    let submenuTriggerId = `submenu-${slug}-trigger`;
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
          this.navEvent.emit({ event, item });
        },
        ...item.linkAttrs,
      };
    }
    let isActive = false;
    if (Tag === 'button') {
      attrs = {
        'type': 'button',
        'aria-expanded': 'false',
        'aria-haspopup': 'true',
        'aria-controls': submenuId,
        'id': submenuTriggerId,
        'onClick': () => {
          if (this.activeSubMenuId === submenuId) {
            this.activeSubMenuId = '';
            return;
          }
          this.activeSubMenuId = submenuId;
        },
      };
      isActive = this.activeSubMenuId === submenuId;
    }
    return (
      <li class={{ 'nav-item': true, 'has-children': hasChildren, 'current': item.isCurrent, 'is-active': isActive }}>
        <Tag class="nav-item-inner" {...attrs}>
          <span class="nav-item-label">
            {item.icon && <go-icon decorative={true} name={item.icon}></go-icon>}
            <span>{item.label}</span>
          </span>
          {hasChildren ? (
            <svg
              aria-hidden="true"
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
          <go-dropdown
            placement="bottom"
            class="submenu-container"
            id={submenuId}
            isActive={isActive}
            triggerId={attrs.id}
            referenceId={this.mainNavId}
            offset={1}
            onClosed={() => (this.activeSubMenuId = '')}
            role="menu">
            <div class="submenu-header">
              <go-nav-link role="menuitem" block item={item} showArrow></go-nav-link>
              {item?.description ? <p class="description">{item.description}</p> : null}
            </div>
            <div class="submenu-list">{item.children.map((child) => this.renderSubMenu(child))}</div>
          </go-dropdown>
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
    let { navItems, mainNavId } = this;
    return (
      <Host>
        <nav id={mainNavId} aria-label="Main navigation">
          {navItems ? this.renderRootNav(navItems) : <slot></slot>}
        </nav>
      </Host>
    );
  }
}
