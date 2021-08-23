const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Gov DS',
  tagline: 'A pattern-first design system focused on a11y.',
  url: 'https://gov.components.style',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'gov-components', // Usually your GitHub org/user name.
  projectName: 'gov-components', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Gov DS',
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
          href: 'https://github.com/gov-components/gov-components',
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
              label: 'Tutorial',
              to: '/docs/intro',
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
              href: 'https://twitter.com/gov-components',
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
              href: 'https://github.com/gov-components/gov-components',
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
