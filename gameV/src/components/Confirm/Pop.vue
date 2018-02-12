<template>
  <transition name='fade'>
    <div id="pop" v-if="show" >
      <div class="pop">
        <div class="pop__titile">
          <span>游戏规则</span>
          <span class="close" @click="cancel"></span>
        </div>
        <div class="pop__content">
          (1)同一用户活动期间每天可免费抽奖一次，分享可再次抽奖，两次机会用完后，每支付100积分可继续抽奖一次；
          <br />
          (2)同一账号、手机号、设备号、支付账户均视为同一用户；
          <br />
          (3)若出现违背上述活动规则、恶意作弊等非正常方式骗取奖品的行为，云影汇有权取消奖品，回收您的所得特权，同时取消您的活动参与资格。
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
        show: true,
        type: 'success',
        title: '签到成功'
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

  #pop {
    position: fixed;
    display: flex;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.3);
    z-index: 9999;

    .pop {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: boxValue(0) boxValue(24);
      width: boxValue(492);
      height: auto;
      background: #fff;
      border-radius: 5px;

      .pop__titile {
        position: relative;
        height: boxValue(80);
        font-size: boxValue(32);
        font-weight: 600;
        text-align: center;
        line-height: boxValue(80);

        .close {
          position: absolute;
          right: boxValue(0);
          top: boxValue(15);
          display: inline-block;
          width: boxValue(50);
          height: boxValue(50);
          background-image: url('../../assets/imgdelete.png');
          background-size: 100%;
        }
      }
      
      .pop__content {
        padding-bottom: boxValue(24);
        line-height: boxValue(40);
        font-size: boxValue(24);
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
