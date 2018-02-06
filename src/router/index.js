import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BindPhone from '@/components/BindPhone'
import Test from '@/components/Test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/bind',
      name: 'BindPhone',
      component: BindPhone
    },
    {
      path:'/test',
      name: 'Test',
      component: Test
    }
  ]
})
