import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import siteConfig from './config';

const isDev: boolean = process.argv && process.argv.indexOf('--dev') > -1;

export const config: Config = {
  env: {
    baseUrl: isDev ? '/' : siteConfig.baseUrl,
  },
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  plugins: [
    sass({
      injectGlobalPaths: ['node_modules/@go-ui/core/src/global/scss/_utils.scss'],
    }),
  ],
  outputTargets: [
    {
      type: 'www',
      baseUrl: siteConfig.baseUrl,
      prerenderConfig: './prerender.config.ts',
      serviceWorker: false,
    },
  ],
};
