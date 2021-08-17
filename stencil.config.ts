import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

export const config: Config = {
  namespace: 'gov-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'docs/gov-components.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  globalStyle: 'src/global/styles.scss',
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
      ],
    }),
  ],
};
