import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'go-ui',
  rollupPlugins: {
    after: [nodePolyfills()],
  },
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@go-ui/core',
      proxiesFile: '../react/src/components/stencil-generated/index.ts',
      includeImportCustomElements: true,
      customElementsDir: 'dist/components',
    }),
    vueOutputTarget({
      componentCorePackage: '@go-ui/core',
      proxiesFile: '../vue/src/components.ts',
      includeImportCustomElements: true,
      customElementsDir: 'dist/components',
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
      generateTypeDeclarations: true,
    },
    {
      type: 'www',
      serviceWorker: false,
      dir: '../../docs/src/assets/demo/',
    },
    {
      type: 'docs-json',
      file: 'dist/docs/go-ui.json',
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
          replace: true,
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
    moduleNameMapper: {
      'lodash-es': 'lodash',
    },
  },
};
