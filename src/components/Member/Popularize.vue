<template>
 <div class="login">
        <mt-header title="会员注册" >
            <span slot="left" @click="goBack">
                <mt-button icon="">
                    <i class="iconfont icon-fanhui"></i>
                </mt-button>
            </span>
            <span slot="right" @click="$router.push({path: '/'})" v-if="temp">
                    <mt-button icon="">
                        <i class="iconfont icon-icon-test"></i>
                    </mt-button>
            </span>     
          
        </mt-header>
        <div class="register-wrap">
         
            <p class="text">
                 <span class="info">
                     手机:
                 </span>
                <input type="text"  v-model="userName">
            </p>
             <p class="text">
                 <span class="info">
                     密码:
                 </span>
                <input type="password"  v-model="userPass">
             </p>
             <p class="text">
                 <span class="info">
                     姓名:
                 </span>
                <input type="text"  v-model="nickname">
            </p>
            <div class="text">
                 <span class="info">
                    性别:
                 </span>
                 <p class="btn-wrap">
                    <span class="btn" @click=" sex ='男' " >
                        <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':  sex =='男'}"></i>
                        男
                    </span>
                    <span class="btn"  @click=" sex = '女'">
                        <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':  sex == '女'}"></i>
                        女
                    </span>
                 </p>   
            </div>
            <div class="text">
                 <span class="info">
                    年龄:
                 </span>
                <input type="text"  v-model="age" @click="showPup" readonly>
                <i class="iconfont icon-xiaosanjiaodown icon" ></i>
            </div>
            
             <p class="btn-btn">
                <span  @click="goRegister">完成</span>
            </p>
            <p class="btn-btn"> 
                <span class="btn " @click="goLogin">已有账号</span>
            </p>

            <div class="share-img" style="height: 0;">
                <img src="../../common/img/logo.png" alt="" id="shareImg" width="0" height="0">
            </div>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="true" position="bottom">
            <mt-picker :slots="slots" :visible-item-count="5" style="width: 6.4rem;" :showToolbar="true" ref="ageSlot">
                <div class="picker-toolbar-title">
                    <div class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</div>
                    <div class="">请选择年龄范围</div>
                    <div class="usi-btn-sure" @click="ageConfirm">确定</div>
                </div>  
            </mt-picker>
           
        </mt-popup>
       
    </div>
</template>
<script>
import {getRegisterData ,getShareData} from 'common/api'
import sha1 from 'js-sha1'
import wx from 'weixin-js-sdk'
export default {

        data(){
            return {
                temp: '', //零时存储推荐人信息
                time: 0,
                userName: '',
                authCode: '',
                userPass: '',
                nickname: '',
                authFlag:false,
                sex: '男',
                age: '20-30',
                slots:[{values: ['20-30', '30-40', '40-50', '50-60', '60以上']}],
                popupVisible: false,
                shareUrl: '',
              
            }
        },
        created(){
            this.userCode = this.getCookie('userCode');
            this.shareUrl =this.userCode?  location.href.split('?')[0]+'?a='+ this.userCode : location.href.split('?')[0]; 
       
          
             String.prototype.queryURLParameter = function(){
                var obj = {},
                reg = /([^?=&#]+)=([^?=&#]+)/g;
                this.replace(reg,function(){
                    var key = arguments[1],
                    value = arguments[2];
                    obj[key] = value;
                })
                return obj;
            }
            // 是分享出来的标识，存起来
            let obj = location.href.queryURLParameter();
            if( obj['a']  !== undefined){
                this.temp = obj.a;
               localStorage.setItem('temp',this.temp);
            }
           
    
        },
        mounted() {
            this.$nextTick(()=>{
                this.getWeChatShare();
            })
         
        },
        watch: {
            $route(){
                console.log(1)
                this.getWeChatShare(); //当路由改变时 重新请求签名
            }
        },
        methods: {
        // 获取微信分享
            async getWeChatShare(){
               
                let {data: res} = await getShareData({url:encodeURIComponent(location.href.split('#')[0])}); //
  
                if(res &&res.flag == 'success'){
                   let data =res.data;
            
                    wx.config({
                        debug:false,
                        appId: data.appId, 
                        timestamp: data.timestamp,
                        nonceStr:  data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone','onMenuShareWeibo']
                        //  'chooseImage','uploadImage','startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice'

                        // 所有要调用的 API 都要加到这个列表中
                    });
                    wx.ready(() => {
                        //分享给朋友
                            // console.log(this.link)
                        wx.onMenuShareAppMessage({
                        title:'聚康供采平台', // 分享标题
                        link:  this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    
                        desc: '供应商与采购商的理想平台', // 分享描述
                    
                        imgUrl: document.getElementById('shareImg').src, // 分享图标
                        //type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })

                        //分享到朋友圈
                        wx.onMenuShareTimeline({
                        title: '聚康供采平台', // 分享标题
                        link:  this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                         imgUrl: document.getElementById('shareImg').src,
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                        //分享到QQ
                        wx.onMenuShareQQ({
                         title: '聚康供采平台', // 分享标题
                          desc: '供应商与采购商的理想平台', // 分享描述
                          link:  this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                          imgUrl: document.getElementById('shareImg').src,
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                        //分享到微博
                        wx.onMenuShareWeibo({
                        title: '聚康供采平台', // 分享标题
                          desc: '供应商与采购商的理想平台', // 分享描述
                          link:  this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                         imgUrl: document.getElementById('shareImg').src,
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                        //分享到QQ空间
                        wx.onMenuShareQZone({
                       title: '聚康供采平台', // 分享标题
                          desc: '供应商与采购商的理想平台', // 分享描述
                          link:  this.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                          imgUrl: document.getElementById('shareImg').src,
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                        })
                    })
                }else{
                    console.log(res)
                }
            },
           
           async goRegister(){
            //    invitedBy
                let invited = localStorage.getItem('temp');
               let{data: res} = await getRegisterData({invitedBy: invited,user_name:this.userName,user_pass:this.userPass,companyName:this.nickname,gender:this.sex,age:this.age});
               if(res.flag =='success'){
                   this.$toast({
                        message: '注册成功',
                        position: 'middle',
                        duration: 2000
                    });

                    let userCode = res.userInfo.userCode;
                    let userLevel = res.userInfo.userLevel;
                    this.setCookie('userCode',userCode,30);
                    this.setCookie('userLevel',userLevel,30);
                    localStorage.setItem('temp','');

                    setTimeout(()=>{
                        this.$router.push({
                            name:'index'
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
            getAuthCode(){
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
          

              this.authFlag = true;
              if(this.authFlag){
                this.time =10;
                let timer = setInterval(()=>{
                    this.time--;
                    if(this.time<=0 ){
                      this.authFlag = false;
                      clearInterval(timer);
                    }
                },1000)

              }else{
                  return
              }
              
            },
            showPup(){
                this.popupVisible = true;
            },
           
            ageConfirm(){
                 this.popupVisible = ! this.popupVisible;
                  let vals =this.$refs.ageSlot.getValues();
                  this.age = vals[0];
            },
            goLogin(){
             this.$router.push({
                  name:'login'
              });
            },
            goBack(){
             this.$router.go(-1);
             
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
        left 0
        right 0
        bottom 0
        .mint-header
            width 6.4rem
            margin 0 auto
            background #1969b2
            color #fff
            font-size 18px
            .mint-header-button
                .iconfont 
                    font-size 20px
                .mint-header-title
                    font-weight bold
        .header 
            position relative
            height 4.5rem
            background url('./login.png') no-repeat;
            background-size 100% 4.5rem
            i   
                position absolute
                font-size .36rem  
                top .3rem 
                left .3rem
                
        .login-wrap
            background #fff
            padding 0 .5rem
            p 
                margin .3rem 0
             
                background #e6e6e6
                border-radius .5rem
                line-height .5rem
                overflow hidden
                i 
                    font-size .26rem  
                    padding  0 .2rem
                .auth-wrap   
                    float right 
                    width 1.2rem
                    height .5rem
                    background #1969b2
                    color #fff
                    text-align center
                    border-radius .3rem
                input 
                    height 100%
                    width 4.65rem    
                    outline none
                    background #e6e6e6
                    font-size .24rem
                   
                    &.auth
                      width 1.4rem  
                  
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
        .register-wrap
            margin 0 .3rem .3rem .3rem
            color #000
            font-size: .24rem
            .text   
                padding .4rem 0 .1rem 0
                border-bottom 1px solid #ccc;
                position relative
              
                .info
                    width .7rem
                    vertical-align: middle;
                    display inline-block
                    &.strong
                       width 1rem
                input 
                    display inline-block
                    width: 4.9rem
                    font-size: .24rem
                    vertical-align middle
                    padding .05rem
                    outline none 
                    height .3rem
                   
                .icon    
                    font-size .36rem
                    position absolute
                    right 0
                    bottom 0.18rem 
                .btn-wrap
                    display inline-block
                    width: 4.9rem
                    text-align right 
                    vertical-align middle
                    font-size .24rem
                    height .4rem;
                    i
                        font-size .32rem
                        vertical-align middle
                        color #a2a2a2
                        &.icon-xuanzhong
                            color #cc3e2e   
            .btn-btn
                background #fff
                text-align center
                padding .3rem 0 0 0
                line-height .5rem
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
                        
        .picker-toolbar-title
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            
        .usi-btn-cancel,.usi-btn-sure 
            color: #FF6600
        

</style>

