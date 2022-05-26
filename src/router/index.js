import Vue from 'vue'
import VueRouter from 'vue-router'
import VenueMap from '../VenueMap.vue'
import EventTiles from '../components/EventTiles.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
