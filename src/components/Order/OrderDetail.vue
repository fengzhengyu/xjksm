<template>
  <transition name="slide">
    <div class="order-write">
        <div class="header">
            <div class="top">
                <div class="back" @click="goBack">
                <i class="iconfont icon-fanhui2"></i>
                </div>
                <div class="text">我的订单</div>
            </div>
            <div class="tab-wrap">
                <div class="status" v-if="orderData.orderStatus == 0">订单未支付</div>
                <div class="status" v-if="orderData.orderStatus == 1">订单待发货</div>
                <div class="status" v-if="orderData.orderStatus == 2">订单待收货</div>
                <div class="status" v-if="orderData.orderStatus == 3">订单已完成</div>
                <div class="text">感谢您的支持，期待再次光临</div>
                <!-- <div class="text2">如有售后问题请致电平台客服：<a href="tel:13015238110">13015238110</a></div> -->
            </div>
        </div>
        <div class="fill-wrap"></div>
        <div class="goods-wrap">
            <div class="goods">
                <div class="list" @click="goList">
                    <ul class="img-list">
                        <li v-for="(item,index) in newImgList" :key="index">
                            <img :src="item.goodsdata.goodsPhoto" >
                        </li>
                        
                    </ul>
                    <div class="total">
                        <p>共{{goodsList.length}}件</p>
                        <div>￥{{ orderData.goodsPriceTotal }}</div>
                    </div>
                    
                </div>
                <div class="next"><i class="iconfont icon-qianjin1"></i></div>    
            </div>
            <div class="post-wrap">
               <div class="desc">
                  <div class="text">
                     <h2>配送费</h2>  
                     <p>单笔订单满199元免配送</p>
                  </div>
                  <div class="price" v-if="  orderData.salesId == '0' || orderData.salesId ==null">+￥{{ orderData.goodsPriceTotal>=199?0:20}}</div>
                    <div class="price" v-else>+￥0</div>
               </div>
               <div class="next"></div>
              
            </div>
             <div class="price-wrap" v-if=" orderData.salesId == '0' ||  orderData.salesId ==null">实付￥<span>{{ orderData.goodsPriceTotal>=199?orderData.goodsPriceTotal:(parseFloat(orderData.goodsPriceTotal)+20).toFixed(2)}}</span></div>
             <div class="price-wrap" v-else>实付￥<span>{{ orderData.goodsPriceTotal}}</span></div>
        </div>
        <div class="invoice-wrap column-list">
            <div class="text-wrap" >
                <h2>
                    发票开具
                </h2>
                
                <p>
                    {{ taxInfo}}
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>
         <div class="column-list" >
            <div class="text-wrap">
                 <h2>
                     订单备注
                </h2>
                <p>
                 
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>
         <div class="remark" >
           {{ orderData.remark == 'null'? '未备注':  orderData.remark }}
           
        </div>

        <div class="column-list" >
            <div class="text-wrap">
                 <h2>
                     订单编号
                </h2>
                <p>
                {{orderData.orderNumber}}
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>
        <div class=" column-list" >
            <div class="text-wrap">
                 <h2>
                     下单时间
                </h2>
                <p>
                  {{orderData.addTime}}
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>
         <div class="mark-wrap column-list" >
            <div class="text-wrap">
                 <h2>
                     实付方式
                </h2>
                <p>
                   微信支付
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>

     
  
    
       
        
       
    </div>
   
  </transition>
    
</template>
<script>
  import { getOrderDetail } from 'common/api'
     export default {
         data() {
             return {
                orderData: {},
               
                goodsList: [],
                taxInfo: '不需要',
                isShow: false,
                addressData: [],
                postPrice: '',
                salesState:''

             }
         },
          created(){
             this.userCode = this.$store.state.userCode;

            //   // 是否是微商分享，微商分享没邮费 false 为是
            // this.salesState = localStorage.getItem('temp1') == null || localStorage.getItem('temp1') == 'null' ?true:false;
           
            this.getDetailData()
        },
         computed: {
              newImgList(){
                let arr = []
                if(this.goodsList.length>0){
                    if(this.goodsList.length>4){
                        arr = this.goodsList.slice(0,4)
                    }else{
                          arr = this.goodsList;
                    }
                }
              
                 return arr 
               
            },
        },
        methods: {
            async getDetailData(){
               let {data: res} = await getOrderDetail({userCode:this.userCode,orderNumber:this.$route.query.id});
                // console.log(res)
                if(res.flag == 'success'){
                     this.orderData = res.data.orderData;
                     this.goodsList =  res.data.orderData.goodsdata;
                     if(res.data.orderData.taxInfo.length>1){
                           this.taxInfo =  res.data.orderData.taxInfo.split('&amp;').join(' - ');
                     }
                   
                   
                    
                }
               
            },
            goBack(){
                if(typeof this.$route.query.flag == 'undefined' ){
                    this.$router.go(-1)
                  
                }else{
                  
                    this.$router.push({
                        name: 'myorder',
                        query: {id:this.orderData.orderStatus}
                    });
                   
                }
                
            },
            goList(){
                   
                sessionStorage.setItem('imgList',JSON.stringify(this.goodsList))
                this.$router.push({
                    name: 'orderGoods',
                   
                })
            }
        },
        //  beforeRouteLeave(to, from, next) {
        //     //
        //     console.log(to)
        //      console.log(from)
        //     if(to.name == 'myorder'){
        //         next();
        //     }else{
              
                
        //     }
          
        // }
     }
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
 .order-write
        background #f3f4f6
        width 6.4rem
        position absolute
        top 0
        bottom 0
     
        .header
            width 100%
            height 2.63rem
            background url('../../common/img/result-bg.png')   
            background-size 100% 100% 
            .top
                height .9rem
                line-height .9rem
             
                color #fff
               
                div
                    float left
                .back
                    width .8rem
                    text-align center
                    height 100%
                
                    i 
                        font-size .3rem
                        color #fff
                .text 
                    font-size .26rem
            .tab-wrap
                margin 0 .13rem
                height 2rem
                background #fff
                padding  0 .3rem
                color #474747
                .status
                    font-size  .34rem
                    padding .4rem  0
                   
                .text
                    font-size .22rem
                    padding-bottom .2rem
                    
                .text2
                    font-size .18rem 
                    color #9a9a9a
                    padding-bottom .2rem
                    a 
                        color #4fb2ce
               
                           
                 
        .fill-wrap
            height .3rem
        .goods-wrap
            margin .15rem
            background #ffffff
            padding .35rem 0
           
            .goods
                display flex
                .list 
                    flex 1
                    display flex
                    align-items center
                    padding 0 .15rem
                    .img-list
                        flex 1
                        li  
                            float left 
                            width .88rem
                            height .88rem
                            border 0.01rem solid #0c0406
                            margin-right 0.15rem
                            box-sizing border-box
                            img
                                width 100%
                                height 100%
                    .total
                        flex 0 0 1rem
                        width 1rem
                        text-align right
                        p 
                            font-size .18rem
                            padding-bottom .1rem
                            color #9a9a9a
                        div
                            font-size .22rem
                            color #474747
                                

                .next
                    flex 0 0 .45rem
                    width 45rem
                    line-height .8rem
                    i 
                        font-size .24rem
                        color #c1c1c1
            .post-wrap
                display flex
                padding-top  .35rem
                .desc
                    flex 1
                    display flex
                    align-items center
                    padding 0 .15rem 
                    .text
                        flex 1
                        h2 
                            font-size .2rem
                            color #161616
                        p   
                           
                            font-size .16rem
                            padding-top .1rem
                            color #9a9a9a

                    .price 
                        flex 0 0 1rem  
                        width 1rem
                        text-align right  
                        font-size .22rem
                        color #474747

                .next
                    flex 0 0 .45rem
                    width 45rem
                    line-height .8rem

                    i 
                        font-size .24rem
                        color #c1c1c1
            .price-wrap
               
                padding .35rem .6rem .2rem 0
                font-size .24rem
                text-align right 
                color #000000
                font-weight 700
                span 
                    font-size .36rem
                    color #ff6600

        .column-list
            display flex
            align-items center
            background #ffffff
            margin 0 .15rem
            .text-wrap
                flex 1
                display flex
                align-items center
                padding 0 .15rem
                max-width  calc(100% - .3rem - .3rem)
                h2 
                    flex 0 0 1.3rem
                    width 1.3rem
                    font-size .2rem
                    color #999999
                    font-weight 700
                p
                    font-size .2rem
                    font-weight 700
                    flex 1
                    text-align right
                    color #000
                    width 100%
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
                    line-height normal

            .next 
                flex 0 0 .45rem
                width 45rem
                line-height .8rem
                i 
                    font-size .24rem
                    color #fff 
        
        .remark
            margin  0 .15rem  .15rem .15rem 
            padding 0 .15rem
            height 1rem
            font-size .2rem
            color #000
            font-weight 700
            background #fff
           
        
</style>

