<template>
  <div id="setting">
    <group class="setting__movie">
      <popup-picker title="约电影" :data="cinemasList" v-model="cinemasListSelect" value-text-align="right"></popup-picker>
    </group>

    <group class="setting__sex">
      <popup-picker title="性别" :data="[['全部', '男', '女']]" v-model="sexSelect" value-text-align="right"></popup-picker>
    </group>

    <group class="setting__age">
      <popup-picker title="年龄区间" :data="ageList" v-model="age" :display-format="format"></popup-picker>
    </group>

    <div class="setting__btn" @click="submit">确认</div>
  </div>
</template>

<script>

import { PopupPicker, Popup, Group, Cell } from 'vux';
const age = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]

export default {
  data() {
    return {
      show: false,
      sexSelect: ['全部'],
      cinemas: null,
      cinemasList: [[]],
      cinemasListSelect: [],
      ageList: [[...age],[...age]], //年龄列表
      age: ['12', '40'],
      format: function (value, name) {
        return `${value[0]} - ${value[1]}`
      }
    }
  },

  created() {
    if(this.userDetail.matchSex == '1') {
      this.sexSelect = ['男'];
    }else if(this.userDetail.matchSex == '2') {
      this.sexSelect = ['女'];
    }else {
      this.sexSelect = ['全部'];
    }
    this.getCinemaList();
  },

  methods: {
    showPopup() {
      this.show = true
    },

    //获取影院
    getCinemaList() {
      this.$Api.getCinemaList().then((res) => {
        console.log(res)
        if(res.q.s == 0) {
          this.cinemas = res.q.cinemas;
          if(this.cinemas.length > 0) {
            this.cinemasListSelect.push(this.cinemas[0].name);
          }
          for(let i in res.q.cinemas) {
            this.cinemasList[0].push(res.q.cinemas[i].name);
          }
        }
      })
    },

    submit() {
      let sex = this.sexSelect[0] == '全部'?3:this.sexSelect[0] == '男'?1:2;
      let matchAgeMin = parseInt(this.age[0]);
      let matchAgeMax = parseInt(this.age[1]);
      let cinema = this.cinemas.find((item) => {
        if(item.name == this.cinemasListSelect[0]) {
          return true;
        }
      })
      let cinemaId;
      if(cinema) {
        cinemaId = cinema.id;
      }

      if(matchAgeMax < matchAgeMin) {
        console.log(matchAgeMin,matchAgeMax)
        this.$toast('匹配最小值不能超过最大值')
        return false;
      }

      let param = {
        a: 2,
        matchSex: sex,
        matchAgeMin,
        matchAgeMax,
        cinemaId
      }

      console.log(param);
      this.$Api.UserUpdate(param).then((res) => {
        console.log(res)
        if(res.q.s == 0) {
          this.updateUserDetail();
          this.$toast('更新成功!').then(() => {
            this.$router.go(-1);
          })
        }else {
          this.$toast(res.q.d, 'fail');
        }
      })
    }
  },
  components: {
    PopupPicker,
    Group,
    Cell
  }
}
</script>

<style lang="scss">
@import '../../scss/mixin.scss';
  #setting {
    height: 100%;
    overflow: hidden;
    background: #f5f5f5;

    .setting__age,
    .setting__sex,
    .setting__movie {
      height: boxValue(74);

      .weui-cells {
        margin-top: boxValue(24);
      }
    }

    .setting__age .age,
    .setting__movie .movie,
    .setting__sex .sex {
      height: boxValue(74);
      padding: 0 boxValue(30);
      font-size: 13px;
    }

    .setting__btn {
      margin: boxValue(40) auto;
      color: #fff;
      width: boxValue(580);
      height: boxValue(58);
      line-height: boxValue(58);
      font-size: 13px;
      text-align: center;
      border-radius: boxValue(8);
      background: #02a9ff;
    }
  }
</style>

