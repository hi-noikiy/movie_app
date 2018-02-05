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

import 'normalize.css'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(Confirm);
Vue.use(NumberKeyboard);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIklEQVQ4y2P8+vXrfwYqAiZqGjZq4KiBowaOGjhq4FAyEAD1agQGU7dgRgAAAABJRU5ErkJggg==',
  loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAC4jAAAuIwF4pT92AAAAIklEQVQ4y2P8+vXrfwYqAiZqGjZq4KiBowaOGjhq4FAyEAD1agQGU7dgRgAAAABJRU5ErkJggg==',
  attempt: 1
})

// Vue.config.devtools = true
Vue.prototype.$ImagePreview = ImagePreview;
Vue.prototype.$Api = Api;
Vue.prototype.$ImgUrl = Api.getImgUrl();

Vue.mixin({
  created() {
    // try {
    //   this.initUserDetail();
    // } catch (error) {
    //   console.log(error);
    // }
  },
  methods: {
    linkTo(name) {
      this.$router.push({name})
    },

    linkToUrl(url) {
      this.$router.push(url)
    },

    // updateUserDetail() {
    //   this.$Api.getUserDetails().then((res) => {
    //     console.log(res)
    //     if(res.q.s == 0) {
    //       let json = JSON.stringify(res.q.user);
    //       sessionStorage.setItem('user', json);
    //     }
    //   })
    // },

    getUserStorage() {
      let json = sessionStorage.getItem('user');
      if(json) {
        return JSON.parse(json);
      }else {
        return false;
      }
    },

    ...mapActions([
      'initUserDetail',
      'updateUserDetail',
      'utilUserDetail'
    ])
  },
  
  computed: {
    ...mapGetters([
      'userDetail'
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

router.afterEach(function (to) {
  // store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
