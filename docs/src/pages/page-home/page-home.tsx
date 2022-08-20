import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
  shadow: false,
})
export class PageHome {
  render() {
    return (
      <div class="container">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
