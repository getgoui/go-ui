import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

export const config: Config = {
  namespace: 'go-ui',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'www',
      dir: 'docs/static/demo-assets',
      serviceWorker: null, // disable service workers
      copy: [{ src: 'demo.html', dest: 'demo.html' }],
    },
    {
      type: 'docs-json',
      file: 'docs/src/go-ui.json',
    },
  ],
  globalStyle: 'src/global/styles.scss',
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/scss/utils.scss'], // adds @import 'src/global/scss/utils.scss' statement
    }),
    postcss({
      plugins: [
        autoprefixer(),
        pxtorem({
          propList: ['*'],
          selectorBlackList: [':root', 'html', 'body'],
          replace: false,
        }),
      ],
    }),
  ],
  testing: {
    /**
     * Gitlab CI doesn't allow sandbox, therefor this parameters must be passed to your Headless Chrome
     * before it can run your tests
     */
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
  },
};
