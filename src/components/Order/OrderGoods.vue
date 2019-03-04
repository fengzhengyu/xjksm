<template>
    <transition name="slide">
        <div class="mark-wrap">
            <mHeader>
                 <div slot="text" class="text">订单列表</div>
               
            </mHeader>
            <div class="goods-wrap">
              <div class="desc border-bottom">
                  <p>包裹</p>
                  <span>{{goodsList.length}}件</span>
              </div>
              <ul class="goods">
                  <li class="border-bottom" v-for="item in goodsList">
                      <div class="img">
                          <img :src="item.goodsdata.goodsPhoto" >
                      </div>
                      <div class="info">
                          <h3>{{item.goodsdata.goodsName}}</h3>
                          <p>{{item.goodsdata.goodsSpecification}} </p>
                          <p class="price">￥{{item.goodsdata.goodsProcurementPrice? item.goodsdata.goodsProcurementPrice:item.goodsdata.goodsTradePrice?item.goodsdata.goodsTradePrice:item.goodsdata.goodsRetailPrice}}</p>
                          <div>x{{item.goodsNum}}</div>
                      </div>
                  </li>
                 
              </ul>
            </div>
        </div>
    </transition>
   
</template>
<script>
 import mHeader from 'components/Member/memberHead'
    export default {
        components: {
            mHeader
        },
        data(){
            return {
                goodsList: []
               
            }
        },
        created(){
            let goodsStr = sessionStorage.getItem('imgList');
            this.goodsList = JSON.parse(goodsStr);
           
        },
        computed: {
          
        },
        methods: {
            save(){
                

              
                
                    
                
            },
            invoiceFlag(){
            
                this.$router.go(-1)

                
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .mark-wrap
        position absolute
        top 0
        bottom 0
        width 6.4rem
        background #ffffff
        .goods-wrap
            margin .15rem 
            .desc
                padding .25rem .2rem
                display flex
                font-size .24rem
                align-items center
                p 
                    flex 1
                    font-weight bold
                    color #202020
                span 
                    flex 1  
                    text-align right
                    color #ccc
            .goods
                li 
                    display flex        

                    .img 
                        margin .2rem .15rem
                        flex 0 0 1.25rem
                        width 1.25rem
                        height 1.25rem
                        border 0.01rem solid #150d0f
                        box-sizing border-box
                        img  
                            width 100%
                            height 100%
                    .info
                        flex 1
                        padding .2rem .15rem .2rem  0
                        position relative
                        height 1.25rem
                        h3 
                            width 100%
                            overflow hidden
                            font-size .24rem
                            padding .1rem 0  
                            color #161616
                            white-space nowrap
                            text-overflow ellipsis
                        p 
                            font-size .2rem
                            padding-top .15rem
                            color #9a9a9a
                            &.price
                                color #ff6600
                        div 
                            position absolute
                            right .2rem
                            bottom .2rem   
                            font-size .2rem
                            color #474747

        
                   
</style>    


