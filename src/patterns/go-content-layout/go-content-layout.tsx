import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import { INavItem } from '../../types';

/**
 * @slot header - use go-header-bar to create an accessible header with logo and navigation items
 * @slot intro - Hero section intro text
 *
 */
@Component({
  tag: 'go-content-layout',
  styleUrl: 'go-content-layout.scss',
  shadow: false,
})
export class GoContentLayout {
  @Element() el: HTMLElement;

  /**
   * href on logo link
   */
  @Prop() logoHref: string;

  @Prop() pageHeading: string;

  @Prop() preHeading?: string;

  @Prop() intro?: string;

  @Prop() breadcrumbs?: INavItem[] | string;

  @Prop() heroImgSrc?: string;

  @Prop() heroImgAlt?: string;

  @Prop() mainNav: INavItem[] | string;

  mobileMenu: HTMLGoNavDrawerElement;

  handleMainNavigation(e) {
    console.log(e);
  }

  /**
   * control mobile menu open state
   */
  @State() isMobileMenuOpen = false;
  openMobileMenu() {
    this.isMobileMenuOpen = true;
  }
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  render() {
    const { pageHeading, intro, preHeading, breadcrumbs, mainNav, isMobileMenuOpen, logoHref } = this;
    return (
      <Host>
        <slot name="header">
          <header>
            <go-nav-drawer active={isMobileMenuOpen} label="Menu" items={mainNav} onClose={() => this.closeMobileMenu()}></go-nav-drawer>
            <go-header-bar>
              <go-button slot="mobile-menu-trigger" aria-labelledby="menu-label" compact flat stack variant="text" onClick={() => this.openMobileMenu()}>
                <svg
                  slot="prefix"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  aria-hidden="true"
                  viewBox="0 0 24 24">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
                <span id="menu-label">Menu</span>
              </go-button>

              <go-gov-au-logo href={logoHref} slot="logo">
                <img
                  slot="main-brand"
                  src="https://www.dfat.gov.au/sites/default/files/australian-government-stacked-black_168791ec-96ad-3bcc-817b-27e71beb4522.png"
                  alt="Main brand"
                />
                <img
                  slot="main-brand-on-dark"
                  src="https://www.dfat.gov.au/sites/default/files/australian-government-stacked-white_a422272d-3c74-31dc-8361-65d308194362.png"
                  alt="Main brand on dark background"
                />
                <div slot="co-brand">
                  <div class="text-size-2">
                    <b>Go UI</b>
                  </div>
                  <div class="text-size--1">A design system for everyone</div>
                </div>
              </go-gov-au-logo>

              <go-main-nav slot="main-nav" items={mainNav}></go-main-nav>
            </go-header-bar>
          </header>
        </slot>
        <go-hero breadcrumb={breadcrumbs} preHeading={preHeading} heading={pageHeading}>
          <slot name="intro">
            <p>{intro}</p>
          </slot>
        </go-hero>

        <slot></slot>
      </Host>
    );
  }
}
