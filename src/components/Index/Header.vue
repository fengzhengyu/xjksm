<template>
    <div class="header">
        <div class="logo"></div>    
        <div class="search-wrap">
            <i class="iconfont icon-sousuo icon"></i>
            <input type="text" class="search"  value="搜索商品" @click="goSearch">
        </div>
    </div>     
</template>
<script>
    export default {
        methods: {
            goSearch(){
                this.$router.push({
                    name: 'search'
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable.styl"
    .header
        width 100%
        height .8rem
        background $mainBgColor
       
        .logo
            float left
            width .67rem
            height .48rem
            background url('./logo.png') 
            background-size 100% 100%
            margin .15rem  .25rem 0 .25rem
        .search-wrap
            float left
            margin .1rem  0
            height .6rem
            position relative
            width 5.08rem
            
            .icon    
                color $color-text-c
                font-size $font-icon
                display block
                position absolute
                top 50%
                left .15rem
                margin-top -0.12rem
            .search
                color $color-text-c
                width 4.58rem  
                height .4rem
                border-radius 0.3rem 
                padding .1rem  0  0.1rem .5rem
                line-height .4rem
                font-size $font-highlight
</style>
