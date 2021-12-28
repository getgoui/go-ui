const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Go UI',
  tagline: 'A pattern-first, framework-agnostic, a11y-focused, open source design system.',
  url: 'https://go.components.style',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'go-components', // Usually your GitHub org/user name.
  projectName: 'go-components', // Usually your repo name.
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
            href: 'https://github.com/go-components/go-components',
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
                href: 'https://twitter.com/go-components',
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
                href: 'https://github.com/go-components/go-components',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()}  Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
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
          editUrl: 'https://github.com/go-components/go-components/edit/main/docs/',
          remarkPlugins: [require('remark-code-import')],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/go-components/go-components/edit/main/docs/blog/',
        },
        theme: {
          customCss: [require.resolve('./static/demo-assets/build/go-ui.css'), require.resolve('./src/css/custom.scss')],
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
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // ... Your options. https://github.com/easyops-cn/docusaurus-search-local#plugin-options
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexPages: true,
      },
    ],
    //   // '@docusaurus/theme-live-codeblock',
    //   './plugins/custom-hmr/custom-hmr.js',
  ],
  stylesheets: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
};
