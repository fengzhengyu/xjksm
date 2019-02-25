<template>
   <transition name="slide">
    <div class="user">
        <mHeader>
            <div class="text" slot="text">系统设置</div> 
        </mHeader>
           
         <div class="submit">
           <div class="btn" @click="quit">退出当前账号</div>
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
    created(){
     
    },
    methods: {
      quit(){
             
        this.$store.commit('delUserInfo', '');
        this.$store.commit('initCartCount', 0)
        this.$store.commit('getAddressItem',null)
        localStorage.setItem('shopId','');

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
  .user
    position absolute
    width 6.4rem
    top 0
    bottom 0
    background #f4f5f7
    .submit
      margin .8rem 0
      .btn
        width 4.5rem
        color #fff
        font-size .24rem
        padding .2rem 0
        background #ff6600
        text-align center
        margin  0 auto
</style>    
