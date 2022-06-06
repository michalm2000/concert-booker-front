import Vue from 'vue'
import VueRouter from 'vue-router'
import VenueMap from '../VenueMap.vue'
import EventTiles from '../components/EventTiles.vue'
import VenuesComponent from '../components/VenuesComponent.vue'
import EventsComponent from '../components/EventsComponent.vue'
import LoginView from '../views/Login.vue';
import RegisterView from '../views/Register.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'events',
    component: EventTiles
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/event/:id',
    name: 'map',
    component: VenueMap
  },
  {
    path: '/venues',
    name: 'venues',
    component: VenuesComponent
  },
  {
    path: '/events',
    name: 'events-management',
    component: EventsComponent
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
