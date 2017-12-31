<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
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
    }
  }
</script>

<style lang="scss">
  @import './scss/mixin.scss';

  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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
</style>
