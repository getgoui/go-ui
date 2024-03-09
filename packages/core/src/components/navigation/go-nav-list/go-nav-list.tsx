import { Component, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../../interfaces';
import { hasSlot, parseJsonProp } from '../../../utils';
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
   * Make all sub lists (if any) expanded by default
   */
  @Prop() expandSubLists = false;

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseJsonProp(newItems);
  }

  hasHeaderSlot = false;
  componentWillLoad() {
    this.navItems = parseJsonProp(this.items);
    this.hasHeaderSlot = hasSlot(this.el, 'header');
  }

  render() {
    const { navItems, block, expandSubLists, hasHeaderSlot } = this;
    return (
      <div>
        {hasHeaderSlot ? (
          <div class="nav-list-header">
            <slot name="header"></slot>
          </div>
        ) : null}
        {navItems?.length > 0 ? (
          <ul class="nav-list">
            {navItems.map((item) => {
              const isCurrent = item.isCurrent || item?.children?.some((item) => item.isCurrent);
              return (
                <li class={{ 'mb-1': true, 'is-current': isCurrent }}>
                  {item.children?.length ? (
                    <go-accordion>
                      <go-accordion-item heading={item.label} active={expandSubLists || isCurrent}>
                        <go-nav-list block={block} items={item.children}></go-nav-list>
                      </go-accordion-item>
                    </go-accordion>
                  ) : (
                    <go-nav-link block={block} item={item}></go-nav-link>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <slot></slot>
        )}
      </div>
    );
  }
}
