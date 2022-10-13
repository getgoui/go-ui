import minimist from 'minimist';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { SiteConfig } from '../../template/.gopress/interfaces/config.type';
import chalk from 'chalk';
import startCase from 'lodash.startcase';

const defaultConfig = {
  name: 'GoPress',
  tagline: 'Static site generator',
  logo: '/assets/img/logo.svg',
  logoDark: '/assets/img/logo.svg',
  logoSocial: '/assets/img/logo-padded.png',
  baseUrl: 'https://go-ui.com/',
  docsRoutePrefix: 'docs/',
  head: '',
  repoLink: {
    url: 'https://github.com/getgoui/go-ui',
    label: 'Github',
  },
  darkThemeSwitch: true,
  navbar: {
    main: [
      {
        url: '#',
        label: 'Main nav link 1',
      },
      {
        url: '#',
        label: 'Main nav link 2',
      },
    ],
  },
  footer: {
    isDark: true,
    links: [
      {
        label: 'Footer links',
        children: [
          {
            label: 'Link 1',
            url: '#',
          },
          {
            label: 'Link 2',
            url: '#',
          },
        ],
      },
    ],
    copyright: `
    <div>Built with <go-link href="https://go-ui.com/" target="_blank" rel="noopener noreferrer">Go UI</go-link></div>
    `,
    bottom: ``,
  },
  sidebar: {
    componentPrefix: '',
    tagToLabel(tag: string): string {
      return startCase(tag.replace(this.componentPrefix, ''));
    },
  },
  demo: {
    head: ``,
    styles: [],
    scripts: [],
  },
  social: {
    twitter: '@getgoui',
  },
};

export async function loadConfig(): Promise<SiteConfig> {
  const args = minimist(process.argv.slice(2));
  const dir = args.dir || process.cwd();
  const configFilePath = path.resolve(dir, 'gopress.config.js');

  if (!fs.existsSync(configFilePath)) {
    console.log(chalk.yellow('gopress.config.js file not found, using default config'));
    return defaultConfig;
  }

  const config = await import(pathToFileURL(configFilePath).toString());
  const userConf = config.default as SiteConfig;
  if (!userConf) {
    return defaultConfig;
  }
  let result = Object.assign(defaultConfig, userConf);
  if (userConf.algolia) {
    result.head += `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
<script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
    `;
  }
}
