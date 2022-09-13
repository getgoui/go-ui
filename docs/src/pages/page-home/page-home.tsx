import { Component, Host, State, h } from '@stencil/core';
import { href } from 'stencil-router-v2';
import siteConfig from '../../../config';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
  shadow: false,
})
export class PageHome {
  @State() featureList;

  componentWillLoad() {
    this.featureList = [
      {
        title: 'Framework agnostic',
        description: `Have multiple front-end stack in your organisation and need a consistent look and feel? Go UI utilise modern browser features such as Web Components and CSS custom properties so that they can be used in any front-end tech stack.`,
        img: '/assets/img/hero/dev.png',
        link: '/docs/guides/integration/web-components',
        linkText: 'See framework integration',
      },
      {
        title: 'Pattern first',
        description: `Teams spend a lot of time on enhancing the end user experience. We encapsulate many of the common web design patterns and make them easy to use. Allowing both design and development teams to focus on delivering the product.`,
        img: '/assets/img/hero/patterns.png',
        link: '/docs/patterns',
        linkText: 'See our patterns',
      },
      {
        title: 'Accessibility focused',
        description: `We make sure that our components are accessible and easy to use. We reference the best practice guidelines wherever possible. Our patterns and components go through automated accessibility testing to ensure they meet the WCAG 2.1 AA standard.`,
        img: '/assets/img/hero/a11y.png',
      },
      {
        title: 'Adaptive',
        description: `Go UI makes it easy for developers to build adaptive web applications, this means out-of-the-box, your application support dark mode and reduced motion preferences from the user's operating system.`,
        img: '/assets/img/hero/adaptive.png',
      },
    ];
  }

  render() {
    return (
      <Host>
        <seo-tags pageTitle="Home"></seo-tags>
        <main>
          {/* hero */}
          <div class="container">
            <div class="hero">
              <img class="hero__logo" src="/assets/img/logo.svg" alt="Go UI logo" />
              <div class="hero__text">
                <h1 class="hero__title">{siteConfig.name}</h1>
                <div class="hero__subtitle">{siteConfig.tagline}</div>
                <div>
                  <code-block language="shell" code="npm i @go-ui/core"></code-block>
                </div>
              </div>
            </div>
          </div>
          {/* features */}
          {this.featureList?.length && (
            <section class="features">
              <div class="container">
                {this.featureList.map(({ title, description, img, link, linkText }, i) => (
                  <div key={i} class={`feature ${i % 2 == 0 ? 'feature-alt' : ''}`}>
                    {img && (
                      <div class="feature__img">
                        <img src={img} alt={`${title} illustration`} loading="lazy" />
                      </div>
                    )}
                    <div class="feature__text">
                      <h2>{title}</h2>
                      <p>{description}</p>
                      <br />
                      {link && <go-link {...href(link)}>{linkText}</go-link>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* call to action */}
        </main>
      </Host>
    );
  }
}
