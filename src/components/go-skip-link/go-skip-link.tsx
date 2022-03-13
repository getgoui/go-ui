import { Component, Host, h, Element, Prop, State } from '@stencil/core';
import uniqueId from 'lodash.uniqueid';
import { warning } from '../../utils/helper';

@Component({
  tag: 'go-skip-link',
  styleUrl: 'go-skip-link.scss',
  shadow: false,
})
export class GoSkipLink {
  @Element() el: HTMLElement;

  /**
   * Tell skip link which element to focus (supports any query selector)
   */
  @Prop() target?: string = 'main';

  @State() href: string;

  /**
   * records if original target element has tabindex attribute set, if so, do not touch it
   */
  hasTabIndex: boolean = false;

  componentWillLoad() {
    // get target element
    // check if id exists
    // if not, generate random id and set it in the link href

    const targetEl = document.querySelector(this.target) as HTMLElement;

    if (!targetEl) {
      warning(`[go-skip-link] target ${this.target} not found.`);
    }

    if (targetEl.hasAttribute('tabindex')) {
      this.hasTabIndex = true;
    }

    if (targetEl.id) {
      this.setTabIndex(targetEl, targetEl.id);
      return;
    }
    // generate a random id then set href
    const id = uniqueId('skip-link-target-');
    targetEl.id = id;
    this.setTabIndex(targetEl, id);
  }

  setTabIndex(targetEl: HTMLElement, id: string): void {
    this.href = `#${id}`;
    if (!this.hasTabIndex) {
      targetEl.setAttribute('tabindex', '-1');
    }
  }

  render() {
    const { href } = this;
    return (
      <Host>
        <a href={href} class="visually-hidden-focusable">
          <slot></slot>
        </a>
      </Host>
    );
  }
}
