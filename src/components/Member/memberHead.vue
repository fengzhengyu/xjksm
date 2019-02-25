<template>
  <div class="member-header border-bottom">
    <div class="back" @click="$router.go(-1)">
      <i class="iconfont icon-fanhui2"></i>
    </div>
    <slot name="text"></slot>

    <slot name="handle"></slot>
    
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
  .member-header
    height .8rem
    line-height .8rem
    overflow hidden
    color #727272
    background #f9f9f9
    div
      float left
    .back
      width .8rem
      text-align center
     
      i 
        font-size .3rem
        color #727272
    .text 
      font-size .26rem
    .add
      float right 
      margin-right .3rem 
      width .48rem
      height .48rem
      background #fd7722
      border-radius 50%
      text-align center
      line-height .48rem
      margin-top .15rem
      i 
        font-size .18rem
        color #fff
    .save,.del
        float right 
        padding 0  .3rem 
        color #fd7722  
        font-size .18rem 
    .finish
        float right 
        padding 0  .3rem 
        font-size .24rem 
        span 
          color #ff0000
          i
            font-size .2rem 
</style>  