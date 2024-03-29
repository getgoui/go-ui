import { Component, Host, h, Element, Prop, State, Method } from '@stencil/core';
import { uniqueId, debounce } from 'lodash-es';
import { computePosition, flip, shift, arrow, offset, autoUpdate, inline } from '@floating-ui/dom';

@Component({
  tag: 'go-tooltip',
  styleUrl: 'go-tooltip.scss',
  shadow: false,
})
export class GoTooltip {
  @Element() el: HTMLElement;

  /**
   * Query selector string for the trigger element
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

  private cleanUpAutoUpdate;

  componentDidLoad() {
    if (!this.triggerEl) {
      return;
    }

    this.triggerEl.setAttribute('aria-describedby', this.el.id);
    // add event handlers to triggerEl
    this.triggerEl.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mousemove', (e) => this.debouncedDetermineMouseOut(e));
    this.triggerEl.addEventListener('focusin', () => this.show());
    this.triggerEl.addEventListener('focusout', () => this.hide());

    this.arrowEl = this.el.querySelector('.tooltip-tail') as HTMLElement;
    this.initialiseTooltip(this.triggerEl, this.el, this.arrowEl);
    // keep watching for changes to the tooltip position
    this.cleanUpAutoUpdate = autoUpdate(
      this.triggerEl,
      this.el,
      debounce(() => this.initialiseTooltip(this.triggerEl, this.el, this.arrowEl), 300),
      { animationFrame: true },
    );

    // press esc to hide tooltip
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
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

  /**
   * show tooltip
   */
  @Method()
  async show() {
    this.isActive = true;
  }

  /**
   * hide tooltip
   */
  @Method()
  async hide() {
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
      this.hide();
    }
  }

  disconnectedCallback() {
    this.cleanUpAutoUpdate && this.cleanUpAutoUpdate();
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
