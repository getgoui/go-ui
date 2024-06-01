import { GoUi } from "@go-ui/vue";

export default defineNuxtPlugin((nuxtApp) => {
  // @ts-ignore
  nuxtApp.vueApp.use(GoUi);
});
