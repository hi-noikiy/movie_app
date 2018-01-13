<template>
  <div id="merchants">
    <div class="merchants__list">
      <Merchant :cinemaList="cinemaList"/>
    </div>

    <div id="container" v-show="isShow">
      <span class="close" @click="close"></span>
      <div id="map"></div>
    </div>

    <div class="merchants__location" @click="showMap">
      地图查看
    </div>
  </div>
</template>

<script>
  import Merchant from '@/components/Merchant/Merchant';

  export default {
    data() {
      return {
        cinemaList: [],
        isShow: false
      }
    },
    created() {
      let json = sessionStorage.getItem('cinemaList');
      this.cinemaList = JSON.parse(json);
    },
    
    methods: {
      showMap() {
        this.isShow = true;
        var map = new AMap.Map('map', {
          resizeEnable: true,
          zoom:11,
          center: [116.397428, 39.90923]
        });
      },

      close() {
        this.isShow = false;
      }
    },

    components: {
      Merchant
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #merchants {
    position: relative;
    height: 100%;
    margin-top: boxValue(20);
    margin-bottom: boxValue(100);

    .merchant {
    }

    .merchants__location {
      position: fixed;
      bottom: 0;
      left: 0;
      height: boxValue(70);
      width: 100%;
      line-height: boxValue(70);
      font-size: boxValue(28);
      text-align: center;
      color: #fff;
      background: #27adff;
    }

    #container {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;

      #map {
        height: 100%;
        width: 100%;
      }

      .close {
        position: absolute;
        right: boxValue(0);
        top: boxValue(15);
        display: inline-block;
        width: boxValue(50);
        height: boxValue(50);
        background-image: url('../../assets/imgdelete.png');
        background-size: 100%;
        z-index: 999;
      }
    }
  }
</style>
