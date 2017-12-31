<template>
  <div id="edit">
    <div class="edit__image">
      <UploadImg :uploadedList="userDetail.images" @ImgChange="getImgList"/>
    </div>

    <div class="edit__input">
      <div class="input input__avatar">
        <div class="input__left">
          <span>头像</span>
        </div>
        <div class="input__right" @click="setAvatar">
          <img class="input__right__avatar" :src="avatar" alt="" v-if="avatar">
          <img class="input__right__avatar" :src="$ImgUrl + userDetail.imagePath" alt="" v-else-if="userDetail.imagePath">
          <img class="input__right__avatar" src="../../assets/headportrait.png" alt="" v-else>
          <span class="input__right__arrow"></span>
          <input type="file" class="hide" id="avatar" v-on:change="uploadAvatar">
        </div>
      </div>

      <group>
        <x-input title="昵称" v-model="userDetail.nickname" text-align="right"></x-input>
      </group>

      <group>
        <datetime title="生日" v-model="userDetail.birthday" format="YYYY-MM-DD" value-text-align="right"  :min-year='1900'></datetime>
      </group>

      <group>
        <popup-picker title="性别" :data="[['男', '女']]" v-model="sexSelect" value-text-align="right" @on-change="selectSex"></popup-picker>
      </group>

      <group>
        <popup-picker title="情感状态" :data="[['隐藏', '单身', '情侣', '已婚']]" v-model="loveStatusSelect" value-text-align="right" @on-change="selectLoveStatus"></popup-picker>
      </group>

      <group>
        <x-address :title="'地区'" :list="addressData" v-model="userDetail.addressSelect"  @on-shadow-change="onShadowChange"></x-address>
      </group>

      <group>
        <popup-picker title="行业" :data="[['互联网', '餐饮', '保险']]" v-model="industrySelect" value-text-align="right" @on-change="selectIndustry"></popup-picker>
      </group>

      <group>
        <cell title="个性签名" is-link @click.native="linkToSignature('Signature')"></cell>
      </group>

      <div class="input">
        <div class="input__left">
          <span>喜欢类型</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">悬疑、悬疑、悬疑、悬疑、悬疑</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <group>
        <x-input title="喜欢明星" v-model="userDetail.favoriteSuperStars" text-align="right" placeholder="请输入喜爱明星"></x-input>
      </group>

      <group>
        <x-input title="手机号" v-model="userDetail.mobile" text-align="right"></x-input>
      </group>
    </div>

    <div class="edit__btn">
      <span class="btn">放弃修改</span>
      <span class="btn sure" @click="submit">保存</span>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, XAddress, XInput, Datetime, PopupPicker, ChinaAddressV4Data } from 'vux';
  import UploadImg from '@/components/UploadImg/UploadImg';

  export default {
    data() {
      return {
        userDetail: {},
        addressData: ChinaAddressV4Data,
        avatar: null,
        sexSelect: [],   //男
        loveStatusSelect: [], //情感状态
        addressSelect: [],  //地址
        industrySelect: [], //行业
      }
    },

    created() {
      // let user = sessionStorage.getItem('user');
      let user = null;
      if(user) {
        let sexSelect = sessionStorage.getItem('sexSelect');
        let loveStatusSelect = sessionStorage.getItem('loveStatusSelect');
        let addressSelect = sessionStorage.getItem('addressSelect');
        let industrySelect = sessionStorage.getItem('industrySelect');

        this.userDetail = JSON.parse(user);
        this.addressSelect = JSON.parse(addressSelect)?JSON.parse(addressSelect):[];
        this.sexSelect = JSON.parse(sexSelect)?JSON.parse(sexSelect):[];
        this.loveStatusSelect = JSON.parse(loveStatusSelect)?JSON.parse(loveStatusSelect):[];
        this.industrySelect = JSON.parse(industrySelect)?JSON.parse(industrySelect):[];
      }else {
        this.getUserDetail();
      }
    },

    methods: {
      onShadowChange(val) {
        console.log(val)
        this.userDetail.regionId = val[2];
      },

      selectSex(val) {
        if(val[0] == '男') {
          this.userDetail.sex = 1;
        }else if(val[0] == '女') {
          this.userDetail.sex = 2;
        }
      },

      selectLoveStatus(val) {
        if(val[0] == '隐藏') {
          this.userDetail.loveStatus = 1;
        }else if(val[0] == '单身') {
          this.userDetail.loveStatus = 2;
        }else if(val[0] == '情侣') {
          this.userDetail.loveStatus = 3;
        }else if(val[0] == '已婚') {
          this.userDetail.loveStatus = 4;
        }
      },

      selectIndustry(val) {
        this.userDetail.industryId = 1;
      },

      //打开上传图片
      setAvatar() {
        let input = document.getElementById("avatar");
        input.click();
      },

      //上传图片接口
      uploadAvatar() {
        var oFile = document.getElementById("avatar").files[0];
        let oFReader = new FileReader();
        let formData = new FormData();
        formData.append('file[]', oFile);

        this.$Api.UploadFiles(formData).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            oFReader.readAsDataURL(oFile);
            oFReader.onload = (oFREvent) => {
              this.avatar = oFREvent.currentTarget.result;
              this.userDetail.imagePath = res.q.files[0].path;
              oFile.value = '';
            };
          }
        })

        event.target.value=null
      },

      //设置图片列表
      getImgList(val) {
        this.userDetail.images = [].concat(val);
      },

      showDate(date) {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          minYear: 1900,
          value: date,
          onConfirm: (val) => {
            this.userDetail.birthday = val
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },

      //获取用户信息
      getUserDetail() {
        this.$Api.getUserDetails().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.userDetail = res.q.user;
            let user = res.q.user;

            //设置个性签名缓存
            sessionStorage.setItem('signature', user.signature);

            //初始化性别列表
            if(user.sex) {
              if(user.sex == 0) {
                this.sexSelect = [];
              }else if(user.sex == 1) {
                this.sexSelect = ['男'];
              }else if(user.sex == 2) {
                this.sexSelect = ['女'];
              }
            }

            //初始化情感列表
            if(user.loveStatus) {
              if(user.loveStatus == 0) {
                this.loveStatusSelect = []
              }else if(user.loveStatus == 1) {
                this.loveStatusSelect = ['隐藏']
              }else if(user.loveStatus == 2) {
                this.loveStatusSelect = ['单身']
              }else if(user.loveStatus == 3) {
                this.loveStatusSelect = ['情侣']
              }else if(user.loveStatus == 4) {
                this.loveStatusSelect = ['已婚']
              }
            }
          }
        })
      },

      submit() {
        console.log(this.userDetail);
        let nickname = this.userDetail.nickname;
        let imagePath = this.userDetail.imagePath;
        let sex = this.userDetail.sex;
        let images = this.userDetail.images;
        let birthday = this.userDetail.birthday;
        let loveStatus = this.userDetail.loveStatus;
        let favoriteTypes = this.userDetail.favoriteTypes;
        let favoriteSuperStars = this.userDetail.favoriteSuperStars;
        let signature = this.userDetail.signature;
        let industryId = this.userDetail.industryId;
        let regionId = this.userDetail.regionId;

        let params = {
          a:1,
          nickname,
          imagePath,
          sex,
          images,
          birthday,
          loveStatus,
          favoriteTypes,
          favoriteSuperStars,
          signature,
          industryId,
          regionId
        }
        console.log(params)

        this.$Api.UserUpdate(params).then((res) => {
          console.log(res)
        })
      },

      //跳转个性签名
      linkToSignature(name) {
        console.log(this.userDetail);
        // let json = JSON.stringify(this.userDetail)
        // sessionStorage.setItem('user', json);
        this.setSessionStorage();
        this.$router.push({name})
      },

      setSessionStorage() {
        let json = JSON.stringify(this.userDetail)
        sessionStorage.setItem('user', json);

        let sexSelect = JSON.stringify(this.sexSelect);
        let loveStatusSelect = JSON.stringify(this.loveStatusSelect);
        let industrySelect = JSON.stringify(this.industrySelect);
        let addressSelect = JSON.stringify(this.addressSelect);

        sessionStorage.setItem('sexSelect', sexSelect);
        sessionStorage.setItem('loveStatusSelect', loveStatusSelect);
        sessionStorage.setItem('industrySelect', industrySelect);
        sessionStorage.setItem('addressSelect', addressSelect);
      }
    },
    components: {
      Group,
      Cell,
      Datetime,
      XInput,
      PopupPicker,
      XAddress,
      UploadImg
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #edit {
    margin-bottom: boxValue(100);

    .input {
      display: flex;
      padding: boxValue(0) boxValue(30);
      justify-content: space-between;
      align-items: center;
      margin-bottom: boxValue(20);
      height: boxValue(74);
      background: #fff;

      .input__left {
        font-size: boxValue(26);
      }

      .input__right {
        display: flex;
        align-items: center;

        .input__right__arrow {
          display: inline-block;
          margin-top: boxValue(-2);
          margin-left: boxValue(15);
          width: boxValue(16);
          height: boxValue(29);
          background: url('../../assets/arrow_enter.png');
          background-size: 100%;
          vertical-align: middle;
        }

        .input__right__text {
          text-align: right;
          border: none;
          outline: none;
        }

        .input__right__value {
          color: #666;
        }

        .input__right__avatar {
          width: boxValue(88);
          height: boxValue(88);
          border-radius: 50%;
        }
      }
    }

    .input__avatar {
      height: boxValue(140);
    }

    .edit__btn {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: boxValue(72);
      width: 100%;
      line-height: boxValue(72);
      font-size: boxValue(28);
      border-top: 1px solid #eee;

      .btn {
        flex: 1;
        text-align: center;
        background: #fff;
        color: #999;
      }

      .btn.sure {
        color: #fff;
        background: #27adff;
      }
    }

    .edit__image {
      margin-bottom: boxValue(20);
    }
  }

  #avatar {
    display: none;
  }
</style>
