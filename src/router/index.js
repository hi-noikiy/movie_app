import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Meet from '@/pages/Meet/Meet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index 
    },
    {
      path: '/meet',
      name: 'Meet',
      component: Meet
    }
  ]
})
