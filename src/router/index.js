import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/loginPage.vue';
import Register from '../views/registerPage.vue';
import Home from '../views/homePage.vue';
import AddGuest from '@/views/addGuest.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requiresGuest: true } }, // Hanya untuk guest
  { path: '/register', name: 'Register', component: Register, meta: { requiresGuest: true } }, // Hanya untuk guest
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } }, // Hanya untuk user login
  { path: '/add', name: 'Add', component: AddGuest, meta: { requiresAuth: true } }, // Hanya untuk user login
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware untuk melindungi rute
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Cek apakah token ada di localStorage

  if (to.meta.requiresAuth && !token) {
    // Jika rute butuh login tapi belum login
    next('/login'); // Arahkan ke login
  } else if (to.meta.requiresGuest && token) {
    // Jika rute hanya untuk guest tapi sudah login
    next('/home'); // Arahkan ke home
  } else {
    // Jika tidak ada kondisi yang terpenuhi, izinkan akses ke rute
    next();
  }
});

export default router;
