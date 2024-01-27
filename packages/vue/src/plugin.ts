import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from '@go-ui/core/loader';

export const GoUi: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
