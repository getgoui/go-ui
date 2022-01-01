import { Component, Host, h, Element, Prop, Method, Event, EventEmitter, Watch } from '@stencil/core';
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
   * If persistent, the overlay will not be closed when the user clicks outside of it or presses the escape key.
   */
  @Prop() persistent: boolean = false;

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
          this.firstFocusableEl?.focus();
        }
      }
    });
    this.firstFocusableEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.active) {
        console.log(e.code, e.shiftKey);
        if (e.code === 'Tab' && e.shiftKey) {
          e.preventDefault();
          this.lastFocusableEl?.focus();
        }
      }
    });

    // close overlay on click outside
    if (!this.persistent) {
      this.el.addEventListener('click', (e: MouseEvent) => {
        if (this.active) {
          if (e.target === this.el && e.target !== this.contentEl) {
            this.close();
          }
        }
      });
    }
  }

  /**
   * Emitted when the overlay is opened
   */
  @Event({
    eventName: 'overlayOpen',
    cancelable: true,
    bubbles: true,
  })
  openEvent: EventEmitter<void>;

  /**
   * Emitted when the overlay is closed
   */
  @Event({
    eventName: 'overlayClose',
    cancelable: true,
    bubbles: true,
  })
  closeEvent: EventEmitter<void>;

  @Method()
  async close() {
    this.closeEvent.emit();
    enableBodyScroll(this.el);
    this.active = false;
    this.originator?.focus();
  }

  @Method()
  async open() {
    this.openEvent.emit();
    disableBodyScroll(this.el);
    this.active = true;
    this.originator = document.activeElement as HTMLElement;

    // close overlay on escape
    if (!this.persistent) {
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
      this.firstFocusableEl?.focus();
    });
  }

  @Watch('active')
  watchActiveHandler(newValue: boolean): void {
    if (newValue) {
      this.open();
      return;
    }
    this.close();
  }

  render() {
    const { active, type, heading, headingId, persistent } = this;
    return (
      <Host role={type} aria-modal="true" aria-labelledby={headingId} class={{ active }} aria-hidden={active ? false : true}>
        <div class="overlay-content" ref={(el) => (this.contentEl = el)}>
          {!persistent ? (
            <div class="close-btn-wrapper">
              <go-button flat stack color="tertiary" compact onClick={() => this.close()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
                <span>Close</span>
              </go-button>
            </div>
          ) : null}
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
