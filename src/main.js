// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { WechatPlugin,ToastPlugin } from 'vux'
import Vuex from 'vuex'
import 'vue-event-calendar/dist/style.css' 
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar) 
Vue.use(require('vue-wechat-title'))



require('./mock.js')
import api from '@/api/api'
import errorHandle from '@/utils/errorHandle'
import store from '@/vuex/store'


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(api)
Vue.use(errorHandle)
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.prototype.instance = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

