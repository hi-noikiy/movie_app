import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/game_1',
      name: 'Game_1',
      meta: {
        title: '大转盘'
      },
      component: resolve => require(['@/pages/Game/Game_1'], resolve)
    },
    {
      path: '/game_2',
      name: 'Game_2',
      meta: {
        title: '老虎机'
      },
      component: resolve => require(['@/pages/Game/Game_2'], resolve)
    },
    {
      path: '/game_3',
      name: 'Game_3',
      meta: {
        title: '砸金蛋'
      },
      component: resolve => require(['@/pages/Game/Game_3'], resolve)
    },
    {
      path: '/level',
      name: 'Level',
      meta: {
        title: '我的等级'
      },
      component: resolve => require(['@/pages/Level/Level'], resolve)
    },
    {
      path: '/agreement',
      name: 'Agreement',
      meta: {
        title: '用户协议'
      },
      component: resolve => require(['@/pages/Agreement/Agreement'], resolve)
    },
    {
      path: '/about',
      name: 'About',
      meta: {
        title: '关于我们'
      },
      component: resolve => require(['@/pages/About/About'], resolve)
    },
    {
      path: '/download',
      name: 'Download',
      meta: {
        title: '下载'
      },
      component: resolve => require(['@/pages/DownLoad/DownLoad'], resolve)
    }
  ]
})
