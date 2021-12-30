import { Component, Host, h, Element, Prop, Method } from '@stencil/core';
import { getFocusableChildren } from '../../utils/helper';

@Component({
  tag: 'go-overlay',
  styleUrl: 'go-overlay.scss',
  shadow: false,
})
export class GoOverlay {
  @Element() el: HTMLElement;

  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  firstFocusableEl: HTMLElement;
  lastFocusableEl: HTMLElement;

  // keep track of the element that triggered the overlay
  originator: HTMLElement;

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
  }

  @Method()
  async close() {
    this.active = false;
    this.originator.focus();
  }

  @Method()
  async open() {
    this.active = true;
    this.originator = document.activeElement as HTMLElement;
    // const first = getFirstFocusableChild(this.el);
    // console.log(first);
    console.log(this.firstFocusableEl);
    // focus on first focusable element on next tick
    window.requestAnimationFrame(() => {
      this.firstFocusableEl.focus();
    });
  }

  render() {
    const { active } = this;
    return (
      <Host class={{ active }}>
        <slot></slot>
      </Host>
    );
  }
}
