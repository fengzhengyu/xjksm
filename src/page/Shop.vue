<template>
    <div class="shop">
      <mHeader class="shop-header"> 
           <div class="text" slot="text">{{shopData.shopName}}</div> 
      </mHeader>
      <div class="line"></div>
             <shopList
                :goodsList=" goodsList" 
                :loading="end"
                v-if="isLoad"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
                class="goods-list"
              :style="{'padding-bottom':this.$route.params.shopId? '0rem':'.9rem'}"></shopList>   
       
        
        
    </div>
</template>
<script>
    import wx from 'weixin-js-sdk'
    import {getShopData,getShareData} from 'common/api'
    import shopList from 'components/Index/GoodsList'
    import mHeader from 'components/Member/memberHead'
    export default {
        data(){
            return {
                shopData: {},
        
                goodsList: [],
                loading: true,
                page: 1,
                isLoad: false,
                end: false
             
               
               
            }
        },
       
        created(){
        
            if(this.$store.state.salesId){
                 // loading...
                this.$indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.getShopList();
            }else{
                this.$router.push({
                    name: 'login'
                })
            }
        },
         watch: {
            $route(){
            
                this.getShopList(); //当路由改变时 重新请求签名
            }
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
                
                //    if( this.shopId && this.shopId != '' && this.shopId != 'null' ){
                //         this.url = location.href.split('?')[0]+'?a='+this.$store.state.salesId+'&b='+this.shopId;
                //     }else{
                //         this.url = location.href.split('?')[0];
                //     } 
                    this.url = location.href.split('?')[0];
                    let imgUrl = 'http://www.scjksm.com'+require('../common/img/logo.png');
            
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
                        title: '聚康供采平台', // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: '供应商与采购商的理想平台', // 分享描述
                            imgUrl: imgUrl, // 分享图标
                        
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })

                        //分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: '聚康供采平台', // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                          
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })
                        //分享到QQ
                        wx.onMenuShareQQ({
                            title: '聚康供采平台', // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: '供应商与采购商的理想平台', // 分享描述
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })
                        //分享到微博
                        wx.onMenuShareWeibo({
                             title: '聚康供采平台', // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: '供应商与采购商的理想平台', // 分享描述
                            imgUrl: imgUrl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        })
                        //分享到QQ空间
                        wx.onMenuShareQZone({
                            title: '聚康供采平台', // 分享标题
                            link:   this.url , // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            desc: '供应商与采购商的理想平台', // 分享描述
                            imgUrl: imgUrl, // 分享图标
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
            async getShopList(flag){
                let {data:res} = await getShopData({shopId:this.$route.params.shopId,salesId:this.$store.state.salesId,page:this.page,userType:'sales'})
               
                // console.log(res)
                if(res.flag == 'success'){

                    if(flag){

                       
                         this.goodsList = res.goodsData;
                        if(res.message == '已到底部'){
                        
                            this.loading = true;
                            this.end= true;
                           
                        
                        }else{
                              this.loading = false;
                        }

                    }else{
                        this.shopData = res.shopData;
                        this.goodsList = res.goodsData;
                        this.isLoad = true;
                        this.loading = false;
                        this.$indicator.close();   
                          
                    }

                    this.getWeChatShare();

                }else{
                    this.$indicator.open({
                        text: 'Loading...',
                        spinnerType: 'fading-circle'
                    })
                }
                
            },
           

            //上啦加载
            loadMore(){
                this.loading = true;
                setTimeout(() => {
                    this.page++;
                    this.getShopList(true);
                }, 300);

            },
            
        },
        components: {
            shopList,
             mHeader
        }
    }
</script>
<style lang="stylus" scoped>
    .shop
        width 6.4rem
        margin 0 auto
        background #fff
        .shop-header
            position fixed
            width 6.4rem
            z-index 999
        .line
            height .8rem    

</style>


