<template>
  <div id="getpoints">
    <div class="btn" @click="linkTo('Sign')">签到</div>
    <div class="btn" @click="linkTo('Meet')">约电影</div>
    <div class="btn" @click="linkTo('Game')">玩游戏</div>
  </div>  
</template>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #getpoints {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    background-image: url('../../assets/loginbg.jpg');
    background-size: 100%;

    .btn {
      margin: 0 auto;
      width: boxValue(266);
      height: boxValue(133);
      line-height: boxValue(133);
      text-align: center;
      font-size: boxValue(36);
      background: url('../../assets/btn.png');
      background-size: 100%;
    }
  }
</style>
