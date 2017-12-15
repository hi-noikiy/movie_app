<template>
  <div id="sign">
    <div class="sign__date clearfix">
      <div class="date__head">
        <div class="date__wrap">
          <span class="date">日</span>
        </div>
        <div class="date__wrap">
          <span class="date">一</span>
        </div>
        <div class="date__wrap">
          <span class="date">二</span>
        </div>
        <div class="date__wrap">
          <span class="date">三</span>
        </div>
        <div class="date__wrap">
          <span class="date">四</span>
        </div>
        <div class="date__wrap">
          <span class="date">五</span>
        </div>
        <div class="date__wrap">
          <span class="date">六</span>
        </div>
      </div>
      <div class="date__list">
        <div class="date__wrap" v-for="(date,index) in dateList" :key="index">
          <span class="date" :class="{'signed': date.sign, 'passed': date.passed}">{{date.value}}</span>
        </div>
      </div>
    </div>

    <div class="sign__btn" @click="signIn">
      <span>签到</span>
    </div>

    <div class="sign__intro">
      <span class="intro">签到规则</span>
      <span class="intro">分享给好友</span>
    </div>

    <div class="sign__recommend">
      <Recommend />
    </div>
  </div>
</template>

<script>
  import Recommend from '@/components/Recommend/Recommend'
  export default {
    data() {
      return {
        dateList: []
      }
    },

    created() {
      let now = new Date();
      let monthFirst = new Date(now.getFullYear(), parseInt(now.getMonth()), 1).getDay();
      let monthEnd = new Date(now.getFullYear(), parseInt(now.getMonth()) + 1, 0).getDate();
      let nowaday = now.getDate();
      let dayCount = 1;
      for(let i = 0; i < 42; i++ ) {
        if( i >= monthFirst && i<=  (monthEnd + monthFirst - 1)) {
          this.dateList.push({
            value: dayCount++,
            sign: i == 15? true:false,
            passed: i <= (nowaday + monthFirst - 1)? true : false
          })
        }else {
          this.dateList.push({
            value: null
          })
        }
      }
    },

    methods: {
      signIn() {
        this.$confirm('(第一次) 签到1天赠送10积分/签到连续2天签到赠送20积分，明天连续签到送30积分哦！')
      }
    },

    components: {
      Recommend
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #sign {
    .sign__date {
      padding: 0 boxValue(20);
      background: #404244;
      color: #fff;

      .date__wrap {
        float: left;
        padding: boxValue(16) 0;
        width: 14.28%;
        text-align: center;
        font-size: 0;

        .date {
          display: inline-block;
          font-size: boxValue(26);
          height: boxValue(54);
          line-height: boxValue(54);
          width: boxValue(54);
          color: #9a9c9c;
        }

        .date.signed {
          background: #eab358;
          border-radius: 50%;
          color: #404244;
        } 

        .date.passed {
          color: #fff;
        }
      }
    }

    .sign__btn {
      margin: boxValue(20) auto;
      width: boxValue(578);
      height: boxValue(68);
      line-height: boxValue(68);
      font-size: boxValue(26);
      text-align: center;
      color: #fff;
      border-radius: boxValue(34);
      background: #02a9ff;
    }

    .sign__intro {
      padding-top: boxValue(12);
      text-align: center;

      .intro {
        font-size: boxValue(24);
        padding: 0 boxValue(20);
      }
    }
  }
</style>

