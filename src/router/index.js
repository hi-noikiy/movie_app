import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Meet from '@/pages/Meet/Meet'
import Setting from '@/pages/Setting/Setting'
import Person from '@/pages/Person/Person'
import Movie from '@/pages/Movie/Movie'
import Mine from '@/pages/Mine/Mine'
import Comment from '@/pages/Comment/Comment'
import AddComment from '@/pages/AddComment/AddComment'
import Collect from '@/pages/Collect/Collect'
import Rank from '@/pages/Rank/Rank'
import Friend from '@/pages/Friend/Friend'
import Friending from '@/pages/Friending/Friending'

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
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/addComment',
      name: 'AddComment',
      component: AddComment
    },
    {
      path: '/collect',
      name: 'Collect',
      component: Collect
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/friend',
      name: 'Friend',
      component: Friend
    },
    {
      path: '/friending',
      name: 'Friending',
      component: Friending
    }
  ]
})
