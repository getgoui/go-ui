import { Component, h, Element, Prop } from '@stencil/core';
import { moveEl } from '../../utils/dom';
import { hasSlot } from '../../utils/helper';

@Component({
  tag: 'go-card-row',
  styleUrl: 'go-card-row.scss',
  shadow: false,
})
export class GoCardRow {
  @Element() el: HTMLElement;

  /**
   * By default, `go-card-row` stretches all cards inside to the tallest card in view, unless this property is set to true.
   */
  @Prop() noStretch = false;

  /**
   * Number of columns from mobile breakpoint and up
   */
  @Prop() cols = 1;

  /**
   * Number of columns from tablet breakpoint and up
   */
  @Prop() colsTablet = 2;

  /**
   * Number of columns from desktop breakpoint and up
   */
  @Prop() colsDesktop = 3;

  /**
   * Number of columns from large breakpoint and up
   */
  @Prop() colsLarge = 4;

  /**
   * If set, cards will fade in one by one with the specified delay in milliseconds.
   */
  @Prop() stagger?: number;

  /**
   * If true, cards within the component will be wrapped inside a carousel
   */
  // @Prop() carousel = false;

  /**
   * Heading for this card row section
   */
  @Prop() heading?: string;

  /**
   * View more link href
   */
  @Prop() moreLinkHref?: string;

  /**
   * View more link text
   */
  @Prop() moreLinkText?: string;

  hasHeadingSlot: boolean;
  componentWillLoad() {
    this.hasHeadingSlot = hasSlot(this.el, 'heading');
  }

  rowEl: HTMLElement;

  contentObserver: MutationObserver;

  colClasses = ['card-col'];

  async componentDidLoad() {
    const { cols, colsTablet, colsDesktop, colsLarge } = this;

    // mobile cols
    this.colClasses.push(`col-${Math.ceil(12 / cols)}`);
    this.colClasses.push(`col-tablet-${Math.ceil(12 / colsTablet)}`);
    this.colClasses.push(`col-desktop-${Math.ceil(12 / colsDesktop)}`);
    this.colClasses.push(`col-large-${Math.ceil(12 / colsLarge)}`);
    this.loadCards();
  }

  loadCards() {
    const newCards = this.el.querySelectorAll('go-card:not(.loaded)');
    newCards.forEach((card: HTMLGoCardElement, i) => {
      this.prepareCard(card, this.colClasses, i);
    });
  }

  prepareCard(card: HTMLGoCardElement, colClasses: string[], i: number = 0) {
    // create wrapper container
    const wrapper = document.createElement('div');
    wrapper.classList.add(...colClasses);

    // insert wrapper before el in the DOM tree
    card.parentNode.insertBefore(wrapper, card);

    // move el into wrapper
    moveEl(card, wrapper);

    // add stagger fade in effect
    if (this.stagger) {
      card.classList.add('stagger-fade-in');
      card.style.cssText = `--stagger-delay: ${i * this.stagger}ms`;
    }

    card.classList.add('loaded');
    // move card into correct element
    moveEl(wrapper, this.rowEl);
  }

  render() {
    const { noStretch, stagger, heading, moreLinkHref, moreLinkText, hasHeadingSlot } = this;
    const shouldRenderHeading = heading || hasHeadingSlot;
    const shouldRenderMoreLink = moreLinkHref && moreLinkText;

    return (
      <section>
        {shouldRenderHeading || shouldRenderMoreLink ? (
          <div class="heading-row">
            {shouldRenderHeading ? (
              <slot name="heading">
                <h2>{heading}</h2>
              </slot>
            ) : (
              <span></span>
            )}
            {shouldRenderMoreLink ? (
              <go-nav-link
                item={{
                  url: moreLinkHref,
                  label: moreLinkText,
                }}
                showArrow={true}></go-nav-link>
            ) : null}
          </div>
        ) : null}
        <div
          class={{
            'card-row row': true,
            'no-stretch': noStretch,
            'stagger': !!stagger,
          }}
          ref={(el) => (this.rowEl = el)}>
          <slot></slot>
        </div>
      </section>
    );
  }
}
