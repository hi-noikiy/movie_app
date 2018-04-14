<template>
  <div id="game">
    <div class="game__list">
      <div class="game" @click="link(2)">
        <img src="../../assets/1.jpg" alt="">
      </div>
      
      <div class="game" @click="link(1)">
        <img src="../../assets/2.jpg" alt="">
      </div>

      <div class="game" @click="link(3)">
        <img src="../../assets/3.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    mounted() {
      // var count = 0; // needed for safari
      // window.onpopstate = () => { 
      //   history.pushState('back', null, null);              
      //   if(count == 1){
      //     this.$router.push({name: 'Index'})
      //   }
      // }
      // setTimeout(function(){count = 1;},200);
    },
    
    methods: {
      link(type) {
        let base = location.host.match(/test/)?"https://test.game.yyh517.com/#/game_":"https://game.yyh517.com/#/game_";
        location.href = base + type;
      }
    }
  }
</script>

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
