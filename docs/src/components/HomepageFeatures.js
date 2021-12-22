import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Pattern first',
    description: (
      <>
        Teams spend a lot of time on enhancing the end user experience. We encapsulate many of the common web design patterns and make them easy to use. Allowing both design and
        development teams to focus on delivering the product.
        <br />
        <Link href="#">See our patterns</Link>
      </>
    ),
  },
  {
    title: 'Framework agnostic',
    description: (
      <>
        Have multiple front-end stack in your organisation and need a consistent look and feel? Go Components utilise modern browser features such as web components and CSS custom
        properties so that they can be used in your front-end tech stack.
        <br />
        <Link href="#">See framework integration</Link>
      </>
    ),
  },
  {
    title: 'A11y focused',
    description: (
      <>
        We make sure that our components are accessible and easy to use. We reference the best practice guidelines wherever possible. Our patterns and components go through
        automated accessibility testing to ensure they meet the WCAG 2.0 AA and WCAG 2.1 AA standard.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--sm">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
