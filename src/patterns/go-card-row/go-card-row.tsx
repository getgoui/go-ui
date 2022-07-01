import { Component, Host, h, Element, Prop, Method } from '@stencil/core';

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

  componentDidLoad() {
    this.refresh();
  }

  @Method()
  async refresh() {
    const { cols, colsTablet, colsDesktop, colsLarge } = this;
    const cards = this.el.querySelectorAll('go-card');
    let colClasses = ['card-col'];
    // mobile cols
    colClasses.push(`col-${Math.ceil(12 / cols)}`);
    colClasses.push(`col-tablet-${Math.ceil(12 / colsTablet)}`);
    colClasses.push(`col-desktop-${Math.ceil(12 / colsDesktop)}`);
    colClasses.push(`col-large-${Math.ceil(12 / colsLarge)}`);

    cards.forEach((card, i) => {
      // create wrapper container
      const wrapper = document.createElement('div');
      wrapper.classList.add(...colClasses);

      // insert wrapper before el in the DOM tree
      card.parentNode.insertBefore(wrapper, card);

      // move el into wrapper
      wrapper.appendChild(card);

      // add stagger fade in effect
      if (this.stagger) {
        card.classList.add('stagger-fade-in');
        card.style.cssText = `--stagger-delay: ${i * this.stagger}ms`;
      }
    });
  }

  render() {
    const { noStretch, stagger } = this;

    return (
      <Host
        class={{
          'card-row row': true,
          'no-stretch': noStretch,
          'stagger': !!stagger,
        }}>
        <slot></slot>
      </Host>
    );
  }
}
