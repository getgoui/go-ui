const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Go Components',
  tagline: 'A pattern-first, framework-agnostic, a11y-focused, open source design system.',
  url: 'https://go.components.style',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'go-components', // Usually your GitHub org/user name.
  projectName: 'go-components', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Go Components',
      logo: {
        alt: '',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'patterns/intro',
          position: 'left',
          label: 'Patterns',
        },
        {
          type: 'doc',
          docId: 'components/intro',
          position: 'left',
          label: 'Components',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
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
              to: '/docs/patterns/intro',
            },
            {
              label: 'Components',
              to: '/docs/components/intro',
            },
            {
              label: 'Patterns',
              to: '/docs/patterns/intro',
            },
          ],
        },
        {
          title: 'Contributing',
          items: [
            {
              label: 'Development guide',
              to: '/development-guide/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discordapp.com/',
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
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
          remarkPlugins: [require('remark-code-import')],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
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
    // '@docusaurus/theme-live-codeblock',
  ],
};
