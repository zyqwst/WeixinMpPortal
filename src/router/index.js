import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BindPhone from '@/components/BindPhone'
import Author from '@/components/Author'
import Test from '@/components/Test'
import AccountParent from '@/components/account/AccountParent'
import GrowthRecord from '@/components/account/GrowthRecord'
import MyAccount from '@/components/account/MyAccount'
import ShowParent from '@/components/show/ShowParent'
import ShowDtl from '@/components/show/ShowDtl'
import Barcode from '@/components/account/Barcode'
import Recharge from '@/components/account/wallet/Recharge'
import Score from '@/components/account/wallet/Score'

import Coupons from '@/components/account/wallet/Coupons'
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
        {path:'qrcode',component:Barcode,meta:{requireAuth:true}},
        {path:'recharge',component:Recharge},
        {path:'coupons',component:Coupons},
        {path:'score',component:Score}
      ]
    },
    {path: '/bind',name: 'BindPhone',component: BindPhone},
    //{path: '/author',name: 'Author',component: Author},
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

