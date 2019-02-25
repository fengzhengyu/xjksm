<template>
  <div class="rank-header">
    <div class="back" @click="$router.push({path: '/'})">
      <i class="iconfont icon-fanhui2"></i>
    </div>
    <div class="search" @click="$router.push({name: 'search'})">
      <i class="iconfont icon-search"></i>
      <input type="text" placeholder="搜索商品名称">
    </div>
    <div class="cart"  @click="$router.push({name: 'cart'})">
      
      <i class="iconfont icon-gouwuche1-copy-copy">
        <sub v-if="cartCount>0">{{cartCount}}</sub>
      </i>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      cartCount(){
        return this.$store.state.cartCount;
      }
    }

  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
  .rank-header
    height .8rem
    background $color-text 
    width 6.4rem
    position fixed
    z-index 10
    display flex
    justify-content center
    align-items center
    .back
      flex  0 0 1rem
      width 1rem
      padding  .2rem 0
      text-align center
      i 
        font-size .4rem
        $color-text-c
    .search  
      flex 1
      padding 0.1rem .2rem 0.1rem .4rem 
      margin .1rem 0
      background #f5f5f5
      border-radius .3rem
      position relative
      i
        position absolute
        top 50%
        left .05rem
        color $color-text-c
        font-size .3rem
        margin-top -.12rem

      input
        width 100%
        height .4rem
        background #f5f5f5
        font-size $font-highlight

    .cart
      flex  0 0 .9rem
      width  .9rem
     
      i 
        padding-left .1rem
        font-size .4rem
        position relative
        width .4rem
        color $color-theme 
       

        sub 
          position absolute
          width .3rem
          height .3rem
          top -.1rem
          right -.15rem
          background $color-sub-theme
          font-size .14rem
          border-radius 50%
          text-align center
          line-height .3rem
          color #fff

</style>  