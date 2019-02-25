<template>
    <transition name="slide">
        <div class="collect">
            <mt-header title="我的收藏" fixed>
                <span to="" slot="left" @click="$router.go(-1)">
                    <mt-button icon="">
                        <i class="iconfont icon-fanhui"></i>
                    </mt-button>
                    
                </span>   
                <mt-button icon="" slot="right" v-show="collectList.length>0" @click="edit">{{isShow==true?'完成':'编辑'}}</mt-button>     
            </mt-header>
            <div 
                v-if="isLoad"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10"
            >
                <div class="collect-goods" >
                    <div class="group" :class="{'active': isShow}" v-for="(item,index) in collectList" :key="index">
                        <div class="group-check" >
                            <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':item.checked}" @click="selectedProduct(item)" ></i>
                        </div>
                        <div class="group-detail" >
                            <div class="item-img" >
                                <img v-lazy="item.goodsPhoto" :key="item.goodsPhoto">
                            </div>
                            <div class="item-info" @click="goDetail(item)">
                            
                                <p class="title">{{item.goodsName}}</p>
                                <p class="specification">{{item.goodsSpecification}}</p>
                                <p class="specification">{{item.goodsRetailPrice}}</p>
                                <p class="price">{{item.goodsProcurementPrice}} <span class="store">库存：{{item.goodsInventory}}</span></p>
                                
                            </div>
                        </div>
                    </div>
                    <div class="collect-empty" v-if="collectList.length<=0 && isLoad">
                        您还没有收藏商品！
                    </div>
                    <div v-else>
                        <div class="ladding" v-if="!loading">
                            <img src="../../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
                        </div>
                        <div class="ladding" v-else>
                            您已经到底了
                        </div>
                    </div>
                    
                </div>

            </div>
            
            <div class="footer-fiexd" v-show="isShow">
                <div class="all-check" @click="checkAllFlag?checkAll(false):checkAll(true)">
                    <i class="iconfont icon-weixuanzhong" :class="{'icon-xuanzhong':checkAllFlag}"></i>
                    <span>全选</span>
                </div>
                <div class="delete"  @click="deleteCollect">
                    删除
                </div>
            </div>
        </div>
    
    </transition>
    
</template>
<script>
    import { getMemberCollect, delMemberCollect } from 'common/api'
    export default {
        data(){
            return {
                userCode: '',
                collectList: [],
                isShow: false,
                checkAllFlag: false,
                goodsArr: [],
                page: 1,
                isLoad: false,
                end:false,//到底
                loading:true,//默认禁止函数调用
            }
        },
        created(){
            this.userCode = this.getCookie('userCode');
            if(this.userCode){         
            
                this.getCollectData();              
            }
           

        },
        methods: {
            //取数据
            async getCollectData(flag){
                    let {data:res} = await getMemberCollect({userCode: this.userCode,page:this.page});
                    
                    if(res.data){
                        if(flag){
                            if(res.msg== '已到底部'){
                               this.loading = true;
                               this.end = true;
                            
                                // this.$toast({
                                    
                                //     message: '没有更多数据了',
                                //     position:'middle',
                                //     duration: 2000
                                // });
                            }else{
                                this.loading = false;
                            }

                        }else{
                            this.collectList = res.data;
                            this.isLoad =true ;    
                            this.loading = false;
                        }

                       
                      
                    }
                 
            },
              //上拉刷新
            loadMore(){
                this.loading = true;
                setTimeout(()=>{
                      this.page++;
                       this.getCollectData(true);            
                },300)
            },
           
            //单选
            selectedProduct(item){
                if(typeof item.checked == 'undefined'){
                    //设置属性
                    this.$set(item,'checked',true)
                }else{
                    item.checked = !item.checked
                }
                this.checkAllFlag = true;
                this.collectList.forEach((item,index)=>{
                    if(!item.checked){
                        this.checkAllFlag = false;
                    }
                })
            },
            checkAll(flag){
                this.checkAllFlag =flag;

                this.collectList.forEach((item,index)=>{
                     if(typeof item.checked == 'undefined'){
                        this.$set(item,'checked',this.checkAllFlag);
                    }else{
                        item.checked = this.checkAllFlag
                    }
                })
            },
            //编辑
            edit(){
                 this.isShow = !this.isShow;
            },
            //删除
            deleteCollect(){;
                this.goodsArr = []
                this.collectList.forEach((item,index)=>{
                    if(item.checked){
                        this.goodsArr.push(item.collectId)
                    } 
                })
                let str = this.goodsArr.join(',');
                if(this.goodsArr.length>0){
                    
                    this.$messagebox.confirm('确定执行此操作?').then(action => { 
                        delMemberCollect({userCode: this.userCode,collectId:str}).then(response=>{
                            let res = response.data; 
                                       
                            if(res.flag == 'success'){
                               this.$toast({
                                    message: res.info,
                                    position:'middle',
                                    duration: 2000
                                });
                              
                                this.getCollectData();
                            }else{
                                this.$toast({
                                    message: res.info,
                                    position:'middle',
                                    duration: 1000
                                });
                            }
                        },(err)=>{
                            console.log(err)
                        })
                       
                    }).catch(err=>{})
                }else{
                    this.$toast({
                        message: '请选择删除的商品！',
                        position:'middle',
                        duration: 2000
                    });
                }
                
            },
            //去商品详情页
            goDetail(item){
                this.$router.push({
                    name: 'id',
                    params: {
                        goodsId: item.goodsId
                    }
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
    .collect
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        width 6.4rem
        // margin 0 auto
        background #fff
        overflow-y auto
        z-index 999
        .mint-header
            width 6.4rem
            margin 0 auto
            background #fff;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                    font-weight bold  
    .collect-goods
        padding-top 40px
        .group
            overflow hidden
            border-bottom 1px solid #ccc
            &.active
                .group-check
                    display block
                .group-detail
                    width 5.8rem    
                    .item-info
                        width 3.8rem
           .group-check
               padding  0 .1rem
               float left
               vertical-align middle
               line-height 1.9rem
               width .4rem
               display none;
               i
                font-size 0.36rem

                &.icon-xuanzhong
                    color #cc3e2e
            
           .group-detail
               float left
               width 6.4rem
               overflow hidden
               .item-img
                   width 1.5rem
                   height 1.5rem
                   margin  .2rem
                   float left
                   img 
                      width 100%
                      height 100%
               .item-info
                   float left
                   width 4.3rem
                   .title
                       padding .2rem 0
                       font-size .24rem
                       font-weight bold
                       overflow hidden
                       text-overflow ellipsis 
                       white-space nowrap
                   .specification
                       font-size .22rem
                       color #787878
                       position relative
                       padding .1rem 0
                       overflow hidden
                       text-overflow ellipsis 
                       white-space nowrap      
                   .price
                       font-size .22rem
                       color #ff0000
                       position relative
                       padding .1rem 0
                       
                       .store
                           position absolute 
                           bottom 0
                           right  0
                           color #787878
    .collect-empty
        text-align center
        line-height 3rem
        font-size .24rem
        font-weight bold
        color #222

    .ladding
        text-align center
        line-height .6rem
        height .6rem
        font-size .24rem
        margin .15rem 0
        img 
            display inline-block
            vertical-align middle
    .footer-fiexd
        position fixed
        bottom 0
        width 6.4rem
        height .8rem
        line-height  .8rem
        background #f5f5f5
        overflow hidden
        .all-check
             margin  0 .2rem
             float left
             i 
                font-size .36rem
                vertical-align middle
                &.icon-xuanzhong
                    color #cc3e2e
             span 
                font-size .24rem
        .delete
            float right 
            font-size .26rem
            height 100%
            width 1.5rem
            text-align center
            background #e4393c
            color #fff

                
</style>


