const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Go UI',
  tagline: 'A design system for everyone.',
  url: 'https://go-ui.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
  organizationName: 'getgoui', // Usually your GitHub org/user name.
  projectName: 'go-ui', // Usually your repo name.
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      navbar: {
        title: 'Go UI',
        logo: {
          alt: '',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'guides/getting-started',
            position: 'left',
            label: 'Guides',
          },
          {
            type: 'doc',
            docId: 'patterns/introduction',
            position: 'left',
            label: 'Patterns',
          },
          {
            type: 'doc',
            docId: 'components/introduction',
            position: 'left',
            label: 'Components',
          },
          {
            type: 'doc',
            docId: 'get-involved/introduction',
            position: 'left',
            label: 'Get involved',
          },
          {
            href: 'https://github.com/getgoui/go-ui',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Patterns',
                to: '/docs/patterns/introduction',
              },
              {
                label: 'Components',
                to: '/docs/components/introduction',
              },
            ],
          },
          {
            title: 'Get involved',
            items: [
              {
                label: 'Bug report',
                to: '/docs/get-involved/bug-report',
              },
              {
                label: 'Feature request',
                to: '/docs/get-involved/feature-request',
              },
              {
                label: 'Development guide',
                to: '/docs/get-involved/development-guide',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/g7cuQAdPfS',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/getgoui',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/getgoui/go-ui',
              },
            ],
          },
        ],
        copyright: `
        <small>Built with <a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus</a></small>
        <br />
        <small>Illustration by <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6" target="_blank" rel="noopener noreferrer">Icons 8</a> from <a href="https://icons8.com/illustrations" target="_blank" rel="noopener noreferrer">Ouch!</a></small>
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

      algolia: {
        // The application ID provided by Algolia
        appId: 'HNTM91YDD1',
        // Public API key: it is safe to commit it
        apiKey: 'ab1e5977dd71b391791fd44a83fe80ef',
        indexName: 'go-ui',
      },
    }),
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarCollapsed: false,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/getgoui/go-ui/edit/main/docs/',
          remarkPlugins: [require('remark-code-import'), require('remark-mermaid-dataurl')],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/getgoui/go-ui/edit/main/docs/blog/',
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.scss')],
        },
        googleAnalytics: {
          trackingID: 'UA-222249493-1',
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    'docusaurus-plugin-includes',
    [
      'docusaurus-plugin-module-alias',
      {
        alias: {
          '@/components': path.resolve(__dirname, './src/components'),
          '@/go-ui': path.resolve(__dirname, '../src/'),
        },
      },
    ],
  ],
  stylesheets: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
};
