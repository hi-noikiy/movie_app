// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'normalize.css'
import Confirm from '@/components/Confirm/Confirm.js'
import Api from '@/Api/Api'
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false;
Vue.use(Confirm);

Vue.prototype.$Api = Api;
Vue.prototype.$ImgUrl = Api.getImgUrl();

Vue.mixin({
  methods: {
    linkTo(name) {
      this.$router.push({name})
    },

    linkToUrl(url) {
      this.$router.push(url)
    },

    updateUserDetail() {
      this.$Api.getUserDetails().then((res) => {
        console.log(res)
        if(res.q.s == 0) {
          let json = JSON.stringify(res.q.user);
          sessionStorage.setItem('user', json);
        }
      })
    },

    getUserStorage() {
      let json = sessionStorage.getItem('user');
      if(json) {
        return JSON.parse(json);
      }else {
        return false;
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  console.log('从' + from.name + '跳到' + to.name);
  next() // 确保一定要调用 next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
