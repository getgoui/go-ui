import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil-community/postcss';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
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
      excludeComponents: ['duet-date-picker'],
      outDir: '../react/src/components/stencil-generated',
    }),
    vueOutputTarget({
      componentCorePackage: '@go-ui/core',
      proxiesFile: '../vue/src/components.ts',
      // customElementsDir: 'dist/components',
      excludeComponents: ['duet-date-picker', 'go-radio'],
      componentModels: [
        {
          elements: ['go-input', 'go-textarea'],
          event: 'input',
          targetAttr: 'value',
        },
        {
          elements: ['go-checkbox', 'go-switch'],
          event: 'change',
          targetAttr: 'checked',
        },
        {
          elements: ['go-datepicker', 'go-select'],
          event: 'gochange',
          externalEvent: 'gochange',
          targetAttr: 'value',
        },
      ],
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      generateTypeDeclarations: true,
      externalRuntime: false,
    },
    {
      type: 'www',
      serviceWorker: false,
      dir: '../../docs/src/assets/demo/',
    },
    {
      type: 'docs-json',
      file: 'docs/go-ui.json',
    },
  ],
  globalStyle: 'src/global/styles.scss',
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/scss/_utils.scss'],
    }),
    postcss({
      plugins: [
        postcssImport({
          resolve: (id: string) => {
            // Handle ~ prefix for node_modules
            if (id.startsWith('~')) {
              return id.substring(1);
            }
            return id;
          },
        }),
        postcssMixins(),
        postcssNested(),
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
