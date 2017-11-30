import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Meet from '@/pages/Meet/Meet'
import Setting from '@/pages/Setting/Setting'
import Person from '@/pages/Person/Person'
import Movie from '@/pages/Movie/Movie'

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
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/person',
      name: 'Person',
      component: Person
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie
    }
  ]
})
