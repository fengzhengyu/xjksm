<template>
  <transition name="slide">  
    <div class="my-order">
        <div class="header">
             <div class="member-header">
                <div class="back" @click="$router.push({path:'/member'})">
                <i class="iconfont icon-fanhui2"></i>
                </div>
                <div class="text" >我的订单</div> 
            </div>
            <div class="tabs border-bottom">
                <div class="tab-list "  :class="{'active':$route.query.id == undefined}" @click="goJump()">
                    <span class="line">全部</span>
                </div>
                <div class="tab-list"  :class="{'active':$route.query.id == 0 }" @click="goJump(0)">
                    <span class="line">待付款</span>

                </div>
                <div class="tab-list" :class="{'active':$route.query.id == 1}" @click="goJump(1)">
                    <span class="line">待发货</span>
                </div>
                <div class="tab-list"  :class="{'active':$route.query.id == 2}" @click="goJump(2)">
                    <span class="line">待收货</span>

                </div>
               
                <div class="tab-list"  :class="{'active':$route.query.id == 3}" @click="goJump(3)">
                    <span class="line">已完成</span>

                </div>
            </div>
           
           
        </div>
        <div class="line-wrapper"></div>
        <div 
            
            v-if="isLoad"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
             <ul class="order-list" >
           <li class="border-bottom" v-for="(item,index) in orderList" :key="index" @click="goDetail(item)">
               <div class="img-wrap">
                   <img :src="item.goodsimg" >
               </div>
               <div class="desc-wrap">
                   <h2 class="title">{{item.goodsName}}</h2>
                   <p class="num">商品共计{{item.goodsCount}}件</p>
                   <p class="time">{{ item.addTime}}</p>
                   
                   <div class="status" v-if="item.orderStatus == 0">
                     
                        <span class="pay" @click.stop="goPayPage(item)">去支付</span>
                     
                   </div>
                   <div class="status" v-if="item.orderStatus == 1">
                       <span>待发货</span>
                   </div>
                   <div class="status" v-if="item.orderStatus == 2">
                       <span>待收货</span>
                   </div>
                   <div class="status" v-if="item.orderStatus == 3">
                       <span>已完成</span>
                   </div>
                   
               </div>
           </li>
            <div v-if="orderList.length>0" class="bottom-tip">
                <div class="ladding" v-if="!end">
                    <img src="../../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
                </div>
                <div class="ladding" v-else>
                    您已经到底了
                </div>
            </div>
       </ul>
        </div>
      
        <div class="empty" v-if="orderList.length<=0">
            <div class="bg"></div>
            <div class="text">你还没有相关订单！</div>
            <div class="btn" @click="$router.push({path: '/'})">去采购喽</div>
        </div>
        
    </div>
  </transition>  
</template>
<script>
import {getPayData , getConfirmOrder, delOrderData } from 'common/api'

export default {
    data() {
        return {
            active: '',
            userCode : '',
            orderList: [],
            page:1,
            isLoad: false,
            end:false,//
            loading:true,
        }
    },
    created(){
     
        this.userCode = this.$store.state.userCode;
        this.getPayList();
       
       
    },
    computed: {
      
    },
    watch: {
    $route(){
        this.page =1;
        this.end = false;
        this.orderList =[];
        this.getPayList();
        }
    },
    methods: {
        goJump(id){
            this.$router.push({
                name: 'myorder',
               query: {id:id}
            })
        },
        //已支付
        async getPayList(flag){
          
         
            let {data:res} = await  getPayData({userCode: this.userCode,orderStatus:this.$route.query.id,page:this.page});
          
            if(res.flag == 'success'){


                  if(flag){
                         this.orderList = res.orderList;
                        if(res.msg == '已到底部'){
                            this.loading = true;
                            this.end = true;
                            
                        }else{
                            this.loading = false;
                            
                        }

                  }else{
                        this.orderList = res.orderList;
                        this.isLoad = true;
                        this.loading = false;
                         if(res.msg == '已到底部'){
                            this.loading = true;
                            this.end = true;
                            
                        }

                  }
            
                
               
            }

        },
       
        //上啦加载
        loadMore(){
             this.loading = true;
                setTimeout(()=>{
                     this.page++;
                     this.getPayList(true)

                },300)
           

        },
        
        //查看详情
        goDetail(order){
           this.$router.push({
                name: 'orderDetail',
                query: {id:order.orderNumber}

            })
           
        },
        // 去支付
        goPayPage(item){

             window.location = 'https://gcpt.hnxjksm.com/hnxjkSvn/Home/Weixinpay/pay?out_trade_no='+item.orderNumber
        },
        //确认收货
        confirmOrder(item){
            getConfirmOrder({userCode: this.userCode,orderNumber:item.orderNumber,shopId:item.shopId}).then((response) => {
                let res = response.data;
                if(res.flag == 'success'){
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 3000
                        });
                        this.getPayList()
                    }else{
                        this.$toast({
                            message: res.info,
                            position:'middle',
                            duration: 3000
                        });
                    }
            })
            
        },
        //删除订单
        deleteOrder(item){
            delOrderData({userCode: this.userCode,orderNumber:item.orderNumber,shopId:item.shopId}).then((response) => {
                let res = response.data;
                if(res.flag == 'success'){
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 3000
                    });
                    this.getFinishData()
                }else{
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 3000
                    });
                }
            },(err)=>{console.log(err)})   
        }
       
    }
}
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.my-order
    position fixed
    top 0
    bottom 0
    width 6.4rem
    overflow-y auto
    background #fff
    
    .header
        position fixed
        top 0
        background #fff
        z-index 666
        width 6.4rem

        .member-header
            height .8rem
            line-height .8rem
            overflow hidden
            color #fff
            background #ff6600
            div
                float left
            .back
                width .8rem
                text-align center
                
                i 
                    font-size .3rem
                    color #fff
            .text 
                font-size .26rem
        .tabs
            display flex
            height .8rem
            align-items center
            justify-content center
            background #f3f4f6
            box-sizing border-box;
            .tab-list
                flex 1
                padding  .28rem 0
                font-size .24rem
                text-align center
                color #6a6a6a      
                &.active
                    border-bottom .03rem solid #ff0000
    .line-wrapper
        height 1.6rem                
    .empty 
        padding .8rem 0 0 0
        text-align center
        .bg
           margin 0 auto 
           width 2.24rem
           height 2.07rem
           background url('../../common/img/order-no.png') 
           background-size 100% 100%
        .text
           color #919192
           font-size .18rem
           padding .4rem 0
        .btn
            width 2rem
            border .03rem solid #ff6600   
            margin 0 auto 
            font-size .2rem
            color #ff6600
            padding .15rem 0
            line-height normal
            border-radius .1rem
    .order-list
        li 
            padding  .3rem
            display flex
            .img-wrap
                flex 0 0 1.25rem
                height 1.25rem
                img 
                    width 100%
                    height 100%
            .desc-wrap
                flex 1
                padding-left .3rem
                .title
                    color #202020
                    font-size .22rem
                p 
                    color #939393    
                    font-size .2rem
                    padding-top .2rem
                .num
                    color #939393
                .time
                    font-size .18rem
                .status 
                    font-weight bold
                    font-size .22rem
                    color #202020    
                    text-align right
                 
                    span 
                        line-height normal
                        padding-left .2rem
                    .pay 
                        background #f60
                        color #fff
                        padding 0.1rem .2rem
                        border-radius .3rem
                        font-weight normal
        .bottom-tip
            width 100%
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #000;
            background: #fff;
            font-size .18rem
            .loading-hook
                img 
                    width .3rem


    

        


</style>    


