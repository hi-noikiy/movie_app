<template>
  <div id="edit">
    <div class="edit__image">
      <UploadImg :uploadedList="images" :max="8" @ImgChange="getImgList"/>
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
        <x-input title="昵称" v-model="nickname" text-align="right"></x-input>
      </group>

      <group>
        <datetime title="生日" v-model="birthday" format="YYYY-MM-DD" value-text-align="right"  :min-year='1900'></datetime>
      </group>

      <group>
        <popup-picker title="性别" :data="[['男', '女']]" v-model="sexSelect" value-text-align="right" @on-change="selectSex"></popup-picker>
      </group>

      <group>
        <popup-picker title="情感状态" :data="[['隐藏', '单身', '情侣', '已婚']]" v-model="loveStatusSelect" value-text-align="right" @on-change="selectLoveStatus"></popup-picker>
      </group>

      <group>
        <x-address :title="'地区'" :list="addressData" v-model="addressSelect" @on-hide="selectAddress" @on-shadow-change="changeAddress"></x-address>
      </group>

      <group>
        <cell title="行业" :value="industryText" is-link @click.native="linkToUrl('checkList?type=1')"></cell>
        <!-- <popup-picker title="行业" :data="[['互联网', '餐饮', '保险']]" v-model="industrySelect" value-text-align="right" @on-change="selectIndustry"></popup-picker> -->
      </group>

      <group>
        <cell class="likeType"  title="个性签名" :value="signature" is-link @click.native="linkToSignature('Signature')"></cell>
      </group>

      <group>
        <cell class="likeType" title="喜欢类型" :value="type" is-link @click.native="linkToUrl('checkList')"></cell>
      </group>

      <group>
        <x-input title="喜欢明星" v-model="favoriteSuperStars" text-align="right" placeholder="请输入喜爱明星"></x-input>
      </group>

      <group>
        <x-input title="手机号" v-model="mobile" text-align="right"></x-input>
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
        addressData: ChinaAddressV4Data,
        avatar: null,
        imagePath: '',           //头像
        images: [],              //图片列表
        nickname: '',            //昵称
        birthday: '',            //生日
        sex: '',                 //性别
        mobile: '',              //手机
        loveStatus: '',          //情感状态
        favoriteSuperStars: '',  //喜爱明星
        sexSelect: [],   //男
        signature: '',         //签名
        loveStatusSelect: [], //情感状态
        industrySelect: [], //行业
        addressSelect: ['110000','110100','110101'], //地区
        type: '',
        industryText: ''
      }
    },

    created() {
      // let user = null;
      this.utilUserDetail().then(() => {
        let sexSelectJSON = sessionStorage.getItem('sexSelect');
        let loveStatusSelectJSON = sessionStorage.getItem('loveStatusSelect');
        let addressSelectJSON = sessionStorage.getItem('addressSelect');
        let industrySelectJSON = sessionStorage.getItem('industrySelect');
        let typeJSON = sessionStorage.getItem('favoriteTypes');
        let avatarJSON = sessionStorage.getItem('avatar');
        let imagePathJSON = sessionStorage.getItem('imagePath');
        let signatureJSON = sessionStorage.getItem('signature');
        let sexSelect,addressSelect=[],loveStatusSelect,industrySelect,typeSelect;

        if(sexSelectJSON) {
          sexSelect = JSON.parse(sexSelectJSON);
        }else {
          if(this.userDetail.sex == 1) {
            sexSelect = ['男']
          }else {
            sexSelect = ['女']
          }
        }

        if(loveStatusSelectJSON) {
          loveStatusSelect = JSON.parse(loveStatusSelectJSON);
        }else {
          if(this.userDetail.loveStatus == 1) {
            loveStatusSelect = ['隐藏']
          }else if(this.userDetail.loveStatus == 2) {
            loveStatusSelect = ['单身']
          }else if(this.userDetail.loveStatus == 3) {
            loveStatusSelect = ['情侣']
          }else if(this.userDetail.loveStatus == 4) {
            loveStatusSelect = ['已婚']
          }
        }

        if(addressSelectJSON) {
          addressSelect = JSON.parse(addressSelectJSON);
        }else {
          if(this.userDetail.regionInfo && this.userDetail.regionInfo.length == 3) {
            addressSelect[0] = this.userDetail.regionInfo[0].id;
            addressSelect[1] = this.userDetail.regionInfo[1].id;
            addressSelect[2] = this.userDetail.regionInfo[2].id;
          }else {
            let regionId = this.userDetail.regionId?this.userDetail.regionId:'110101';
            addressSelect[0] = regionId.substr(0,2) + '0000';
            addressSelect[1] = regionId.substr(0,4) + '00';
            addressSelect[2] = regionId;
          }
        }

        if(typeJSON) {
          let type = JSON.parse(typeJSON);
          let str = [];
          for(let i in type) {
            str.push(this.getMovieType(type[i]).value);
          }
          console.log(str.join('/'));
          typeSelect = str.join('/')
        }else {
          let type = this.userDetail.favoriteTypes;
          let arr = [];
          if(type.length > 0) {
            let str = [];
            for(let i in type) {
              str.push(this.getMovieType(type[i].id).value);
              arr.push(type[i].id);
            }
            console.log(str.join('/'));
            typeSelect = str.join('/');
            let json = JSON.stringify(arr);
            //设置缓存
            sessionStorage.setItem('favoriteTypes', json);
          }
        }

        if(industrySelectJSON) {
          console.log(2)
          let type = industrySelectJSON;
          let result = this.getIndustry(type);
          industrySelect = result.value;
        }else {
          let id = this.userDetail.industryId;
          console.log(id);
          if(id && id != '0') {
            let result = this.getIndustry(id);
            console.log(result)
            industrySelect = result.value;
            console.log(8)
          }
        }

        if(!signatureJSON && this.userDetail.signature) {
          sessionStorage.setItem('signature', this.userDetail.signature);
          signatureJSON = this.userDetail.signature;
        }

        this.avatar = avatarJSON;
        this.imagePath = imagePathJSON;
        this.industryText = industrySelect;
        this.type = typeSelect;
        this.addressSelect = addressSelect;
        this.signature = signatureJSON;
        this.sexSelect = sexSelect;
        this.loveStatusSelect = loveStatusSelect;
        this.birthday = this.userDetail.birthday;
        this.favoriteSuperStars = this.userDetail.favoriteSuperStars;
        this.nickname = this.userDetail.nickname;
        this.mobile = this.userDetail.mobile;
        this.images = this.userDetail.images;
      })
    },

    methods: {

      selectSex(val) {
        if(val[0] == '男') {
          this.sex = 1;
        }else if(val[0] == '女') {
          this.sex = 2;
        }
      },

      selectLoveStatus(val) {
        if(val[0] == '隐藏') {
          this.loveStatus = 1;
        }else if(val[0] == '单身') {
          this.loveStatus = 2;
        }else if(val[0] == '情侣') {
          this.loveStatus = 3;
        }else if(val[0] == '已婚') {
          this.loveStatus = 4;
        }
      },

      // selectIndustry(val) {
      //   this.userDetail.industryId = 1;
      // },

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
          console.log(res, '结果')
        }
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
              this.imagePath = res.q.files[0].path;
              oFile.value = '';
              sessionStorage.setItem('avatar', oFREvent.currentTarget.result);
              sessionStorage.setItem('imagePath', res.q.files[0].path);
            };
          }
        })

        event.target.value=null
      },

      //设置图片列表
      getImgList(val) {
        this.images = val;
      },

      showDate(date) {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          minYear: 1900,
          value: date,
          onConfirm: (val) => {
            this.birthday = val
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
        let nickname = this.nickname;
        let imagePath = this.imagePath;
        let sex = this.sex;
        let images = this.images;
        let birthday = this.birthday;
        let loveStatus = this.loveStatus;
        let favoriteTypes = [];
        let favoriteSuperStars = this.favoriteSuperStars;
        let regionId = this.addressSelect[2];
        let signature = sessionStorage.getItem('signature');
        let typeJSON = sessionStorage.getItem('favoriteTypes');
        let industryId = sessionStorage.getItem('industrySelect');

        //限制图片为8位
        if(images.length > 8) {
          images.splice(8, images.length);
        }

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

        console.log(params)
        // return false;

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

      // delImg(index) {
      //   this.uploadedList.splice(index, 1);
      // },

      clearSessionStorage() {
        sessionStorage.removeItem('sexSelect');
        sessionStorage.removeItem('loveStatusSelect');
        sessionStorage.removeItem('addressSelect');
        sessionStorage.removeItem('favoriteTypes');
        sessionStorage.removeItem('industrySelect');
        sessionStorage.removeItem('signature');
        sessionStorage.removeItem('avatar');
        sessionStorage.removeItem('imagePath');
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

  .likeType  {
    .weui-cell__ft {
      width: boxValue(300);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  

  #avatar {
    display: none;
  }
</style>
