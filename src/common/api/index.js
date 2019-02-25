
/*
  api 文件
  返回的是promise对象，就会有then方法
*/ 
import axios from 'axios';

axios.defaults.baseURL= 'http://www.scjksm.com/scjkSvn/Home/'
// http://www.scjksm.com/scjkceshi/Home
// 拦截器 同归返回数据
// axios.interceptors.response.use((res)=>{
//   return res.data;
// })


// 登录接口
export  let getLoginData = (data) => {
  return axios.post('Login/login',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 注册接口
export let getRegisterData = (data) =>{
  return axios.post('Register/register',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 判断账号是否存在接口
export let getAccountCheck = (data) =>{
  return axios.post('user/accountCheck',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 验证码接口
export let getUserCode = (data) => {
  return axios.post('Register/Sendmsg',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 找回密码验证码接口
export let getPassCode = (data) => {
  return axios.post('user/Sendmsg',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 找回密码验证码接口
export let getSavePass = (data) => {
  return axios.post('user/savepass',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}


// 会员页信息接口
export let getMemberData = (data) => {
  return axios.post('User/index',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 上传头像接口
export let getLoadPhotoData = (data) => {
  return axios.post('User/saveUser',data,{
    headers:{'Content-Type':'multipart/form-data'}
  })
}

// 会员修改密码
export let getUpdatePassword = (data) => {
  return axios.post('User/savePass',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 会员收藏数据
export let getMemberCollect = (data) => {
  return axios.post('Collect/index',data,{
    transformRequest:[function(data){
        let params = '';
        for(let key in data){
            params += key +'='+data[key]+'&'
        }
        return params
    }]
    
  })
}
// 会员收藏删除
export let delMemberCollect = (data) => {
  return axios.post('Collect/delCollect',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}


// 获取主页数据
export let getIndexData = (data) => {
  return axios.post('Goods/index',data,{
    transformRequest:[function(data){
        let params = '';
        for(let key in data){
            params += key +'='+data[key]+'&'
        }
        return params
    }]
    
  })
}

// 获取分类页数据
export let getGoodsTypeData = (data) => {
  return axios.post('Goods/typeGoodsList',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 获取商品详情数据

export let getGoodsDetailData = (data) => {
  return axios.post('Goods/goodsDetail',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 从商品详情页立即购买
export let getNowBuyData = (data) => {
  return axios.post('Order/orderPay',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 商品详情页收藏
export let getCollectData = (data) => {
  return axios.post('Collect/addCollect',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 店铺数据
export let getShopData = (data) => {
  return axios.post('shop/shopDetail',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 加入购物车

export let getAddCartData = (data) => {
  return axios.post('Cart/addCart',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 购物车数据

export let getCartData = (data) => {
  return axios.post('Cart/index',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&';
      }
      return params
    }]
  })
}
// 购物车总数量加减

export let getCartCount = (data) => {
  return axios.post('Cart/cartCount',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&';
      }
      return params
    }]
  })
}
// 订单结算

export let getCartPay = (data) => {
  return axios.post('Cart/cartPay',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
        params += encodeURIComponent(key) +'='+ encodeURIComponent(data[key])+'&';
      }
      return params
    }]
  })
}
// 购物车删除 
export let getCartDelete = (data) => {
  return axios.post('Cart/delCart',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

//提交订单
export let submitOrderData = (data) => {
  return axios.post('Order/addOrder',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 获取地址list 
export let getAddressData = (data) => {
  return axios.post('Address/index',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 删除地址
export let delAddressData = (data) => {
  return axios.post('Address/delAddress',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 添加地址
export let addressDataAdd = (data) => {
  return axios.post('Address/addressAdd',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 保存地址
export let addressDataSave = (data) => {
  return axios.post('Address/addressSave',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 已支付

export let getPayData = (data) => {
  return axios.post('Order/index',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 确认收货

export let getConfirmOrder = (data) => {
  return axios.post('Order/confirmOrder',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 订单详情

export let getOrderDetail = (data) => {
  return axios.post('Order/orderDetail',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 删除订单


export let delOrderData = (data) => {
  return axios.post('Order/delOrder',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 微信分享接口
export let getShareData = (data) => {
  return axios.post('Weixin/getsignature',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
        
         params += encodeURIComponent(key) +'='+ encodeURIComponent(data[key])+'&';
        //  防止url &会拆分多个对象
      }
      return params
    }]
  });
  
}