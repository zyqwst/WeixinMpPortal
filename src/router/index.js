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
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/account/:usernmae',
      name: 'AccountParent',
      component: AccountParent,
      children:[
        {path:'',name :'ClubService',component: ClubService,redirect:'clubservice'},
        {path:'clubservice',name :'ClubService',component: ClubService},
        {path:"growthrecord",name :'GrowthRecord',component: GrowthRecord},
        {path:"healthmom",name :'HealthMom',component: HealthMom},
        {path:"myaccount",name :'MyAccount',component: MyAccount}
      ]
    },
    {path: '/bind',name: 'BindPhone',component: BindPhone},
    {path:'/test',name: 'Test',component: Test}
  ]
})
router.beforeEach(function(to,from,next){
  if(to.path.startsWith('/account')){
    let bind = getCookie("bind");
    if(!bind || bind=='-1'){
      router.push({name:"BindPhone"});
    }
  }
  next();
})

export default router

