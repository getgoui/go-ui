import { Component, h, Host, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'page-transition',
  styleUrl: 'page-transition.scss',
})
export class PageTransition {
  @Element() el: HTMLElement;

  @Prop() activePath: string;

  componentDidLoad() {
    this.el.classList.add('loaded');
    this.el.addEventListener('animationend', () => {
      this.el.classList.remove('loaded');
    });
  }

  @Watch('activePath')
  handleChangePath() {
    this.el.classList.remove('loaded');
    this.el.classList.add('loaded');
    this.el.addEventListener('animationend', () => {
      this.el.classList.remove('loaded');
    });
    // this.el.style.animationPlayState = 'paused';
    // this.el.style.animationPlayState = 'running';
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}