// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { WechatPlugin,ToastPlugin } from 'vux'

import api from '@/utils/api'
import errorHandle from '@/utils/errorHandle'

Vue.config.productionTip = false

Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(api)
Vue.use(errorHandle)

Vue.prototype.instance = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

