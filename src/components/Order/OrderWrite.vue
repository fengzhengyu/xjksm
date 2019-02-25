<template>
    <div class="order-write">
        <div class="header">
            <div class="top">
                <div class="back" @click="goBack">
                <i class="iconfont icon-fanhui2"></i>
                </div>
                <div class="text">订单结算</div>
            </div>
            <div class="tab-wrap">
                <div class="tab">
                    <div class="left " :class="{'active': active =='快递运输'}" @click="active='快递运输'">
                        <i class="iconfont icon-peisong1"></i>
                        <span>物流配送</span>
                    </div>
                    <div class="right" :class="{'active': active=='上门自提'}"  @click="$toast({
                        message: '暂不支持！',
                        position:'middle',
                        duration: 2000
                    })">
                         <i class="iconfont icon-mendianzitiicon"></i>
                         <span>上门自提</span>
                    </div>
                </div>
                <div class="address-content">
                    <div class="change"  v-if="active =='快递运输'">
                        <!-- <div >sdfsdfsfsfsf</div> -->
                       
                        <div class="show"  v-if="addressData" @click="goAddress">
                          
                            <p> {{addressData.addressRegion}}{{addressData.addressDetail}} </p>
                            <p>{{addressData.consigneeName}} <span> {{addressData.consigneePhone}}</span> </p>
                        </div>
                        <div class="add"  @click="$router.push({name: 'addressAdd'})" v-else>
                            <span class="circle">  <i class="iconfont icon-jiaru"></i></span>
                            选择收货地址
                        </div>
                       
                    </div>
                    <div class="self" v-else>
                        <h2><span>地址：</span>河南省南阳市</h2>
                        <p><span>电话：</span>13015238110</p>
                        <p><span>时间：</span>周一至周日 08:00 - 17:00</p>
                    </div>
                    <div class="next"><i class="iconfont icon-qianjin1"></i></div>    
                </div>
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
                        <p>共{{imgList.length}}件</p>
                        <div>￥{{ totalMoney}}</div>
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
                  <div class="price" v-if="salesState ">+￥{{postPrice}} </div>
                   <div class="price" v-else>+￥0  </div>
               </div>
               <div class="next"></div>
            </div>
            
        </div>
        <div class="invoice-wrap column-list"  @click="goInvoice">
            <div class="text-wrap" >
                <h2>
                    发票开具
                </h2>
                <p>
                    {{invoiceInfo?invoiceInfo:'不需要'}}
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>
         <div class="mark-wrap column-list"  @click=" goMark">
            <div class="text-wrap">
                 <h2>
                     订单备注
                </h2>
                <p>
                   {{orderMark?orderMark:'商品、备注补充说明'}} 
                </p>
            </div>
            <div class="next"><i class="iconfont icon-qianjin1"></i></div>
        </div>
       

     
  
    
        <div class="footer-fiexd">
            
                <div class="total">
                    <h2>应付金额 <span> ￥{{totalMoney}}</span>  </h2>
                    <p  v-if="salesState ">配送费 ￥{{postPrice}}</p>
                     <p  v-else>配送费 ￥0</p>
                </div>
                <div class="next-btn"  @click="submitOrder">去支付</div>
          
        </div>
        
       
    </div>
</template>
<script>
    import EventBus from 'common/js/eventBus.js'
    import OrderInvoice from 'components/Order/OrderInvoice'
    import Address from 'components/Order/Address'
    import AddressEdit from 'components/Order/AddressEdit'
    import { getCartPay  , getAddressData   } from 'common/api'
    export default {
        
        data(){
            return {
                userCode: '',
                goodsList: [],
                goodsIdArr: [],
                cartArr:[],
                imgList: [],
                shopArr: [],
               
                invoiceType: '个人',
                invoiceName: '',
                taxpayerNumber: '',
                invoiceFlag: false,
                count: '',
                addressFlag: false,
                addressData: null,
                invoiceData: null,
               
                active: '快递运输',
                payType: '线下汇款',
                salesState: ''
              
            }
        },
        created(){
            this.userCode = this.$store.state.userCode;
            // 购买商品
            let goodsStr = sessionStorage.getItem('goods');
            this.goodsList = JSON.parse(goodsStr);
        
            if(this.changeAddressData){
                this.addressData = this.changeAddressData;
            }else{
                 this.getAddressData();     
            }

            // 是否是微商分享，微商分享没邮费 false 为是
            this.salesState = localStorage.getItem('temp1') == null || localStorage.getItem('temp1') == 'null' ?true:false;
           
        
        },
        mounted(){
            this.$nextTick(()=>{
                //   EventBus.$on('changeAddressMsg',this.getChangeAddressMsg)
            })
          
        },
      
        computed: {
            // 总价
            totalMoney(){
                let totalPrice = 0;
                
                this.goodsList.forEach((item,index)=>{
                    let price = item.goodsdata.goodsProcurementPrice?item.goodsdata.goodsProcurementPrice:item.goodsdata.goodsRetailPrice;
                   
                    totalPrice += parseFloat(price) * parseFloat(item.goodsdata.goodsNum);
                    this.goodsIdArr.push(item.goodsId)
                    this.imgList.push(item)
                    this.cartArr.push(item.cartId)   
                    // // this.shopArr.push(ele.shopId)
                    // this.count = item.goodsdata.goodsNum
                   

                })     
              
                
                return totalPrice.toFixed(2)
            },
            // 选择地址
            changeAddressData(){
        
                return this.$store.state.addressItem 

            },
            // 页面最多显示4个商品
            newImgList(){
                let arr = []
                if(this.imgList.length>0){
                    if(this.imgList.length>4){
                        arr = this.imgList.slice(0,4)
                    }else{
                          arr = this.imgList;
                    }
                }
              
                 return arr 
               
            },
            // 备注信息
            orderMark(){
                return  sessionStorage.getItem('order_mark');
            },
            // 发票类型显示
            invoiceInfo(){
                let data =  JSON.parse(sessionStorage.getItem('invoice'));
                this.invoiceData = data;
             
                if(data == null){
                    return data;
                }
                return data.type+' - '+data.details;


            },
            // 快递费
            postPrice(){
                return this.totalMoney>=199? 0: 20;
            }
        },
       
        methods: {
          
            // 获取地址
            async getAddressData(){
            
                let{data:res} = await getAddressData({userCode: this.userCode})
                    if(res.flag == 'success'){
                        this.addressData = res.data[0];
                      
                    }
            },
            // 去支付
            async submitOrder(){
                
                if( this.active == '快递运输' && !this.addressData){
                    this.$toast({
                        message: '请填写地址！',
                        position:'middle',
                        duration: 2000
                    });
                    return   
                };

                // //店铺id去重
                // let obj = {}
                // for(let i=0;i<this.shopArr.length;i++){
                //     let cur = this.shopArr[i];
                //     if(obj[cur] == cur){
                //         this.shopArr[i] = this.shopArr[this.shopArr.length-1];
                //         this.shopArr.length --;
                //         i--;
                //         continue;
                //     }
                //     obj[cur] =cur;
                // }
                // obj = null;


                // 购物车id拼接
                let cartStr = this.cartArr.join(',');
                

                // 发票拼接
                let str = '';
                if(this.invoiceData && this.invoiceData.type == '个人'){
                    str = this.invoiceData.type+'&'+ this.invoiceData.name+'&'+this.invoiceData.details; 
                }else if( this.invoiceData && this.invoiceData.type == '公司'){
                    if(this.invoiceData.companyType == 0){
                         str = this.invoiceData.type+'&普票&'+ this.invoiceData.name+'&'+ this.invoiceData.number+'&'+this.invoiceData.details; 
                    }else{
                         str = this.invoiceData.type+'&专票&'+ this.invoiceData.name+'&'+ this.invoiceData.number+'&'+this.invoiceData.details
                         +'&'+this.invoiceData.bank+'&'+this.invoiceData.account+'&'+this.invoiceData.address+'&'+this.invoiceData.phone; 
                    }
                   
                }
              
                // 获取 shop id，salesID
                let salesid = localStorage.getItem('temp1');
                let shopid = localStorage.getItem('temp2');
              
    
                let params = {
                    userCode:this.userCode,
                    // 店铺id 
                    shopId: shopid,
                    // 分享id
                    salesId: salesid,
                    cartId: cartStr ,  //购物车id

                    receiverType:this.active == '快递运输'?1:0,  //快递方式

                    addressId: this.active == '快递运输'?this.addressData.addressId:'',

                    taxInfo: str, //发票信息

                    remark: this.orderMark,  // 备注信息
                    


                }
            
               let {data:res} = await getCartPay( params );
            
               if(res.flag == 'success'){
                 
                     window.location = 'http://www.scjksm.com/scjkSvn/Home/Weixinpay/pay?out_trade_no='+res.orderNumber;
                       
               }else{
                    this.$toast({
                        message: res.info,
                        position:'middle',
                        duration: 2000
                    });
               }
              
                
            },
            // 
            goBack(){

              
            
                // sessionStorage.clear();
                if(typeof this.$route.query.flag == 'undefined' ){
                   this.$router.go(-1)
                }else{
                    
                    this.$router.push({
                        name: 'cart',
                    });
                }
                
            },
                       
            // 去地址页
            goAddress(){
                 let  id =this.$route.query.id;
                this.$router.push({
                    name: 'address',
                    query: {id:'buy'}

                })
            },
            //  去发票页面
            goInvoice(){
        
                this.$router.push({
                    name: 'orderInvoice'
                    
                })
                
            },
            
            // 去商品目录页面
            goList(){
                sessionStorage.setItem('imgList',JSON.stringify(this.imgList))
                this.$router.push({
                    name: 'orderGoods',
                   
                })

            },
            // 去备注页面
            goMark(){
                  this.$router.push({
                    name: 'orderMark',
                   
                })
            },
           
        },
        
        components: {
            OrderInvoice,
            Address,
            AddressEdit
        }
    }
</script>
<style lang="stylus" scoped>
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
                .tab
                    height .8rem
                    overflow hidden
                    div
                        width 3rem
                        height 100%
                        background #fecfb0
                        color #474747
                        font-size  .24rem
                        line-height .8rem
                        text-align center
                        font-weight 700
                        i 
                            font-size  .32rem
                        span

                            font-size  .24rem
                        &.left
                            float left
                            
                        &.right 
                            float right  
                        &.active
                            background #fff
                            color #ff6600
                .address-content
                    padding .4rem 0
                    background #fff
                    display flex
                    width 100%
                    div

                    .change 
                        flex 1
                        height .8rem
                        max-width calc(100% - .45rem)
                        .add
                          
                            height .28rem
                            border .03rem  solid #ff6600
                            font-weight 700
                            width 2.8rem
                            padding .21rem 0
                            font-size .24rem
                            line-height normal
                            text-align center 
                            color #474747
                            border-radius .15rem
                            margin 0 auto
                           
    
                            .circle
                                width .28rem
                                display inline-block
                                background #ff6600
                                color #fff
                                line-height normal
                                text-align center
                                // padding .07rem 0
                                border-radius 50%
                                vertical-align top
                                margin-top .01rem
                                i 
                                    font-size 0.16rem
                        .show   
                            padding 0 .2rem
                            color #000000
                            font-size .2rem  
                            
                            p   
                                width 100%
                                padding .1rem  0
                                font-weight bold
                                white-space nowrap
                                overflow hidden
                                text-overflow ellipsis
                    .next
                        flex 0 0 .45rem
                        width 45rem
                        line-height .8rem
                        i 
                            font-size .24rem
                            color #c1c1c1

                    .self
                        flex 1
                        height .8rem
                        padding 0 .2rem
                        h2
                            font-size .2rem
                            color #000
                        p 
                            font-size .16rem
                            padding-top .15rem
        .fill-wrap
            height .67rem
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
                    flex 1
                    font-size .2rem
                    color #161616
                p
                    font-size .16rem
                    flex 1
                    text-align right
                    color #9a9a9a
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
                    color #c1c1c1    
        

        .footer-fiexd
            position fixed
            bottom 0
            width 5.8rem
            height 1rem
            align-items center
            background #fff
            display flex

            padding 0 .3rem
            .total
                flex 1
                
                h2 
                    font-size .24rem
                    color #000
                    span    
                        font-size .3rem
                        color #ff6600

                p
                    font-size .16rem
                    padding-top .08rem
                    color #999999
            .next-btn
                flex 0 0 1.8rem
               
                width 1.8rem
                font-size .24rem

                text-align center
                background linear-gradient(90deg,#fea233,#ff6600);
                color #fff
                border-radius .6rem
                padding  .22rem 0
</style>

