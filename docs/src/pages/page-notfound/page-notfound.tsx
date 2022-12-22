import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-notfound',
  styleUrl: 'page-notfound.scss',
})
export class PageNotfound {
  render() {
    return [
      <seo-tags pageTitle="Page not found"></seo-tags>,
      <go-hero
        pre-heading="Oops..."
        heading="Page not found"
        img-src="/assets/img/puppy.png"
        img-alt="3d puppy looking confused"
        style={{
          '--hero-bg-color': 'transparent',
          '--hero-padding-top': '4rem',
          '--hero-padding-bottom': '4rem',
          '--hero-img-fit': 'contain',
          '--hero-img-position': 'bottom right',
        }}>
        <p class="text-size-1">
          It seems like that page doesn't exist. Try using the site Search (<code>Ctrl</code> + <code>K</code>) to find what you're looking for.
        </p>
      </go-hero>,
    ];
  }
}
