import { Component, Host, h, Element, Method, State, Listen } from '@stencil/core';

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

  @Listen('overlayClose')
  handleOverlayClose() {
    this.closeSearchForm();
  }

  render() {
    const { isSearchFormOpen } = this;
    return (
      <Host
        class={{
          open: isSearchFormOpen,
        }}>
        <go-overlay heading="Search" active={isSearchFormOpen ? true : null} class="search-form">
          <slot name="search-form"></slot>
        </go-overlay>
        <div class="search-btn">
          <go-button class="open-btn" compact flat stack color="tertiary" onClick={() => this.openSearchForm()}>
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
