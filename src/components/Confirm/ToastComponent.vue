<template>
  <transition name='fade'>
    <div id="toast" v-if="show" >
      <div class="toast">
        <div class="toast__top">
          <div class="toast__icon" v-if="type == 'success'">
            <img src="../../assets/succeed.png" alt="">
          </div>
          <div class="toast__icon" v-else>
            <img src="../../assets/fail.png" alt="">
          </div>
        </div>
        <div class="toast__content">
          {{content}}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        content: '默认',
        show: false,
        type: 'success'
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #toast {
    position: fixed;
    display: flex;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.3);

    .toast {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: boxValue(80) boxValue(24);
      width: boxValue(460);
      height: auto;
      background: #fff;
      border-radius: 5px;

      .toast__content {
        margin-top: boxValue(26);
        padding: boxValue(4) boxValue(10);
        text-align: center;
        font-size: boxValue(30);
        line-height: boxValue(34);
        color: #333;
      }

      .toast__top {
        display: flex;
        flex-direction: column;
        align-items: center;

        .toast__icon {
          width: boxValue(100);
          height: boxValue(100);

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      
    }
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
