import { createApp } from 'vue';
import App from './App.vue';
import '@go-ui/vue/dist/go-ui.css';
import { ComponentLibrary } from '@go-ui/vue';

createApp(App).use(ComponentLibrary).mount('#app');
