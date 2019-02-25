<template>
    <div class="login">
         <mHeader>
            <div class="text" slot="text">找回密码</div> 
        </mHeader>
        <div class="register-wrap">
           <div class="text border-bottom">
                <span class="info">
                     手机号
                 </span>
                 <div class="content">
                      <input type="number" class="inp"  pattern="[0-9]*"  placeholder="手机号" v-model="userName" maxlength="11" oninput="if(value.length>11)value=value.slice(0,11)" >
                 </div>
            </div>
             <div class="text border-bottom">
                <span class="info">
                     验证码
                 </span>
                 <div class="content">
                    <input type="number" placeholder="验证码" pattern="[0-9]*" class="auth" v-model="authCode" >
                    <span v-if="!authFlag" class="auth-wrap" @click="getAuthCode">发送验证码</span>
                    <span v-if="authFlag"   class="auth-wrap">{{time+ 's后获取'}}</span>
                 </div>
            </div>
             <div class="text border-bottom">
                <span class="info">
                    新密码
                 </span>
                 <div class="content">
                     <input type="password"  class="inp" v-model="userPass"  placeholder="新密码">
                 </div>
            </div>
            <div class="text border-bottom" >
                <span class="info">
                    确认密码
                 </span>
                 <div class="content">
                      <input type="password" class="inp" v-model="userPassTwo"  placeholder="确认密码" >
                 </div>
            </div>
           
             <p class="btn-btn">
                <span  @click="goRegister"  @keyup.enter="goRegister">确认找回</span>
            </p>
            <p class="btn-btn"> 
                <span class="btn " @click="$router.go(-1)">已有账号</span>
            </p>
        </div>
        
       
    </div>
</template>
<script>
import mHeader from 'components/Member/memberHead'
import {getPassCode ,  getSavePass } from 'common/api'
    export default {
        components: {
            mHeader
        },
        data(){
            return {
                
                time: 0,
                userName: '',
                authCode: '',
                userPass: '',
                userPassTwo: '',
                authFlag:false,
                phoneStatus: false
               
            }
        },
        mounted() {
           
        },
        // watch:{
        //   'userName'(){
        //       if(this.userName>11){
        //           this.authFlag =false;
        //       }
        //   }
        // },
        methods: {
           async goRegister(){
               if(this.userPass != this.userPassTwo ){
                   this.$toast({
                        message: '密码不一致',
                        position: 'middle',
                        duration: 2000
                    });
                   return;
               }
        
         
               let{data: res} = await  getSavePass({user_name:this.userName,user_pass:this.userPass,yzm:this.authCode});
        
             
               if(res.flag =='success'){
                   this.$toast({
                        message: res.info,
                        position: 'middle',
                        duration: 2000
                    });
                  

                    setTimeout(()=>{
                        this.$router.push({
                            name:'login'
                        });
                    },1000)
                }else{
                    this.$toast({
                        message: res.info,
                        position: 'middle',
                        duration: 2000
                    });
               }
              
            },
            // 获取验证码
            async getAuthCode(){
              let reg=/^1[34578]{1}\d{9}$/;
              if(this.userName == '') {
                this.$toast({
                  message: '手机号不能为空',
                  position: 'middle',
                  duration: 2000
                });
                return;
              }
              if(!reg.test(this.userName)){
                this.$toast({
                  message: '手机号格式不正确',
                  position: 'middle',
                  duration: 2000
                });
                return;
              }

               getPassCode({user_name: this.userName}).then(response => {
                        let res = response.data;
                    // console.log(res)
                    if(res.message.flag == 'success'){
                        this.authFlag = true;
                        if(this.authFlag){
                            this.time = 60;
                            let timer = setInterval(()=>{
                                this.time--;
                                if(this.time<=0 ){
                                this.authFlag = false;
                                clearInterval(timer);
                                }
                            },1000)

                        }
                                     
                    }else{
                        this.$toast({
                            message: res.info,
                            position: 'middle',
                            duration: 2000
                            });
                    }
                    

                });
        
              
            }
            
        }
    }
</script>

<style lang="stylus" scoped>
    .login
        width 6.4rem
        margin 0 auto
        background #fff
        position fixed
        top 0       
        bottom 0
        overflow-y scroll
        .register-wrap
            font-size: .24rem
            .hit 
                height .7rem
                background #e5e5e5
                font-size: .2rem
                color #474747
                line-height .7rem
                padding-left .3rem
                font-weight bold
            .text   
                padding .25rem
                position relative
                display flex
                align-items center
                font-size .24rem
                .info
                    width 1rem
                    flex 0 0 1rem
                    padding-right .25rem
                    


                .content
                    flex 1    
                    display flex
                    .bold
                        font-weight bold
                        padding-left .5rem
                    .inp 
                        width 100%    
                        padding .05rem 0
                        outline none 
                        font-size .24rem
                    .auth
                        flex 1
                    .auth-wrap
                        flex 0 0 1.3rem
                        text-align center
                        font-size .2rem
                        width 1.3rem
                        padding .15rem 0
                        background #ff6600
                        border-radius .5rem
                        color #fff

            .btn-btn
                background #fff
                text-align center
                padding .3rem 0 0 0
                line-height .6rem
                span 
                    display inline-block
                    width 3rem
                    height .6rem
                    background #ff6600
                    border .01rem solid #ff6600
                    border-radius .5rem
                    color #ffffff
                    font-size .24rem
                    &.btn
                        color #ff6600
                        background #fff
                        border .01rem solid #ff6600
                        
    
        

</style>    
