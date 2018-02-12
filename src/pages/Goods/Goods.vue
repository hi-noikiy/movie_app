<template>
  <div id="goods">
    <div class="goods__top">
      <div class="goods__top__swiper">
        <img :src="$ImgUrl + coupon.imagePath" alt="">
      </div>
      <div class="goods__top__info">
        <div class="top__info__title">
          {{coupon.name}}
        </div>
        <div class="top__info__price"  v-if="coupon.type == 2">
          <span class="top__price__num">{{parseFloat(coupon.integral)}}</span>
          <!-- <span>积分+ 199元</span> -->
          <span>积分</span>
        </div>
        <div class="top__info__price"  v-if="coupon.type == 3">
          <span class="top__price__num">面值{{parseFloat(coupon.price)}}</span>
          <!-- <span>积分+ 199元</span> -->
          <span>元</span>
        </div>
        <div class="top__info__price"  v-if="coupon.type == 4">
          <span class="top__price__num">{{parseFloat(coupon.integral)}}</span>
          <span>积分+ {{parseFloat(coupon.price)}}元</span>
        </div>
        <div class="top__info__mes">
          <span class="mes__detail" v-if="coupon.type == 2 || coupon.type == 4 ">市场参考值：{{parseFloat(coupon.marketPrice)}}元</span>
          <span class="mes__date">有效期至{{coupon.deadline}}</span>
        </div>
      </div>
    </div>

    <div class="goods__detail">
      <div class="detail">
        <span>卡券类型:</span>
        <span v-if="coupon.type == 1">现金券</span>
        <span v-if="coupon.type == 2">积分券</span>
        <span v-if="coupon.type == 3">代金券</span>
        <span v-if="coupon.type == 4">积分+现金券</span>
      </div>
      <div class="detail">
        <span>行业:</span>
        <span>{{industryText}}</span>
      </div>
      <div class="detail">
        <span>限制兑换:</span>
        <span>{{coupon.limit == 0?'不限': coupon.limit + '人/张'}}</span>
      </div>
      <div class="detail">
        <span>适用等级:</span>
        <span>{{this.levelText}}</span>
      </div>
    </div>


    <div class="goods__intro">
      <div class="intro">
        <div class="intro__title border_line">
          适用门店
        </div>
        <div class="intro__content">
          <Merchant :cinema ="cinema"/>
        </div>
        <div class="intro__more" @click="linkTo('Merchants')">
          <span>查看全部{{cinemaList.length}}家门店</span>
          <i class="arrow"></i>
        </div>
      </div>

      <div class="intro">
        <div class="intro__title border_line">
          门店说明
        </div>
        <div class="intro__text" :class="{'limit':!showShop, 'no__limit': showShop}">
          <p>{{coupon.shopInstruction}}</p>
        </div>
        <div class="arrow__control" @click="transition('shop')">
          <span class="arrow" :class="{'up': showShop}"></span>
        </div>
      </div>

      <div class="intro">
        <div class="intro__title border_line">
          使用说明
        </div>
        <div class="intro__text" :class="{'limit':!showUse, 'no__limit': showUse}">
          <p>{{coupon.useInstruction}}</p>
        </div>
        <div class="arrow__control" @click="transition('use')">
          <span class="arrow" :class="{'up': showUse}"></span>
        </div>
      </div>
    </div>

    <div class="goods__info">
      <div class="goods__info__title">
        <span>图文详情</span>
      </div>
      <div class="goods__info__detail" v-html="coupon.content">
      </div>
    </div>

    <div class="edit__btn" v-if="val">
      <span class="btn collected" @click="linkToTel('020-31525503')">平台电话</span>
      <span class="btn sure" @click.stop="linkToUrl('code?val='+val+'&code='+code)">立即使用</span>
    </div>
    <div class="edit__btn" v-else>
      <span class="btn" v-if="coupon.isCollected == 1" @click="CouponSwitch">已关注</span>
      <span class="btn collected" v-else @click="CouponSwitch">关注</span>
      <span class="btn sure" @click="submitPoints" v-if="coupon.type == 2">立即兑换</span>
      <span class="btn sure" @click="submit" v-else>立即领取</span>
    </div>
  </div>
</template>

<script>
  import Merchant from '@/components/Merchant/Merchant';
  import {industryType} from '@/data/data';

  export default {
    data() {
      return {
        coupon: {},
        id: this.$route.query.id,
        showShop: false,
        showUse: false,
        cinema: {},
        cinemaList: [],
        val: this.$route.query.val,
        code: this.$route.query.code,
      }
    },
    created() {
      this.getCouponDetails(this.id);
    },

    computed: {
      levelText() {
        let levels = this.coupon.levels;
        let str = [];
        if(levels) {
          if(levels.length == 0) {
            return '不限';
          }else {
            for(let i in levels) {
              if(levels[i] == '1') {
                str.push('普通会员')
              }else if(levels[i] == '2') {
                str.push('黄金会员') 
              }else if(levels[i] == '3') {
                str.push('铂金会员') 
              }else if(levels[i] == '4') {
                str.push('钻石会员') 
              }else if(levels[i] == '5') {
                str.push('至尊会员') 
              }
            }

            return str.join(',');
          } 
        }
      },

      industryText() {
        let result = '';
        if(this.coupon.industryId && this.coupon.industryId == '0') {
          return '全部';
        }
        if(this.coupon.industryId) {
          let data = industryType.find((item) => {
            return item.key == this.coupon.industryId
          })
          
          result = data.value;
        }
        return result;
      }
    },

    methods: {
      getCouponDetails(id) {
        this.$Api.getCouponDetails(id).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.coupon = res.q.coupon;
            // if(this.coupon.shops.length == 0) {
            //   this.getCinemaList();
            //   return false;
            // }
            this.cinemaList = this.coupon.shops;
            this.cinema = this.coupon.shops[0];
            let json = JSON.stringify(this.cinemaList);
            sessionStorage.setItem('cinemaList', json);
          }
        })
      },

      //关注
      CouponSwitch() {
        let open;
        let isCollected = this.coupon.isCollected == 1?true: false;
        if(isCollected) {
          open = 2;
        }else {
          open = 1;
        }

        this.$Api.CouponSwitch(this.id, open).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('操作成功');
            if(isCollected) {
              this.coupon.isCollected = 2;
            }else {
              this.coupon.isCollected = 1;
            }
          }
        })
      },

      transition(type) {
        if(type == 'shop') {
          this.showShop = !this.showShop;
        }else {
          this.showUse = !this.showUse;
        }
      },

      //打电话
      linkToTel(link) {
        window.location.href='tel:' + link
      },

      // getCinemaList() {
      //   this.$Api.getCinemaList().then((res) => {
      //     console.log(res)
      //     if(res.q.s == 0) {
      //       this.cinemaList = res.q.cinemas;
      //       this.cinema = res.q.cinemas[0];
      //       let json = JSON.stringify(this.cinemaList);
      //       sessionStorage.setItem('cinemaList', json);
      //     }
      //   })
      // },

      submit() {
        // this.$toast('抱歉正在开发中', 'fail');
        // return false;
        let param = {
          a: 1,
          couponId: this.id,
          transferWay: 1
        }
        this.$Api.OrderSubmit(param).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$toast('领取成功!')
            this.updateUserDetail();
          }else {
            this.$toast(res.q.d, 'fail')
          }
        })
      },

      //需要积分兑换的
      submitPoints() {
        let sub = parseInt(this.userDetail.canUseIntegral) - parseInt(this.coupon.integral);
        if(sub < 0) {
          this.$toast('积分不够!', 'fail');
          return false;
        }
        this.$confirm('兑换将消耗'+ this.coupon.integral +'积分，兑换后剩余'+ sub +'积分，是否继续兑换', '', 'info').then((res) => {
          if(res == 'sure') {
            this.submit();
          }
        });
      }
    },
    components: {
      Merchant
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #goods {
    position: relative;
    .goods__top {
      background: #fff;

      .goods__top__swiper {
        width: 100%;
        height: boxValue(640);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .goods__top__info {
        position: relative;
        padding: boxValue(20) boxValue(20) boxValue(12) boxValue(20);

        .top__info__title {
          padding: boxValue(12) 0 boxValue(4) 0;
          font-size: boxValue(30);
          font-weight: 600;
        }

        .top__info__price {
          padding: boxValue(12) 0;
          color: #ff242e;

          .top__price__num {
            font-size: boxValue(30);
            font-weight: 600;
          }

          span {
            color: #ff242e;
          }
        }

        .top__info__mes {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .mes__date {
            color: #ff242e;
          }

          .mes__detail {
            color: #999;
          }
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(20);
          width: boxValue(620);
          border-bottom: 1px solid #eee;
        }
      }
    }

    .goods__detail {
      padding: 0 boxValue(20);
      background: #fff;

      .detail {
        height: boxValue(50);
        line-height: boxValue(50);
        font-size: boxValue(20);
        
        span {
          color: #999;
        }
      }
    }

    .goods__intro {
      margin-top: boxValue(20);

      .intro {
        background: #fff;
        margin-bottom: boxValue(20);

        .intro__title {
          padding-left: boxValue(20);
          height: boxValue(72);
          line-height: boxValue(72);
          font-size: boxValue(30);
          font-weight: 600;
        }

        .intro__more {
          display: flex;
          position: relative;
          padding-left: boxValue(20);
          height: boxValue(72);
          line-height: boxValue(72);
          font-size: boxValue(30);

          span {
            color: #2bc4f3;
          }

          .arrow {
            position: absolute;
            right: boxValue(32);
            top: boxValue(22.5);
            display: inline-block;
            width: boxValue(16);
            height: boxValue(29);
            background: url('../../assets/arrow_enter.png');
            background-size: cover;
            vertical-align: middle;
          }
        }

        .intro__text {
          padding: boxValue(20) boxValue(20) boxValue(0) boxValue(20);
          color: #999;

          p {
            padding: 0;
            margin: 0;
            color: #999;
          }
        }
      }
    }

    .goods__info {
      .goods__info__title {
        height: boxValue(74);
        line-height: boxValue(74);
        text-align: center;
        background: #fff;

        span {
          color: #2bc4f3;
        }
      }

      .goods__info__detail {
        padding: boxValue(20);
        background: #fff;

        img {
          max-width: 100%;
        }
      }
    }

    .edit__btn {
      position: fixed;
      bottom: -1px;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: boxValue(72);
      width: 100%;
      line-height: boxValue(72);
      font-size: boxValue(28);
      border-top: 1px solid #eee;

      .btn {
        flex: 1;
        text-align: center;
        background: #fff;
        color: #999;

        &.collected {
          color: #27adff;
        }
      }

      .btn.sure {
        color: #fff;
        background: #27adff;
      }
    }
  }
</style>
