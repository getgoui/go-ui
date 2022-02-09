import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../types';
import { warnA11y, hasSlot } from '../../utils/helper';
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
  @Prop() links: INavItem[] | string;

  /**
   * Label for navigation
   */
  @Prop() navLabel?: string = 'Footer navigation';

  /**
   * Dark theme footer
   */
  @Prop() dark?: boolean = false;

  @State() navItems: INavItem[];

  @Watch('links')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseItems(newItems);
  }

  private hasCopyRightSlot = false;
  private hasFooterBottomSlot = false;

  componentWillLoad() {
    this.navItems = parseItems(this.links);
    if (this.navItems?.length > 0 && !this.navLabel) {
      warnA11y('Please add a unique "nav-label" in order to put navigation items into the nav landmark for better accessibility.');
    }

    // check if copyright slot is empty
    this.hasCopyRightSlot = hasSlot(this.el, 'copyright');
    this.hasFooterBottomSlot = hasSlot(this.el, 'footer-bottom');
  }

  render() {
    const { navItems, navLabel, dark, hasCopyRightSlot, hasFooterBottomSlot } = this;

    return (
      <Host class={{ dark }}>
        <footer>
          {navItems ? (
            <div class="container nav-container">
              <nav aria-label={navLabel}>
                <div class="row">
                  {navItems?.map((item) => (
                    <go-nav-list class="col-12 col-tablet-4 col-desktop-3" block headingItem={item} items={item?.children}></go-nav-list>
                  ))}
                </div>
              </nav>
            </div>
          ) : (
            <slot></slot>
          )}

          {hasFooterBottomSlot ? (
            <div class="container">
              <div class="footer-bottom">
                <slot name="footer-bottom"></slot>
              </div>
            </div>
          ) : null}
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
