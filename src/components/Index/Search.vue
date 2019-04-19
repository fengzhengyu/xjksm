<template>
    <div class="search-page">
        <div class="header">
            <div class="back" @click="goBack">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <div class="search">
                <i class="iconfont icon-sousuo icon" @click="goSearch" @keyup.enter = "goSearch"></i>
                    <form action="javascript:void(0)">
                        <input type="search" placeholder="搜索商品" v-model="keyword"  @keyup.enter="goSearch" v-focus>
                    </form>
                
            </div>
            <div class="text" @click="goSearch"  @keyup.enter = "goSearch">搜索</div>
        </div>
       
        <div class="no-data">
            <div class="box">
                请输入您要搜索的商品
            </div>
            
        </div>
       
   
       
    </div>
</template>
<script>
import GoodsList from 'components/Index/GoodsList'
    import { getIndexData } from 'common/api'
export default {
    data() {
        return {
            keyword:'',
            goodsList: [],
            isLoad: false,
            page:1,
            loading:true,//
            end:false,//
             
        }
    },
     created(){
           
             this.userCode = this.$store.state.userCode;
                
       
    },
     watch:{
      keyword(val){
        if(val == ''){
          this.isLoad= false;
          this.goodsList = [];
        }
      }

    },
    methods: {
        async goSearch(){
         
            if(this.keyword == ''){
                this.$toast({
                    message: '您搜索的内容不能为空',
                    position: 'middle',
                    duration: 3000
                    });
                return;
            }

              this.$router.push({
                    name: 'searchName',
                    params:{name: this.keyword}
                })    


           
             
             
        },
       
        show(){
           this.$toast({
                    message: '请登陆后查看！',
                    position:'middle',
                    duration: 2000
                });
                setTimeout(()=>{
                    this.$router.push({
                        name: 'login'
                    });
                },500)
        },
        goBack(){
           this.$router.back()
        }
    },
    
}
</script>
<style lang="stylus" scoped>
    .search-page
        width 6.4rem
        margin 0 auto  
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background #fff
    
        .header  
            width 6.4rem
            overflow hidden
            position fixed
            background #fff
            z-index 9999
            .back 
                padding .3rem
                float left
                i 
                    font-size .36rem
            .search
                background #fff
                float left
                width 4.8rem
                margin-top .2rem
                height .55rem
                border-radius .3rem
                overflow hidden
                
                position relative
                .icon    
                        color #999
                        font-size .36rem;
                        display block
                        position absolute
                        top 50%
                        left .15rem
                        margin-top -0.18rem
                input 
                    background #f5f5f5
                    color #000
                    width 100%  
                    height .55rem
                    border-radius 0.2rem 
                    padding .05rem  0  0.05rem .5rem
                    box-sizing border-box
                    outline none
                    line-height .4rem
                    font-size .24rem
            .text
                float left
                color #000
                line-height .6rem
                margin-top .2rem
                font-size .24rem
        .no-data
            margin-top 1rem
            .box
                margin 0 auto 
                width 3rem
                height .5rem
                border 1px solid #38a0df  
                font-size .24rem
                line-height .5rem
                text-align center
                color #38a0df         
              
                  
</style>

