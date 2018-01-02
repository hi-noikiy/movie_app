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
        <div class="top__info__price">
          <span class="top__price__num">{{coupon.price}}</span>
          <!-- <span>积分+ 199元</span> -->
          <span>元</span>
        </div>
        <div class="top__info__mes">
          <span class="mes__detail" v-if="coupon.type == 2 || coupon.type == 4 ">市场参考值：599元</span>
          <span class="mes__date">有效期至{{coupon.deadline}}</span>
        </div>
      </div>
    </div>

    <div class="goods__detail">
      <div class="detail">
        <span>卡卷类型:</span>
        <span v-if="coupon.type == 1">现金卷</span>
        <span v-if="coupon.type == 2">积分卷</span>
        <span v-if="coupon.type == 3">代金卷</span>
        <span v-if="coupon.type == 4">积分+现金卷</span>
      </div>
      <div class="detail">
        <span>行业:</span>
        <span>积分/积分+现金卷</span>
      </div>
      <div class="detail">
        <span>限制兑换:</span>
        <span>{{coupon.limit == 0?'不限': coupon.limit + '人/张'}}</span>
      </div>
      <div class="detail">
        <span>适用等级:</span>
        <span>{{coupon.levels == 1?'普通会员':'黄金会员'}}</span>
      </div>
    </div>


    <div class="goods__intro">
      <div class="intro">
        <div class="intro__title border_line">
          适用门店
        </div>
        <div class="intro__content">
          <Merchant />
        </div>
        <div class="intro__more" @click="linkTo('Merchants')">
          <span>查看全部8家门店</span>
          <i class="arrow"></i>
        </div>
      </div>

      <div class="intro">
        <div class="intro__title border_line">
          门店说明
        </div>
        <div class="intro__text">
          <p>{{coupon.shopInstruction}}</p>
        </div>
      </div>

      <div class="intro">
        <div class="intro__title border_line">
          使用说明
        </div>
        <div class="intro__text">
          <p>{{coupon.useInstruction}}</p>
        </div>
      </div>
    </div>

    <div class="goods__info">
      <div class="goods__info__title">
        <span>点击查看图文详情</span>
      </div>
      <div class="goods__info__detail" v-html="coupon.content">
      </div>
    </div>

    <div class="edit__btn">
      <span class="btn" v-if="coupon.isCollected == 1" @click="CouponSwitch">已关注</span>
      <span class="btn collected" v-else @click="CouponSwitch">关注</span>
      <span class="btn sure" @click="submit">立即领取</span>
    </div>
  </div>
</template>

<script>
  import Merchant from '@/components/Merchant/Merchant';

  export default {
    data() {
      return {
        coupon: {},
        id: this.$route.query.id
      }
    },
    created() {
      this.getCouponDetails(this.id);
    },
    methods: {
      getCouponDetails(id) {
        this.$Api.getCouponDetails(id).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.coupon = res.q.coupon;
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

      submit() {
        let param = {
          a: 1,
          couponId: this.id,
          transferWay: 1
        }
        this.$Api.OrderSubmit(param).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$toast('领取成功!')
          }
        })
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
          padding: boxValue(0) boxValue(20) boxValue(20) boxValue(20);
          color: #999;

          p {
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
      }
    }

    .edit__btn {
      position: fixed;
      bottom: 0;
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
