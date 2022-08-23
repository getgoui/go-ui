import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import debounce from 'lodash.debounce';
import { computePosition, flip, shift, arrow, offset, autoUpdate, inline } from '@floating-ui/dom';

@Component({
  tag: 'go-tooltip',
  styleUrl: 'go-tooltip.scss',
  shadow: false,
})
export class GoTooltip {
  @Element() el: HTMLElement;

  /**
   * Query selector string for the element inside the slot that triggers the tooltip.
   */
  @Prop() triggerId: string;

  /**
   * Add arrow to the tooltip
   */
  @Prop() arrow: boolean = false;

  /**
   * Improve positioning for inline trigger elements that span over multiple lines.
   * Reference: https://floating-ui.com/docs/inline
   */
  @Prop() inline: boolean = false;

  /**
   * placement of tooltip relative to the trigger element
   */
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private triggerEl: HTMLElement;
  private arrowEl: HTMLElement;

  componentWillLoad() {
    // if id attribute is not provided, generate a unique id for the tooltip
    if (!this.el.id) {
      this.el.id = uniqueId('go-tooltip-');
    }
    this.triggerEl = document.querySelector(`#${this.triggerId}`) as HTMLElement;
  }

  componentDidLoad() {
    if (!this.triggerEl) {
      return;
    }

    this.triggerEl.setAttribute('aria-describedby', this.el.id);
    // add event handlers to triggerEl
    this.triggerEl.addEventListener('mouseenter', () => this.showTooltip());
    document.addEventListener('mousemove', e => this.debouncedDetermineMouseOut(e));
    this.triggerEl.addEventListener('focusin', () => this.showTooltip());
    this.triggerEl.addEventListener('focusout', () => this.hideTooltip());

    this.arrowEl = this.el.querySelector('.tooltip-tail') as HTMLElement;
    this.initialiseTooltip(this.triggerEl, this.el, this.arrowEl);
    // keep watching for changes to the tooltip position
    autoUpdate(
      this.triggerEl,
      this.el,
      debounce(() => this.initialiseTooltip(this.triggerEl, this.el, this.arrowEl), 300),
      { animationFrame: true },
    );

    // press esc to hide tooltip
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.hideTooltip();
      }
    });
  }

  initialiseTooltip(triggerEl, tooltipEl, arrowEl) {
    let middleware = [offset(8), flip(), shift()];
    if (this.arrow) {
      middleware.push(arrow({ element: arrowEl }));
    }

    if (this.inline) {
      middleware.push(inline());
    }
    computePosition(triggerEl, tooltipEl, {
      strategy: 'fixed',
      placement: this.placement,
      middleware,
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(this.el.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      if (this.arrow) {
        // Accessing the data
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        Object.assign(arrowEl.style, {
          left: arrowX != null ? `${arrowX}px` : '',
          top: arrowY != null ? `${arrowY}px` : '',
          right: '',
          bottom: '',
          [staticSide]: '-3px',
        });
      }
    });
  }

  @State() isActive: boolean = false;

  showTooltip() {
    this.isActive = true;
  }
  hideTooltip() {
    this.isActive = false;
  }
  debouncedDetermineMouseOut = debounce(this.determineMouseOut, 150);
  determineMouseOut(e: MouseEvent) {
    if (!this.isActive) {
      return;
    }
    // check if mouse is outside of the tooltip and the trigger element
    const { x, y } = e;
    const { left, top, right, bottom } = this.el.getBoundingClientRect();
    const { left: triggerLeft, top: triggerTop, right: triggerRight, bottom: triggerBottom } = this.triggerEl.getBoundingClientRect();
    const isOutside = x < left || x > right || y < top || y > bottom;
    const isOutsideTrigger = x < triggerLeft || x > triggerRight || y < triggerTop || y > triggerBottom;
    if (isOutside && isOutsideTrigger) {
      this.hideTooltip();
    }
  }

  render() {
    const { isActive, arrow } = this;

    return (
      <Host role="tooltip" class={{ 'is-active': isActive }} aria-hidden={isActive ? 'false' : 'true'}>
        <slot></slot>
        {arrow ? <div class="tooltip-tail"></div> : null}
      </Host>
    );
  }
}
