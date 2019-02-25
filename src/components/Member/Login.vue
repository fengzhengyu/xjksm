<template>
    <div class="login">
        <div class="header">
            <i class="iconfont icon-guanbi-copy" @click="$router.go(-1)"></i>
        </div>
        <div class="login-wrap">
             <div class="content">
                <div @click="type = 5"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type==5}"></i>会员入口</div>
             
                 <div @click="type = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type==1}"></i>开户入口</div>
                <div @click="type = 2"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type==2}"></i>批发入口</div> 
                   <div @click="type = 201"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type==201}"></i>微商入口</div> 


            </div>
            <p>
                <i class="iconfont icon-wode"></i>
                <input type="text"  placeholder="会员账号/邮箱/手机号" v-model="userName" maxlength="11"   @focus="inputFocus" ref="inpDom">
                <!-- pattern="[0-9]*"oninput="if(value.length>11)value=value.slice(0,11)" -->
            </p>
            <p>
                <i class="iconfont icon-mima"></i>
                <input type="password"  placeholder="请输入登录密码" v-model="userPass">
            </p>
            <div class="register">
                <span class="reg" @click="signIn">快速注册</span>
                <span @click="$router.push({
                    name:'password'
                })">找回密码</span>
            </div>
        </div>
        <div class="login-btn">
            <span  @click="goLogin" @keyup.enter="goLogin">登 录</span>
        </div>
         
           
    
    </div>
</template>
<script>
    import {getLoginData} from 'common/api'
    export default {
        data(){
            return {
                userName: '',
                userPass: '',
                routerName: '',
                type: 5
            }
        },
        created() {
            if(this.$store.state.salesId || this.$store.state.userCode){
                 this.$router.push({
                        name: 'index'
                    });
            }
        },
        methods: {
           
            async goLogin(){
                this.routerName = sessionStorage.getItem('routerName')
                let {data: res} = await getLoginData({userName:this.userName,userPass:this.userPass,loginType:this.type});     
                    console.log(res)
                    if(res.message.flag == 'success'){

                       
                        if(this.type != 201){
                            
                             // 注册会员信息
                            let userCode = res.message.userCode;
                            let userLevel = res.message.userLevel;
                            this.$store.commit('getUserCode', res.message.userCode);
                            this.$store.commit('getUserLevel',res.message.userLevel);
                       
                        }else{
                            // 微商信息
                            this.$store.commit('getSalesId',res.message.salesId)
                            localStorage.setItem('shopId',res.message.shopId);
                        }
                        
                        if(this.$route.query.redirect){
                        
                             this.$router.push({
                                path: this.$route.query.redirect
                            });
                        }else{
                            this.$router.push({
                                name: 'index'
                            });
                        }
                        
                    }else{
                        this.$toast({
                            message: res.message.info,
                            position: 'middle',
                            duration: 2000
                        });
                    }
         
            },
            signIn(){
                 this.$router.push({
                    name: 'register'
                })
            },
            inputFocus(){
                setTimeout(()=>{  
                    this.$refs.inpDom.scrollIntoView(true);
                    this.$refs.inpDom.scrollIntoViewIfNeeded(); 
                }, 500)
            }
           
        }
       
    }
</script>

<style lang="stylus" scoped>
    .login
        width 6.4rem
        
        background #fff
        position absolute
        top 0
        bottom 0
        overflow-y auto
        .header 
            position relative
            height 4.5rem
            background url('../../common/img/logo.png') no-repeat;
            background-size 100% 4.5rem
            i   
                position absolute
                font-size .36rem  
                top .3rem 
                left .3rem
        .login-wrap
            background #fff
            // padding 0 .7rem
            .content 
                flex 1    
                display flex
                height .8rem
                align-items center
               
                div 
                    flex 1
                    font-size .22rem
                    color #858585
                    text-align center
                    i 
                        font-size .3rem
                        vertical-align middle
                        color #a2a2a2
                        &.icon-xuanzhong
                            color #ff6600
           
            p 
                margin .3rem 0.5rem
                background #e6e6e6
                border-radius .5rem
                padding 0.22rem 0
                overflow hidden
                align-items center
                display flex
                i 
                    font-size .3rem  
                    padding  0 .2rem
                    color #b6b6b6
                   
                input 
                    height 100%
                    width 4.5rem    
                    outline none
                    background #e6e6e6
                    font-size .26rem

                &.btn-wrap
                    background #fff
                    text-align center
                    span 
                        display inline-block
                        width 3rem
                        height .5rem
                        background #1969b2
                        border 1px solid #1969b2
                        border-radius .3rem
                        color #ffffff
                        font-size .24rem
                        &.btn
                           color #1969b2
                           background #fff
                           border 1px solid #1969b2
            .register
               padding  .2rem 0
               font-size .22rem
               color #858585
               display flex
               justify-content center 
               span
                padding 0 .35rem
                &.reg 
                    color #1cb727
        .login-btn
            text-align center
            padding  .4rem 0 .8rem  0
            span 
                display inline-block
                width 3.2rem
                height .7rem
                line-height .7rem
                background #ff5400
                font-size .28rem
                color #fff
                border-radius .5rem


</style>    
