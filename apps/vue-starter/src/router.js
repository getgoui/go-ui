import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('./pages/Home.vue');
const Display = () => import('./pages/Display.vue');
const Form = () => import('./pages/Form.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/display', component: Display },
  { path: '/form', component: Form },
];

export default createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
