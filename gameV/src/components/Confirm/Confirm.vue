<template>
  <transition name='fade'>
    <div id="confirm" v-if="show" >
      <div class="toast">
        <div class="toast__top">
          <div class="toast__icon" v-if="type == 'success'">
            <img src="../../assets/succeed.png" alt="">
          </div>
          <div class="toast__icon" v-if="type == 'fail'">
            <img src="../../assets/fail.png" alt="">
          </div>
          <div class="toast__icon" v-if="type == 'gift'">
            <img :src="giftImg" alt="">
          </div>
          <div class="toast__title">
            {{title}}
          </div>
        </div>
        <div class="toast__content" v-if="content">
          {{content}}
        </div>
        <div class="toast__btn">
          <span class="btnon sure" @click="sure">确定</span>
          <span class="btnon cancel" @click="cancel">取消</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        content: '',
        show: false,
        type: 'success',
        title: '签到成功',
        giftImg: ''
      }
    },
    
    methods: {
      sure() {
        this.show = false;
        console.log('确定')
      },

      cancel() {
        this.show = false;
        console.log('取消')
      }
    }
  }
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }

  #confirm {
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
      padding: boxValue(0) boxValue(24);
      width: boxValue(492);
      height: auto;
      background: #fff;
      border-radius: 5px;
      z-index: 9999;

      .toast__btn {
        display: flex;
        height: boxValue(110);
        align-items: center;
        justify-content: space-around;

        .btnon {
          width: boxValue(230);
          height: boxValue(70);
          line-height: boxValue(70);
          text-align: center;
          background: #eaeef1;
          border-radius: boxValue(30);
          color: #333;
        }

        .btnon.sure {
          background: #02a9ff;
          color: #fff;
        }
      }

      .toast__content {
        padding: boxValue(4) boxValue(10);
        padding-top: boxValue(24);
        font-size: boxValue(24);
        line-height: boxValue(34);
        color: #333;
      }

      .toast__top {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: boxValue(50);

        .toast__icon {
          width: boxValue(94);
          height: boxValue(94);
          padding-bottom: boxValue(22);

          img {
            width: 100%;
            height: 100%;
          }
        }

        .toast__title {
          padding-top: boxValue(0);
          font-size: boxValue(32);
          font-weight: 600;
        }
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
