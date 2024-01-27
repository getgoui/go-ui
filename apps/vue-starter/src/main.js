import { createApp } from 'vue';
import App from './App.vue';
import '@go-ui/vue/dist/go-ui.css';
import { GoUi } from '@go-ui/vue';
import router from './router';

createApp(App).use(GoUi).use(router).mount('#app');
