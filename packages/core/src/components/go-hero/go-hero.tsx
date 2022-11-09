import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { INavItem } from '../../interfaces';
import { hasSlot, warning } from '../../utils/helper';

export interface HeroProps {
  heading: string;
  preHeading?: string;
  breadcrumb?: INavItem[] | string;
  imgSrc?: string;
  imgAlt?: string;
}

/**
 * @slot default - content below the main heading
 */
@Component({
  tag: 'go-hero',
  styleUrl: 'go-hero.scss',
  shadow: false,
})
export class GoHero implements HeroProps {
  @Element() el: HTMLElement;

  /**
   * Hero heading (h1)
   */
  @Prop() heading: string;

  /**
   * Pre heading text - use only when required
   */
  @Prop() preHeading?: string;

  /**
   * Breadcrumb navigation items
   */
  @Prop() breadcrumbs?: INavItem[] | string;
  /**
   * hero image src url
   * (requires img-alt attribute to be present to render)
   */
  @Prop() imgSrc?: string;

  /**
   * hero image alt text
   * (requires img-src attribute to be present to render)
   */
  @Prop() imgAlt?: string;

  /**
   * if we should hide hero img on mobile(`full-width-bg` slot not affected)
   */
  @Prop() hideImgOnMobile: boolean = false;

  @Watch('imgSrc')
  watchImgSrc(value: string) {
    if (value && !this.imgAlt) {
      warning('img-alt attribute is required when img-src is present');
    }
  }

  @Watch('imgAlt')
  watchImgAlt(value: string) {
    if (value && !this.imgSrc) {
      warning('img-src attribute is not present, did you forget to add it?');
    }
  }

  hasFullWidthBg = false;

  componentWillLoad() {
    this.hasFullWidthBg = hasSlot(this.el, 'full-width-bg');
  }

  render() {
    const { heading, preHeading, breadcrumbs, imgAlt, imgSrc, hasFullWidthBg, hideImgOnMobile } = this;
    return (
      <Host
        class={{
          'has-full-width-bg': hasFullWidthBg,
          'hide-img-on-mobile': !!hideImgOnMobile,
        }}>
        <div>
          {hasFullWidthBg ? (
            <div class="full-width-bg">
              <slot name="full-width-bg"></slot>
            </div>
          ) : null}

          <div class="container">
            <div class="hero-container">
              <div class="hero-text">
                {hasFullWidthBg ? <div class="hero-text-bg"></div> : null}
                {breadcrumbs ? <go-breadcrumb items={breadcrumbs}></go-breadcrumb> : null}
                <div class="pre-heading text-size-2">{preHeading}</div>
                <h1 class="text-display-2">{heading}</h1>
                <slot></slot>
              </div>
              {imgSrc && imgAlt ? (
                <div class="hero-image">
                  <img src={imgSrc} alt={imgAlt} class="featured-img" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
