<template>
  <div id="setting">
    <group class="setting__movie">
      <cell class="movie" title="约电影" value="飞扬影城" is-link @click.native="showPopup"></cell>
    </group>

    <group class="setting__sex">
      <cell class="sex" title="匹配性别" value="女" is-link @click.native="showPopup"></cell>
    </group>

    <group class="setting__age">
      <cell class="age" title="年龄区间" value="18-32" is-link @click.native="showPopup"></cell>
    </group>

    <div class="setting__btn">确认</div>

    <div v-transfer-dom>
      <popup v-model="show" position="bottom" max-height="50%">
        <group>
          <cell v-for="i in 20" :key="i" :title="i"></cell>
        </group>
        <div style="padding: 15px;">
          <x-button @click.native="show13 = false" plain type="primary"> Close Me </x-button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>

import { TransferDom, Popup, XButton, Range, Group, Cell } from 'vux'

export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      show: false,
      data1: 0,
      min: 0,
      max: 100,
      step: 1,
      dynamiValue: 0
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onChange() {

    }
  },
  components: {
    Group,
    Cell,
    Popup,
    XButton,
    Range
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

