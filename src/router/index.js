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
      path:'/show/:id',
      component:ShowParent,
      meta:{title:'震元母婴护理中心'}
      // children:[
      //   {path:'',name:'ShowDtl',component:ShowDtl,meta:{title:'展示'}}
      // ]
    },
    {
      path: '/account',
      component: AccountParent,
      children:[
        {path:'',name :'ClubService',component: ClubService,meta:{requireAuth:true,title:'会所服务'}},
        {path:"growthrecord",name :'GrowthRecord',component: GrowthRecord,meta:{requireAuth:true,title:'成长记录'}},
        {path:"healthmom",name :'HealthMom',component: HealthMom,meta:{requireAuth:true,title:'健康妈妈'}},
        {path:"myaccount",name :'MyAccount',component: MyAccount,meta:{requireAuth:true,title:'会员中心'}}
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

