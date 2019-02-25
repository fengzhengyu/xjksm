

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCode: '',
    userLevel: '',
    cartCount: 0,
    addressItem: null,
    salesId: '',
    shareUrl : ''

  },
 
  mutations: {
    // 保存登录状态
    getUserCode(state,value){
      localStorage.setItem('key',value);
      state.userCode = value;
    },
    // 保存登录级别
    getUserLevel(state,value){
      localStorage.setItem('key2',value);
      state.userLevel = value
    },
     // 保存微商登录状态
    getSalesId(state,value){
      localStorage.setItem('salesId',value);
      state.salesId = value;
    },
    // 退出登录状态
    delUserInfo(state,value){
      localStorage.clear();
      state.userCode =value;
      state.userLevel = value
      state.salesId = value;
     
    },
    //跟新购物车数量 
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
      localStorage.setItem('num', state.cartCount);
    },
    // 初始化购物车数量
    initCartCount(state,cartCount){
      localStorage.setItem('num',cartCount);
      state.cartCount = cartCount;

    },
    getAddressItem(state,value){
      state.addressItem = value;
    },
    // 分享url
    setShareUrl(state,url){
      state.shareUrl = url;
    }
  }
})