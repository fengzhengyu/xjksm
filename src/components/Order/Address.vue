<template>
 <transition name="slide">
   <div class="address-page">

      <mt-header title="选择地址">
          <span to="" slot="left" @click="$router.go(-1)">
              <mt-button icon="">
                  <i class="iconfont icon-fanhui"></i>
              </mt-button>
          </span>        
      </mt-header>
      <div class="address-content">
          <h1>
            配送地址
            <p @click="goAddressEdit">+增加收货地址</p>  
          </h1>
          <ul class="address-list">
              <li v-for="(item,index) in addressList" :key="index">
                  <div class="info">
                      <!-- <div class="cur" @click="changeAddress(item)">
                          <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':item.selected}"></i>
                      </div> -->
                      <div class="msg" @click.stop="changeAddress(item)">
                          <h2>
                              <span class="name">{{item.consigneeName}}</span>
                              <span>{{ item.consigneePhone }}</span>
                          </h2>   
                           <p>
                               <span v-if="item.addressStatus == 0">默认</span>
                               {{ item.addressRegion }} {{item.addressDetail}}
                            </p> 
                      </div>
                  </div>
                  <div class="handle">
                      <p></p>
                      <div @click.stop=" EditAddress(item,index)">
                          <i class="iconfont icon-bianji"></i>
                      </div>
                      <div @click="delAddress(item)">
                           <i class="iconfont icon-shanchu"></i>
                      </div>
                  </div>
                 
              </li>
             
              
             
          </ul>
          <div class="not-address" v-if="addressList.length<=0">暂无地址，请添加地址</div>
      </div>
    </div>
 </transition>
  
</template>
<script>
    import EventBus from 'common/js/eventBus.js'
    import {  getAddressData, delAddressData } from 'common/api'
  export default {
      props: {
          userCode: {
              type: String
          }
          
      },
    data(){
      return {
        addressList:[],
        addressItem: {}
      }
    },
    created(){
        
         this.getAddressList()
   },
    //  beforeCreate () {
    // console.group('%c%s', 'color:red', 'beforeCreate 创建前状态===============组件2》')
    // },
    // created () {
    // console.group('%c%s', 'color:red', 'created 创建完毕状态===============组件2》')
    // },
    // beforeMount () {
    // console.group('%c%s', 'color:red', 'beforeMount 挂载前状态===============组件2》')
    // },
    // mounted () {
    // console.group('%c%s', 'color:red', 'mounted 挂载状态===============组件2》')
    // },
    // beforeUpdate () {
    // console.group('%c%s', 'color:red', 'beforeUpdate 更新前状态===============组件2》')
    // },
    // updated () {
    // console.group('%c%s', 'color:red', 'updated 更新状态===============组件2》')
    // },
    // beforeDestroy () {
    // console.group('%c%s', 'color:red', 'beforeDestroy 破前状态===============组件2》')
    // },
    // destroyed () {
    // console.group('%c%s', 'color:red', 'destroyed 破坏状态===============组件2》')
    // }    
    methods: {
        async getAddressList(){
            let {data:res} = await getAddressData({userCode: this.userCode});
         
            this.addressList = res.data;

        },
        goAddressEdit(){
              let  id =this.$route.query.id;
                this.$router.push({
                    name: 'order',
                    query: {id:id},
                    hash: '#addressEdit'

                })
        },
        changeAddress(data){
            this.$emit('changeAddressMsg',data)
            this.$router.go(-1)
            
        },
        EditAddress(data,i){
           this.addressItem = data;
            //  点击编辑时，vue生命周期,editaddres页面还未创建，导致   editaddres页created得不到eventbus.$on,mounted里面也是第一次得不到，之后点击才能得到，解决： 在beforeDestroy 前， editaddres页已加载
            // EventBus.$emit('changeEditAddressMsg',this.addressItem)
            let  id =this.$route.query.id;
            this.$router.push({
                name: 'order',
                query: {id:id},
                hash: '#addressEdit'

            })

        },
        async delAddress(item){

            let {data:res} = await  delAddressData({userCode:  this.userCode,addressId: item.addressId});
             this.$toast({
                message: res.info,
                position:'middle',
                duration: 2000
            });   
            if(res.flag == 'success'){
                this.getAddressList()
            }        
                      
        }
    },
    // 只有在组件销毁前，bus页面created 才能接受eventBus$on
    beforeDestroy(){
            EventBus.$emit('changeEditAddressMsg',this.addressItem)
    }
    
    
  }
</script>

<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .address-page
        position fixed
        top 0
        right 0
        left 0
        bottom 0
        width 6.4rem
        margin 0 auto;
        background #ffffff
        overflow-y auto
        .mint-header
            background #f5f5f5;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                        font-weight bold
        .address-content
            
            h1
                font-size .24rem
                padding .2rem
              
                background #dbd0ca
                p 
                    float right
            .address-list
                li 
                    padding .2rem .2rem 0 .2rem
                    border-bottom: 1px solid #d0d0d0;
                    display flex
                    flex-direction column

                    .info
                        display flex
                        flex-flow:row;
                        div 
                            
                            &.cur
                                width .6rem
                                margin-right: 0.1rem;
                                display flex
                                justify-content center
                                align-items center
                                i   
                                    font-size .36rem
                                    &.icon-xuanzhong
                                        color #cc3e2e
                                    
                            &.msg 
                                flex 1    
                                h2 
                                    height .5rem
                                    line-height .5rem
                                    font-size .26rem
                                    .name 
                                        margin-right .2rem
                                p 
                                    padding-bottom .1rem
                                    color #999
                                    font-size .22rem
                                    line-height .4rem
                                    span
                                        display inline-block
                                        background #f60
                                        padding  0 .1rem
                                        color #fff
                                        height .3rem
                                        line-height .3rem
                                        border-radius .05rem
                    .handle
                        height: .6rem;
                        border-top: 1px dashed #dcdcdc;
                        display flex
                        p 
                          flex 1

                        div 
                            width .6rem
                            line-height .6rem
                            text-align center
                            i 
                             font-size .36rem
                             color #666
            .not-address
                line-height 1rem
                text-align center
                font-size .22rem
                color #999











</style>
