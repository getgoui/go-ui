import { Component, Host, h, Element, Prop, Method, Event, EventEmitter, Watch } from '@stencil/core';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { inheritAttributes } from '../../utils/helper';
import { trapFocus } from '../../utils/trap-focus';

@Component({
  tag: 'go-overlay',
  styleUrl: 'go-overlay.scss',
  shadow: false,
})
export class GoOverlay {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /**
   * If persistent, the overlay will not be closed when the user clicks outside of it or presses the escape key.
   */
  @Prop() persistent: boolean = false;

  // keep track of the element that triggered the overlay
  originator: HTMLElement;

  // for detecting click outside
  bgEl: HTMLElement;

  // Store attributes inherited from the host element
  private inheritedAttrs = {};
  componentWillLoad() {
    this.inheritedAttrs = inheritAttributes(this.el, ['class', 'style'], false);
    // move this.el to the end of the body
    const body = document.querySelector('body');
    body.appendChild(this.el);
  }

  componentDidLoad() {
    // close overlay on click outside
    if (!this.persistent) {
      this.el.addEventListener('click', (e: MouseEvent) => {
        if (this.active) {
          if (e.target === this.bgEl) {
            e.preventDefault();
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
    this.el.style.visibility = 'hidden';
  }

  @Method()
  async open() {
    this.originator = document.activeElement as HTMLElement;
    this.openEvent.emit();
    disableBodyScroll(this.el);
    this.el.style.visibility = 'visible';
    this.active = true;
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

    trapFocus(this.el);
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
    const { active, inheritedAttrs } = this;
    return (
      <Host class={{ active }} {...inheritedAttrs}>
        <div class="overlay-bg" ref={(el) => (this.bgEl = el)}></div>
        <div class="overlay-content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
