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
        <x-address :title="'地区'" :list="addressData" v-model="addressSelect"  @on-shadow-change="onShadowChange"></x-address>
      </group>

      <group>
        <cell title="行业" :value="industryText" is-link @click.native="linkToUrl('checkList?type=1')"></cell>
        <!-- <popup-picker title="行业" :data="[['互联网', '餐饮', '保险']]" v-model="industrySelect" value-text-align="right" @on-change="selectIndustry"></popup-picker> -->
      </group>

      <group>
        <cell title="个性签名" is-link @click.native="linkToSignature('Signature')"></cell>
      </group>

      <group>
        <cell title="喜欢类型" :value="type" is-link @click.native="linkToUrl('checkList')"></cell>
      </group>

      <group>
        <x-input title="喜欢明星" v-model="userDetail.favoriteSuperStars" text-align="right" placeholder="请输入喜爱明星"></x-input>
      </group>

      <group>
        <x-input title="手机号" v-model="userDetail.mobile" text-align="right"></x-input>
      </group>
    </div>

    <div class="edit__btn">
      <span class="btn" @click="cancelEdit">放弃修改</span>
      <span class="btn sure" @click="submit">保存</span>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, XAddress, XInput, Datetime, PopupPicker, ChinaAddressV4Data } from 'vux';
  import UploadImg from '@/components/UploadImg/UploadImg';
  import { movieType,industryType } from '@/data/data.js';

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
        addressSelect: [], //地区
        type: '',
        industryText: ''
      }
    },

    created() {
      let user = sessionStorage.getItem('user');
      // let user = null;
      if(user) {
        let sexSelectJSON = sessionStorage.getItem('sexSelect');
        let loveStatusSelectJSON = sessionStorage.getItem('loveStatusSelect');
        let addressSelectJSON = sessionStorage.getItem('addressSelect');
        let industrySelectJSON = sessionStorage.getItem('industrySelect');
        let typeJSON = sessionStorage.getItem('favoriteTypes');
        let sexSelect,addressSelect=[],loveStatusSelect,industrySelect,typeSelect;
        let userDetail = JSON.parse(user);
        sessionStorage.setItem('signature', userDetail.signature);

        if(sexSelectJSON) {
          sexSelect = JSON.parse(sexSelectJSON);
        }else {
          if(userDetail.sex == 1) {
            sexSelect = ['男']
          }else {
            sexSelect = ['女']
          }
        }

        if(loveStatusSelectJSON) {
          loveStatusSelect = JSON.parse(loveStatusSelectJSON);
        }else {
          if(userDetail.loveStatus == 1) {
            loveStatusSelect = ['隐藏']
          }else if(userDetail.loveStatus == 2) {
            loveStatusSelect = ['单身']
          }else if(userDetail.loveStatus == 3) {
            loveStatusSelect = ['情侣']
          }else if(userDetail.loveStatus == 4) {
            loveStatusSelect = ['已婚']
          }
        }

        if(addressSelectJSON) {
          addressSelect = JSON.parse(addressSelectJSON);
        }else {
          console.log(userDetail)
          let regionId = userDetail.regionId?userDetail.regionId:'110101';
          console.log(regionId)
          addressSelect[0] = regionId.substr(0,2) + '0000';
          addressSelect[1] = regionId.substr(0,4) + '00';
          addressSelect[2] = regionId;
        }

        console.log(1)

        if(typeJSON) {
          let type = JSON.parse(typeJSON);
          let str = [];
          for(let i in type) {
            str.push(this.getMovieType(type[i]).value);
          }
          console.log(str.join('/'));
          typeSelect = str.join('/')
        }else {
          let type = userDetail.favoriteTypes;
          if(type.length > 0) {
            let str = [];
            for(let i in type) {
              str.push(this.getMovieType(type[i].id).value);
            }
            console.log(str.join('/'));
            typeSelect = str.join('/')
          }
        }

        if(industrySelectJSON) {
          console.log(2)
          let type = industrySelectJSON;
          let result = this.getIndustry(type);
          industrySelect = result.value;
        }else {
          let id = userDetail.industryId;
          console.log(id);
          if(id && id != '0') {
            let result = this.getIndustry(id);
            console.log(result)
            industrySelect = result.value;
            console.log(8)
          }
        }

        this.industryText = industrySelect;
        this.type = typeSelect;
        this.userDetail = userDetail;
        this.addressSelect = addressSelect;
        this.sexSelect = sexSelect;
        this.loveStatusSelect = loveStatusSelect;
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
        this.userDetail.images = val;
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

      //放弃修改
      cancelEdit() {
        this.clearSessionStorage();
        this.$router.go(-1);
      },

      submit() {
        console.log(this.userDetail);
        let nickname = this.userDetail.nickname;
        let imagePath = this.userDetail.imagePath;
        let sex = this.userDetail.sex;
        let images = this.userDetail.images;
        let birthday = this.userDetail.birthday;
        let loveStatus = this.userDetail.loveStatus;
        let favoriteTypes = [];
        let favoriteSuperStars = this.userDetail.favoriteSuperStars;
        let regionId = this.userDetail.regionId;
        let signature = sessionStorage.getItem('signature');
        let typeJSON = sessionStorage.getItem('favoriteTypes');
        let industryId = sessionStorage.getItem('industrySelect');

        if(typeJSON) {
          let type = JSON.parse(typeJSON);
          for(let i in type) {
            let obj = {
              id: type[i]
            }

            favoriteTypes.push(obj)
          }
        }else {
          favoriteTypes = this.userDetail.favoriteTypes;
        }

        if(!signature) {
          signature = this.userDetail.signature;
        }

        if(!industryId) {
          industryId = this.userDetail.industryId;
        }

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

        this.$Api.UserUpdate(params).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('保存成功!').then(() => {
              this.$router.push({name:'Mine'})
            })
            this.clearSessionStorage();
            this.updateUserDetail();
          }
        })
      },

      getMovieType(num) {
        let result = movieType.find((item) => {
          return item.key == num
        })
        return result;
      },

      getIndustry(type) {
        let result = industryType.find((item) => {
          return item.key == type 
        })
        return result;
      },

      //跳转个性签名
      linkToSignature(name) {
        this.setSessionStorage();
        this.$router.push({name})
      },

      clearSessionStorage() {
        sessionStorage.removeItem('sexSelect');
        sessionStorage.removeItem('loveStatusSelect');
        sessionStorage.removeItem('addressSelect');
        sessionStorage.removeItem('favoriteTypes');
        sessionStorage.removeItem('industrySelect');
        sessionStorage.removeItem('signature');
      },

      setSessionStorage() {
        let json = JSON.stringify(this.userDetail)
        sessionStorage.setItem('user', json);

        let sexSelect = JSON.stringify(this.sexSelect);
        let loveStatusSelect = JSON.stringify(this.loveStatusSelect);
        let addressSelect = JSON.stringify(this.addressSelect);

        sessionStorage.setItem('sexSelect', sexSelect);
        sessionStorage.setItem('loveStatusSelect', loveStatusSelect);
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
