import Vue from 'vue'
import VueRouter from 'vue-router'
import Cabinet from '../views/Cabinet.vue';
import MainEvent from '../views/MainEvent.vue';
import EditPage from '../views/EditPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/event/:id',
    name: 'Event',
    component: MainEvent
  },
  {
    path: '/cabinet/guest/:id',
    name: 'EditPage',
    component: EditPage,
  },
  {
    path: '/cabinet/subevent/:id',
    name: 'EditPage',
    component: EditPage,
  },
  {
    path: '/cabinet',
    name: 'Cabinet',
    component: Cabinet,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
