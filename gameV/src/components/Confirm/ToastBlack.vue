<template>
  <transition name='fade'>
    <div id="toastBlack" v-if="isShow">
      <div class="toastBlack__wrap">
        <div class="loading">
          <div class="loading__img spinner-snake"></div>
          <div class="loading__text">{{text}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        text: '加载中'
      }
    }
  }
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }
  
  #toastBlack {
    .toastBlack__wrap {
      position: fixed;
      top: 70%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: boxValue(10) boxValue(40);
      background: rgba(0,0,0, 0.6);
      color: #eee;
      border-radius: boxValue(16);
      z-index: 999;

      .loading {
        text-align: center;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>

