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
   * The `href` of the link.
   */
  @Prop() href: string;

  /**
   * The `target` of the link.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top';

  // Store attributes inherited from the host element
  private attrs = {};
  componentWillLoad() {
    this.checkExternal();
    this.attrs = inheritAttributes(this.el, ['href', 'target']);
  }

  @State() isExternal: boolean = false;

  @State() isNewTab: boolean = false;

  @Watch('target')
  checkNewTab() {
    this.isNewTab = this.target === '_blank';
  }

  @Watch('href')
  checkExternal() {
    if (!this.href) {
      return;
    }
    this.isExternal = this.isExternalURL(this.href);
    if (this.isExternal) {
      this.isNewTab = true;
    }
  }

  private isExternalURL(url: string): boolean {
    if (url.startsWith('#')) {
      return false;
    }
    const tmp = document.createElement('a');
    tmp.href = url;
    const isExternal = tmp.host !== window.location.host;
    tmp.remove();
    return isExternal;
  }

  render() {
    const { href, target, attrs, isExternal, isNewTab } = this;

    let linkAttrs = {
      ...attrs,
      href,
      class: `go-link${attrs['class'] ? attrs['class'] : ''}`,
      target: isExternal || isNewTab ? '_blank' : target,
    };

    return (
      <a {...linkAttrs}>
        <span>
          <slot></slot>
        </span>
        {isExternal || isNewTab
          ? [
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class="external-link-icon">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
              </svg>,
              <span class="visually-hidden">Opens in new a tab or window</span>,
            ]
          : null}
      </a>
    );
  }
}
