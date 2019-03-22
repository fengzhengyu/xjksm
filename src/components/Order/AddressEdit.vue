<template>
  <transition name="slide" >
   <div class="address-page">

      <mt-header :title="addressId ? '修改收货地址' : '新增收货地址'">
          <span to="" slot="left" @click="$router.go(-1)">
              <mt-button icon="">
                  <i class="iconfont icon-fanhui"></i>
              </mt-button>
          </span>        
      </mt-header>
      <ul class="edit-area">
        <li>
          <label>收货人</label>
          <div class="form-input ">
            <input type="text" placeholder="收货人姓名" class="input-text " v-model="addressName">
          </div>
        </li>
        <li>
          <label>联系方式</label>
          <div class="form-input ">
            <input type="text" placeholder="收货人手机号" class="input-text " v-model=" addressPhone">
          </div>
        </li>
        <li>
          <label>所在区域</label>
          <div class="form-input area " >
            <div @click="showAddressPicker ">{{ address }}</div>
            
          </div>
        </li>
        <li>
          <label>详细地址</label>
          <div class="form-input ">
            <input type="text" placeholder="街道详细地址" class="input-text " v-model="addressDetail">
          </div>
        </li>
        <li>
          <label>设为默认地址</label>
          <div class="form-input ">
            <input type="checkbox" class="check" v-model="defaultStatus">
          </div>
        </li>
      </ul>
      <div class="save-btn" @click="saveAddressInfo">
        保存并使用
      </div>
      <!-- <div class="picker-wrap" > -->
        <mt-popup position="bottom" v-model="popupVisible">
           <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" value-key="name" style="width: 6.4rem;"   :showToolbar="true" ref="addressSlot">
            

              <mt-button  class="sure" style="float:left;" @click="changenAddressCancel">取消</mt-button>
              <mt-button  class="sure" style="float:right;" @click="changenAddressConfirm">确认</mt-button>
           </mt-picker>
        </mt-popup>
        
      <!-- </div> -->
     
    </div> 
   
    
    
    
  </transition>   
</template>
<script>
  import Address from 'common/js/address.json'
  import { Picker } from 'mint-ui';
  import EventBus from 'common/js/eventBus.js'
  import { addressDataAdd , addressDataSave } from 'common/api'
  export default {
    props: {
          userCode: {
              type: String
          }
      },
    components: {
      // 'mt-picker': Picker
    },
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
        getEditdata: {},
        cancel: 1,
       
      }
    },
    created(){
      // 初始化三级联动
       this.pickerInit();

      // 接受编辑信息 
      // but ,接受的参数是打印多次的，因为不会自动销毁事件，需要手动消除，在beforeDestroy组件销毁前移除事件
        EventBus.$on('changeEditAddressMsg',this.getEditAddressMsg)
　　
      
     
    },
    watch: {
      // 暂无用
      'getEditdata'(val){
        
       if(val.name){ //有值 说明点编辑进入的 
      //  console.log(this.$refs.addressSlot)
        this.getProvinceArr(val.province)
        this.getCityArr(val.province,val.city)
        this.getCountyArr(val.province,val.city,val.county)
       }
      },
      
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
      getEditAddressMsg(data){
        this.getEditdata = data

        if(data.consigneeName){
          this.addressName = data.consigneeName ;
          this.addressPhone = data.consigneePhone ;
          this.defaultStatus = data.selected;
          this.province= data.province;
          this.city = data.city;
          this.county = data.county;
          this.address = data.addressRegion ;
          this.addressDetail =  data.addressDetail
          this.addressId = data.addressId;
        }
        

        
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
         this.address = vals[0].name+vals[1].name+vals[2].name;
          this.popupVisible =false;

       },
      //  保存地址
        saveAddressInfo(){
          if(!this.addressId){
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
  
            }else{
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
                    this.$router.go(-1)
                   
                   
                })

          }
         
       }

    },
   
   
    mounted(){
　　　　this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）     
       
// 　　　　
　　　　});

           

      
　　},
    // 在beforeDestroy组件销毁前移除事件
    beforeDestroy () {
       EventBus.$off('changeEditAddressMsg');
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
        .edit-area
            color #000    
            // border-top 1px solid #dddddd
            border-bottom 1px solid #dddddd
            position relative
            font-size .26rem
            li 
              padding .2rem .2rem 
              display flex
              border-top 1px solid #dddddd
              label 
                color #333
                line-height .52rem
              .form-input 
                flex  1
                word-break break-all
                word-wrap break-word
                padding 0 .3rem 0 .2rem
                position relative
                .input-text 
                  width 100%
                  height 100%
                  vertical-align middle
                  border none 
                  outline none 
                  font-size .24rem
                .check
                  width .3rem
                  height .3rem
                  border 1px solid #ccc  
                  display inline-block
                  color #ccc
                  outline none
                  margin-top .1rem

                div
                  height 100%
                  line-height .52rem   
                  font-size .24rem
                &.area:after
                  content ''
                  display inline-block
                  width .2rem
                  height .2rem
                  position absolute
                  top 50%
                  right .2rem
                  margin-top -0.1rem
                  border-style solid
                  border-color #7D7D7D
                  border-width 1px 0 0 1px
                  transform rotateZ(135deg)
        .save-btn
            margin  .5rem .3rem
            padding 0 .2rem 
            line-height .6rem
            text-align center
            font-size .26rem
            background #e4393c
            color #fff

        

</style>

