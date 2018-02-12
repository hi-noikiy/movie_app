<template>
  <div id="download">
    <div class="about__logo">
      <img src="../../assets/300.png" alt="">
    </div>
    <div class="about__content">
      介绍文案:云影汇app是一款面向全球影迷的社交app,帮助你轻松找到来自全球各地同样喜爱电影的有趣灵魂。你可以通过游戏、签到、约影，扩展志同道合的影友或戏友，同时还可以及时了解各种电影动态，分享有趣走心的影评，让你一秒变身电影时尚达人，体会前所未有的趣味社交方式。
    </div>
    <div class="download__btn">
      <div class="button" id="ios" @click="linkToIos">
        ios下载
      </div>
      <div class="button" id="andriod" @click="linkToAnd">
        安卓下载
      </div> 
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      linkToIos() {
        location.href = "https://fir.im/tvyf";
      },
      linkToAnd() {
        location.href = "http://api.yyh517.com/download/YYH.apk";
      }
    }
  }
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }

  #download {
    padding-top: 1px;
    height: 100%;
    background: url('../../assets/loginbg.jpg');
    background-size: 100%;

    .download__btn {
      margin: 30px auto;
      text-align: center;
    }

    .button {
      margin: 10px auto;
      width: boxValue(210);
      height: boxValue(105);
      line-height: boxValue(105);
      text-align: center;
      font-size: boxValue(24);
      font-weight: 600;
      color: #7d560a;
      background: url('../../assets/btn.png');
      background-size: 100%;
    }
  }

  .about__logo {
    margin: 0 auto;
    margin-top: boxValue(100);
    margin-bottom: boxValue(60);
    width: boxValue(200);
    height: auto;

    img {
      width: 100%;
    }
  }

  .about__content {
    padding: 0 boxValue(30);
    text-indent: boxValue(52);
    font-size: boxValue(26);
    color: #fff;
  }
</style>
