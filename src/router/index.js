import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BindPhone from '@/components/BindPhone'
import Test from '@/components/Test'
import AccountParent from '@/components/account/AccountParent'
import GrowthRecord from '@/components/account/GrowthRecord'
import MyAccount from '@/components/account/MyAccount'
import ShowParent from '@/components/show/ShowParent'
import ShowDtl from '@/components/show/ShowDtl'

import {getCookie} from '../utils/cookie-util'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/show/:type/:id',
      component:ShowParent,
      meta:{title:'震元母婴护理中心'}
    },
    {
      path: '/account',
      component: AccountParent,
      children:[
        {path:'growthrecord',name :'GrowthRecord',component: GrowthRecord,meta:{requireAuth:true,title:'成长记录',id:2}},
        {path:"myaccount",name :'MyAccount',component: MyAccount,meta:{requireAuth:true,title:'会员中心',id:4}}
      ]
    },
    {path: '/bind',name: 'BindPhone',component: BindPhone},
    {path:'/test',name: 'Test',component: Test}
  ]
})
// router.beforeEach(function(to,from,next){
//   let bind = getCookie("bind");
//   console.log(to.fullPath+to.meta.requireAuth);
//   if(to.meta.requireAuth && (!bind || bind=='-1')){
//     next({name:'BindPhone',query:{redirect:to.fullPath}});
//   }else{
//     next();
//   }
// })

export default router

