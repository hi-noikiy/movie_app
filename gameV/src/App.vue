<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }
  
  * {
    padding: 0;
    margin: 0;
  }

  html,body,#app {
    height: 100%;
    width: 100%;
  }

  .container {
    position: relative;
    height: 100%;
  }

  .btn {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    text-align: center;

    .btn__top {
      .button {
        margin: 0 auto;
      }
    }

    .btn__bottom {
      .button {
        display: inline-block;
        margin: 0 boxValue(35) boxValue(50) boxValue(35);
      }
    }

    .button {
      width: boxValue(210);
      height: boxValue(105);
      line-height: boxValue(105);
      text-align: center;
      font-size: boxValue(24);
      font-weight: 600;
      color: #7d560a;
      background: url('./assets/btn.png');
      background-size: 100%;
    }
  }
</style>
