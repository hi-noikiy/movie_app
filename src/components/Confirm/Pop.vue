<template>
  <transition name='fade'>
    <div id="pop" v-if="show" >
      <div class="pop">
        <div class="pop__titile">
          <span>签到规则</span>
          <span class="close" @click="cancel"></span>
        </div>
        <div class="pop__content">
          一．积分规则
          <br/>
          1.长期积分
          <br/>
          （1）签到积分：签到第一天积10分，第二天20分...第七天70分（7天为一个周期），连续签到一周额外赠送100分，中断后重新累计；（合计每周380分）
          （2）成功邀请好友注册玩游戏积100分/人；
          （3）连续一周霸屏（20人以上好友积分排行榜前三）获200积分；
          （4）通过平台成功约影并晒票根，每次可积200分,每月约影前2次计积分，第3次开始不计积分，约影次数不限；
          <br/>
          2.一次性积分
          <br/>
          （1）100%完善个人资料积88分；
          （2）会员生日当天获500积分；
          （3）新手礼包：新用户注册赠送200积分。
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
  @import '../../scss/mixin.scss';

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

    .pop {
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
