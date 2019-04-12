<template>
  <transition name="slide">
    <div class="user">
      <mHeader class="header">
        <div class="text" slot="text">分享详情</div>
      </mHeader>
      <div class="share-list">
        <div class="column-list">
          <div class="text-wrap">
            <h2>订单编号</h2>
            <p>{{$route.query.id}}</p>
          </div>
        
        </div>
        <div class="column-list">
          <div class="text-wrap">
            <h2>下单时间</h2>
            <p>{{ goods.addTime }}</p>
          </div>
       
        </div>
        <div class="mark-wrap column-list">
          <div class="text-wrap">
            <h2>实付方式</h2>
            <p>微信支付</p>
          </div>
       
        </div>
         <div class="mark-wrap column-list">
          <div class="text-wrap">
            <h2>购买用户</h2>
            <p>{{ goods.contact }}</p>
          </div>
        
        </div>
         <div class="mark-wrap column-list">
          <div class="text-wrap">
            <h2>用户手机</h2>
            <p>{{goods.contactPhone}}</p>
          </div>
         
        </div>
         <div class="mark-wrap column-list">
          <div class="text-wrap">
            <h2>用户地址</h2>
             <p >{{ goods.receiverAddress }}</p>
          </div>
        
        </div>
        <ul class="goods-list">
          <li v-for="item in goods.goodlist" class="border-bottom">
            <p>商品名称：{{ item.goodsName }}</p>
            <p>商品单价：￥{{ item.goodsRetailPrice }}<span>数量：x {{ item.goodsNum }}</span></p>
          </li>
        </ul>
         <div class="mark-wrap column-list">
          <div class="text-wrap">
            <h2>订单总价</h2>
             <p  class="price">￥{{ goods.goodsPriceTotal }}</p>
          </div>
         
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import mHeader from "components/Member/memberHead";
import { getShareDetail } from "common/api";
export default {
  components: {
    mHeader
  },
  data() {
    return {
     goods: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data: res } = await getShareDetail({
        salesId: this.$store.state.salesId,
        orderNumber: this.$route.query.id
      });
      // console.log(res);
      if (res.flag == "success") {
        this.goods= res.info;
      } 
    }
  }
};
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.header {
  position: fixed;
  top: 0;
  width: 6.4rem;
}

.share-list 
  padding-top: .8rem;
  .goods-list
    margin-top .05rem
    background #fff
    &:before
      content '商品列表'
      font-size .2rem
      color #999999
      font-weight 700
      padding .2rem
      display block

    li 
      padding 0 .3rem

      p 
        line-height 200%
        color #161616
        font-size .18rem
        overflow hidden
        span 
          float right

  .column-list
    display flex
    align-items center
    background #ffffff
    margin-top .05rem
    .text-wrap
        flex 1
        display flex
        align-items center
        padding 0 .2rem
        max-width  calc(100% - .4rem )
        line-height .8rem
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
            &.price
              color #f60
              font-size .28rem
  
        
      
</style>    
