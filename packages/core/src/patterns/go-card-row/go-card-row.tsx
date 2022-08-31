import { Component, h, Element, Prop } from '@stencil/core';
import { moveEl } from '../../utils/dom';
import { hasSlot } from '../../utils/helper';

/**
 * @slot default - Default slot, to be filled with `go-card` elements
 * @slot heading - Overwrite default `h2` heading for this card row section
 */
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
   * If set, cards will fade in one by one with the specified delay in milliseconds when they are in the viewport.
   * uses `IntersectionObserver`, [see browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
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

  /**
   * the DOM ref of direct parent of the cards
   */
  rowEl: HTMLElement;

  /**
   * class list for each card
   */
  cardClasses = ['card-col'];

  /**
   * intersection observer to check if cards are in view
   */
  inViewObserver: IntersectionObserver;
  contentObserver: MutationObserver;

  componentWillLoad() {
    // check if heading slot is used
    this.hasHeadingSlot = hasSlot(this.el, 'heading');

    // initialise intersection observer
    this.inViewObserver = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) {
            return;
          }
          const card = entry.target as HTMLElement;
          // add stagger fade in effect
          card.classList.add('stagger-fade-in');
          card.style.cssText = `--stagger-delay: ${i * this.stagger}ms`;
          // stop observing
          this.inViewObserver.unobserve(card);
        });
      },
      {
        threshold: 0.2, // >= 1/5th of card is in view
      },
    );
  }

  async componentDidLoad() {
    const { cols, colsTablet, colsDesktop, colsLarge } = this;

    // mobile cols
    this.cardClasses.push(`col-${Math.ceil(12 / cols)}`);
    this.cardClasses.push(`col-tablet-${Math.ceil(12 / colsTablet)}`);
    this.cardClasses.push(`col-desktop-${Math.ceil(12 / colsDesktop)}`);
    this.cardClasses.push(`col-large-${Math.ceil(12 / colsLarge)}`);
    this.loadCards();
  }

  loadCards() {
    const newCards = this.el.querySelectorAll('go-card:not(.loaded)');
    newCards.forEach((card: HTMLGoCardElement) => {
      this.prepareCard(card, this.cardClasses);
    });
  }

  prepareCard(card: HTMLGoCardElement, colClasses: string[]) {
    // create wrapper container
    const wrapper = document.createElement('div');
    wrapper.classList.add(...colClasses);

    // insert wrapper before el in the DOM tree
    card.parentNode.insertBefore(wrapper, card);

    // move el into wrapper
    moveEl(card, wrapper);

    card.classList.add('loaded');
    // move card into correct element
    moveEl(wrapper, this.rowEl);

    if (this.stagger) {
      this.inViewObserver.observe(card);
    }
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
          ref={el => (this.rowEl = el)}>
          <slot></slot>
        </div>
      </section>
    );
  }
}
