import { warning } from '@/utils';
import { Component, Prop, h, Element, State } from '@stencil/core';

@Component({
  tag: 'go-nav-submenu-trigger',
})
export class GoNavSubmenuTrigger {
  @Element() el: HTMLElement;

  @Prop({ reflect: true }) controls: string;

  @State() isOpen: boolean = false;

  submenuEl: HTMLGoNavSubmenuElement;

  loadSubmenuEl() {
    if (this.controls) {
      this.submenuEl = document.getElementById(this.controls) as HTMLGoNavSubmenuElement;
      if (!this.submenuEl) {
        warning('<go-nav-submenu-trigger> is missing <go-nav-submenu> with id: ' + this.controls, this.el);
      }
      this.submenuEl.addEventListener('toggle', (e) => {
        this.isOpen = e.detail.isOpen;
      });
    }
  }

  toggleOpenState() {
    this.submenuEl.toggle();
  }

  componentDidLoad() {
    this.loadSubmenuEl();
  }

  render() {
    const Tag = 'button';
    return (
      <Tag
        class="nav-item-inner"
        onClick={() => this.toggleOpenState()}
        type="button"
        aria-haspopup="true"
        aria-controls={this.controls ? this.controls : undefined}
        aria-expanded={this.isOpen ? 'true' : 'false'}>
        <span class="nav-item-label">
          <slot></slot>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Tag>
    );
  }
}
