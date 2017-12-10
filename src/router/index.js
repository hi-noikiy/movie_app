import Vue from 'vue'
import Router from 'vue-router'

//首页
import Index from '@/pages/Index/Index'
//约电影
import Meet from '@/pages/Meet/Meet'
//约电影设置
import Setting from '@/pages/Setting/Setting'
//个人资料
import Person from '@/pages/Person/Person'
//电影详情
import Movie from '@/pages/Movie/Movie'
//我的中心
import Mine from '@/pages/Mine/Mine'
//评论详情
import Comment from '@/pages/Comment/Comment'
//添加评论
import AddComment from '@/pages/AddComment/AddComment'
//我的关注
import Collect from '@/pages/Collect/Collect'
//我的中心-排行
import Rank from '@/pages/Rank/Rank'
//我的好友
import Friend from '@/pages/Friend/Friend'
//添加好友
import Friending from '@/pages/Friending/Friending'
//我的积分
import Points from '@/pages/Points/Points'
//签到
import Sign from '@/pages/Sign/Sign'
//我的卡卷
import CardList from '@/pages/CardList/CardList'
//我的票根
import Ticket from '@/pages/Ticket/Ticket'
//我的约影
import Dating from '@/pages/Dating/Dating'
//我的消息
import Message from '@/pages/Message/Message'
//晒票根
import UploadTicket from '@/pages/UploadTicket/UploadTicket'

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
    },
    {
      path: '/points',
      name: 'Points',
      component: Points
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/cardList',
      name: 'CardList',
      component: CardList
    },
    {
      path: '/ticket',
      name: 'Ticket',
      component: Ticket
    },
    {
      path: '/dating',
      name: 'Dating',
      component: Dating
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/uploadTicket',
      name: 'UploadTicket',
      component: UploadTicket
    },
  ]
})
