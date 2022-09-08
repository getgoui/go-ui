import { Component, Host, h, Element, Method, State } from '@stencil/core';

@Component({
  tag: 'go-search-bar',
  styleUrl: 'go-search-bar.scss',
  shadow: false,
})
export class GoSearchBar {
  @Element() el: HTMLElement;

  @State() isSearchFormOpen = false;

  @Method()
  async openSearchForm() {
    this.isSearchFormOpen = true;
    this.el.focus();
  }

  @Method()
  async closeSearchForm() {
    this.isSearchFormOpen = false;
  }

  render() {
    const { isSearchFormOpen: open } = this;
    return (
      <Host
        class={{
          open,
        }}>
        <go-overlay active={open ? true : false} class="go-search-bar-overlay" onOverlayClose={() => this.closeSearchForm()}>
          <slot name="search-form"></slot>
          <div class="close-btn-wrapper">
            <go-button flat stack variant="text" compact onClick={() => this.closeSearchForm()}>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              <span>Close</span>
            </go-button>
          </div>
        </go-overlay>
        <div class="search-btn">
          <go-button class="open-btn" compact flat stack variant="text" onClick={() => this.openSearchForm()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <span>Search</span>
          </go-button>
        </div>
      </Host>
    );
  }
}
