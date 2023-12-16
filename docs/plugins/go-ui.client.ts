import { ComponentLibrary } from '@go-ui/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ComponentLibrary);
});
