import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../interfaces';
import { parseItems } from '../../utils/nav';

@Component({
  tag: 'go-breadcrumb',
  styleUrl: 'go-breadcrumb.scss',
  shadow: false,
})
export class GoBreadcrumb {
  @Element() el: HTMLElement;

  /**
   * The label for the navigation landmark. This is used by assistive technologies to identify the landmark.
   */
  @Prop() label = 'Breadcrumb';

  /**
   * list of navigation items to be displayed
   */
  @Prop() items: INavItem[] | string;

  /**
   * Hide current page (last item without url) from the breadcrumb
   */
  @Prop() hideCurrent: boolean = false;

  @State()
  navItems: INavItem[] = [];

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = this.getItems(newItems);
  }

  componentWillLoad() {
    this.navItems = this.getItems(this.items);
  }

  getItems(items: INavItem[] | string) {
    const navItems = parseItems(items);
    if (!this.hideCurrent) {
      return navItems;
    }

    return navItems.filter((item, i) => item.url || i !== navItems.length - 1);
  }

  render() {
    const { label, navItems, hideCurrent } = this;
    if (!navItems?.length) {
      return null;
    }
    return (
      <Host>
        <nav aria-label={label}>
          <ol>
            {navItems.map((item, i) => {
              const isLast = i === navItems.length - 1;
              const isCurrentPageALink = isLast && item.url && !hideCurrent;
              return (
                <li>
                  <go-nav-link item={item} aria-current={isCurrentPageALink ? 'page' : null}></go-nav-link>
                  {i < navItems.length - 1 ? (
                    <svg
                      class="breadcrumb-separator"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      viewBox="0 0 24 24">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>
      </Host>
    );
  }
}
