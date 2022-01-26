import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
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
  },
  {
    title: 'Framework agnostic',
    description: (
      <>
        Have multiple front-end stack in your organisation and need a consistent look and feel? Go Components utilise modern browser features such as web
        components and CSS custom properties so that they can be used in your front-end tech stack.
        <br />
        <Link href="#">See framework integration</Link>
      </>
    ),
  },
  {
    title: 'Accessibility focused',
    description: (
      <>
        We make sure that our components are accessible and easy to use. We reference the best practice guidelines wherever possible. Our patterns and
        components go through automated accessibility testing to ensure they meet the WCAG 2.1 AA standard.
      </>
    ),
  },
  {
    title: 'Adaptive',
    description: (
      <>
        Go UI makes it easy for developers to build adaptive web applications, this means out-of-the-box, your application support dark mode and reduced motion
        preferences from the user's operating system.
      </>
    ),
  },
];

function Feature({ Svg, title, description, idx }) {
  return (
    <div className="row">
      <div className="col col--6">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
