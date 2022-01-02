import { Component, Host, h, Element, Prop } from '@stencil/core';
import { inheritAttributes } from '../../utils/helper';

export interface INavItem {
  name: string;
  url?: string;
  icon?: string;
  children?: INavItem[];
  isCurrent?: boolean;
}
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
  @Prop() items: INavItem[];

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
  }

  renderNavItem(item: INavItem) {
    const Tag = item.isCurrent ? 'span': 'a';
    return (
      <li>
        <Tag href={item.url}>
          {item.icon && <i class={item.icon}></i>}
          {item.name}
        </Tag>
        {item.children && this.renderNavItems(item.children)}
      </li>
    )}

  renderNavItems(items: INavItem[]) {
    return (
      <ul>
        {items.map((item) => this.renderNavItem(item))}
      </ul>
    );
  }

  render() {
    const { items } = this;
    return (
      <Host>
        <nav aria-label="Main navigation" {...this.inheritedAttrs}>
          {/* render navigation items from prop */}
          {items && this.renderNavItems(items)}
        </nav>
      </Host>
    );
  }
}
