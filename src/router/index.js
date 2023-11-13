import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Homepage.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Admin from '../views/admin/Admin.vue';
import Profile from '../views/Profile.vue';
import TripsListing from '../views/TripsListing.vue';
import SingleTrip from '../views/SingleTrip.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import store from '@/store/store.js'
Vue.use(Router);
const originalPush = Router.prototype.push 
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { guestOnly: true }
  },

  {
    path: '/trips',
    name: 'trips',
    component: TripsListing
  },

  {
    path: '/trip/:id',
    name: 'trip',
    component: SingleTrip
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { requiresAdmin: true }
  },
];

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const guestOnly = to.matched.some(record => record.meta.guestOnly);

  // Check localStorage for token and user role
  const tokenInLocalStorage = localStorage.getItem('token');
  const userInLocalStorage = JSON.parse(localStorage.getItem('user'));
  
  const isAuthenticated = tokenInLocalStorage;
  const isAdmin = userInLocalStorage && userInLocalStorage.role === 'admin';

  // Update store based on localStorage if necessary
  if (tokenInLocalStorage && !store.state.token) {
    store.commit('SET_USER_DATA', { token: tokenInLocalStorage, user: userInLocalStorage });
  }

  if (requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else if (requiresAdmin && !isAdmin) {
    next('/unauthorized'); // Redirect or show unauthorized page
  } else if (guestOnly && isAuthenticated) {
    next('/'); // Redirect authenticated users trying to access guest-only pages to home
  }
   
  else {
    next();
  }
});

export default router;