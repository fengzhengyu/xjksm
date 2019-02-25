<template>
    <transition name="slide">
        <div class="invoice-page">
             <mHeader>
                 <div slot="text" class="text">订单备注</div>
                 <div slot="handle"  class="finish"><span><i class="iconfont icon-bitian2-5"></i></span>为必填选项</div>
            </mHeader>
            
            <div class="column-list">
                <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票抬头</div>
                <div class="content">
                    <div @click="type = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type == 0}"></i>个人</div>
                    <div @click="type = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type == 1}"></i>公司</div>
                    <div @click="type = 2"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':type == 2}"></i>不开票</div>
                </div>
            </div>
             <div  v-show="type == 0">
                 <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>姓名</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="个人姓名" v-model="userName">
                            </div>
                            
                        </div>
                    </div>
                 <div class="column-list">
                    <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票内容</div>
                    
                    <div class="content">
                        <div @click="details = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':details == 0}"></i>商品项目</div>
                        <div @click="details = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':details == 1}"></i>商品明细</div> 

                    </div>
                </div>
             </div>
            <div v-show="type == 1">
                <div class="column-list">
                    <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票类型</div>
                    <div class="content">
                        <div @click="companyType = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':companyType == 0}"></i>普票</div>
                        <div @click="companyType = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':companyType == 1}"></i>专票</div> 

                    </div>
                </div>
                <!-- 公司发票类型 -->
                <div  v-show="companyType == 0">
                    <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>公司名称</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="完整公司名称" v-model="companyName">
                            </div>
                            
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>公司税号</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="纳税人识别号" v-model="companyNumber">
                            </div>
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票内容</div>
                        <div class="content">
                            <div @click="details = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':details==0}"></i>商品项目</div>
                            <div @click="details = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':details==1}"></i>商品明细</div> 

                        </div>
                    </div>
                </div>
                 <div  v-show="companyType == 1">
                     <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>公司名称</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="完整公司名称" v-model="companyName">
                            </div>
                            
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>公司税号</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="纳税人识别号" v-model="companyNumber">
                            </div>
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title"><span><i class="iconfont icon-bitian2-5"></i></span>发票内容</div>
                        <div class="content">
                            <div @click="details = 0"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':details==0}"></i>商品项目</div>
                            <div @click="details = 1"> <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':details==1}"></i>商品明细</div> 

                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>开户银行</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="如需开具增值税专用发票请必填" v-model="accountBank">
                            </div>
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>开户账号</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="如需开具增值税专用发票请必填" v-model="accountName">
                            </div>
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>地址</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="如需开具增值税专用发票请必填" v-model="accountAddress">
                            </div>
                        </div>
                    </div>
                    <div class="column-list">
                        <div class="title change"><span><i class="iconfont icon-bitian2-5"></i></span>电话</div>
                        <div class="content">
                            <div> 
                                <input type="text" placeholder="如需开具增值税专用发票请必填" v-model="accountPhone">
                            </div>
                        </div>
                    </div>
                 </div>
              
                
            </div>
            
              <div  v-show="type == 2">

             </div>
           
            <div class="submit">
                <div class="btn" @click="save">保存发票信息</div>
            </div>
        </div>    
    </transition>
   
</template>
<script>
     import mHeader from 'components/Member/memberHead'
    export default {
        components: {
            mHeader
        },
        data(){
            return {
                type: 2,
                userName: '',
                details : 1,
                companyType: 0,
                companyName: '', //抬头
                companyNumber: '' , //纳税人识别号
                status: true,
                accountBank: '',
                accountName: '',
                accountAddress: '',
                accountPhone: ''

               
            }
        },
        created(){
              let hasValue =  JSON.parse(sessionStorage.getItem('invoice'));
             
                 if(hasValue != null){
                    switch(hasValue.type){
                        case '公司':
                            this.type = 1;
                            break;
                        case '个人' :
                            this.type = 0  ;
                            break;
                    }
                     switch(hasValue.details){
                        case '商品项目':
                            this.details = 0;
                            break;
                        case '商品明细' :
                            this.details = 1;
                            break;
                    }
                    if(hasValue.type == '个人'){
                        this.userName =hasValue.name;
                    }

                    if(hasValue.companyType != null){
                         
                        switch(hasValue.companyType){
                            case 0:
                                this.companyType = 0;
                                this.companyName = hasValue.name;
                                this.companyNumber = hasValue.number
                                break;
                            case 1:
                                this.companyType = 1;
                                this.companyName = hasValue.name;
                                this.companyNumber = hasValue.number;
                                this.accountBank = hasValue.bank;
                                this.accountName = hasValue.account;
                                this.accountAddress = hasValue.address;
                                this.accountPhone= hasValue.phone;
                                break;
                        }
                       
                      
                    }

                 }
        },
        methods: {
            save(){
                

                if(this.type== 0){
                    if(this.userName == '' || this.userName == null){
                        this.$toast({
                            message: '个人姓名不能为空',
                            position:'middle',
                            duration: 2000
                        });
                        return;
                    }
                    let data = {
                        type: '个人',
                        name: this.userName,
                        details: this.details == 0?'商品项目':'商品明细'
                    }
                    sessionStorage.setItem('invoice',JSON.stringify(data))
                    this.$router.go(-1)
                    
                }else if(this.type== 1){

                    if(this.companyType == 0){
                        if(this.companyName == '' || this.companyName == null){
                            this.$toast({
                                message: '公司名称不能为空',
                                position:'middle',
                                duration: 2000
                            });
                        }else if(this.companyNumber == '' ||this.companyNumber ==null){
                            this.$toast({
                                message: '纳税识别号不能为空',
                                position:'middle',
                                duration: 2000
                            });   
                        }else{
                            let data = {
                               type: '公司',
                               details: this.details == 0?'商品项目':'商品明细',
                               name :this.companyName,
                               number: this.companyNumber,
                               companyType: 0
                            }

                           sessionStorage.setItem('invoice',JSON.stringify(data))
                            this.$router.go(-1)
                        }

                    }else{

                        if(this.companyName == '' || this.companyName == null){
                            this.$toast({
                                message: '公司名称不能为空',
                                position:'middle',
                                duration: 2000
                            });
                        }else if(this.companyNumber == '' ||this.companyNumber ==null){
                            this.$toast({
                                message: '纳税识别号不能为空',
                                position:'middle',
                                duration: 2000
                            });   
                        }else if(this.accountBank == '' ||this.accountBank ==null){
                             this.$toast({
                                message: '开户银行不能为空',
                                position:'middle',
                                duration: 2000
                            });   
                        }else  if(this.accountName == '' ||this.accountName ==null){
                             this.$toast({
                                message: '开户账号不能为空',
                                position:'middle',
                                duration: 2000
                            });   
                        }else  if(this.accountAddress == '' ||this.accountAddress ==null){
                             this.$toast({
                                message: '地址不能为空',
                                position:'middle',
                                duration: 2000
                            });   
                        }else  if(this.accountPhone == '' ||this.accountPhone ==null){
                             this.$toast({
                                message: '电话不能为空',
                                position:'middle',
                                duration: 2000
                            });   
                        }else{
                            let data = {
                               type: '公司',
                               details: this.details == 0?'商品项目':'商品明细',
                               name :this.companyName,
                               number: this.companyNumber,
                               bank: this.accountBank,
                               account: this.accountName,
                               address: this.accountAddress,
                               phone: this.accountPhone,
                               companyType: 1

                            }

                           sessionStorage.setItem('invoice',JSON.stringify(data))
                            this.$router.go(-1)
                        }

                    }
                   
                }else if(this.type== 2){
                    
                    sessionStorage.setItem('invoice',null)
                    this.$router.go(-1)
                }
                    
            

            }
        }
    }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .invoice-page
        position absolute
        top 0
        bottom 0
        width 6.4rem
        background #ffffff
        .column-list
            display flex
            padding .35rem .3rem
            align-items center
            background #ffffff
            .title
                flex 0 0 1.5rem
                width 1.5rem
                font-size .26rem
                color #202020
                
                span 
                    padding-right .1rem
                    i 
                        color #ff0000
                        font-size .2rem
                &.change
                    i 
                        color #fff
            .content 
                flex 1    
                display flex
                div 
                    flex 1
                    font-size .24rem
                    color #202020
                    i 
                        font-size .36rem
                        vertical-align middle
                        color #a2a2a2
                        &.icon-xuanzhong
                            color #ff6600
                    input 
                        width  100%
                        padding .05rem
                        font-size .2rem
                        color #202020

        .submit
            margin .35rem 0
            background #fff
            .btn 
                width 5.5rem
                height .8rem
                background linear-gradient(90deg,#fea233,#ff6600);
                margin 0 auto 
                text-align center
                line-height  .8rem
                color #ffffff
                font-size .24rem
                border-radius .5rem
                   
</style>    


