<template>
    <div class="member">
        <div class="member-header">
            
        </div>
        <div class="info-wrapper">
            <div class="info">
                <div class="photo" v-show="isLogin ">
                    <img src="../common/img/account.png"  >
                </div>
                <div class="nickname" v-show="isLogin">
                    <p class="name">{{userName}}</p>
                    <p class="icon">
                        <i class="iconfont icon-huiyuantongjibaobiao"></i>
                        &nbsp;&nbsp;&nbsp;{{userLevelName}}
                        </p>
                </div>
                <div class="login" v-if="!isLogin" @click="login">点击登录</div>
                <div class="bar"></div>
            </div>
            <div class="order-nav">
                <div class="list"  @click="goMyOrder(0)">
                    <i class="iconfont icon-daifukuan"></i><br/>
                    待付款
                </div>
                <div class="list"  @click="goMyOrder(1)">
                    <i class="iconfont icon-icon3"></i><br/>
                    待发货
                </div>
                <div class="list" @click="goMyOrder(2)">
                    <i class="iconfont icon-hongjiuchengicondaishouhuo"></i><br/>
                    待收货

                </div>
                <div class="list" @click="goMyOrder(3)">
                    <i class="iconfont icon-yishoukuan"></i><br/>
                    已完成

                </div>
                <div class="list last" @click="goMyOrder()">
                    <i class="iconfont icon-quanbudingdan"></i><br/>
                    全部订单

                </div>
            </div>
        </div>
      
       
        
        <div class="menu-list" @click="goAddress">
            收货地址
           <span class="right">
                <i class="iconfont icon-qianjin1"></i>
            </span>
        </div>
         <div class="menu-list" @click="goUser">
           个人信息
           <span class="right">
                <i class="iconfont icon-qianjin1"></i>
            </span>
        </div>
         <div class="menu-list" @click="goShareList" v-if="wechatUser">
           分享列表
           <span class="right">
                <i class="iconfont icon-qianjin1"></i>
            </span>
        </div>
        <div class="menu-list" @click="goSetting">
            系统设置
            <span class="right">
                <i class="iconfont icon-qianjin1"></i>
            </span>
        </div>  

        <a href="https://m.kuaidi100.com/" target="_blank" class="expressage">快递查询</a>

        <mt-popup
            v-model="popupVisible"
            popup-transition="popup-fade" position="bottom">
            
            <form id="form" method="post" name="file_upload" enctype="multipart/form-data" >
                <div class="update-photo">
                    <input class="file_input" type="file" multiple  accept="image/gif,image/jpeg,image/png,image/jpg"  @change="changePhoto"/>
                    <div class="upload_box">
                    修改头像 &nbsp;&nbsp;<span class="info">(注：图片小于200KB)</span>
                    </div>
                    <!--<span class="upload_box" id="uploadPhotoBtn">确定</span>-->
                </div>

            </form>
            
            
        </mt-popup>
        <Footer></Footer>

        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
    import { getMemberData, getLoadPhotoData } from 'common/api'
    import Footer from 'components/common/c-footer.vue'
    export default {
        data(){
            return {
                isLogin: false,
                photoImg: '', //头像
                phone: '', //手机号
                userName: '您未登录', //与户名
                popupVisible: false ,
                userLevelName: '会员',
                 wechatUser:false   //微信用户状态
            }
        },
        created(){
           
             
            if(this.userCode || this.$store.state.salesId){
                this.isLogin =true;
                this.getUserMessage()
            }
            
        },
        computed: {
            userCode(){
                return this.$store.state.userCode == null? '': this.$store.state.userCode;
            }
        },
        methods: {
            async getUserMessage(){
                let params = {};
                if(this.$store.state.salesId){
                    params = {salesId: this.$store.state.salesId};
                }else{
                     params ={userCode:this.userCode};
                }
                let {data:res} = await getMemberData(params);
            //   console.log(res)
                if(res.flag == 'success'){
                    if(res.data){
                         let data = res.data.userList;
                        this.photoImg = data.headPhoto;
                        this.phone =data.phoneOne;
                        this.userName = data.userName;
                        this.userLevelName = data.userLevelName;
                    }else{
                        this.userName = res.info.salesAcct;
                        this.userLevelName = '合作微商';
                         this.wechatUser = true;
                    }
                   
                }
               
            },
            goMyOrder(id){
               this.$router.push({
                        name: 'myorder',
                        query:{id:id}
                    })
            },
            goCollect(){
                if(this.userCode){
                    this.$router.push({
                        name: 'collect'
                    })
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            goPassword(){
                if(this.userCode){
                    this.$router.push({
                        name: 'password'
                    })
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
                
            },
            goAddress(){
                this.$router.push({
                        name: 'address'
                    })
            },
            goUser(){
                 this.$toast({
                        message: '该功能暂未开通！',
                        position:'middle',
                        duration: 2000
                    });
                return;
                  this.$router.push({
                        name: 'user'
                    })
            },
             goShareList(){
                this.$router.push({
                    name: 'share'
                })
            },
            goSetting(){
                this.$router.push({
                        name: 'setting'
                    })
            },
            goPopularize(){
                if(this.userCode){
                    this.$router.push({
                        name: 'popularize'
                    })
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            hanldePhoto(){
                 if(this.userCode){
                    this.popupVisible =true;
                }else{
                     this.$toast({
                        message: '请先登录！',
                        position: 'middle',
                        duration: 2000
                    });
                }
            },
            //头像改变
            changePhoto(e){;
                let img1=e.target.files[0];
                let form = new FormData();
                if(img1.size>(200*1024)){
                    this.$toast({
                        message: '图片尺寸超出！',
                        position: 'middle',
                        duration: 2000
                    });

                    return;
                }
                form.append('headPhoto',img1,img1.name);
                form.append('userCode',this.userCode);
                getLoadPhotoData(form).then((response)=>{
                    let res = response.data;
                    if(res.flag == 'success'){
                        let photo = res.returnData;
                        this.photoImg = photo
                        this.$toast({
                            message: '修改成功',
                            position: 'middle',
                            duration: 2000
                        });
                        this.popupVisible =false;

                    }else{
                        this.$toast({
                        message: res.info,
                        position: 'middle',
                        duration: 2000
                        });
                    }
                },(err)=>{
                    console.log(err)
                })
                
            },   
            login(){
                 this.$router.push({
                    name: 'login'
                })
            }
        },
        components: {
            Footer
        }
    }
</script>
<style lang="stylus" scoped>
    .member
        position absolute
        width 6.4rem
        background #f3f4f6
        top 0
        bottom 0
        z-index 20
        .member-header
           
            height 1.8rem
            background url('../common/img/member-bg.png')
            background-size 100% 100%
        .info-wrapper
            position relative  
            margin 0 .15rem      
            height 2rem    
            
            .info
                background #fff
                // height 2.4rem
                position absolute
                top -1rem
                width 5.5rem
                padding  .3rem
                overflow hidden
                div 
                    display inline-block
                .login
                    padding .4rem .35rem .35rem 0
                    font-size .24rem    
                .photo
                    width 1rem
                    height 1rem
                    border-radius 50%
                    overflow hidden
                    vertical-align top
                    img
                        width 100%
                        height 100%
                .nickname
                
                    .name
                        padding .15rem 0 .25rem  .15rem
                        font-size .26rem
                        color #414141
                    .icon
                        // display: table-cell;
                        // text-align: center;
                        // vertical-align: middle;
                        margin-left .15rem
                        width 1.4rem
                        // height .3rem
                        padding  .05rem 0 
                        background #82848a
                        // line-height .3rem
                        line-height:normal;
                        text-align center
                        border-radius .3rem
                        color #ffffff
                        font-size .16rem       
                        position relative
                
                        i   
                            font-size .28rem   
                            position absolute
                            top 0.01rem
                            left .1rem
                .bar
                    width 1.38rem
                    height .75rem
                    background url('../common/img/member-icon.png')
                    background-size 100% 100%
                    float right
                    margin-top .2rem
           

            .order-nav
                background #fff
                height 1.4rem
                display flex
                position absolute
                bottom 0
                width 100%
                justify-content center
                align-items center
              
                .list 
                    flex 1
                    text-align center
                    color #2c2c2c
                    font-size .18rem
                    i 
                        font-size .45rem
                        display inline-block
                        padding-bottom .2rem
                        color #686868
                    &.last
                        border-left .01rem solid #e2e2e2
                        i 
                            color #ff6600    
        .menu-list
          
            height .8rem
            line-height .8rem
            font-size .2rem
            color #161616
            padding 0 .3rem
            background #fff
            margin .15rem;
            .right
               float right 
               i 
                font-size .24rem
                color #bdbdbd
                
        

        .update-photo
            width: 6.4rem;
            background: #fff;
            height: 60px;
            position: relative;   
            input
                opacity: 0;
                position: absolute;
                top: 0;
                left: 10px;
                width: 5rem;
                height: 60px;
                border: 0;
                outline: none;
            .upload_box  
                text-align: center;
                line-height: 60px;
                color: #555555;
                font-weight: bold;
                font-size: .24rem;  
                .info
                    font-size: 20/@rem;
                    color: red;
        .expressage
            margin  .2rem 0
            color #f3f4f6;

</style>
