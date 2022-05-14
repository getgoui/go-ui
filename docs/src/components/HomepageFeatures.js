import React from 'react';
import './HomepageFeatures.scss';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Pattern first',
    description: (
      <>
        Teams spend a lot of time on enhancing the end user experience. We encapsulate many of the common web design patterns and make them easy to use.
        Allowing both design and development teams to focus on delivering the product.
        <br />
        <Link href="/docs/patterns/introduction">See our patterns</Link>
      </>
    ),
    img: '/img/hero/patterns.png',
  },
  {
    title: 'Framework agnostic',
    description: (
      <>
        Have multiple front-end stack in your organisation and need a consistent look and feel? Go UI utilise modern browser features such as Web Components and
        CSS custom properties so that they can be used in any front-end tech stack.
        <br />
        <Link href="/docs/guides/integration/web-components">See framework integration</Link>
      </>
    ),
    img: '/img/hero/dev.png',
  },
  {
    title: 'Accessibility focused',
    description: (
      <>
        We make sure that our components are accessible and easy to use. We reference the best practice guidelines wherever possible. Our patterns and
        components go through automated accessibility testing to ensure they meet the WCAG 2.1 AA standard.
      </>
    ),
    img: '/img/hero/a11y.png',
  },
  {
    title: 'Adaptive',
    description: (
      <>
        Go UI makes it easy for developers to build adaptive web applications, this means out-of-the-box, your application support dark mode and reduced motion
        preferences from the user's operating system.
      </>
    ),
    img: '/img/hero/adaptive.png',
  },
];

export default function HomepageFeatures() {
  return (
    <section className="features">
      <div className="container">
        {FeatureList.map(({ title, description, img }, idx) => (
          <div key={idx} className={`feature ${idx % 2 == 0 ? 'feature-alt' : ''}`}>
            {img && (
              <div className="feature__img">
                <img src={img} alt={`${title} illustration`} loading="lazy" />
              </div>
            )}
            <div className="feature__text">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
