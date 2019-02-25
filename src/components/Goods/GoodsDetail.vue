<template>
    <transition name="slide">
        <div>
            <div class="header">
                <div class="back"  @click="$router.go(-1)">
                    <i class="iconfont icon-fanhui2"></i>
                </div>
                <div class="back-go"  @click="$router.push({path: '/'})"> <i class="iconfont icon-zhuye"></i> </div>
            </div>
            <div class="detail" >
               <div ref="detailWrapper" class="detailWrapper">
                 <div>
                     <Swiper :sliders=" goodsDetailPhotos" class="img-wrap"></Swiper>
                    <h1 class="goods-name">{{ goods.goodsName }}</h1>
                   
                    <p class="buy-price" v-if="goods.goodsProcurementPrice">{{symbol}} <b>{{num}}</b> <span >{{str}}</span> </p>
                    <p   v-if="goods.goodsTradePrice" :class="{'sale': goods.goodsProcurementPrice&&goods.goodsProcurementPrice.length>0?false:true}"> {{goods.goodsTradePrice}}</p>
                    <p >{{goods.goodsRetailPrice}}</p>
                    <p >{{goods.goodsSpecification}}</p>
                    <!-- <div class="mumber">
                        数量
                        <div class="box">
                            <a href="javascript:;" @click=" cheangeQuantity(goods,0)">-</a><input type="text" disabled v-model="goodsQuantity"><a href="javascript:;"  @click=" cheangeQuantity(goods,1)">+</a>
                        </div>
                    </div> -->
                    <div class="desc-tit">
                        <span class="bold">商品详情</span>
                    </div>
                
                    <div class="goods-detail-desc" v-html="goods.goodsDetail">
                    
                        
                    </div>
        

                </div>
               </div>
          
               
                    <!-- <img :src="goodsDetailPhotos" alt=""> -->
                <!-- </div> -->
               
            </div>
            <div class="shopCart border-top">
               
                <div class="left">
                   
                    <div class="logo-wrapper "  @click="$router.push({name: 'cart'})" :style="{left:(shopId &&shopId != 'null' && shopId != ''?'1.5rem':'0.1rem')}">
                        <div class="logo">
                            <i class="iconfont icon-gouwuche1-copy-copy"></i>
                        </div>
                        <div class="num" v-if="cartCount>0">{{cartCount}}</div>
                    </div>
                     <div class="shop-wrap" v-if=" shopId &&shopId != 'null' && shopId != ''" @click="goShop">店铺</div>
                </div>
                <div class="right">
                    
                    <div class="cart-control-wrapper" v-show="goods.goodsNum>0" >
                      
                            <div></div>
                               
                            <div class="cart-decrease icon-circle"  @click=" editCart('minus',goods)">
                                <i class="iconfont icon-jian"></i>
                                </div>
                            <div class="cart-count" >{{typeof goods.goodsNum == 'undefined'?$set(goods,'goodsNum',0):goods.goodsNum }}</div> 
                            <div class="cart-add icon-circle" @click=" editCart('add',goods)" >
                                <i class="iconfont icon-jiaru"></i>
                                </div>
                        
                    </div>
                     <div class="btn" v-show="goods.goodsNum<=0"  @click=" editCart('add',goods)" >加入购物车</div>
                </div>
                
            </div>
        </div>
        
    </transition>
    
</template>
<script>
    import BScroll from 'better-scroll'
    import wx from 'weixin-js-sdk'
    import { getGoodsDetailData, getAddCartData , getNowBuyData, getCollectData ,getShareData} from 'common/api'
    import Swiper from 'components/common/Swiper'
    export default {
        data() {
            return {
                goods: {},
                goodsDetailPhotos: [],
                shopId: '',
                goodsQuantity: 1,
                active: false,
                symbol: '',
                num: '',
                str: ''
            }
        },
        created(){
           this.$indicator.open({
                        text: 'Loading...',
                        spinnerType: 'fading-circle'
                    });
            this.shopId = localStorage.getItem('shopId');
            sessionStorage.clear();
        
           this.getData();

            String.prototype.queryURLParameter = function(){
                var obj = {},
                reg = /([^?=&#]+)=([^?=&#]+)/g;
                this.replace(reg,function(){
                    var key = arguments[1],
                    value = arguments[2];
                    obj[key] = value;
                })
                return obj;
            }
             // 是分享出来的标识，存起来
            let obj = location.href.queryURLParameter();
            if( obj['a']  !== undefined){
                this.temp1 = obj.a;
                this.temp2 = obj.b;
                localStorage.setItem('temp1',this.temp1);
                localStorage.setItem('temp2',this.temp2);
            }
        
        },
        computed: {
            userCode(){
                return this.$store.state.userCode == null ? '': this.$store.state.userCode;
            },
            cartCount(){
                return this.$store.state.cartCount;
            }
        },
        watch: {
            $route(){
            
               this.getData(); //当路由改变时 重新请求签名
            }
        },
        mounted(){
             this.$nextTick(() => {
             
               
            
            
                // this.$setShare( this.goods.goodsName , this.goods.goodsSpecification, this.goodsDetailPhotos[0], url,sharelink)
              })      
        },
        methods: {
            async getWeChatShare(){
              
                let  u = navigator.userAgent;
                let sharelink = '';
                if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
                    sharelink = encodeURIComponent(this.$store.state.shareUrl.split('#')[0])
                }else{
                    sharelink =  encodeURIComponent(location.href.split('#')[0]);
                }
                let {data: res} = await getShareData({url:sharelink}); //
                if(res &&res.flag == 'success'){
                
                   if( this.shopId && this.shopId != '' && this.shopId != 'null' ){
                        this.url = location.href.split('?')[0]+'?a='+this.$store.state.salesId+'&b='+this.shopId;
                    }else{
                        this.url = location.href.split('?')[0];
                    } 
                   let data =res.data;

                    wx.config({
                        debug:false,
                        appId: data.appId, 
                        timestamp: data.timestamp,
                        nonceStr:  data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone','onMenuShareWeibo']
                        //  'chooseImage','uploadImage','startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice'

                        // 所有要调用的 API 都要加到这个列表中
                    });
                    wx.ready(() => {
                        //分享给朋友
                            // console.log(this.link)
                        wx.onMenuShareAppMessage({
                        title: this.goods.goodsName, // 分享标题
                        link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        desc: this.goods.goodsSpecification, // 分享描述
                        imgUrl: this.goodsDetailPhotos[0], // 分享图标
                        //type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })

                        //分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: this.goods.goodsName, // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: this.goodsDetailPhotos[0], // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                        //分享到QQ
                        wx.onMenuShareQQ({
                            title: this.goods.goodsName, // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: this.goods.goodsSpecification, // 分享描述
                            imgUrl: this.goodsDetailPhotos[0], // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                        //分享到微博
                        wx.onMenuShareWeibo({
                            title: this.goods.goodsName, // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: this.goods.goodsSpecification, // 分享描述
                            imgUrl: this.goodsDetailPhotos[0], // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                        //分享到QQ空间
                        wx.onMenuShareQZone({
                            title: this.goods.goodsName, // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: this.goods.goodsSpecification, // 分享描述
                            imgUrl: this.goodsDetailPhotos[0], // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                    })
                }else{
                    console.log(res)
                }
            },
            async getData(){

                  let params = {}

                if(this.$store.state.salesId){
                       params= {goodsId: this.$route.params.goodsId,salesId:this.$store.state.salesId,userType:'sales'};
                }else{
                     params= {goodsId: this.$route.params.goodsId,userCode: this.userCode};
                }
               let {data:res} = await getGoodsDetailData( params);
           
                if(res){
                    this.goodsDetailPhotos = res.goodsDetailPhotos;
                    this.goods =  res.goodsDetail[0];
                    if(this.goods.goodsProcurementPrice != null){
                         this.symbol = this.goods.goodsProcurementPrice.substring(4,5)
                    this.num = this.goods.goodsProcurementPrice.substring(5)
                    this.str = this.goods.goodsProcurementPrice.substring(0,3)
                    }
                   

                    this.$indicator.close();
                    this.getWeChatShare();
                }else{
                    
                }
                
                
            },         
             // 加入购物车
            editCart(flag,item){
               
                if(this.$store.state.salesId){
                    this.$toast({
                        message: '您购买请联系您的店铺！',
                        position:'middle',
                        duration: 2000
                    });
                    return;
                }
                if(!this.userCode ){
                    this.$toast({
                        message: '请登录',
                        position:'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login',
                             query: {
                                redirect: this.$route.fullPath
                            }
                        });
                    },500)
                    return;
                }
               

                if(flag == 'add'){
                    item.goodsNum++;
                
                }else if(flag == 'minus'){
                    if(item.goodsNum<=0){
                        return;
                    }
                    item.goodsNum--;
                }
              
                getAddCartData({userCode:this.userCode,goodsId:item.goodsId,goodsNum: item.goodsNum}).then(response=>{
                    let res = response.data;
                    if(res.flag == 'success'){
                        let num = 0;
                        if(flag =='add'){
                            num = 1;
                        }else if(flag == 'minus'){
                            num = -1;
                        }
                        this.$store.commit('updateCartCount',num)
                    }
                    // this.$toast({
                    //     message: res.info,
                    //     position:'middle',
                    //     duration: 2000
                    // });
                })

            },
           
            //立即购买
            async nowBuy(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登陆',
                        position: 'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
                    return;
                }
                let {data:res} = await getNowBuyData({goodsId: this.$route.params.goodsId,userCode: this.userCode,goodsCount:this.goodsQuantity});
                if(res.flag == 'success'){
                    let goods =  JSON.stringify(res.data)
                    sessionStorage.setItem('goods',goods)
                    this.$router.push({
                        name: 'order',
                        query: {id:0}
                    })          
                }else{       
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 2000
                    });
                    
                }

            },
            
            //去店铺
            goShop(){
                if(!this.shopId){
                     this.$toast({
                        message: '你没有权限',
                        position: 'middle',
                        duration: 2000
                    });
                    return;
                 }
                this.$router.push({
                    name:'shop',
                    params: {
                        shopId:this.shopId
                    }
                })
            },
            //去收藏
            async goCollect(){
                if(!this.userCode){
                    this.$toast({
                        message: '请登录',
                        position: 'middle',
                        duration: 2000
                    });
                    setTimeout(()=>{
                        this.$router.push({
                            name: 'login'
                        });
                    },500)
                    return;
                 }
                let {data:res} = await getCollectData({goodsId: this.$route.params.goodsId,userCode: this.userCode});
                this.$toast({
                    message: res.info,
                    position:'middle',
                    duration: 2000
                });
            }
        },
      
        components: {
            Swiper
        }
      
    }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.header
    width 6.4rem
    position fixed
    top 0
    font-size 18px
    height .8rem
    z-index 100
   
    .back
        width .6rem
        height .6rem
        background #898889
        text-align center
        line-height .6rem
        border-radius 50%
        margin  .15rem 0 0 .25rem
        i 
            color #fff
            font-size .3rem
    .back-go
        position absolute
        right 0
        top 0
        padding  .25rem .2rem 0 .2rem
        i   
          
            color #898889
            font-size .46rem

.detail
   
    width 6.4rem
    position relative
    overflow-y auto
    padding-bottom .9rem
    // -webkit-overflow-scrolling: touch;
    background #fff
   
    
    .detailWrapper
        flex 1    
        .img-wrap
            width 6.4rem
            height 6.4rem
        .goods-name
            padding .25rem
            height .32rem
            line-height .32rem
            color #474747
            font-size .28rem
            font-weight bold
        p 
            padding .2rem  .25rem    0 .25rem
            overflow hidden
            font-size .22rem
            line-height .24rem
            color #9a9a9a     
        .buy-price
            padding 0 .25rem
            color #ff3d00            
            b 
                font-size .34rem
                display inline-block
                vertical-align: text-bottom;
            span 
                display inline-block
                color #fd7f31
                border 0.01rem solid #fd7f31
                text-align: center;
                vertical-align: text-bottom;
                // height .32rem
                line-height normal
                padding .05rem 0
                width .8rem
                margin-left .10rem
                border-radius .05rem
                font-size .16rem

        .sale 
            color #ff3d00
           
        
            
        .desc-tit
            padding .2rem .25rem
            font-size .24rem
            font-weight bold    
            span    
                padding 0 .15rem  
                border-left .05rem solid #000  
        
        .goods-detail-desc
            padding .2rem .25rem
.shopCart
    width 6.4rem
    height: .9rem;
    position: fixed;
    z-index: 100;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content center
    align-items center
    .left
        flex: 1;
        background: #fff;
        .shop-wrap
            width 1rem
            background #fd7722
           
            height: 0.7rem;
            text-align: center;
            line-height: 0.7rem;
            font-size: 0.24rem;
            margin-left .1rem
            
            color: #fff
        .logo-wrapper
            width .95rem
            height .95rem
            background #f8f8f8
            border-radius 50%
            position absolute
            top -.25rem
            left 1.5rem
            box-shadow  0px  -1px 2px #ddd
    
            padding: .1rem
            .logo
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #fd7722;
                text-align: center;
                line-height .95rem
                i 
                    font-size .4rem
                    color #fff
            .num
                position: absolute;
                top: 0;
                right: 0;      
                width .26rem
                padding .06rem 0
                background #ff0000  
                line-height normal
                text-align center
                border-radius 50%
                color #fff
                font-size .14rem
    .right 
        flex: 1;
        justify-content center
        align-items center
        .btn
            width 2.7rem
            height .7rem
            text-align center
            line-height .7rem
            font-size .24rem
            color #fff
            background #fe8f32
            border-radius .4rem
            margin  0 auto
           
        .cart-control-wrapper
            position absolute
            right  .3rem
            bottom .3rem
            font-size: 0;
            .cart-decrease, .cart-add
                display: inline-block;
                
            .cart-count
                display: inline-block;
                
                width .36rem
                height .36rem
                padding 0 .05rem
                color: #000;
                font-size $font-info
                line-height: .36rem;
                text-align: center;
                font-size .22rem
            .icon-circle
                width .36rem
                height .36rem
                background  $color-theme
                border-radius 50%
                line-height .36rem
                text-align center
                font-size $font-info
                i 
                    font-size .18rem
                    color #fff
                    font-weight bold



</style>
