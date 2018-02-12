<template>
  <div id="loading" v-if="isShow">
    <div class="loading__wrap">
      <div class="loading">
        <div class="loading__img spinner-snake"></div>
        <div class="loading__text" v-if="text">{{text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        text: ''
      }
    }
  }
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }
  
  #loading {
    .loading__wrap {
      display: flex;
      position: fixed;
      align-items: center;
      justify-content: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: boxValue(10);
      width: boxValue(100);
      height: boxValue(100);
      background: #fff;
      border-radius: boxValue(16);
      border: 1px solid #eee;
      z-index: 97;

      .loading {
        text-align: center;

        .loading__text {
          margin-top: boxValue(22);
          color: #333;
        }
      }
    }

    .spinner-snake {
      margin: 0 auto;
      border: 4px solid transparent;
      border-top-color: rgb(204, 204, 204);
      border-left-color: rgb(204, 204, 204);
      border-bottom-color: rgb(204, 204, 204);
      height: 18px;
      width: 18px;
      border-radius: 50%;
      animation: rotate .8s infinite linear;
    }
    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }
</style>

