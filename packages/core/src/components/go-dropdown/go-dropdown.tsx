import { Component, Host, h, Element, Prop, Method, Watch } from '@stencil/core';
import { uniqueId, debounce } from 'lodash-es';
import { computePosition, offset, flip, autoUpdate } from '@floating-ui/dom';
import { focusFirstWithin, onClickOutside } from '../../utils';

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

  private triggerEl: HTMLElement;

  componentWillLoad() {
    // if id attribute is not provided, generate a unique id for the dropdown
    if (!this.el.id) {
      this.el.id = uniqueId('go-dropdown-');
    }
    this.triggerEl = document.querySelector(`#${this.triggerId}`) as HTMLElement;
  }

  private escapeHandler;
  private focusOutHandler;

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
  }

  @Method()
  async init() {
    this.triggerEl.setAttribute('aria-haspopup', 'true');
    this.setTriggerExpanded(this.isActive);

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
      this.el.style.display = 'inherit';
    } else {
      this.triggerEl.focus();
      this.el.style.display = 'none';
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
