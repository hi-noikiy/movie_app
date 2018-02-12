// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Api from '@/Api/Api'
import Confirm from '@/components/Confirm/Confirm.js'

Vue.config.productionTip = false;
Vue.use(Confirm);
Vue.prototype.$Api = Api;
Vue.prototype.$ImgUrl = Api.getImgUrl();

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next(); // 确保一定要调用 next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
