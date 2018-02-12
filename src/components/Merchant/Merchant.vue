<template>
  <div class="merchant__list">
    <div class="merchant border_line" v-if="cinema" @click="showMap(cinema)">
      <div class="merchant__left">
        <div class="left__name">{{cinema.name}}</div>
        <div class="left__content">{{cinema.address}}</div>
      </div>
      <div class="merchant__right"  @click="linkToTel(cinema)">
        <span class="merchant__right__phone"></span>
      </div>
    </div>
    <div class="merchant border_line" v-else-if="cinemaList" v-for="cinema in cinemaList" @click="showMap(cinema)">
      <div class="merchant__left">
        <div class="left__name">{{cinema.name}}</div>
        <div class="left__content">{{cinema.address}}</div>
      </div>
      <div class="merchant__right" @click.stop ="linkToTel(cinema)">
        <span class="merchant__right__phone"  @click.stop ="linkToTel(cinema)"></span>
      </div>
    </div>

    <div id="container" v-show="isShow">
      <span class="close" @click="close"></span>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['cinema', 'cinemaList'],
    data() {
      return {
        isShow: false
      }
    },

    methods: {
      linkToTel(item) {
        if(item.hotline) {
          window.location.href='tel:' + item.hotline
        }else {
          this.$toast('暂无电话', 'fail')
        }
      },

      showMap(item) {
        console.log(123)
        if(item.longitude && item.latitude) {
          this.isShow = true;
          var map = new AMap.Map('map', {
            resizeEnable: true,
            zoom:16,
            center: [item.longitude, item.latitude]
          });

          var marker = new AMap.Marker({
            map: map,
            position: [item.longitude, item.latitude]
          });

          marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
            offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
            content: item.name + '[地址:' +item.address + ']'
          });
        }
        
      },

      close() {
        this.isShow = false;
      }
    }
  }  
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .merchant {
    display: flex;
    flex-direction: row;
    padding: boxValue(14) 0;
    height: boxValue(114);
    background: #fff;

    .merchant__left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: boxValue(10) 0;
      padding-left: boxValue(20);
      height: boxValue(94);
      width: boxValue(520);

      .left__name {
        font-weight: 600;
        font-size: boxValue(20);
      }

      .left__content {
        font-size: boxValue(20);
        color: #888;
      }
    }

    .merchant__right {
      position: relative;
      width: boxValue(100);
      line-height: boxValue(114);
      text-align: center;

      .merchant__right__phone {
        display: inline-block;
        width: boxValue(54);
        height: boxValue(54);
        background: url('../../assets/telephone.png');
        background-size: cover;
        vertical-align: middle;
      }

      &:after {
        content: '';
        position: absolute;
        left: -1px;
        top: 50%;
        margin-top: boxValue(-35);
        height: boxValue(70);
        border-left: 1px solid #eee;
      }
    }
  }

  #container {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 888;

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

    .amap-marker-label {
      width: 80px;
      word-break: break-all;
      height: auto;
      white-space: normal;
      border-color: #ccc;
    }
  }
</style>

