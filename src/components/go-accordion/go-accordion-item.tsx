import { Component, Host, h, Prop, State, Element, Method, Event, EventEmitter } from '@stencil/core';
import { hasSlot } from '../../utils/helper';
import uniqueId from 'lodash.uniqueid';

@Component({
  tag: 'go-accordion-item',
  styleUrl: 'go-accordion-item.scss',
  shadow: false,
})
export class GoAccordionItem {
  @Element() el: HTMLElement;

  /**
   * Heading text.
   * This will be overwritten by `heading` slot
   */
  @Prop() heading?: string = null;

  /**
   * The HTML tag to be applied to the heading text.
   * This will be overwritten by `heading` slot
   */
  @Prop() headingTag?: string = 'h3';

  /**
   * If expanded height should be automatically calculated. If set, the `--go-accordion-item-body-max-height` CSS variable will be set automatically to the content height
   */
  @Prop() autoHeight?: boolean = true;

  /**
   * If the accordion item should be opened by default
   */
  @Prop({ reflect: true, mutable: true }) active?: boolean = false;

  @State() hasHeadingSlot: boolean = true;
  @State() hasArrowSlot: boolean = true;

  panelId: string;
  headerId: string;
  panelEl: HTMLElement;
  animationHeightInterval: number; // number of px per frame of animation change.

  parentGroup: HTMLGoAccordionElement;

  /**
   * Emitted when accordion item has opened
   */
  @Event() opened: EventEmitter;

  /**
   * Emitted when accordion item started opening
   */
  @Event() opening: EventEmitter;

  /**
   * Emitted when accordion item has closed
   */
  @Event() closed: EventEmitter;

  /**
   * Emitted when accordion item started closing
   */
  @Event() closing: EventEmitter;

  componentWillLoad() {
    this.hasHeadingSlot = hasSlot(this.el, 'heading');
    this.hasArrowSlot = hasSlot(this.el, 'arrow');
    this.panelId = uniqueId('go-accordion-item-panel-');
    this.headerId = uniqueId('go-accordion-item-header-');
    this.parentGroup = this.el.closest('go-accordion') as HTMLGoAccordionElement;
  }
  componentDidLoad() {
    if (this.autoHeight) {
      this.panelEl.style.setProperty('--body-max-height', this.panelEl.scrollHeight + 2 + 'px');
    }
    this.onTransitionEnd();
    this.panelEl.addEventListener('transitionstart', () => {
      this.onTransitionStart();
    });
    this.panelEl.addEventListener('transitionend', () => {
      this.onTransitionEnd();
    });
  }

  handleNavigation(key) {
    if (key === 'ArrowDown') {
      if (this.el.nextElementSibling) {
        (this.el.nextElementSibling as HTMLGoAccordionItemElement).focusOnControl();
      }
    }
    if (key === 'ArrowUp') {
      if (this.el.previousElementSibling) {
        (this.el.previousElementSibling as HTMLGoAccordionItemElement).focusOnControl();
      }
    }
    if (key === 'Home') {
      (this.parentGroup.children[0] as HTMLGoAccordionItemElement).focusOnControl();
    }
    if (key === 'End') {
      (this.parentGroup.children[this.parentGroup.children.length - 1] as HTMLGoAccordionItemElement).focusOnControl();
    }
  }

  onTransitionEnd() {
    if (this.active) {
      this.panelEl.style.overflow = 'auto';
      this.opened.emit();
    } else {
      this.panelEl.style.overflow = 'hidden';
      this.panelEl.style.visibility = 'hidden';
      this.closed.emit();
    }
  }
  onTransitionStart() {
    console.log('transitionstart');
    if (this.active) {
      this.panelEl.style.visibility = 'visible';
      this.opening.emit();
    } else {
      this.closing.emit();
    }
  }

  /**
   * Toggle open state of accordion item
   */
  @Method()
  async toggle() {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Closes the accordion item
   */
  @Method()
  async close() {
    this.active = false;
  }

  /**
   * Opens the accordion item.
   */
  @Method()
  async open() {
    this.active = true;
  }

  /**
   * Focus on header control
   */
  @Method()
  async focusOnControl() {
    (this.el.querySelector('.heading-control') as HTMLElement).focus();
  }

  render() {
    const { active, autoHeight, headingTag: HeadingTag, panelId, headerId } = this;
    return (
      <Host class={{ active, autoHeight }}>
        <HeadingTag class="heading">
          <button
            id={headerId}
            class="heading-control"
            role="button"
            onClick={() => this.toggle()}
            onKeyDown={(e) => this.handleNavigation(e.key)}
            aria-expanded={active ? 'true' : 'false'}
            aria-controls={panelId}>
            {this.hasHeadingSlot ? <slot name="heading"></slot> : this.heading}
            <span class="arrow">
              {this.hasArrowSlot ? (
                <slot name="arrow"></slot>
              ) : (
                <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </svg>
              )}
            </span>
          </button>
        </HeadingTag>
        <div class="panel-wrapper" role="region" id={panelId} aria-labelledby={headerId} ref={(el) => (this.panelEl = el as HTMLElement)}>
          <div class="panel">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
