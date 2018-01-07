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
    {
      path: '/uploadResult',
      name: 'UploadResult',
      component: UploadResult
    },
    {
      path: '/myComment',
      name: 'MyComment',
      component: MyComment
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/stream',
      name: 'Stream',
      component: Stream
    },
    {
      path: '/store',
      name: 'Store',
      component: Store
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/merchants',
      name: 'Merchants',
      component: Merchants
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/signature',
      name: 'Signature',
      component: Signature
    },
    {
      path: '/replyComment',
      name: 'ReplyComment',
      component: ReplyComment
    },
    {
      path: '/addFriend',
      name: 'AddFriend',
      component: AddFriend
    },
    {
      path: '/checkList',
      name: 'CheckList',
      component: CheckList
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
