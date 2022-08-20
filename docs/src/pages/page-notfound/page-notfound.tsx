import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-notfound',
  styleUrl: 'page-notfound.scss',
})
export class PageNotfound {
  render() {
    return <p>Sorry, we cannot find the content.</p>;
  }
}
