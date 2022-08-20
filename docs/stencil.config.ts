import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import siteConfig from './config';

export const config: Config = {
  globalStyle: 'node_modules/@go-ui/core/dist/go-ui/go-ui.css',
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
