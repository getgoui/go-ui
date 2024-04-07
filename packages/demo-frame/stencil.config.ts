import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const isDev: boolean = process.argv && process.argv.indexOf('--dev') > -1;

export const config: Config = {
  namespace: 'demo-frame',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  taskQueue: 'async',
  plugins: [
    sass({
      injectGlobalPaths: ['node_modules/@go-ui/core/src/global/scss/_utils.scss'],
    }),
  ],
  rollupPlugins: { after: [nodePolyfills()] },
};
