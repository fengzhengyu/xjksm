// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import wx from 'weixin-js-sdk'
import 'common/js/base'
import 'common/stylus/index.styl'
import 'common/stylus/border.css'

// 300ms 点击事件延迟
import fastClick  from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      fastClick.attach(document.body);
  }, false);
}


Vue.config.productionTip = false;

// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./common/img/default.jpg'),
  loading:  require('./common/img/default.jpg'),//'http://img3.imgtn.bdimg.com/it/u=3958473360,317897763&fm=11&gp=0.jpg',
  // attempt: 1
})


//引入 mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(Mint)


/* eslint-disable no-new */

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { format } from 'path';
Vue.use(VueAwesomeSwiper)


// 自定义事件

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  },
})  



import {getShareData} from 'common/api'
// 微信分享
Vue.prototype.$wx = wx;

let setShare = function(title, desc, imgUrl, sharelink,link){


  getShareData({url:link})
    .then(response => {
     let params = response.data.data;

    //  console.log(params)
      //初始化（微信开发者工具中，报{errMsg: "config:ok"}意味成功，{"errMsg":"config:invalid signature"} 签名无效，后台检查获取参数各项参数是否有问题，可以去微信校验签名工具中校验一下，大部分出问题在于生成签名url与当前location.href不符合。{"errMsg":"config:invalid url domain"}，检查微信公众号后台设置的js安全域名和业务域名是否准确）
      wx.config({
        debug: false,
        appId: params.appId, 
        timestamp: params.timestamp,
        nonceStr:  params.nonceStr,
        signature: params.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone','onMenuShareWeibo']
        //  'chooseImage','uploadImage','startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice'

        // 所有要调用的 API 都要加到这个列表中
      });
      wx.ready(() => {
        // 朋友圈
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: sharelink, // 分享链接
          imgUrl: imgUrl, // 分享图标
          success () {
            // 用户确认分享后执行的回调函数
            console.log('success')
          },
          cancel () {
            // 用户取消分享后执行的回调函数
            console.log('cancel')
          }
        })
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          link: sharelink, // 分享链接
          imgUrl: imgUrl, // 分享图标
          desc: desc, // 分享描述
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          },
          fail: function (res) {
            // console.log(JSON.stringify(res))
          }
        })
        //分享到QQ
        wx.onMenuShareQQ({
          title: title, // 分享标题
          link: sharelink, // 分享链接
          imgUrl: imgUrl, // 分享图标
          desc: desc, // 分享描述
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
        })
        //分享到微博
        wx.onMenuShareWeibo({
            title: title, // 分享标题
            link: sharelink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            desc: desc, // 分享描述
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
        //分享到QQ空间
        wx.onMenuShareQZone({
            title: title, // 分享标题
            link: sharelink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            desc: desc, // 分享描述
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
    wx.error(err => {
      console.log(err)
    })
    
 

}
Vue.prototype.$setShare = setShare;



// 购物车 第一次今日缓存，其余刷新
router.beforeEach((to, from,next) => {
  if (!store.state.shareUrl) {
    store.commit('setShareUrl', document.URL)
  }             
 
  store.state.userCode = localStorage.getItem('key');//获取本地存储的token
  store.state.userLevel = localStorage.getItem('key2');
  store.state.cartCount = parseFloat(localStorage.getItem('num'));
  store.state.salesId = localStorage.getItem('salesId');

  let  u = navigator.userAgent;
  let sharelink = '';

  if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
    sharelink = encodeURIComponent(store.state.shareUrl.split('#')[0])
  }else{
    sharelink =  encodeURIComponent(location.href.split('#')[0]);
  }


  let shareState = '';
    if(to.name =='id'){
      shareState = false;
       
    }else if(to.name =='shop'){

      shareState = false;
     
    }else if(to.name =='goods'){
      shareState = false;
      
    }else if(to.name =='index'){
      shareState = false;
      
    }else{
      shareState = true;
    }
  
    if(shareState){
      setTimeout(()=> {
        let imgUrl = 'http://www.scjksm.com'+require('./common/img/logo.png');
      
        setShare('聚康供采平台', '供应商与采购商的理想平台', imgUrl, location.href,sharelink)
      },300)
    }
  
  if(to.meta.requireAuth){
    if(store.state.userCode !== null || store.state.salesId ){
      next();
    }else{
      next({
        name: 'login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
    next();
  }
  
  // let isRefresh =  sessionStorage.getItem('Refresh')
  // if(to.name== 'cart' && from.name == 'index') { 
   
  //   if(isRefresh == '1'){
  //    router.go(0)
  //     // window.location.reload()
  //   }else{
  //     sessionStorage.setItem('Refresh',1);
  //   }
  // }else if(to.name== 'cart' && from.name == 'id'){
  //   if(isRefresh == '1'){
  //     router.go(0)
  //   }else{
  //     sessionStorage.setItem('Refresh',1);
  //   }
  // }else if(to.name== 'cart' && from.name == 'login'){
  //   sessionStorage.setItem('isRefresh',1);
  //   if(isRefresh == '1'){
  //     router.go(0)
  //   }
  // }else if(to.name== 'cart' && from.name == 'member'){
  //   if(isRefresh == '1'){
  //     router.go(0)
  //   }else{
  //     sessionStorage.setItem('Refresh',1);
  //   }
  // }else 

    
  // }


})


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
