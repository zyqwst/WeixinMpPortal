import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BindPhone from '@/components/BindPhone'
import Test from '@/components/Test'
import AccountParent from '@/components/account/AccountParent'
import ClubService from '@/components/account/ClubService'
import GrowthRecord from '@/components/account/GrowthRecord'
import HealthMom from '@/components/account/HealthMom'
import MyAccount from '@/components/account/MyAccount'

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
      path: '/account',
      component: AccountParent,
      children:[
        {path:'',name :'ClubService',component: ClubService,meta:{requireAuth:true}},
        {path:"growthrecord",name :'GrowthRecord',component: GrowthRecord,meta:{requireAuth:true}},
        {path:"healthmom",name :'HealthMom',component: HealthMom,meta:{requireAuth:true}},
        {path:"myaccount",name :'MyAccount',component: MyAccount,meta:{requireAuth:true}}
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

