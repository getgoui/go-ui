import { Component, h, Element, State, Prop, Watch } from '@stencil/core';
import { inheritAttributes } from '../../utils/helper';

// 1. check cross domain and add target="_blank" + rel="noopener noreferrer"
// 2. check target="_blank" and add visual + screen reader queues
@Component({
  tag: 'go-link',
  styleUrl: 'go-link.scss',
  shadow: false,
})
export class GoLink {
  @Element() el: HTMLElement;

  /**
   * The href of the link.
   */
  @Prop() href: string;

  // Store attributes inherited from the host element
  private attrs = {};
  componentWillLoad() {
    this.checkExternal();
    this.attrs = inheritAttributes(this.el, ['href']);
  }

  @State() isExternal: boolean = false;

  @State() opensNewTab: boolean = false;

  @Watch('href')
  checkExternal() {
    console.log(this.href);
    if (!this.href) {
      return;
    }
    this.isExternal = this.isExternalURL(this.href);
  }

  private isExternalURL(url: string): boolean {
    if (url.startsWith('#')) {
      return false;
    }
    return new URL(url).origin !== location.origin;
  }

  render() {
    const { href, attrs, isExternal } = this;

    let linkAttrs = {
      ...attrs,
      href,
      class: `go-link${attrs['class'] ? attrs['class'] : ''}`,
    };

    return (
      <a {...linkAttrs}>
        <span>
          <slot></slot>
        </span>
        {isExternal ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="external-link-icon">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        ) : null}
      </a>
    );
  }
}
