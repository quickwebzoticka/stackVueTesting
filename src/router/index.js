import Vue from 'vue'
import VueRouter from 'vue-router'
import first from '../components/tab-1'
import second from '../components/tab-2'
import third from '../components/tab-3'
import empty from '../components/empty'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'first',
      component: first
    },
    {
      path: '/second',
      name: 'second',
      component: second
    },
    {
      path: '/third',
      name: 'third',
      component: third
    },
    {
      path: '*',
      component: empty
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
