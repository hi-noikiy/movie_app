import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'url';

// //首页
// import Index from '@/pages/Index/Index'
// //约电影
// import Meet from '@/pages/Meet/Meet'
// //约电影设置
// import Setting from '@/pages/Setting/Setting'
// //个人资料
// import Person from '@/pages/Person/Person'
// //电影详情
// import Movie from '@/pages/Movie/Movie'
// //我的中心
// import Mine from '@/pages/Mine/Mine'
// //评论详情
// import Comment from '@/pages/Comment/Comment'
// //添加评论
// import AddComment from '@/pages/AddComment/AddComment'
// //我的关注
// import Collect from '@/pages/Collect/Collect'
// //我的中心-排行
// import Rank from '@/pages/Rank/Rank'
// //我的好友
// import Friend from '@/pages/Friend/Friend'
// //添加好友
// import Friending from '@/pages/Friending/Friending'
// //我的积分
// import Points from '@/pages/Points/Points'
// //签到
// import Sign from '@/pages/Sign/Sign'
// //我的卡券
// import CardList from '@/pages/CardList/CardList'
// //我的票根
// import Ticket from '@/pages/Ticket/Ticket'
// //我的约影
// import Dating from '@/pages/Dating/Dating'
// //我的消息
// import Message from '@/pages/Message/Message'
// //晒票根
// import UploadTicket from '@/pages/UploadTicket/UploadTicket'
// //票根通过
// import UploadResult from '@/pages/UploadResult/UploadResult'
// //我的影评
// import MyComment from '@/pages/MyComment/MyComment'
// //核销记录
// import Record from '@/pages/Record/Record'
// //积分记录
// import Stream from '@/pages/Stream/Stream'
// //积分商城
// import Store from '@/pages/Store/Store'
// //商品详情
// import Goods from '@/pages/Goods/Goods'
// //全部门店
// import Merchants from '@/pages/Merchants/Merchants'
// //编辑个人资料
// import Edit from '@/pages/Edit/Edit'
// //玩游戏
// import Game from '@/pages/Game/Game'
// //玩游戏
// import Signature from '@/pages/Signature/Signature'
// //回复评论
// import ReplyComment from '@/pages/ReplyComment/ReplyComment'
// //登录
// import Login from '@/pages/Login/Login'
// //添加好友申请
// import AddFriend from '@/pages/AddFriend/AddFriend'
// //多选列表
// import CheckList from '@/pages/CheckList/CheckList'

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
      meta: {
        title: '首页'
      },
      component: resolve => require(['@/pages/Index/Index'], resolve)
    },
    {
      path: '/meet',
      name: 'Meet',
      meta: {
        title: '约影'
      },
      component: resolve => require(['@/pages/Meet/Meet'], resolve)
    },
    {
      path: '/setting',
      name: 'Setting',
      meta: {
        title: '设置'
      },
      component: resolve => require(['@/pages/Setting/Setting'], resolve)
    },
    {
      path: '/person',
      name: 'Person',
      meta: {
        title: '个人资料'
      },
      component: resolve => require(['@/pages/Person/Person'], resolve)
    },
    {
      path: '/movie',
      name: 'Movie',
      meta: {
        title: '电影详情'
      },
      component: resolve => require(['@/pages/Movie/Movie'], resolve)
    },
    {
      path: '/mine',
      name: 'Mine',
      meta: {
        title: '我的中心'
      },
      component: resolve => require(['@/pages/Mine/Mine'], resolve)
    },
    {
      path: '/comment',
      name: 'Comment',
      meta: {
        title: '评论'
      },
      component: resolve => require(['@/pages/Comment/Comment'], resolve)
    },
    {
      path: '/addComment',
      name: 'AddComment',
      meta: {
        title: '发布评论'
      },
      component: resolve => require(['@/pages/AddComment/AddComment'], resolve)
    },
    {
      path: '/collect',
      name: 'Collect',
      meta: {
        title: '我的关注'
      },
      component: resolve => require(['@/pages/Collect/Collect'], resolve)
    },
    {
      path: '/rank',
      name: 'Rank',
      meta: {
        title: '排行榜'
      },
      component: resolve => require(['@/pages/Rank/Rank'], resolve)
    },
    {
      path: '/friend',
      name: 'Friend',
      meta: {
        title: '好友'
      },
      component: resolve => require(['@/pages/Friend/Friend'], resolve)
    },
    {
      path: '/friending',
      name: 'Friending',
      meta: {
        title: '好友'
      },
      component: resolve => require(['@/pages/Friending/Friending'], resolve)
    },
    {
      path: '/points',
      name: 'Points',
      meta: {
        title: '积分'
      },
      component: resolve => require(['@/pages/Points/Points'], resolve)
    },
    {
      path: '/sign',
      name: 'Sign',
      meta: {
        title: '签到'
      },
      component: resolve => require(['@/pages/Sign/Sign'], resolve)
    },
    {
      path: '/cardList',
      name: 'CardList',
      meta: {
        title: '我的卡券'
      },
      component: resolve => require(['@/pages/CardList/CardList'], resolve)
    },
    {
      path: '/ticket',
      name: 'Ticket',
      meta: {
        title: '我的票根'
      },
      component: resolve => require(['@/pages/Ticket/Ticket'], resolve)
    },
    {
      path: '/dating',
      name: 'Dating',
      meta: {
        title: '我的约影'
      },
      component: resolve => require(['@/pages/Dating/Dating'], resolve)
    },
    {
      path: '/message',
      name: 'Message',
      meta: {
        title: '我的信息'
      },
      component: resolve => require(['@/pages/Message/Message'], resolve)
    },
    {
      path: '/uploadTicket',
      name: 'UploadTicket',
      meta: {
        title: '上传票根'
      },
      component: resolve => require(['@/pages/UploadTicket/UploadTicket'], resolve)
    },
    {
      path: '/uploadResult',
      name: 'UploadResult',
      meta: {
        title: '上传票根'
      },
      component: resolve => require(['@/pages/UploadResult/UploadResult'], resolve)
    },
    {
      path: '/myComment',
      name: 'MyComment',
      meta: {
        title: '我的评论'
      },
      component: resolve => require(['@/pages/MyComment/MyComment'], resolve)
    },
    {
      path: '/record',
      name: 'Record',
      meta: {
        title: '核销记录'
      },
      component: resolve => require(['@/pages/Record/Record'], resolve)
    },
    {
      path: '/stream',
      name: 'Stream',
      meta: {
        title: '积分记录'
      },
      component: resolve => require(['@/pages/Stream/Stream'], resolve)
    },
    {
      path: '/store',
      name: 'Store',
      meta: {
        title: '卡券商城'
      },
      component: resolve => require(['@/pages/Store/Store'], resolve)
    },
    {
      path: '/goods',
      name: 'Goods',
      meta: {
        title: '卡券详情'
      },
      component: resolve => require(['@/pages/Goods/Goods'], resolve)
    },
    {
      path: '/merchants',
      name: 'Merchants',
      meta: {
        title: '门店'
      },
      component: resolve => require(['@/pages/Merchants/Merchants'], resolve)
    },
    {
      path: '/edit',
      name: 'Edit',
      meta: {
        title: '编辑'
      },
      component: resolve => require(['@/pages/Edit/Edit'], resolve)
    },
    {
      path: '/game',
      name: 'Game',
      meta: {
        title: '游戏'
      },
      component: resolve => require(['@/pages/Game/Game'], resolve)
    },
    {
      path: '/signature',
      name: 'Signature',
      meta: {
        title: '填写签名'
      },
      component: resolve => require(['@/pages/Signature/Signature'], resolve)
    },
    {
      path: '/replyComment',
      name: 'ReplyComment',
      meta: {
        title: '填写评论'
      },
      component: resolve => require(['@/pages/ReplyComment/ReplyComment'], resolve)
    },
    {
      path: '/addFriend',
      name: 'AddFriend',
      meta: {
        title: '添加好友'
      },
      component: resolve => require(['@/pages/AddFriend/AddFriend'], resolve)
    },
    {
      path: '/checkList',
      name: 'CheckList',
      meta: {
        title: '选择'
      },
      component: resolve => require(['@/pages/CheckList/CheckList'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: resolve => require(['@/pages/Login/Login'], resolve)
    },
    {
      path: '/getPoints',
      name: 'GetPoints',
      meta: {
        title: '获得积分'
      },
      component: resolve => require(['@/pages/GetPoints/GetPoints'], resolve)
    },
    {
      path: '/search',
      name: 'Search',
      meta: {
        title: '搜索'
      },
      component: resolve => require(['@/pages/Search/Search'], resolve)
    },
    {
      path: '/IM',
      name: 'IM',
      meta: {
        title: '聊天'
      },
      component: resolve => require(['@/pages/IM/IM'], resolve)
    },
    {
      path: '/code',
      name: 'Code',
      meta: {
        title: '验证'
      },
      component: resolve => require(['@/pages/Code/Code'], resolve)
    },
    {
      path: '/presentPoints',
      name: 'PresentPoints',
      meta: {
        title: '赠送积分'
      },
      component: resolve => require(['@/pages/PresentPoints/PresentPoints'], resolve)
    },
    {
      path: '/presentCoupon',
      name: 'PresentCoupon',
      meta: {
        title: '赠送卡券'
      },
      component: resolve => require(['@/pages/PresentCoupon/PresentCoupon'], resolve)
    },
    {
      path: '/phoneCode',
      name: 'PhoneCode',
      meta: {
        title: '验证手机'
      },
      component: resolve => require(['@/pages/PhoneCode/PhoneCode'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '注册手机'
      },
      component: resolve => require(['@/pages/Register/Register'], resolve)
    },
    {
      path: '/forget',
      name: 'Forget',
      meta: {
        title: '忘记密码'
      },
      component: resolve => require(['@/pages/Forget/Forget'], resolve)
    },
    {
      path: '/setPassword',
      name: 'SetPassword',
      meta: {
        title: '忘记密码'
      },
      component: resolve => require(['@/pages/SetPassword/SetPassword'], resolve)
    },
    {
      path: '/exchange',
      name: 'Exchange',
      meta: {
        title: '兑换'
      },
      component: resolve => require(['@/pages/Exchange/Exchange'], resolve)
    },
    {
      path: '/address',
      name: 'Address',
      meta: {
        title: '收货地址'
      },
      component: resolve => require(['@/pages/Address/Address'], resolve)
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  }
})
