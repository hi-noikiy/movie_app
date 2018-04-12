<template>
  <div id="address">
    <group>
      <x-input title="姓名" v-model="consignee" text-align="right"></x-input>
    </group>

    <group>
      <x-input title="手机号" :max="11" v-model="mobile" text-align="right"></x-input>
    </group>

    <group>
      <x-address :title="'地区'" :list="addressData" v-model="addressSelect" @on-hide="selectAddress" @on-shadow-change="changeAddress"></x-address>
    </group>

    <group>
      <x-input title="详细地址" v-model="street" text-align="right"></x-input>
    </group>

    <div class="button" @click="AddressSubmit">保存</div>
  </div>
</template>

<script>
  import { Group, Cell, XAddress, XInput, Datetime, PopupPicker, ChinaAddressV4Data } from 'vux';

  export default {
    data() {
      return {
        addressData: ChinaAddressV4Data,
        consignee: '',
        mobile: '',
        street: '',
        addressSelect: ['','',''], //地区
      }
    },

    created() {
      let json = sessionStorage.getItem('getAddress');

      if(json) {
        let obj = JSON.parse(json);
        this.consignee = obj.consignee;
        this.mobile = obj.mobile;
        this.street = obj.street;

        this.addressSelect = obj.regionInfo.map((item) => {
          return item.id;
        })
      }
    },

    methods: {
      changeAddress(val) {
        this.addressSelect = val;
        console.log(val)
      },

      //选择地区
      selectAddress(val) {
        if(val) {
          let json = JSON.stringify(this.addressSelect);
          sessionStorage.setItem('addressSelect', json);
          let res = sessionStorage.getItem('addressSelect');
        }
      },

      AddressSubmit() {
        if(!this.consignee) {
          this.$toast('请填写联系人', 'fail');
          return false;
        }

        if(!this.mobile) {
          this.$toast('请填写手机号', 'fail');
          return false;
        }

        if(!this.street) {
          this.$toast('请填写详细地址', 'fail');
          return false;
        }

        this.$Api.AddressSubmit({
          consignee: this.consignee,
          mobile: this.mobile,
          street: this.street,
          regionId: this.addressSelect[2]
          }).then((res) => {
            console.log(res);
            if(res.q.s == 0) {
              this.$toast('操作成功!').then(() => {
                this.$router.go(-1);
              })
            }
        })
      }
    },

    components: {
      Group,
      Cell,
      Datetime,
      XInput,
      PopupPicker,
      XAddress,
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #address {
    margin-top-: boxValue(20)!important;
  }
</style>
