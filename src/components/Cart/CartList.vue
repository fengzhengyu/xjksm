<template>

<div class="cart" >
    <div class="cart-wrap"  :style="{'padding-bottom': paddingVal}">
       
        <div class="group border-bottom" v-for="(goods,index) in cartList" :key="index">
            <div class="group-check" >
                    <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':goods.checked}" @click="selectedProduct(goods,cartList)"></i>
            </div>
            <div class="group-detail" >
                <div class="item-img" @click="$router.push({name:'id',params:{goodsId:goods.goodsdata.goodsId}})">
                    <img v-lazy="goods.goodsdata.goodsPhoto" :key="goods.goodsdata.goodsPhoto">
                   
                </div>
                <div class="item-info">
                    
                    <p class="title">{{goods.goodsdata.goodsName}}</p>
                    <p class="specification">
                        <span class="text">规格：{{ goods.goodsdata.goodsSpecification}}</span>
                        
                    </p>
                    
                        <div class="bottom">
                        <p class="price">价格：￥{{goods.goodsdata.goodsProcurementPrice? goods.goodsdata.goodsProcurementPrice:(goods.goodsdata.goodsTradePrice?goods.goodsdata.goodsTradePrice:goods.goodsdata.goodsRetailPrice) }} </p>
                            <div class="cart-control-wrapper"  >
                            <!--  -->
                        
                            <div class="cart-decrease icon-circle border"  @click=" editCart('minus',goods)">
                                <i class="iconfont icon-jian"></i>
                                </div>
                            <div class="cart-count" >{{ goods.goodsdata.goodsNum }}</div> 
                            <div class="cart-add icon-circle border" @click=" editCart('add',goods)" >
                                <i class="iconfont icon-jiaru"></i>
                            </div>
                    
                            </div>
                        </div>
                    
                    
                </div>
            </div>
        </div>
    </div>

    <div class="footer-fiexd"  :class="{'fiexd':fiexdStatus}" v-show="cartList.length>0">
        <div class="all-check" @click="checkAllFlag?checkAll(false):checkAll(true)">
            <i class="iconfont icon-weixuanzhong" :class="{'icon-xuanzhong':checkAllFlag}"></i>
            <span>全选</span>
        </div>
        <div class="total">商品合计<span>￥{{countTotalPrice}}</span></div>
        
        
        <div class="next-btn" @click="nextStep" v-show="!deleteStatus">去结算({{countTotalNum}})</div>
        
        <div class="delete" v-show="deleteStatus" @click="deleteGoods">
            删除({{countDelNum}})
        </div>
    </div>

</div>

    

    
</template>
<script>
    import {getCartData , getAddCartData , getCartPay , getCartDelete } from 'common/api'
    export default {
        props: {
            cartList:{
                type: Array
             },
            deleteStatus: {
                type:Boolean
            },
            userCode: {
                 type: String
            },
            isLoad: {
                 type:Boolean
            },
          
        },
        data() {
            return {
               userLevel: '', 
               checkAllFlag: false,

               checkedArr: [],
              
               fiexdStatus: false,
               paddingVal: 0
            }
        },
        created(){
        //   this.userLevel = this.getCookie('userLevel');
      

        },
        mounted(){
            
                window.addEventListener('scroll', this.handleScroll,false)
           
        },
        watch: {
           
        },
       
        computed:{
            // 计算商品总数
           countTotalNum(){
                let n = 0;
                if(this.cartList.length>0){
                    this.cartList.forEach((item,index)=>{
                   
                        if (item.checked) {
                            
                            n +=  parseInt(item.goodsdata.goodsNum);
                        }
                    
                    })       
                }
               
                return n;
            },
          //计算总价
            countTotalPrice(){
                let totalPrice = 0;
                if(this.cartList.length>0){
                    this.cartList.forEach((item,index)=>{
                   
                        if (item.checked) {
                            let price = item.goodsdata.goodsProcurementPrice?item.goodsdata.goodsProcurementPrice:item.goodsdata.goodsTradePrice?item.goodsdata.goodsTradePrice:item.goodsdata.goodsRetailPrice;
                            totalPrice += price * parseInt(item.goodsdata.goodsNum);
                        }
                    
                    })       
                }
                     
              
                return totalPrice.toFixed(2);
            },
            // 计算删除数量
            countDelNum(){
                let i = 0;
                this.cartList.forEach(item => {
                    if(item.checked ){
                        i++;
                    }
                });
                
                return i;
            }
        },
         methods:{
            //  编辑购物车
            editCart(flag,item){
                let numFlag = true;
                if(flag == 'add'){
                    item.goodsdata.goodsNum++;
                }else if(flag == 'minus'){
                
                    if(item.goodsdata.goodsNum <= 1){
                        item.goodsdata.goodsNum = 1;
                        return;
                    }

                    item.goodsdata.goodsNum--;
                    
                }
              
                getAddCartData({userCode:this.userCode,goodsId:item.goodsdata.goodsId,goodsNum:item.goodsdata.goodsNum}).then(response=>{
                  let res = response.data;
                  if(res.flag == 'success'){
                       let num =0;
                        if(flag == 'add'){
                            num = 1;
                        }else if(flag == 'minus'){
                            num = -1;
                        }
                    this.$store.commit('updateCartCount',num)
                    }else{
                        console.log(res.infn)
            
                    }
              });
                
             
                

            },
           
            //商品单选
            selectedProduct(goods,goodsList){
             
                if(typeof goods.checked == 'undefined'){
                    this.$set(goods,'checked',true)
                     
                }else{
                    goods.checked = !goods.checked;
                }

                 //长度不够全选取消
                this.checkAllFlag = true;
                this.cartList.forEach((item,index)=>{
                    if(!item.checked){
                        this.checkAllFlag = false;
                    }
                })
              
            },
            //全选
            checkAll(flag){
                this.checkAllFlag = flag;
                this.cartList.forEach((item,index)=>{
                    if(typeof item.checked == 'undefined'){
                        this.$set(item,'checked',this.checkAllFlag);
                    }else{
                        item.checked = this.checkAllFlag;
                    }
                  
                })
            },
            //结账
            async nextStep(){
                 if(this.$store.state.salesId){
                    this.$toast({
                        message: '您购买请联系您的店铺！',
                        position:'middle',
                        duration: 2000
                    });
                    return;
                }
                if(this.countTotalNum<=0){
                    this.$toast({
                        message: '请选择商品哦！',
                        position:'middle',
                        duration: 2000
                    });
                }else{
             
                   let goodsArr= []
                    this.cartList.forEach((item,index)=>{
                        if (item.checked) {
                            goodsArr.push(item);
                        }
                       

                    })            
                   
                    sessionStorage.setItem('goods', JSON.stringify(goodsArr));
                    this.$router.push({
                        name: 'order'
                            
                    })
                }
            },
            //删除
            deleteGoods(){
                
               

                if(this.countDelNum<=0){
                    this.$toast({
                        message: '请选择删除的商品！',
                        position:'middle',
                        duration: 2000
                    });
                }else{
                    let arr = [];
                    let delCount = 0;
                    this.cartList.forEach((item,index)=>{
                        if (item.checked) {

                            arr.push(item.cartId) ;          
                            delCount += parseInt(item.goodsdata.goodsNum )  ;
                        
                        }
                    })            
                    let arrStr = arr.join(',');


                    let msg =  `确定删除这${arr.length}个商品?`;
                  
                   
                    this.$messagebox.confirm(msg).then(action => { 
                         
                        getCartDelete({userCode:this.userCode,cartId:arrStr}).then(response=>{
                            let res = response.data;
                            if(res.flag == 'success'){                        
                                this.$toast({
                                    message: '删除成功！',
                                    position:'middle',
                                    duration: 2000
                                });
                                
                                this.$emit('deleteSucceed')
                                let n = this.$store.state.cartCount -  delCount;
                                this.$store.commit('initCartCount',n);
                                
                            }else{       
                                this.$toast({
                                    message: '删除失败！',
                                    position:'middle',
                                    duration: 2000
                                });
                            
                            }
                        },err=>{console.log(err)})
                        
                    }).catch(err=>{})

                }
                   
                    
                   
                
            },
            // 滚动固定位置
            handleScroll(){
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                // console.log( scrollTop)
                var parentH =  document.querySelector('.cart').parentNode.offsetHeight,
                    cartH =  document.querySelector('.cart').offsetHeight;
                //   console.log( parentH, cartH)

                  if(cartH >parentH && scrollTop>0){
                      this.fiexdStatus = true;
                      this.paddingVal = '1.8rem';
                  }else{
                     this.fiexdStatus = false; 
                     this.paddingVal = 0
                  }
            }
         },
         destroyed(){
              window.removeEventListener('scroll', this.handleScroll,false)
         }
    }
</script>
<style lang="stylus" scoped>
    .cart
        background #fff
        margin .15rem .15rem .95rem .15rem
        // padding-bottom .9rem
       

       .shop
           overflow hidden
           background #e4e4f6
           height .6rem
           line-height .56rem 
           border-top 0.01rem solid #c8c7cc 
           border-bottom 0.01rem solid #c8c7cc
           .list
               float left
               
           .check-btn
               margin  0 .2rem
              
               i 
                font-size 0.36rem
                &.icon-xuanzhong
                    color #cc3e2e
                
           .shop-icon
               
               margin-right .1rem
               i 
                font-size 0.36rem
            .shop-name  
               width 5rem 
               font-size .24rem
              
               .name 
                 color #010101   
       .group
           overflow hidden
           padding .4rem 0
           display flex
           align-items center
           width 6.1rem
           height 1.65rem
           .group-check
               padding  0 .2rem
               flex 0 0 .4rem
               width .4rem 
               i
                font-size 0.36rem

                &.icon-xuanzhong
                    color #ff6600
                
           .group-detail

                flex 1
                max-width calc(100% - .8rem)
                display flex
              
               .item-img
                   flex 0 0 1.65rem
                   width 1.65rem
                   height 1.65rem
                   img 
                      width 100%
                      height 100%
               .item-info
                    flex 1
                    padding 0 .25rem 
                    max-width calc(100% - 1.65rem - .5rem)
                   .title
                       font-size .24rem
                       font-weight bold
                       text-overflow ellipsis
                       white-space nowrap
                       overflow hidden
                       padding  .05rem 0
                       color #474747
                   .specification
                       text-overflow ellipsis
                       white-space nowrap
                       overflow hidden
                       font-size .18rem
                       color #9a9a9a
                       padding .1rem 0 .6rem 0
                    .bottom
                        display flex
                        align-items center    

                        .price
                            flex 1
                            font-size .2rem
                            color #dc143c
                            position relative
                            

                            .store
                                position absolute 
                                bottom 0
                                right  0
                                color #787878
                        .cart-control-wrapper
                            flex 0 0 1.3rem
                            width 1.3rem
                            font-size: 0;
                            text-align right
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
                                &:before
                                    border-radius 50%

                                i 
                                    font-size .18rem
                                    color #000
                                    font-weight bold
    
        .footer-fiexd
            // position fixed
            // bottom .88rem
            // width 6.4rem
            height .8rem
            line-height  .8rem
            background #fff
            overflow hidden
            // margin 0 auto
            .all-check
                margin  0 .2rem
                float left
                i 
                    font-size .36rem
                    vertical-align middle
                    &.icon-xuanzhong
                        color #ff6600
                span 
                    font-size .22rem
                    vertical-align middle
            
            
            .total
                float left
                font-size .22rem
                font-weight bold
                margin-right .2rem
                color #000000
                span    
                    color #ff6600
                    font-size .26rem
            .next-btn
                float right
            
                width 1.7rem
                text-align center
                // background #f86320
                color #fff
                display inline-block
                line-height .7rem
                border-radius .5rem
                font-size .24rem
                margin-right .3rem
                background linear-gradient(-90deg,#e93b3d,#ff9574);
                margin-top .05rem
            .delete
                float right 
                font-size .24rem
                height .7rem
                width 1.7rem
                text-align center
                line-height .7rem
                background #fe4600
                color #fff
                margin-right .3rem
                border-radius .05rem
                margin-top .05rem
            &.fiexd
                width 6.1rem
                position fixed
                bottom .88rem

</style>    