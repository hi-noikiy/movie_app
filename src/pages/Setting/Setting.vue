<template>
  <div id="setting">
    <group class="setting__movie">
      <popup-picker title="约电影" :data="cinemasList" v-model="cinemasListSelect" value-text-align="right"></popup-picker>
    </group>

    <group class="setting__sex">
      <popup-picker title="性别" :data="[['男', '女']]" v-model="sexSelect" value-text-align="right"></popup-picker>
    </group>

    <group class="setting__age">
      <popup-picker title="年龄区间" :data="ageList" v-model="age" :display-format="format"></popup-picker>
    </group>

    <div class="setting__btn" @click="submit">确认</div>
  </div>
</template>

<script>

import { PopupPicker, Popup, Group, Cell } from 'vux'

export default {
  data() {
    return {
      show: false,
      sexSelect: ['男'],
      cinemas: null,
      cinemasList: [[]],
      cinemasListSelect: [],
      ageList: [[],[]], //年龄列表
      age: [[20], [22]],
      format: function (value, name) {
        return `${value[0]} - ${value[1]}`
      }
    }
  },

  created() {
    this.getCinemaList();

    let i = 1;
    while(i <= 100) {
      this.ageList[0].push(i);
      this.ageList[1].push(i);
      i++;
    }
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
      let sex = this.sexSelect[0] == '男'?1:2;
      let matchAgeMin = this.age[0][0];
      let matchAgeMax = this.age[1][0];
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
          this.$toast('更新成功!')
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

