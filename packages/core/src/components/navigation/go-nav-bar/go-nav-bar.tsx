import { Component, Element, h, Method, Prop, State, Host, Watch } from '@stencil/core';
import { INavItem } from '../../../interfaces';
import { inheritAttributes } from '../../../utils/helper';
import { parseJsonProp } from '../../../utils';

@Component({
  tag: 'go-nav-bar',
  styleUrl: 'go-nav-bar.scss',
  shadow: false,
})
export class GoNavBar {
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

    await this.loadNavItems(this.items);
  }

  /**
   * Load nav items
   * @param items {INavItem[]} menu items to be rendered
   */
  @Method()
  async loadNavItems(newItems: INavItem[] | string) {
    this.navItems = parseJsonProp(newItems);
  }

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseJsonProp(newItems);
  }

  private closeAllSubMenus(sourceNavItem: HTMLGoNavItemElement) {
    this.el.querySelectorAll('go-nav-item.open').forEach((item: HTMLGoNavItemElement) => {
      if (item !== sourceNavItem) {
        item.closeSubmenu();
      }
    });
  }

  handleItemNav(e) {
    this.closeAllSubMenus(e.srcElement);
  }

  render() {
    let { label, navItems, inheritedAttrs } = this;

    return (
      <Host {...inheritedAttrs}>
        <nav aria-label={label}>
          <div class="container">
            <div role="list" class="nav-menu-root">
              <slot>
                {navItems
                  ? navItems.map((item) => (
                      <go-nav-item onSubmenutoggle={(e) => this.handleItemNav(e)} item={item}></go-nav-item>
                    ))
                  : null}
              </slot>
            </div>
          </div>
        </nav>
      </Host>
    );
  }
}
