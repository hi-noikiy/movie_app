<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'app',
    created() {
      if(!sessionStorage.getItem('sessionId')) {
        this.$Api.getSession().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            sessionStorage.setItem('sessionId', res.s);
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

    components: {
      Tabbar,
      TabbarItem
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
    width: boxValue(166);
    height: boxValue(30);
    background: url('./assets/rates.png');
    vertical-align: middle;
  }

  .rate__num.rate0_5 {
    background: url('./assets/rates_half.png');
    background-position: boxValue(-138) 0;
  }

  .rate__num.rate1 {
    background-position: boxValue(-132) 0;
  }

  .rate__num.rate1_5 {
    background: url('./assets/rates_half.png');
    background-position: boxValue(-106) 0;
  }

  .rate__num.rate2 {
    background-position: boxValue(-98) 0;
  }

  .rate__num.rate2_5 {
    background: url('./assets/rates_half.png');
    background-position: boxValue(-106) 0;
  }

  .rate__num.rate3 {
    background-position: boxValue(-64) 0;
  }

  .rate__num.rate3_5 {
    background: url('./assets/rates_half.png');
    background-position: boxValue(-70) 0;
  }

  .rate__num.rate4 {
    background-position: boxValue(-32) 0;
  }

  .rate__num.rate4_5 {
    background: url('./assets/rates_half.png');
    background-position: boxValue(-38) 0;
  }

  .rate__num.rate5 {
    background-position: boxValue(0) 0;
  }

  .rate__scale {
    transform: scale(0.7);
    transform-origin: 0 boxValue(-20);
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
</style>
