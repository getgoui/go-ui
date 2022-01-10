import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'go-main-nav',
  styleUrl: 'go-main-nav.scss',
  shadow: false,
})
export class GoMainNav {
  @Element() el: HTMLElement;

  /**
   * Specify at what breakpoint (see [scss breakpoints](/docs/patterns/global-styles/grid#breakpoints)) should desktop menu be shown
   */
  @Prop() fullMenuAt: string = 'desktop';

  // Store attributes inherited from the host element
  // private inheritedAttrs = {};
  componentWillLoad() {
    // this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style', 'items'], false);
  }

  render() {
    // let { items, isOpen, fullMenuAt, inheritedAttrs } = this;
    // if (typeof items === 'string') {
    //   try {
    //     items = JSON5.parse(items) as INavItem[];
    //   } catch (e) {
    //     console.warn('Invalid JSON string for main navigation items.');
    //     console.warn(e);
    //     return;
    //   }
    // }
    // return (
    //   <Host class={{ open: isOpen }}>
    //     <nav aria-label="Main navigation" {...inheritedAttrs}>
    //       {/* render navigation items from prop */}
    //       {items && this.renderNavItems(items)}
    //     </nav>
    //   </Host>
    // );
  }
}
