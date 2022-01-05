import { Component, Host, h, Element, Prop, Method, State } from '@stencil/core';
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
  @Prop({
    mutable: true,
  })
  items: INavItem[];

  @State() isOpen = false;

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
  }

  renderNavItems(items: INavItem[], isSubNav = false) {
    return <ul class={{ 'is-sub-nav': isSubNav }}>{items.map((item) => this.renderNavItem(item))}</ul>;
  }

  renderNavItem(item: INavItem) {
    const Tag = item.isCurrent ? 'span' : 'a';
    return (
      <li>
        <Tag href={item.url}>
          {item.icon && <i class={item.icon}></i>}
          {item.name}
        </Tag>
        {item.children && this.renderNavItems(item.children, true)}
      </li>
    );
  }

  @Method()
  async init(items: INavItem[]) {
    this.items = items;
  }

  @Method()
  async open() {}

  @Method()
  async close() {}

  render() {
    const { items } = this;
    return (
      <Host>
        <go-button compact flat stack color="tertiary" class="hidden-tablet-up">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
          <span>Menu</span>
        </go-button>
        <nav aria-label="Main navigation" {...this.inheritedAttrs}>
          {/* render navigation items from prop */}
          {items && this.renderNavItems(items)}
        </nav>
      </Host>
    );
  }
}
