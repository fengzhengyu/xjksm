<template>
  <div class="classify">
      <ul class="classify-wrap">
          <li class="item" v-for="(item,index) in goodsTypeList" :key="index">
            <router-link :to="{name:'goods',query:{id:item.typeId}}" class="link">
                <span >
                    <div class="box" :class="imgList[index]"></div>
                </span>
                <span class="text">{{item.typeName.substring(0,4)}}</span>
            </router-link>
          </li>
           
      </ul>
    
  </div>
</template>
<script>

    export default {
        props: {
            goodsTypeList: {
                tpye:Array,
                default: []
            }
        },
        data() {
            return {
                imgList: [
                    'img1','img2','img3','img4','img5','img6','img7','img8','img9','img10','img11','img12',
                ]
            }
        },
        created() {
        },
        methods: {

        }
    }
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable.styl"
.classify 
    width 100%
    background #fff
    .classify-wrap 
        overflow hidden
        padding-bottom .35rem
        .item 
            float left
            width 16.6%
            margin-top .25rem
            span
                display block
                width 100%
                text-align center
                .box
                    width .76rem
                    height .76rem
                    display inline-block
                    &.img1
                        background url('./1.jpg') no-repeat
                        background-size 100% 100%
                    &.img2
                        background url('./2.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img3
                        background url('./3.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img4
                        background url('./4.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img5
                        background url('./5.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img6
                        background url('./6.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img7
                        background url('./7.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img8
                        background url('./8.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img9
                        background url('./9.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img10
                        background url('./10.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img11
                        background url('./11.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%
                    &.img12
                        background url('./12.jpg') no-repeat
                        background-size 100% 100%
                        background-size 100% 100%                
            .text
                padding-top 0.1rem
                font-size .18rem
                color $color-text-d

            
        
    

</style>

