import { Component, Host, h, Element, Prop, Method, Watch, EventEmitter, Event } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import { computePosition, offset, flip, autoUpdate, Placement } from '@floating-ui/dom';
import { focusFirstWithin, onClickOutside } from '../../utils';
import debounce from 'lodash.debounce';

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
  @Prop() triggerId: string;

  /**
   * keep track of active state
   */
  @Prop({ reflect: true, mutable: true }) isActive: boolean = false;

  /**
   * Placement of dropdown relative to the trigger element
   */
  @Prop() placement?: Placement = 'bottom-start';

  /**
   * Id of the reference element which the position calculation will be done against,
   * if this is not provided or not found in DOM, the trigger element will be used.
   */
  @Prop() referenceId?: string = null;

  /**
   * Offset between dropdown and reference element for position calculation.
   */
  @Prop() offset?: number = 4;

  /**
   * opens dropdown
   */
  @Method()
  async open() {
    this.isActive = true;
  }

  /**
   * closes dropdown
   */
  @Method()
  async close() {
    this.isActive = false;
  }

  /**
   * Toggles dropdown
   */
  @Method()
  async toggle() {
    this.isActive = !this.isActive;
  }

  @Event() opened: EventEmitter<void>;
  @Event() closed: EventEmitter<void>;

  private triggerEl: HTMLElement;
  private referenceEl: HTMLElement;

  componentWillLoad() {
    // if id attribute is not provided, generate a unique id for the dropdown
    if (!this.el.id) {
      this.el.id = uniqueId('go-dropdown-');
    }
    this.triggerEl = document.querySelector(`#${this.triggerId}`) as HTMLElement;
    const refEl = document.querySelector(`#${this.referenceId}`);
    if (refEl) {
      this.referenceEl = refEl as HTMLElement;
    } else {
      this.referenceEl = this.triggerEl;
    }
  }

  private escapeHandler;
  private focusOutHandler;

  componentDidLoad() {
    if (!this.triggerEl || !this.referenceEl) {
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
      if (e.relatedTarget && !this.el.contains(e.relatedTarget as Node) && !this.triggerEl.contains(e.relatedTarget as Node)) {
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
  }

  @Method()
  async init() {
    const { placement } = this;
    this.triggerEl.setAttribute('aria-haspopup', 'true');
    this.setTriggerExpanded(this.isActive);

    /**
     * Calculate position of dropdown
     */
    const middleware = [offset(this.offset), flip()];
    autoUpdate(
      this.referenceEl,
      this.el,
      debounce(() => {
        computePosition(this.referenceEl, this.el, {
          placement,
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

    onClickOutside(this.el, (e) => {
      if (!this.triggerEl.contains(e.target as Node) && this.isActive) {
        this.close();
      }
    });
  }

  setTriggerExpanded(expanded: boolean) {
    this.triggerEl.setAttribute('aria-expanded', String(expanded));
  }

  @Watch('isActive')
  handleActiveChange(isActive) {
    this.setTriggerExpanded(isActive);
    if (isActive) {
      focusFirstWithin(this.el);
      this.opened.emit();
    } else {
      this.triggerEl.focus();
      this.closed.emit();
    }
  }

  render() {
    const { isActive } = this;
    return (
      <Host class={{ 'is-active': isActive }} aria-hidden={isActive ? 'false' : 'true'}>
        <slot></slot>
      </Host>
    );
  }
}
