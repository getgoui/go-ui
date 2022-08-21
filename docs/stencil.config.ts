import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import siteConfig from './config';

export const config: Config = {
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
