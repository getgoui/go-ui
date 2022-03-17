import { Component, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../../types';
import { parseItems } from '../../../utils/nav';
@Component({
  tag: 'go-nav-list',
  styleUrl: 'go-nav-list.scss',
  shadow: false,
})
export class GoNavList {
  @Element() el: HTMLElement;

  /**
   * list of navigation items to be displayed
   */
  @Prop() items: INavItem[] | string;

  @State() navItems: INavItem[];

  /**
   * Heading navigation item
   */
  @Prop() headingItem: INavItem | string;

  @State() navHeading: INavItem;

  /**
   * Heading text
   */
  @Prop() heading: string;

  /**
   * Make the list full width
   */
  @Prop({ reflect: true }) block: boolean = false;

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseItems(newItems);
  }

  @Watch('headingItem')
  async watchHeadingItem(newItem: INavItem | string) {
    this.navHeading = parseItems(newItem);
  }

  componentWillLoad() {
    this.navItems = parseItems(this.items);
    this.navHeading = parseItems(this.headingItem);
  }

  render() {
    const { navItems, navHeading, heading, block } = this;
    return (
      <div>
        {navHeading ? (
          <div class="nav-list-header">
            <go-nav-link showArrow block={block} class="nav-list-header-text" item={navHeading}></go-nav-link>
          </div>
        ) : null}

        {heading ? (
          <div class="nav-list-header">
            <span class="nav-list-header-text">{heading}</span>
          </div>
        ) : null}

        <slot name="heading"></slot>

        {navItems?.length > 0 ? (
          <ul class="nav-list">
            {navItems.map((item) => (
              <li>
                <go-nav-link block={block} item={item}></go-nav-link>
              </li>
            ))}
          </ul>
        ) : (
          <slot></slot>
        )}
      </div>
    );
  }
}
