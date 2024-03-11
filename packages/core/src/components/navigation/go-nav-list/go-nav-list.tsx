import { Component, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../../interfaces';
import { parseJsonProp } from '../../../utils';
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

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseJsonProp(newItems);
  }

  componentWillLoad() {
    this.navItems = parseJsonProp(this.items);
  }

  render() {
    const { navItems, block } = this;
    return (
      <div>
        <slot name="header">
          <div class="nav-list-header"></div>
        </slot>
        <slot name="list">
          {navItems?.length > 0 ? (
            <ul class="nav-list">
              {navItems.map((item) => {
                const isCurrent = item.isCurrent || item?.children?.some((item) => item.isCurrent);
                return (
                  <li class={{ 'mb-1': true, 'is-current': isCurrent }}>
                    {item.children?.length ? (
                      <go-nav-list block={block} items={item.children}>
                        <go-nav-link block={block} item={item} slot="header"></go-nav-link>
                      </go-nav-list>
                    ) : (
                      <go-nav-link block={block} item={item}></go-nav-link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </slot>
      </div>
    );
  }
}
