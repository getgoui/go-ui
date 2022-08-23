import { INavItem } from '@go-ui/core/dist/types/interfaces';
import startCase from 'lodash.startcase';

const siteConfig = {
  name: 'Go UI',
  tagline: 'A design system for everyone.',
  logo: '/assets/img/logo.svg',
  logoDark: '/assets/img/logo.svg',
  baseUrl: 'https://go-ui.com/',
  repoLink: {
    url: 'https://github.com/getgoui/go-ui',
    label: 'Github',
  },
  darkThemeSwitch: false,
  navbar: {
    main: [
      // {
      //   url: '/docs/guides/getting-started',
      //   label: 'Guides',
      // },
      {
        url: '/docs/patterns',
        label: 'Patterns',
      },
      {
        url: '/docs/components',
        label: 'Components',
      },
      // {
      //   url: '/docs/get-involved/introduction',
      //   label: 'Get involved',
      // },
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
            url: '/patterns/introduction',
          },
          {
            label: 'Components',
            url: '/components/introduction',
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
        items: [
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
        items: [
          {
            label: 'Blog',
            url: '/blog',
          },
          {
            label: 'GitHub',
            url: 'https://github.com/getgoui/go-ui',
          },
        ],
      },
    ] as INavItem[],
    copyright: `
    <small>Built with <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a></small>
    <br />
    <small>Illustration by <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6" target="_blank" rel="noopener noreferrer">Icons 8</a> from <a href="https://icons8.com/illustrations" target="_blank" rel="noopener noreferrer">Ouch!</a></small>
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
};

export type SiteConfig = typeof siteConfig;
export default siteConfig;
