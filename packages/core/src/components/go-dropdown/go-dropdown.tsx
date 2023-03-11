import { Component, Host, h, Element, Prop, Method, Watch, Event, EventEmitter } from '@stencil/core';
import { uniqueId, debounce } from 'lodash-es';
import { computePosition, offset, flip, autoUpdate } from '@floating-ui/dom';
import { onClickOutside, removeClickOutsideListener } from '../../utils';

@Component({
  tag: 'go-dropdown',
  styleUrl: 'go-dropdown.scss',
  shadow: false,
})
export class GoDropdown {
  @Element() el: HTMLElement;
  /**
   * Query selector string for the trigger element.
   */
  @Prop() triggerSelector: string;

  /**
   * keep track of active state
   */
  @Prop({ reflect: true, mutable: true }) isActive: boolean = false;

  /**
   * Width of the dropdown, any CSS width values can be used.
   */
  @Prop() width? = 'auto';

  /**
   * If set, trigger click event will need to be handled manually.
   */
  @Prop() noTriggerClickHandler = false;

  /**
   * If set, dropdown will take full width of its parent.
   */
  @Prop() fullWidth? = false;

  /**
   * Emitted when dropdown is opened
   */
  @Event() opened: EventEmitter<void>;

  // keep track of where the focus was before the dropdown opens
  originEl: HTMLElement;

  /**
   * opens dropdown
   */
  @Method()
  async open() {
    this.originEl = document.activeElement as HTMLElement;
    this.isActive = true;
    this.opened.emit();
  }
  /**
   * Emitted when dropdown is opened
   */
  @Event() closed: EventEmitter<void>;

  /**
   * closes dropdown
   */
  @Method()
  async close(focusBackToTrigger = false) {
    this.isActive = false;
    this.closed.emit();
    if (this.originEl && focusBackToTrigger) {
      this.originEl.focus();
    }
  }

  /**
   * toggles dropdown
   */
  @Method()
  async toggle() {
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  private triggerEl: HTMLElement;

  componentWillLoad() {
    // if id attribute is not provided, generate a unique id for the dropdown
    if (!this.el.id) {
      this.el.id = uniqueId('go-dropdown-');
    }
    this.triggerEl = document.querySelector(`${this.triggerSelector}`) as HTMLElement;
  }

  private escapeHandler;
  private focusOutHandler;
  private clickOutHandler;

  componentDidLoad() {
    if (!this.triggerEl) {
      return;
    }
    this.init();

    // press esc to close dropdown
    this.escapeHandler = (e) => {
      if (e.code === 'Escape') {
        this.close();
      }
    };
    this.focusOutHandler = (e: FocusEvent) => {
      if (this.triggerEl.contains(e.relatedTarget as Node)) {
        return;
      }
      if (e.relatedTarget && !this.el.contains(e.relatedTarget as Node)) {
        this.close();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
    // focus outside to close dropdown
    this.el.addEventListener('focusout', this.focusOutHandler);
  }

  disconnectedCallback() {
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
    }
    if (this.focusOutHandler) {
      this.el.removeEventListener('focusout', this.focusOutHandler);
    }
    if (this.clickOutHandler) {
      removeClickOutsideListener(this.clickOutHandler);
    }
  }

  @Method()
  async init() {
    this.triggerEl.setAttribute('aria-haspopup', 'true');
    this.setTriggerExpanded(this.isActive);

    // add click event listener
    if (!this.noTriggerClickHandler) {
      this.triggerEl.addEventListener('click', () => this.toggle());
    }

    this.clickOutHandler = onClickOutside(this.el, (e) => {
      if (!this.triggerEl.contains(e.target as Node) && this.isActive) {
        console.log('click outside');
        this.close();
      }
    });
    /**
     * Calculate position of dropdown
     */
    const middleware = [offset(4), flip()];
    autoUpdate(
      this.triggerEl,
      this.el,
      debounce(() => {
        computePosition(this.triggerEl, this.el, {
          placement: 'bottom-start',
          middleware,
        }).then(({ x, y, middlewareData }) => {
          Object.assign(this.el.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
          if (middlewareData.flip?.overflows?.length > 0) {
            this.el.classList.add('flip');
          } else {
            this.el.classList.remove('flip');
          }
        });
      }, 100),
    );
  }

  setTriggerExpanded(expanded: boolean) {
    this.triggerEl.setAttribute('aria-expanded', String(expanded));
  }

  @Watch('isActive')
  handleActiveChange(isActive) {
    this.setTriggerExpanded(isActive);
    if (isActive) {
      this.el.style.display = 'block';
      // focusFirstWithin(this.el);
    } else {
      this.el.addEventListener(
        'transitionend',
        () => {
          this.el.style.display = 'none';
        },
        { once: true },
      );
      this.triggerEl.focus();
    }
  }

  render() {
    let { isActive, width, fullWidth } = this;
    return (
      <Host class={{ 'is-active': isActive, 'full-width': fullWidth }} aria-hidden={isActive ? 'false' : 'true'} style={{ '--dropdown-width': width }}>
        <div class="dropdown-content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
