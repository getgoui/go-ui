import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import cssnano from 'cssnano';

export const config: Config = {
  namespace: 'go-utils',
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
      serviceWorker: null, // disable service workers
    },
  ],
  globalScript: 'src/global/global.ts',
  globalStyle: 'src/global/style.scss',
  plugins: [
    sass(),
    postcss({
      plugins: [
        autoprefixer(),
        pxtorem({
          propList: ['*'],
          selectorBlackList: [':root', 'html', 'body'],
          replace: false,
        }),
        cssnano({
          preset: ['default', { discardComments: { removeAll: true } }],
        }),
      ],
    }),
  ],
};
