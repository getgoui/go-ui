import { Component, Host, h, Element, Prop, Method } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { getFocusableChildren } from '../../utils/helper';
@Component({
  tag: 'go-overlay',
  styleUrl: 'go-overlay.scss',
  shadow: false,
})
export class GoOverlay {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, mutable: true }) active: boolean = false;
  /**
   * Type of this overlay, can be dialog or alertdialog
   */
  @Prop() type: 'dialog' | 'alertdialog' = 'dialog';

  /**
   * If true, the overlay will be dismissed when the user clicks outside of it or presses the escape key.
   */
  @Prop() dismissible: boolean = true;

  /**
   * Heading of the overlay content
   */
  @Prop() heading?: string;

  // aria-labelledby https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html
  headingId: string = uniqueId('overlay-label-');

  // for trapping focus
  firstFocusableEl: HTMLElement;
  lastFocusableEl: HTMLElement;

  // keep track of the element that triggered the overlay
  originator: HTMLElement;

  // for detecting click outside
  contentEl: HTMLElement;

  componentDidLoad() {
    const focusableChildren = getFocusableChildren(this.el);
    this.firstFocusableEl = focusableChildren[0];
    this.lastFocusableEl = focusableChildren[focusableChildren.length - 1];

    // trap focus inside overlay
    this.lastFocusableEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.active) {
        if (e.code === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          this.firstFocusableEl.focus();
        }
      }
    });
    this.firstFocusableEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.active) {
        if (e.code === 'Tab' && e.shiftKey) {
          e.preventDefault();
          this.lastFocusableEl.focus();
        }
      }
    });

    // close overlay on click outside
    if (this.dismissible) {
      this.el.addEventListener('click', (e: MouseEvent) => {
        if (this.active) {
          if (e.target === this.el && e.target !== this.contentEl) {
            this.close();
          }
        }
      });
    }
  }

  @Method()
  async close() {
    enableBodyScroll(this.el);
    this.active = false;
    this.originator.focus();
  }

  @Method()
  async open() {
    disableBodyScroll(this.el);
    this.active = true;
    this.originator = document.activeElement as HTMLElement;

    // close overlay on escape
    if (this.dismissible) {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (this.active) {
          if (e.code === 'Escape') {
            this.close();
          }
        }
      });
    }

    // focus on first focusable element on next tick
    window.requestAnimationFrame(() => {
      this.firstFocusableEl.focus();
    });
  }

  render() {
    const { active, type, heading, headingId } = this;
    return (
      <Host role={type} aria-modal="true" aria-labelledby={headingId} class={{ active }}>
        <div class="overlay-content" ref={(el) => (this.contentEl = el)}>
          <div id={headingId} class="overlay-heading">
            <slot name="heading">
              <h3>{heading}</h3>
            </slot>
          </div>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
