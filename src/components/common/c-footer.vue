<template>
  <footer class="footer border-top">
      <div class="item" :class="{'active':selected == 'index'}" @click="go('index')">
          <i slot="icon" class="iconfont icon-zhuye"></i>
          <span class="text">首页</span>
      </div>
      <div class="item" :class="{'active':selected == 'goods'}"  @click="go('goods')">
         <i slot="icon" class="iconfont icon-leimupinleifenleileibie2-copy"></i>
         <span class="text"> 分类</span>
      </div>
      <div class="item" :class="{'active':selected == 'cart'}"  @click="go('cart')">
         <i slot="icon" class="iconfont icon-gouwuche1-copy-copy" ><sub v-if="cartCount>0">{{cartCount}}</sub></i>
         <span class="text"> 购物车</span>
      </div>
      <div class="item" :class="{'active':selected == 'member'}" @click="go('member')">
          <i slot="icon" class="iconfont icon-wodedangxuan1"></i>
          <span class="text">我</span>
      </div>
  </footer>
</template>
<script>
  import { getCartCount  } from 'common/api'
  export default {
    data(){
      return {
        selected: '',
       
      }
      
    },
    created() {
      this.selected = this.$route.name;
      this.getCartCountData();
    },
    computed:{
      cartCount(){
        return this.$store.state.cartCount;
      },
       userCode(){
                return this.$store.state.userCode == null ? '': this.$store.state.userCode;
            },
    },
    methods: {
      go(value){
        this.$router.push({
          name: value
        })
      },
      // 获取购物车总数量
      async getCartCountData(){
           let {data: res} = await getCartCount({userCode: this.userCode});
  
           if(res.flag == 'success'){

             this.$store.commit('initCartCount',res.cartnum);
           }
          

      }
    }
  }
</script>


<style lang="stylus" scoped>
    footer
        height .89rem
        color #575757
        position fixed
        bottom 0
        background #fff
        width 6.4rem
        display flex
        justify-content center
        align-items center
        // left 0
       
        .item
            flex 1
            text-align center
            padding .1rem
            color #737373
            
            .iconfont 
              color #bdbdbd
              font-size .4rem
              position relative
              sub
                position absolute
                top 0
                right -.1rem
                width .25rem
                height .25rem
                line-height .25rem
                background #ff0000
                font-size .1rem
                border-radius 50%
                color #fff
            .text 
              display block
              padding-top .1rem
              font-size .18rem
            &.active 
                color #ff6600
                .iconfont 
                   color #ff6600

</style>

