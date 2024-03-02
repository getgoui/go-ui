import { Component, Host, h, Element, Prop, State, Watch } from '@stencil/core';
import { INavItem } from '../../interfaces';
import { warning, hasSlot } from '../../utils/helper';
import { parseJsonProp } from '../../utils';
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
  @Prop() navLabel?: string = 'Footer';

  /**
   * Dark theme footer
   */
  @Prop() dark?: boolean = false;

  /**
   * Number of navigation columns
   */
  @Prop() navCols?: number = 1;

  /**
   * Number of navigation columns for tablet and up
   */
  @Prop() navColsTablet?: number = 3;

  /**
   * Number of navigation columns for desktop and up
   */
  @Prop() navColsDesktop?: number = 4;

  @State() navItems: INavItem[];

  @Watch('links')
  async watchItems(newItems: INavItem[] | string) {
    this.navItems = parseJsonProp(newItems);
  }

  private hasCopyRightSlot = false;
  private hasFooterBottomSlot = false;

  componentWillLoad() {
    this.navItems = parseJsonProp(this.links);
    if (this.navItems?.length > 0 && !this.navLabel) {
      warning(
        'Please add a unique "nav-label" in order to put navigation items into the nav landmark for better accessibility.',
      );
    }

    // check if copyright slot is empty
    this.hasCopyRightSlot = hasSlot(this.el, 'copyright');
    this.hasFooterBottomSlot = hasSlot(this.el, 'footer-bottom');
  }

  render() {
    const { navItems, navLabel, dark, hasCopyRightSlot, hasFooterBottomSlot } = this;
    const { navCols, navColsTablet, navColsDesktop } = this;
    return (
      <Host class={{ dark }}>
        <footer>
          {navItems ? (
            <div class="container nav-container">
              <nav aria-label={navLabel}>
                <div class="row">
                  {navItems?.map((item) => (
                    <go-nav-list
                      class={`col-${12 / navCols} col-tablet-${12 / navColsTablet} col-desktop-${12 / navColsDesktop}`}
                      block
                      headingItem={item}
                      items={item?.children}></go-nav-list>
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
