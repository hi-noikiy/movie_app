<template>
  <div id="game">
    <div class="game__list">
      <div class="game">
        <img src="../../assets/1.jpg" alt="">
      </div>
      
      <div class="game">
        <img src="../../assets/2.jpg" alt="">
      </div>

      <div class="game">
        <img src="../../assets/3.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #game {
    .game__list {
      margin-top: boxValue(80);
      .game {
        margin: boxValue(20) auto;
        width: boxValue(600);
        height: boxValue(280);

        img {
          width: 100%;
          height: 100%;
          border-radius: boxValue(20);
          box-shadow: 1px 1px 6px 4px #dcdcdc;
        }
      }
    }
  }
</style>
