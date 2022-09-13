import { INavItem } from '@go-ui/core/dist/types/interfaces';
import startCase from 'lodash.startcase';

const siteConfig = {
  name: 'Go UI',
  tagline: 'A design system for everyone.',
  logo: '/assets/img/logo.svg',
  logoDark: '/assets/img/logo.svg',
  logoSocial: '/assets/img/logo-padded.png',
  baseUrl: 'https://go-ui.com/',
  docsRoutePrefix: 'docs/',
  repoLink: {
    url: 'https://github.com/getgoui/go-ui',
    label: 'Github',
  },
  darkThemeSwitch: true,
  navbar: {
    main: [
      {
        url: '/guides/getting-started',
        label: 'Guides',
      },
      {
        url: '/docs/patterns',
        label: 'Patterns',
      },
      {
        url: '/docs/components',
        label: 'Components',
      },
      {
        url: '/get-involved',
        label: 'Get involved',
      },
    ] as INavItem[],
  },
  footer: {
    isDark: true,
    links: [
      {
        label: 'Documentation',
        children: [
          {
            label: 'Patterns',
            url: '/docs/patterns',
          },
          {
            label: 'Components',
            url: '/docs/components',
          },
        ],
      },
      {
        label: 'Get involved',
        children: [
          {
            label: 'Bug report',
            url: '/get-involved/bug-report',
          },
          {
            label: 'Feature request',
            url: '/get-involved/feature-request',
          },
          {
            label: 'Development guide',
            url: '/get-involved/development-guide',
          },
        ],
      },
      {
        label: 'Community',
        children: [
          {
            label: 'Discord',
            url: 'https://discord.gg/g7cuQAdPfS',
          },
          {
            label: 'Twitter',
            url: 'https://twitter.com/getgoui',
          },
        ],
      },
      {
        label: 'More',
        children: [
          {
            label: 'GitHub',
            url: 'https://github.com/getgoui/go-ui',
          },
        ],
      },
    ] as INavItem[],
    copyright: `
    <div>Built with <go-link href="https://stenciljs.com/" target="_blank" rel="noopener noreferrer">Stencil</go-link></div>
    <div>Illustration by <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6" target="_blank" rel="noopener noreferrer">Icons 8</a> from <a href="https://icons8.com/illustrations" target="_blank" rel="noopener noreferrer">Ouch!</a></div>
    `,
    bottom: ``,
  },
  algolia: {
    // The application ID provided by Algolia
    appId: 'HNTM91YDD1',
    // Public API key: it is safe to commit it
    apiKey: 'ab1e5977dd71b391791fd44a83fe80ef',
    indexName: 'go-ui',
  },
  sidebar: {
    componentPrefix: 'go-',
    /**
     * Convert tag to human-friendly label, default: [startCase](https://lodash.com/docs/4.17.15#startCase)
     * @param tag component tag
     */
    tagToLabel(tag: string): string {
      return startCase(tag.replace(this.componentPrefix, ''));
    },
  },
  demo: {
    head: `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />`,
    styles: ['/assets/demo/build/go-ui.css'],
    scripts: [
      {
        src: '/assets/demo/build/go-ui.esm.js',
        attrs: 'type="module"',
      },
      {
        src: '/assets/demo/build/go-ui.js',
        attrs: 'nomodule',
      },
    ],
  },
  social: {
    twitter: '@getgoui',
  },
};

export type SiteConfig = typeof siteConfig;
export default siteConfig;
