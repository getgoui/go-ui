import { Component, Host, h, Element, Prop, Method, State, Watch } from '@stencil/core';
import { TocProps } from '../../components/go-toc/go-toc';
import { INavItem } from '../../interfaces';
import { watchDevice } from '../../utils/match-media';
import { hasSlot } from '../../utils/helper';

export type SidebarPosition = 'start' | 'end';

export interface ContentLayoutProps {
  pageHeading: string;
  preHeading?: string;
  intro?: string;
  breadcrumbs?: INavItem[] | string;
  heroImgSrc?: string;
  heroImgAlt?: string;
  toc?: boolean;
  tocProps?: TocProps;
  sidebarMobilePosition?: SidebarPosition;
  sidebarDesktopPosition?: SidebarPosition;
}

/**
 * @slot intro - Hero section intro text
 * @slot main - Main section
 */
@Component({
  tag: 'go-content-layout',
  styleUrl: 'go-content-layout.scss',
  shadow: false,
})
export class GoContentLayout implements ContentLayoutProps {
  @Element() el: HTMLElement;

  @Prop() pageHeading: string;

  @Prop() preHeading?: string;

  @Prop() intro?: string;

  @Prop() breadcrumbs?: INavItem[] | string;

  @Prop() heroImgSrc?: string;

  @Prop() heroImgAlt?: string;

  /**
   * no hero banner
   */
  @Prop() noHero?: boolean = false;

  /**
   * If the "On this page" table of content section should be displayed
   */
  @Prop() toc?: boolean;
  /**
   * Props to pass into the table of content ([see `go-toc` props](/docs/components/go-toc#go-toc-props))
   */
  @Prop() tocProps?: TocProps;
  /**
   * sidebar position on mobile screens
   * possible values are `start` and `end`
   */
  @Prop() sidebarMobilePosition?: SidebarPosition = 'start';

  /**
   * sidebar position on desktop screens
   * possible values are `start` and `end`
   */
  @Prop() sidebarDesktopPosition?: SidebarPosition = 'start';

  /**
   * If sidebar should be sticky
   */
  @Prop() sidebarSticky? = false;
  tocEl: HTMLGoTocElement;

  sidebarTemplate: HTMLElement;

  sidebarContainerStart: HTMLElement;
  sidebarContainerEnd: HTMLElement;

  @Method()
  async initToc() {
    if (this.tocEl) {
      await this.tocEl.init();
    }
  }

  @State() computedSidebarPosition: SidebarPosition | null = null;
  hasSidebar = false;
  async componentWillLoad() {
    this.hasSidebar = hasSlot(this.el, 'sidebar');
    // add resize observer to toggle between mobile and desktop
    watchDevice((device) => {
      const { sidebarMobilePosition, sidebarDesktopPosition } = this;
      const deviceSidebarPosition = {
        mobile: sidebarMobilePosition,
        tablet: sidebarMobilePosition,
        desktop: sidebarDesktopPosition,
        large: sidebarDesktopPosition,
      };

      this.computedSidebarPosition = deviceSidebarPosition[device];
    });
  }

  rowEl: HTMLElement;

  @Watch('computedSidebarPosition')
  adjustSidebarPosition(pos: SidebarPosition | null) {
    if (!this.hasSidebar || !this.sidebarTemplate) {
      return;
    }
    const tempSidebar = this.sidebarTemplate;
    tempSidebar.style.display = 'block';
    tempSidebar.setAttribute('aria-hidden', 'false');
    if (pos === 'start') {
      this.sidebarContainerStart.appendChild(tempSidebar);
    } else {
      this.sidebarContainerEnd?.appendChild(tempSidebar);
    }
  }

  componentDidLoad() {
    this.initToc();
  }

  render() {
    const { pageHeading, intro, preHeading, breadcrumbs, toc, tocProps, hasSidebar, computedSidebarPosition, sidebarSticky: sticky, noHero } = this;

    const classes = {
      start:
        computedSidebarPosition === 'start'
          ? {
              'content-sidebar col-12 col-desktop-3': true,
              sticky,
            }
          : null,
      end:
        computedSidebarPosition === 'end'
          ? {
              'content-sidebar col-12 col-desktop-3 offset-desktop-1': true,
              sticky,
            }
          : null,
    };

    return (
      <Host>
        <div ref={(el) => (this.sidebarTemplate = el)} id="sidebar-template" aria-hidden={true} style={{ display: 'none' }}>
          <div class={{ 'content-sidebar': true, sticky }}>
            {toc && <go-toc {...tocProps} ref={(el) => (this.tocEl = el)}></go-toc>}
            <slot name="sidebar"></slot>
          </div>
        </div>
        {!noHero && (
          <go-hero breadcrumbs={breadcrumbs} preHeading={preHeading} heading={pageHeading}>
            <slot name="full-width-bg"></slot>
            <slot name="intro">
              <p>{intro}</p>
            </slot>
          </go-hero>
        )}
        <div class="container content-container">
          <div class="row">
            {hasSidebar && <aside ref={(el) => (this.sidebarContainerStart = el)} class={classes.start}></aside>}
            <main
              class={{
                'col-12 col-desktop-8 content-main': true,
                'offset-desktop-1': hasSidebar && computedSidebarPosition === 'start',
              }}>
              {!hasSidebar && toc && <go-toc {...tocProps} ref={(el) => (this.tocEl = el)}></go-toc>}
              <slot></slot>
            </main>
            {hasSidebar && <aside ref={(el) => (this.sidebarContainerEnd = el)} class={classes.end}></aside>}
          </div>
        </div>
      </Host>
    );
  }
}
