import { Component, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../../interfaces';
import { parseJsonProp } from '../../../utils';
import { hasActiveChild } from './utils';
import { uniqueId } from 'lodash';
@Component({
  tag: 'go-nav-list',
  styleUrl: 'go-nav-list.scss',
  shadow: false,
})
export class GoNavList {
  @Element() el: HTMLElement;

  /**
   * list of navigation items to be displayed uuuuuu
   */
  @Prop() items: INavItem[] | string;

  @State() navItems: INavItem[];

  /**
   * Make the list full width
   */
  @Prop({ reflect: true }) block: boolean = false;

  /**
   * The label for this navigation list.
   * When multiple nav lists are in the page,
   * make sure to give distinct labels for each one
   */
  @Prop() label: string;

  /**
   * Indicate if this is a submenu
   */
  @Prop() isSubmenu: boolean = false;

  /**
   * The id attribute to be applied to the <ul> element
   * This is useful when you have a button that toggles the visibility of this list
   * and you want to reference the list from the button
   * e.g.
   * ```
   * <button aria-controls="nav-list-1">Toggle</button>
   * <go-nav-list list-id="nav-list-1">
   * ...
   * </go-nav-list>
   * ```
   */
  @Prop() listId: string = uniqueId('nav-list-');

  /**
   * Stores the list of expanded urls
   */
  @State() expandedItems: string[] = [];

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseJsonProp(newItems);
  }

  componentWillLoad() {
    this.navItems = parseJsonProp(this.items);
  }

  renderSubMenu(parent: INavItem) {
    if (!parent.children?.length) {
      return;
    }
    const submenuId = `${this.listId}-submenu`;
    const { url, children, ...parentItem } = parent;

    const submenuItems = url
      ? [
          {
            ...parentItem,
            label: 'Overview',
            url,
          },
          ...children,
        ]
      : parent.children;

    const isExpanded = this.isExpanded(parent.url);

    return [
      <button
        type="button"
        class={{ 'nav-item-toggle': true, 'is-expanded': isExpanded }}
        onClick={() => this.toggleSubMenu(parent, isExpanded)}
        aria-controls={submenuId}
        aria-expanded={isExpanded}>
        {parent.label}
        <span class="nav-toggle-icon">
          {isExpanded ? (
            <svg class="chevron-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          ) : (
            <svg class="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
            </svg>
          )}
        </span>
      </button>,
      <go-nav-list
        class={{ 'd-none': !isExpanded }}
        list-id={submenuId}
        block={this.block}
        items={submenuItems}
        is-submenu></go-nav-list>,
    ];
  }

  toggleSubMenu(parent: INavItem, currentExpanded: boolean): void {
    if (currentExpanded) {
      this.expandedItems = this.expandedItems.filter((item) => item !== parent.url);
    } else {
      this.expandedItems = [...this.expandedItems, parent.url];
    }
  }
  isExpanded(url: string): boolean {
    return this.expandedItems.includes(url);
  }

  render() {
    const { navItems, block, label, listId } = this;
    return (
      <nav aria-label={label || undefined}>
        <slot name="header">
          <div class="nav-list-header"></div>
        </slot>
        <slot name="list">
          {navItems?.length > 0 ? (
            <ul class="nav-list" id={listId}>
              {navItems.map((item) => {
                const isCurrent = hasActiveChild(item);
                return (
                  <li class={{ 'nav-item': true, 'is-current': isCurrent }}>
                    {item.children?.length ? (
                      this.renderSubMenu(item)
                    ) : (
                      <go-nav-link block={block} item={item}></go-nav-link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </slot>
      </nav>
    );
  }
}
