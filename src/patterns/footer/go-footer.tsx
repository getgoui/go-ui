import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../types';
import { warnA11y } from '../../utils/helper';
import { parseItems } from '../../utils/nav';

@Component({
  tag: 'go-footer',
  styleUrl: 'go-footer.scss',
  shadow: false,
})
export class GoFooter {
  @Element() el: HTMLElement;

  /**
   * Navigation links to be displayed.
   */
  @Prop() items: INavItem[] | string;

  @State() navItems: INavItem[];

  @Watch('items')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseItems(newItems);
  }

  /**
   * Label for navigation
   */
  @Prop() navLabel?: string = 'Footer navigation';

  private hasCopyRightSlot = false;

  componentWillLoad() {
    console.log(this.items);
    this.navItems = parseItems(this.items);
    if (this.navItems?.length > 0 && !this.navLabel) {
      warnA11y('Please add a unique "nav-label" in order to put navigation items into the nav landmark for better accessibility.');
    }

    // check if copyright slot is empty
    this.hasCopyRightSlot = !!this.el.querySelector('slot[name="copyright"]');
  }

  render() {
    const { navItems, navLabel, hasCopyRightSlot } = this;

    const NavWrapperTag = navLabel ? 'nav' : 'div';
    return (
      <Host>
        <footer>
          <div class="container nav-container">
            {navItems ? (
              <NavWrapperTag aria-label={navLabel}>
                <div class="row">
                  {navItems?.map((item) => (
                    <go-nav-list class="col-12 col-tablet-4 col-desktop-3" block headingItem={item} items={item?.children}></go-nav-list>
                  ))}
                </div>
              </NavWrapperTag>
            ) : (
              <slot name="nav"></slot>
            )}
          </div>

          <div class="container">
            <div class="extra-links">
              <slot name="extra-links"></slot>
            </div>
          </div>

          {hasCopyRightSlot ? (
            <div class="container">
              <div class="copyright">
                <slot name="copyright"></slot>
              </div>
            </div>
          ) : null}
        </footer>
      </Host>
    );
  }
}
