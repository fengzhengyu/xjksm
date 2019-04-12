<template>
  
   <transition name="slide">
    <div class="address-list">
      
        <mHeader>
           <div slot="text" class="text">添加收货地址</div>
          <div slot="handle"  class="del" v-if="addressId" @click="removeAddress">删除</div>
           <div slot="handle"  class="save" v-else @click="saveAddress">保存</div>
            
        </mHeader>

        <ul class="user-info">
             <li class="border-bottom">
               
                 <span>收货人</span>
                 <input type="text" placeholder="收货人姓名" maxlength="15" v-model="addressName">
                 <!-- <div>x</div> -->
             </li>
             <li class="border-bottom">
                 <span>手机号码</span>
                 <input type="text" placeholder="收货人手机号" maxlength="11" v-model="addressPhone">
             </li>
             <li class="border-bottom">
                 <span>所在地区</span>
                 <input type="text"  readonly :value=" address" @click="showAddressPicker " >
                 
                 <!-- :value=" addressDetail" -->
             </li>
             <li class="border-bottom">
                 <span>详细地址</span>
                 <input type="text" placeholder="楼号-门牌号" maxlength="50" v-model=" addressDetail">
                 
             </li>
             <li class="border-bottom last">
                 <span>设为默认</span>
                 <p class="btn" >
                     <mt-switch v-model="defaultStatus" class="mt-btn"></mt-switch>
                 </p>
             </li>
              
             
          </ul>
          <div class="save-btn-wrap" v-if="addressId" @click="updataAddress">修改收货地址</div>
          <mt-popup position="bottom" v-model="popupVisible">
           <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" value-key="name" style="width: 6.4rem;"   :showToolbar="true" ref="addressSlot">
            

              <mt-button  class="sure" style="float:left;" @click="changenAddressCancel">取消</mt-button>
              <mt-button  class="sure" style="float:right;" @click="changenAddressConfirm">确认</mt-button>
           </mt-picker>
        </mt-popup>
        
         
    </div>
  </transition>
  
</template>
<script>
  import Address from 'common/js/address.json'
  import { Picker } from 'mint-ui';
  import EventBus from 'common/js/eventBus.js'
  import { addressDataAdd , addressDataSave, delAddressData } from 'common/api'
   import mHeader from 'components/Member/memberHead'
  export default {
   
    data(){
      return {
        addressName: '',
        addressPhone: '',
        addressDetail: '',
        defaultStatus: false,
        province: '',//省
        city: '',//市
        county: '',//县
        address: '省 市 区/县',
        addressId: '',
        popupVisible: false,
        isChange: false,
        
        cancel: 1,
       
      }
    },
    created(){
      // 初始化三级联动
       this.pickerInit();

      // 接受编辑信息 
      // but ,接受的参数是打印多次的，因为不会自动销毁事件，需要手动消除，在beforeDestroy组件销毁前移除事件
      // EventBus.$on('changeEditAddressMsg',this.getEditAddressMsg)
    },
    watch: {
      // 暂无用
    //   'getEditdata'(val){
        
    //    if(val.name){ //有值 说明点编辑进入的 
    //   //  console.log(this.$refs.addressSlot)
    //     this.getProvinceArr(val.province)
    //     this.getCityArr(val.province,val.city)
    //     this.getCountyArr(val.province,val.city,val.county)
    //    }
    //   },
      
    },
    computed: {
      // 徐动态创建数据
      myAddressSlots(){
        let slots =  [
          {
            flex: 1,
            defaultIndex: 0,    
            values: this.getProvinceArr(),  //省份数组Object.keys(myaddress)
            className: 'slot1',
            textAlign: 'left'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values:this.getCityArr('北京市'),
            className: 'slot3',
            textAlign: 'center'
          
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: this.getCountyArr( '北京市','市辖区'),
            className: 'slot5',
            textAlign: 'right'
           
          }
        ];
        return slots;
       
      },
      getEditdata(){
        return  JSON.parse(sessionStorage.getItem('address'))
      }
    },
    methods: {
      
      // 初始化三级联动
      pickerInit(){
        this.getProvinceArr();
        this.getCityArr();
        this.getCountyArr();
      },
      showAddressPicker(){
         this.popupVisible = true
         
      },
      onMyAddressChange(picker, values) {
        if(values[0]) {
              picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
              picker.setSlotValues(2, this.getCountyArr(values[0]["name"],values[1]["name"]));
        }
      },
    
      getProvinceArr(provinceName){
      
        let provinceArr = [];

         Address.forEach( (item,i) => {
            let obj = {};
           if(item.name ==  provinceName){
        
          　this.myAddressSlots[0].defaultIndex = i;
           }
            obj.name = item.name;
            obj.code = item.code;
            provinceArr.push(obj);
          });
        return  provinceArr;
      
      },
      getCityArr(province,cityName) {
        
        let cityArr = [];
        Address.forEach((item,i)=> {
          if (item.name === province) {
            item.children.forEach( (args,i) => {
              let obj = {};
            
                if(args.name == cityName){
                  this.myAddressSlots[2].defaultIndex = i
                }
                obj.name = args.name;
                obj.code = args.code;
             
              
              cityArr.push(obj);
            });
          }
        });
     
        return cityArr;
      },
      //
      getCountyArr(province,city,countyName){
      
        let countyArr = [];
        Address.forEach((item) => {
          if (item.name === province){
            item.children.forEach((args) => {
              if (args.name === city){
                args.children.forEach( (param,i) => {
                  let obj = {};
                   if(param.name == countyName){
                      this.myAddressSlots[4].defaultIndex = i
                    }
                  obj.name=param.name;
                  obj.code=param.code;
                  countyArr.push(obj);
                })
              }
            });
          }
        });
        
        return countyArr;
      },
      // 得到编辑地址数据
      getEditAddressMsg(data){
     
        // console.log(this.getEditdata)
          this.addressName = this.getEditdata.consigneeName ;
          this.addressPhone =this.getEditdata.consigneePhone ;
          this.defaultStatus = this.getEditdata.addressStatus == 0 ? true:false;
          this.address = this.getEditdata.addressRegion ;
          this.addressDetail =  this.getEditdata.addressDetail;
           // this.province= data.province;
          // this.city = data.city;
          // this.county = data.county;
        
      },
      // 取消三级联动
      changenAddressCancel(){
        this.popupVisible =false;
        if(this.getEditdata.name){

        }else{
          this.myAddressSlots[0].defaultIndex = 0;
        }
      },
      //确定三级联动
       changenAddressConfirm(){
         let vals =this.$refs.addressSlot.getValues();
        //  this.myAddressProvince = vals[0].name;
        //  this.myAddressCity = vals[1].name;
        //  this.myAddresscounty = vals[2].name;
         this.address = vals[0].name+' '+vals[1].name+' '+vals[2].name;
          this.popupVisible =false;

       },
      //  保存地址
        saveAddress(){
        
            let data = {
              userCode: this.userCode,
              consigneeName: this.addressName,
              consigneePhone: this.addressPhone,
              addressRegion: this.address,
              addressDetail: this.addressDetail,
              addressStatus: this.defaultStatus ? 0: 1
            }
            addressDataAdd(data).then((response)=>{
              let res = response.data;
                if(res.flag == 'success'){
                  this.$router.go(-1)
                }else{
                  this.$toast({
                    message: res.info,
                    position:'middle',
                    duration: 2000
                  });   
                }
            
              },(err)=>{console.log(err)})
  
           
         
       },
      //  修改保存
      updataAddress(){
        
        let data = {
          userCode: this.userCode,
          consigneeName: this.addressName,
          consigneePhone: this.addressPhone,
          addressRegion: this.address,
          addressDetail: this.addressDetail,
          addressStatus: this.defaultStatus ? 0: 1,
          addressId: this.addressId
        }
        addressDataSave(data).then( (response)=>{
          let res =response.data;
          let  id =this.$route.query.id;
            this.$toast({
            message: res.info,
            position:'middle',
            duration: 2000
          });   
          sessionStorage.setItem('address',null);
          this.$router.go(-1) ;
           
        })

      },
      //  删除地址
      async removeAddress(){
          //  默认地址是否可以删除
          // if(this.defaultStatus){
          //    this.$toast({
          //       message: '默认地址不能删除！',
          //       position:'middle',
          //       duration: 2000
          //   });   
          //   return;
          // }
        
         let {data:res} = await  delAddressData({userCode:  this.userCode,addressId: this.addressId});
             this.$toast({
                message: res.info,
                position:'middle',
                duration: 2000
            });   
            if(res.flag == 'success'){
              this.$router.go(-1) ;
            }        
      }

    },
   
   
    mounted(){
　　　　this.$nextTick(() => {
          this.addressId = this.$route.query.addressId;
          this.userCode = this.$store.state.userCode;
          if(this.addressId){
            this.getEditAddressMsg(); 
          }
　　　　});   
　　},
    // 在beforeDestroy组件销毁前移除事件
    beforeDestroy () {
       EventBus.$off('changeEditAddressMsg');
    },
    components: {
        mHeader
    }
    
  }
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.address-list
  position absolute
  top 0
  width 6.4rem
  bottom 0
  background #fff
  
  
  .header
    height .8rem
    line-height .8rem
    overflow hidden
    color #727272
    background #f9f9f9
    div
      float left
    .back
      width .8rem
      text-align center
     
      i 
        font-size .3rem
        color #727272
    .text 
      font-size .26rem
    .add
      float right 
      margin-right .3rem 
      width .48rem
      height .48rem
      background #fd7722
      border-radius 50%
      text-align center
      line-height .48rem
      margin-top .15rem

      i 
        font-size .18rem
        color #fff
    .save,.del
        float right 
        padding 0  .3rem 
        color #fd7722  
        font-size .18rem 
 .user-info
    li 
     padding .3rem
     font-size .2rem
     display flex
     position relative
     align-items  center
     height .2rem
     span 
       flex 0 0 1rem
       width 1rem
      
       
     input 
        font-size .2rem
    
        flex 1
     textarea 
        flex 1   
     div    
         
        flex 0 0 .3rem   
        width .3rem
     .btn
       position absolute 
       right  .3rem
       bottom .3rem
      
     &.last
        padding-top 1rem
  .save-btn-wrap
    width 5rem
    padding .2rem 0
    margin .4rem auto 
    background #f60
    text-align center
    color #fff
    font-size .24rem
    border-radius .4rem
</style>

