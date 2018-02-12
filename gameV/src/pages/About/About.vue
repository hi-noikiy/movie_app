<template>
  <div id="about">
    <div class="about__logo">
      <img src="../../assets/logo22.png" alt="">
    </div>
    <div class="about__content">
      介绍文案:云影汇app是一款面向全球影迷的社交app,帮助你轻松找到来自全球各地同样喜爱电影的有趣灵魂。你可以通过游戏、签到、约影，扩展志同道合的影友或戏友，同时还可以及时了解各种电影动态，分享有趣走心的影评，让你一秒变身电影时尚达人，体会前所未有的趣味社交方式。
    </div>
  </div>
</template>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }

  #about {
    padding-top: 1px;
    height: 100%;
    background: #f5f5f5;

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
    }
  }
</style>
