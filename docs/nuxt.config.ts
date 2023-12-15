// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@docsearch/js@3',
          defer: true,
        },
      ],
    },
  },
  css: ['@go-ui/vue/dist/go-ui.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/node_modules/@go-ui/vue/dist/scss/_utils.scss";',
        },
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
});
