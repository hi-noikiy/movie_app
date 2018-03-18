<template>
  <div id="app">
    <!-- <keep-alive :include="['Index','Store']"> -->
    <keep-alive :include="['Index','Store']">
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
      // if(!sessionStorage.getItem('sessionId')) {
      //   this.$Api.getSession().then((res) => {
      //     console.log(res)
      //     if(res.q.s == 0) {
      //       sessionStorage.setItem('sessionId', '');
      //       // sessionStorage.setItem('sessionId', res.s);
      //     }
      //   })
      // }

      // if(!sessionStorage.getItem('location')) {
      //   var map, geolocation;
      //   //加载地图，调用浏览器定位服务
      //   map = new AMap.Map('container', {
      //       resizeEnable: true
      //   });
      //   map.plugin('AMap.Geolocation', function() {
      //     geolocation = new AMap.Geolocation({
      //       enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //       timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      //       buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //       zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //       buttonPosition:'RB'
      //     });
      //     map.addControl(geolocation);
      //     geolocation.getCurrentPosition();
      //     AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      //     AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
      //   });
      //   //解析定位结果
      //   function onComplete(data) {
      //     var str=['定位成功'];
      //     str.push('经度：' + data.position.getLng());
      //     str.push('纬度：' + data.position.getLat());
      //     if(data.accuracy){
      //       str.push('精度：' + data.accuracy + ' 米');
      //     }//如为IP精确定位结果则没有精度信息
      //     console.log(str);
      //     let obj = {
      //       lat: data.position.getLat(),
      //       lng: data.position.getLng()
      //     }

      //     let json = JSON.stringify(obj)
      //     console.log(json);
      //     sessionStorage.setItem('location', json);
      //   }

      //   function onError(err) {
      //     console.log(err);
      //   }
      // }
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

</style>
