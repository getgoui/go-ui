import { Plugin } from 'vue';
import { defineCustomElements } from '@go-ui/core/dist/loader';

export const GoUi: Plugin = {
  async install() {
    defineCustomElements();
  },
};
