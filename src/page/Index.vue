<template>
    <div class="index">
         <Header></Header>
         <Swiper :sliders = "sliders"></Swiper>
         <Classify :goodsTypeList="goodsTypeList"></Classify>   
        
        <GoodsList :goodsList="goodsList" 
            :loading="end"
            v-if="isLoad"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            
            >
        </GoodsList>
         
         <Footer></Footer>
         <GoTop @goRefresh="getGoTop"></GoTop>
    </div>
</template>
<script>
    
    import { getIndexData,  getShareData } from 'common/api'
    import wx from 'weixin-js-sdk'
    import Header from 'components/Index/Header'
    import Swiper from 'components/Index/Swiper'
    import Classify from 'components/Index/Classify'
    import GoodsList from 'components/Index/GoodsList'
    import Footer from 'components/common/c-footer'
     import GoTop from 'components/common/GoTop'
     let routerLeave =  false;
    export default {
        components: {
            Header,
            Swiper,
            Classify,
            GoodsList,
           GoTop,
            Footer
        },
        data(){
            return {
                goodsTypeList:[],
                sliders: [],
                goodsList: [],
                loading: true,
                page: 1,
                isLoad: false,
                end: false
             
               
               

            }
        },
         watch: {
            $route(){
            
               this.getAllData(); //当路由改变时 重新请求签名
            }
        },
        computed:{
             userCode(){               
                return this.$store.state.userCode;
            }
        },
        created(){
            
            // loading...
            this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getAllData();
            sessionStorage.clear();
        },
        methods: {
            // 刷新
            getGoTop(){
                 this.$router.go(0);
            },
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
            async getAllData(flag){
               
                // getIndexData({page:this.page,userCode:this.userCode}).then((res)=>{
                //     console.log(res.data)
                // },(err)=>console.log(err))
                // 以上写法一般，想要you逼格，用语法糖
                let params = {};

                if(this.$store.state.salesId){
                       params= {page:this.page,salesId:this.$store.state.salesId,userType:'sales'}
                }else{
                     params= {page:this.page,userCode:this.userCode}
                }


                let {data:res} = await getIndexData(params)  ;
                // console.log(res)

                this.getWeChatShare();
                if(flag){
                   
                    this.goodsList = res.goodsList;
                    if(res.info == '已到底部'){
                        this.loading = true;
                        this.end = true;
                        
                    }else{
                          this.loading = false;
                    }
                }else{
                    this.goodsTypeList = res.goodsTypeList
                    this.goodsList = res.goodsList;
                    this.sliders = res.carouselList.length>0? res.carouselList: [{carouselUrl:'javascript:;',carouselPhoto:require('../components/Index/banner.png')}]; 
                    this.isLoad = true;
                    this.loading = false;
                    this.$indicator.close();
                }     
               
               


            },
            loadMore(){
                if(routerLeave) return;
                this.loading = true;
                setTimeout(()=>{
                     this.page++;
                     this.getAllData(true)

                },300)
                                       
              
             }

        },
        // 缓存后，进入详情页面，滚动条事件不销毁。以下方法解决 滚动条事件不销毁
         beforeRouteEnter(to, from, next) {
            routerLeave = false;
            next();
        },
        beforeRouteLeave(to, from, next) {
            routerLeave = true;
            next();
        }

    }
    
</script>
<style lang="stylus" scoped>

</style>

