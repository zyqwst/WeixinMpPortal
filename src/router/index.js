import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import BindPhone from '@/pages/BindPhone'
import Author from '@/pages/Author'
import Test from '@/pages/Test'
import AccountParent from '@/pages/account/AccountParent'
import GrowthRecord from '@/pages/account/GrowthRecord'
import MyAccount from '@/pages/account/MyAccount'
import ShowParent from '@/pages/show/ShowParent'
import ShowDtl from '@/pages/show/ShowDtl'
import Barcode from '@/pages/account/Barcode'
import Recharge from '@/pages/account/wallet/Recharge'
import Score from '@/pages/account/wallet/Score'
import SpaSubscribe from '@/pages/spa/SpaSubscribe'

import Coupons from '@/pages/account/wallet/Coupons'
import {getCookie, setCookie,Cookies} from '../utils/cookie-util'
Vue.use(Router)

const router = new Router({
  //mode:'history',
  routes: [
    {
      path: '',
      name: 'Author',
      component: Author
    },
    {
      path:'/show/:type/:id',
      component:ShowParent,
      meta:{title:'震元母婴护理中心'}
    },
    {
      path: '/member',
      component: AccountParent,
      children:[
        {path:'growthrecord',name :'GrowthRecord',component: GrowthRecord,meta:{requireAuth:true,title:'成长记录',id:2}},
        {path:"",name :'MyAccount',component: MyAccount,meta:{requireAuth:true,title:'会员中心',id:4}},
        {path:'qrcode',name:'Barcode',component:Barcode,meta:{requireAuth:true}},
        {path:'recharge',component:Recharge},
        {path:'coupons',component:Coupons},
        {path:'score',component:Score},
        {path:'spa',name:'SpaSubscribe',component:SpaSubscribe},
      ]
    },
    {path: '/bind',name: 'BindPhone',component: BindPhone},
  ]
})
router.beforeEach(function(to,from,next){
  let auth = sessionStorage.getItem(Cookies.Authorization)
  if(!to.meta.requireAuth){//无需登录
    next();
  }else if(to.meta.requireAuth && !auth){//需要登录，但未登录
    sessionStorage.setItem(Cookies.pathBeforeAuthor,to.fullPath)
    next({name:'Author'});
  }else{//需要登录且已登录
    next();
  }
})

export default router

