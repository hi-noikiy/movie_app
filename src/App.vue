<template>
  <div id="app">
    <!-- <keep-alive :include="['Index','Store']"> -->
    <keep-alive :include="[]">
      <router-view/>
      <loading v-model="isLoading"></loading>
    </keep-alive>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Tabbar, TabbarItem, Loading } from 'vux'
  export default {
    name: 'app',
    created() {
      if(!sessionStorage.getItem('sessionId')) {
        this.$Api.getSession().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            sessionStorage.setItem('sessionId', '');
            // sessionStorage.setItem('sessionId', res.s);
          }
        })
      }

      if(!sessionStorage.getItem('location')) {
        var map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
          var str=['定位成功'];
          str.push('经度：' + data.position.getLng());
          str.push('纬度：' + data.position.getLat());
          if(data.accuracy){
            str.push('精度：' + data.accuracy + ' 米');
          }//如为IP精确定位结果则没有精度信息
          console.log(str);
          let obj = {
            lat: data.position.getLat(),
            lng: data.position.getLng()
          }

          let json = JSON.stringify(obj)
          console.log(json);
          sessionStorage.setItem('location', json);
        }

        function onError(err) {
          console.log(err);
        }
      }
    },

    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },

    components: {
      Tabbar,
      TabbarItem,
      Loading
    }
  }
</script>

<style lang="scss">
  @import './scss/mixin.scss';

  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  img {
    object-fit: cover;
  }

  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}

  #app .vux-tab .vux-tab-item {
    background: none;
  }

  html,body {
    height: 100%;
    background: #f5f5f5;
  }

  .border_line {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: boxValue(20);
      width: 100%;
      border-bottom: 1px solid #eee;
    }
  }

  #app {
    height: 100%;
  }

  .rate__num {
    display: inline-block;
    width: 83px;
    height: 15px;
    background: url('./assets/rates.png');
    vertical-align: middle;
  }
  
  .rate__num {
    &.rate0 {
      background-position: -83px 0;
    }

    &.rate0_5 {
      background: url('./assets/rates_half.png');
      background-position: -69px 0;
    }

    &.rate1 {
      background-position: -66px 0;
    }

    &.rate1_5 {
      background: url('./assets/rates_half.png');
      background-position: -53px 0;
    }

    &.rate2 {
      background-position: -49px 0;
    }

    &.rate2_5 {
      background: url('./assets/rates_half.png');
      background-position: -35px 0;
    }

    &.rate3 {
      background-position: -32px 0;
    }

    &.rate3_5 {
      background: url('./assets/rates_half.png');
      background-position: -19px 0;
    }

    &.rate4 {
      background-position: -16px 0;
    }

    &.rate4_5 {
      background: url('./assets/rates_half.png');
      background-position: -1px 0;
    }

    &.rate5 {
      background-position: 0 0;
    }
  }

  .rate__scale {
    transform: scale(0.7);
    transform-origin: 0 -10px;
  }

  .rate__scale_l {
    transform: scale(0.7);
    transform-origin: boxValue(0) 4px;
  }

  .button {
    margin: 0 auto;
    width: boxValue(580);
    height: boxValue(70);
    line-height: boxValue(70);
    text-align: center;
    font-size: boxValue(30);
    color: #fff;
    background: #02a9ff;
    border-radius: boxValue(8);
  }

  .btn_unactive {
    background: #86919b !important;
  }


  //重新vux样式
  a {
    text-decoration: none;
  }

  .weui-cell {
    font-size: boxValue(26);

    p {
      margin: 0;
    }
  }

  .weui-cells {
    margin-top: 0!important;
    margin-bottom: boxValue(20)!important;
  }

  .weui-cells:before {
    border-top: none!important;
  }

  .weui-cells:after {
    border-bottom: none!important;
  }

  .vux-cell-value {
    color: #666!important;
  }

  .vux-cell-box:before {
    border-top: none!important;
  }

  .vux-1px-t {
    &::before {
      border: none;
    }
  }

  //展开
  .limit {
    max-height: boxValue(100);
    height: auto;
    overflow: hidden;
  }

  .no__limit {
    max-height: auto;
  }

  .arrow__control {
    height: boxValue(40);
    line-height: boxValue(40);
    text-align: center;

    .arrow {
      display: inline-block;
      height: boxValue(19);
      width: boxValue(32);
      transform: rotate(0);
      background-image: url('assets/arrow_down.png');
      background-repeat: no-repeat;
      background-size: 100%;
      vertical-align: middle;
      transition: all 0.2s ease-in-out;
    }

    .arrow.up {
      transform: rotate(180deg);
    }
  }

  %sex {
    position: relative;
    margin-left: boxValue(10);
    font-size: 10px;
    padding: boxValue(2) boxValue(12);
    height: boxValue(24);
    padding-right: boxValue(40);
    color: #fff;
    background: #f773be;
    border-radius: boxValue(6);

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: boxValue(9);
      transform: translateY(-50%);
      height: boxValue(18);
      width: boxValue(18);
      background-image: url('assets/girl.png');
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
    }
  }

  .sex_g {
    @extend %sex;
  }

  .fsex_g {
    @extend %sex;

    padding-right: boxValue(12);
    padding-left: boxValue(40);

    &::after {
      left: boxValue(9);
    }
  }

  .sex_b {
    @extend %sex;
    background: #27adff;

    &::after {
      background-image: url('assets/boy.png');
    }
  }

  .fsex_b {
    @extend .sex_b;
    padding-right: boxValue(12);
    padding-left: boxValue(40);

    &::after {
      left: boxValue(9);
    }
  }
</style>
