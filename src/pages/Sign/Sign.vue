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
          <span class="date" :class="{'signed': date.signed, 'passed': date.passed}">{{date.value}}</span>
        </div>
      </div>
    </div>

    <div class="sign__btn" :class="{'btn_unactive': userDetail.isSign == 1}" @click="signIn">
      <span v-if="userDetail.isSign == 2">签到</span>
      <span v-else>已签到</span>
    </div>

    <div class="sign__intro">
      <span class="intro" @click="showDetail">签到规则</span>
      <span class="intro" @click="share">分享给好友</span>
    </div>

    <div class="sign__recommend">
      <Recommend :couponList="couponList"/>
    </div>
  </div>
</template>

<script>
  import Recommend from '@/components/Recommend/Recommend'
  export default {
    data() {
      return {
        dateList: [],
        monthFirst: 0,
        couponList: []
      }
    },

    created() {
      this.initDate().then(() => {
        // this.getUserDetail();
        this.utilUserDetail().then((res) => {
          console.log(res)
          console.log(this.userDetail)
          this.signDate();
        })
      })
      this.getCouponList();
    },

    methods: {
      signIn() {
        if(this.userDetail.isSign == 1) {
          this.$toast('已经签到', 'fail');
          return false;
        }
        this.$Api.HeartbeatAction().then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$confirm('(第一次) 签到1天赠送10积分/签到连续2天签到赠送20积分，明天连续签到送30积分哦！')
            let now = new Date();
            let day = now.getDate();
            let index = day + parseInt(this.monthFirst) - 1;
            this.dateList[index].signed = true;
            let obj = this.dateList[index];
            this.dateList.splice(index, 1, obj);
            //更新资料
            // this.getUserDetail();
            this.updateUserDetail();
          }else {
            this.$toast(res.q.d, 'fail');
          }
        })
      },

      //获取用户信息
      signDate() {
        let signDays = this.userDetail.signDays;
        if(signDays.length > 0) {
          for(let i in signDays) {
            let index = parseInt(signDays[i]) + parseInt(this.monthFirst) - 1;
            this.dateList[index].signed = true;
            let obj = this.dateList[index];
            this.dateList.splice(index, 1, obj);
          }
        }
      },

      //显示签到规则
      showDetail() {
        this.$pop()
      },

      share() {
        this.$toast('抱歉功能开发中', 'fail');
      },

      //获取推荐卡券
      getCouponList() {
        let param = {
          a: 2,
          li: 16, 
          isRecommend: 1
        }
        this.$Api.getCouponList(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.couponList = res.q.coupons;
          }
        })
      },

      initDate() {
        return new Promise((resolve, reject) => {
          let now = new Date();
          let monthFirst = new Date(now.getFullYear(), parseInt(now.getMonth()), 1).getDay();
          let monthEnd = new Date(now.getFullYear(), parseInt(now.getMonth()) + 1, 0).getDate();
          let nowaday = now.getDate();
          let dayCount = 1;
          console.log(monthFirst)
          this.monthFirst = monthFirst;

          for(let i = 0; i < 42; i++ ) {
            console.log('1')
            if( i >= monthFirst && i<=  (monthEnd + monthFirst - 1)) {
              this.dateList.push({
                value: dayCount++,
                // sign: i == 2? true:false,
                passed: i <= (nowaday + monthFirst - 1)? true : false
              })
            }else {
              this.dateList.push({
                value: null
              })
            }
          }

          resolve()
        })
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

