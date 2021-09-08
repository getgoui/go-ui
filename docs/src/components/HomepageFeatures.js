import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Pattern first',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Teams spend a lot of time on enhancing the end user experience. We encapsulate many of the common patterns and make them easy to use. Allowing both design and development
        teams to focus on delivering the product.
        <br />
        <a href="#">See our patterns</a>
      </>
    ),
  },
  {
    title: 'A11y focused',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        We make sure that our components are accessible and easy to use. We reference the best practice guidelines wherever possible. Our patterns and components go through
        automated accessibility testing to ensure they meet the WCAG 2.0 AA and WCAG 2.1 AA standard.
      </>
    ),
  },
  {
    title: 'Framework agnostic',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Have multiple front-end stack in your organisation and need a consistent look and feel? <br />
        Go Components utilise modern browser features so that they can be used in your JS framework of choice.
        <br />
        <a href="#">See framework integration</a>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
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
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
