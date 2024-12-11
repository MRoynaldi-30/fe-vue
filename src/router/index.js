import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/loginPage.vue';
import Register from '../views/registerPage.vue';
import Home from '../views/homePage.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/home', name: 'Home', component: Home },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
