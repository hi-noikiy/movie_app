// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import { NumberKeyboard,ImagePreview } from 'vant';
import store from './store'
import router from './router'
import Confirm from '@/components/Confirm/Confirm.js'
import Api from '@/Api/Api'
import { mapGetters,mapActions } from 'vuex';

import './scss/base.scss';
import 'normalize.css';
import 'swiper/dist/css/swiper.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(Confirm);
Vue.use(NumberKeyboard); //核销手机的数字键盘
window.Vue = Vue;

//图片loading效果
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIklEQVQ4y2P8+vXrfwYqAiZqGjZq4KiBowaOGjhq4FAyEAD1agQGU7dgRgAAAABJRU5ErkJggg==',
  loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIklEQVQ4y2P8+vXrfwYqAiZqGjZq4KiBowaOGjhq4FAyEAD1agQGU7dgRgAAAABJRU5ErkJggg==',
  attempt: 1
})

//配置图片url
Vue.prototype.$ImagePreview = ImagePreview;
Vue.prototype.$Api = Api;
Vue.prototype.$ImgUrl = Api.getImgUrl();

//组件通用方法
Vue.mixin({
  methods: {
    linkTo(name, ctr) {
      if(ctr && this.isVisitor) {
        this.$router.push({
          name: 'Login'
        })
        return false;
      }
      this.$router.push({name})
    },

    linkToUrl(url, ctr) {
      if(ctr && this.isVisitor) {
        this.$router.push({
          name: 'Login'
        })
        return false;
      }
      this.$router.push(url)
    },

    checkIsVisitor() {
      if(this.isVisitor) {
        this.$router.push({
          name: 'Register',
          query: {
            'type': 'init'
          }
        })
        return true;
      }else {
        return false;
      }
    },

    getUserStorage() {
      let json = sessionStorage.getItem('user');
      if(json) {
        return JSON.parse(json);
      }else {
        return false;
      }
    },

    ...mapActions([
      'initUserDetail', //初始化用户信息
      'updateUserDetail', //更新用户信息
      'utilUserDetail'    //知道用户信息存在
    ])
  },
  
  computed: {
    ...mapGetters([
      'userDetail',
      'visitorDetail',
      'isVisitor'
    ])
  },
})

router.beforeEach((to, from, next) => {
  // store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next() // 确保一定要调用 next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
