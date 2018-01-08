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
//票根通过
import UploadResult from '@/pages/UploadResult/UploadResult'
//我的影评
import MyComment from '@/pages/MyComment/MyComment'
//核销记录
import Record from '@/pages/Record/Record'
//积分记录
import Stream from '@/pages/Stream/Stream'
//积分商城
import Store from '@/pages/Store/Store'
//商品详情
import Goods from '@/pages/Goods/Goods'
//全部门店
import Merchants from '@/pages/Merchants/Merchants'
//编辑个人资料
import Edit from '@/pages/Edit/Edit'
//玩游戏
import Game from '@/pages/Game/Game'
//玩游戏
import Signature from '@/pages/Signature/Signature'
//回复评论
import ReplyComment from '@/pages/ReplyComment/ReplyComment'
//登录
import Login from '@/pages/Login/Login'
//添加好友申请
import AddFriend from '@/pages/AddFriend/AddFriend'
//多选列表
import CheckList from '@/pages/CheckList/CheckList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/pages/Index/Index'], resolve)
    },
    {
      path: '/meet',
      name: 'Meet',
      component: resolve => require(['@/pages/Meet/Meet'], resolve)
    },
    {
      path: '/setting',
      name: 'Setting',
      component: resolve => require(['@/pages/Setting/Setting'], resolve)
    },
    {
      path: '/person',
      name: 'Person',
      component: resolve => require(['@/pages/Person/Person'], resolve)
    },
    {
      path: '/movie',
      name: 'Movie',
      component: resolve => require(['@/pages/Movie/Movie'], resolve)
    },
    {
      path: '/mine',
      name: 'Mine',
      component: resolve => require(['@/pages/Mine/Mine'], resolve)
    },
    {
      path: '/comment',
      name: 'Comment',
      component: resolve => require(['@/pages/Comment/Comment'], resolve)
    },
    {
      path: '/addComment',
      name: 'AddComment',
      component: resolve => require(['@/pages/AddComment/AddComment'], resolve)
    },
    {
      path: '/collect',
      name: 'Collect',
      component: resolve => require(['@/pages/Collect/Collect'], resolve)
    },
    {
      path: '/rank',
      name: 'Rank',
      component: resolve => require(['@/pages/Rank/Rank'], resolve)
    },
    {
      path: '/friend',
      name: 'Friend',
      component: resolve => require(['@/pages/Friend/Friend'], resolve)
    },
    {
      path: '/friending',
      name: 'Friending',
      component: resolve => require(['@/pages/Friending/Friending'], resolve)
    },
    {
      path: '/points',
      name: 'Points',
      component: resolve => require(['@/pages/Points/Points'], resolve)
    },
    {
      path: '/sign',
      name: 'Sign',
      component: resolve => require(['@/pages/Sign/Sign'], resolve)
    },
    {
      path: '/cardList',
      name: 'CardList',
      component: resolve => require(['@/pages/CardList/CardList'], resolve)
    },
    {
      path: '/ticket',
      name: 'Ticket',
      component: resolve => require(['@/pages/Ticket/Ticket'], resolve)
    },
    {
      path: '/dating',
      name: 'Dating',
      component: resolve => require(['@/pages/Dating/Dating'], resolve)
    },
    {
      path: '/message',
      name: 'Message',
      component: resolve => require(['@/pages/Message/Message'], resolve)
    },
    {
      path: '/uploadTicket',
      name: 'UploadTicket',
      component: resolve => require(['@/pages/UploadTicket/UploadTicket'], resolve)
    },
    {
      path: '/uploadResult',
      name: 'UploadResult',
      component: resolve => require(['@/pages/UploadResult/UploadResult'], resolve)
    },
    {
      path: '/myComment',
      name: 'MyComment',
      component: resolve => require(['@/pages/MyComment/MyComment'], resolve)
    },
    {
      path: '/record',
      name: 'Record',
      component: resolve => require(['@/pages/Record/Record'], resolve)
    },
    {
      path: '/stream',
      name: 'Stream',
      component: resolve => require(['@/pages/Stream/Stream'], resolve)
    },
    {
      path: '/store',
      name: 'Store',
      component: resolve => require(['@/pages/Store/Store'], resolve)
    },
    {
      path: '/goods',
      name: 'Goods',
      component: resolve => require(['@/pages/Goods/Goods'], resolve)
    },
    {
      path: '/merchants',
      name: 'Merchants',
      component: resolve => require(['@/pages/Merchants/Merchants'], resolve)
    },
    {
      path: '/edit',
      name: 'Edit',
      component: resolve => require(['@/pages/Edit/Edit'], resolve)
    },
    {
      path: '/game',
      name: 'Game',
      component: resolve => require(['@/pages/Game/Game'], resolve)
    },
    {
      path: '/signature',
      name: 'Signature',
      component: resolve => require(['@/pages/Signature/Signature'], resolve)
    },
    {
      path: '/replyComment',
      name: 'ReplyComment',
      component: resolve => require(['@/pages/ReplyComment/ReplyComment'], resolve)
    },
    {
      path: '/addFriend',
      name: 'AddFriend',
      component: resolve => require(['@/pages/AddFriend/AddFriend'], resolve)
    },
    {
      path: '/checkList',
      name: 'CheckList',
      component: resolve => require(['@/pages/CheckList/CheckList'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/Login/Login'], resolve)
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
