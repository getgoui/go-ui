import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from '@go-ui/core/dist/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};
