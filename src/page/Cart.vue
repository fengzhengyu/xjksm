<template>
    <div class="cart-home">
        <div class="header">
            <span class="title">购物车</span>
            <span class="edit"  v-if="cartList.length>0" @click="deleteFlag = !deleteFlag">{{deleteFlag == true?'完成':'编辑'}}</span>
        </div>
    

        <CartList :deleteStatus="deleteFlag" v-show="userCode" :cartList="cartList"  :isLoad="isLoad" :userCode="userCode" @deleteSucceed="getDeleteMsg"></CartList>  
        

        <div class="empty-cart" v-if="cartList.length<=0">
            <div class="icon">
            
            </div>
            <h2>你还没放入任何商品！</h2>
            <div class="go-home">
                <span @click="$router.push({name: 'index'})">去首页逛逛</span>
            </div>
        </div>
         
        <Footer></Footer>
    </div>
</template>
<script>
 import {getCartData} from 'common/api'
 import Footer from 'components/common/c-footer.vue'
 import CartList from 'components/Cart/CartList.vue'
 export default {
     data(){
         return {
             deleteFlag:false,
             cartList:[],
             isLoad: false,
         }
     },
  
     created(){
        
           if( this.userCode){
               this.$indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            })
            this.getCartList();
           }
            
           
     },
     watch: {
      
     },
       computed: {
            userCode(){
                return this.$store.state.userCode == null? '': this.$store.state.userCode;
            }
        },
     methods: {
            async getCartList(){
                let {data:res} = await getCartData({userCode:this.userCode});
                this.$indicator.close();
                 this.isLoad = true
                //  console.log(res)
                if(res.flag == 'success'){
                    this.cartList  = res.data;
                   
                }else{
                   this.cartList  = [];
                }
                
            },
            getDeleteMsg(){
                  this.getCartList();
            }
     },
   
    
     components: {
         CartList,
         Footer
     }
 }
    
</script>
<style lang="stylus" scoped>
.cart-home
    position absolute
    padding-top .8rem
    padding-bottom .8rem
    width 6.4rem
    top 0
    bottom 0
   
    
    .header 
        position fixed
        top 0
        width 6.4rem
        height .8rem
        background #ff6600
        line-height .8rem
        font-size .28rem
        color #fff
        z-index 100
        span
            padding 0 .3rem
            &.edit 
                float right 
            
    .empty-cart
        text-align center
        .icon
           display inline-block
           width 2.27rem
           height 2.08rem
           margin-top .9rem
           background url('../common/img/cart-no.png') no-repeat
           background-size 100% 100%
        h2
    
            font-size .2rem
            color #919192
            padding .4rem 0
        .go-home
            
            span
                width  2.1rem 
                border: .03rem solid #ff6908;
                padding .12rem 0
                color: #ff6908
                font-size .22rem
                display: inline-block;
                border-radius: .1rem;
                line-height normal
                background #fff
                
</style>
