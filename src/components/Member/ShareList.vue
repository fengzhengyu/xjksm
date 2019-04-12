<template>
   <transition name="slide">
    <div class="user">
        <mHeader  class="header">
            <div class="text" slot="text">分享列表</div> 
        </mHeader>
        <div class="share-list"
            v-if="isLoad"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
        >
          <ul class="wrapper">
            <li v-for="(item,index) in shareList" :key="index" class="list" @click="goDetail(item)">
              <p>订单编号：&nbsp;{{item.orderNumber }}</p>
              <p>完成时间：&nbsp;{{ item.addTime }}</p>
              <p>下单用户：&nbsp;{{ item.contact }}</p>
              <p>订单总价：&nbsp;<span class="price">￥{{ item.goodsPriceTotal }}</span></p>
            </li>

          </ul>
           <div v-if="shareList.length>0" class="bottom-tip">
                <div class="ladding" v-if="!end">
                    <img src="../../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
                </div>
                <div class="ladding" v-else>
                    您已经到底了
                </div>
              
            </div>
            <div v-else class="bottom-tip">
                <div class="ladding">暂无数据</div>
            </div>
        </div>
    </div>
  </transition>
  
</template>
<script>
 import mHeader from 'components/Member/memberHead'
import { getShareList } from 'common/api'
export default {
   components: {
        mHeader
    },
    data(){
      return {
        page: 1,
        shareList: [],
        isLoad:true, //有数据的情况
        loading: true,  //true为禁止，false 为启动
        end: false  // 到底了
      }
    },
    created(){
      this.getList();
    },
    methods: {
      
      async getList(flag){
        let {data: res} = await getShareList({salesId:this.$store.state.salesId,page:this.page});
        //  console.log(res)
        if(flag){
           this.shareList =res.info.list;
            if(res.info.listflag == "已到末尾"){
              this.loading = true;
              this.end = true;
                
            }else{
                  this.loading = false;
            }
          
        }else{
           if(res.flag == 'success'){
                this.shareList = res.info.list;
                if( this.shareList.length>0){
                  this.loading = false;    
                }
             
                this.isLoad = true;
                
            }else{
                this.isLoadEnd = true;
            }
        }
       
        
    },
    //上拉刷新
  loadMore(){
      // 缓存后 页面滚动条重复加载问题
      // if(routerLeave) return;
      this.loading = true;
      setTimeout(()=>{
            this.page++;
            this.getList(true)

      },300)
                              
    
    },
    goDetail(item){
       this.$router.push({
          name: 'shareDetail',
          query:{id:item.orderNumber}
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    position fixed
    top 0
    width 6.4rem
  .share-list
    padding-top .8rem
    .wrapper

      width 6.4rem
      .list
        margin-bottom 0.02rem
        background #fff
        padding .3rem
        width 5.8rem
        font-size .2rem
        color #161616
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        line-height 200%
        .price
          color #f60
    .bottom-tip
      width 100%
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #000;
      background: #fff;
      font-size .18rem
      .loading-hook
          img 
              width .3rem    
</style>    
