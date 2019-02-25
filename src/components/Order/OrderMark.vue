<template>
    <transition name="slide">
        <div class="mark-wrap">
            <mHeader>
                 <div slot="text" class="text">订单备注</div>
                 <div slot="handle"  class="finish" @click="goFinish">完成</div>
            </mHeader>
            <div class="write">
                <textarea  class="word" maxlength="50" placeholder="商品、配送补充说明" v-model="writeWord">

                </textarea>
                <div class="num">{{ newLength }} / 50</div>
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
                writeWord: ''
               
            }
        },
        created(){
           
             
           let hasValue =  sessionStorage.getItem('order_mark');
             

           this.writeWord =hasValue == null? '': hasValue;
        },
        computed: {
            newLength(){
                return this.writeWord.length
            }
        },
        methods: {
            save(){

            },
            goFinish(){
               sessionStorage.setItem('order_mark',this. writeWord) 
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
        .write
            margin .15rem
            background #e5e5e5
            height 2.6rem
            border-radius .15rem
            padding .2rem
            position relative
            .word
                width 100%
                height 100%
                background #e5e5e5
                font-size .2rem
            .num
                position absolute
                right .2rem
                bottom .2rem
                color #9a9a9a
                font-size .2rem
        
                   
</style>    


