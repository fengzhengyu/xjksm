import Vue from 'vue'
import Router from 'vue-router'

import Index from 'page/Index.vue'
import Cart from 'page/Cart.vue'
import Member from 'page/Member.vue'
import AddressList from 'components/Member/AddressList'
import AddressAdd from 'components/Member/AddressAdd'
import UserInfo from 'components/Member/UserInfo'
import Setting from 'components/Member/Setting'
import ShareList from 'components/Member/ShareList'
import ShareDetail from 'components/Member/ShareDetail'
import Password from 'components/Member/Password'
import Collect from 'components/Member/Collect'

import Goods from 'page/Goods.vue'
import Shop from 'page/Shop.vue'
import GoodsDetail from 'components/Goods/GoodsDetail'
import OrderWrite from 'components/Order/OrderWrite'
import OrderMark from 'components/Order/OrderMark'
import OrderGoods from 'components/Order/OrderGoods'
import OrderInvoice from 'components/Order/OrderInvoice'
import MyOrder from 'components/Order/MyOrder'

import OrderDetail from 'components/Order/OrderDetail'
import Login from 'components/Member/Login'
import Register from 'components/Member/Register'

import Search from 'components/Index/Search'
import  NotFoundComponent from 'page/NotFoundComponent'
// import Popularize from 'components/Member/Popularize'

Vue.use(Router)

export default new Router({
   mode: 'history',
   base: '/',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true
      }
      
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        keepAlive:false
      }
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
    
    },
    // 地址展示
    {
      path: '/member/address',
      name: 'address',
      component: AddressList,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
      
    },
  //  添加地址页面
    {
      path: '/member/addressAdd',
      name: 'addressAdd',
      component: AddressAdd,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // 会员信息
    {
      path: '/member/user',
      name: 'user',
      component: UserInfo,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // 会员设置
    {
      path: '/member/setting',
      name: 'setting',
      component: Setting,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    //  微商分享列表页面 shareDetail
    {
      path: '/member/share',
      name: 'share',
      component: ShareList
    
    },
    // 微商分享详情 shareDetail
    {
      path: '/member/shareDetail',
      name: 'shareDetail',
      component: ShareDetail
    
    },

    // 我的订单
    {
      path: '/myorder',
      name: 'myorder',
      component: MyOrder,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    // 商品分类
    {
      // path: '/goods/:id',
      path: '/goods',
      name: 'goods',
      component: Goods,
      // meta: {
      //   keepAlive: true
      // }
      
    },
    // 商品详情
    {
      path: '/goodsId/:goodsId',
      name: 'id',
      component: GoodsDetail
    },
    // 提交订单页面
    {
      path: '/order',
      name: 'order',
      component: OrderWrite,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
           
    },
    // 发票
    {
      path: '/order/invoice',
      name: 'orderInvoice',
      component: OrderInvoice,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive:true
      },
     
           
    },
    // 备注
    {
      path: '/order/mark',
      name: 'orderMark',
      component: OrderMark,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        // keepAlive:true
      }
           
    },
    // 订单商品展示
    {
      path: '/order/goods',
      name: 'orderGoods',
      component: OrderGoods,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
           
    },
    // 订单详情
    {
      path: '/order/detail',
      name: 'orderDetail',
      component: OrderDetail,
      // meta: {
      //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      // }
           
    },

    {
      path: '/shop/:shopId',
      name: 'shop',
      component: Shop

    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/password',
      name: 'password',
      component: Password
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    // {
    //   path: '/popularize',
    //   name: 'popularize',
    //   component: Popularize
    // },
    { path: '*', component: NotFoundComponent }
  ],
  scrollBehavior (to, from, savedPosition) {

    // console.log(savedPosition);
    if (savedPosition) {
    
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
