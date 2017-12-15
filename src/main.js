// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'normalize.css'
import Confirm from '@/components/Confirm/Confirm.js'

Vue.config.productionTip = false
Vue.use(Confirm);

Vue.mixin({
  methods: {
    linkTo(name) {
      this.$router.push({name})
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
