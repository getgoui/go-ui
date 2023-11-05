import { createApp } from 'vue';
import App from './App.vue';
import '@go-ui/core/dist/go-ui/go-ui.css';
import { ComponentLibrary } from '@';

createApp(App).use(ComponentLibrary).mount('#app');
