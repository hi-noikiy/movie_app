<template>
  <div id="collect">
    <div class="collect__list">
      <div class="collection" v-for="(item, index) in coupons" :key="index">
        <div class="collection__left">
          <img :src="$ImgUrl + item.imagePath" alt="">
        </div>
        <div class="collection__right">
          <div class="right__title">
            {{item.name}}
          </div>
          <div class="right__price" v-if="item.type == 1">
            <span>面值</span>
            <span class="price__num">50</span>
            <span>元</span>
          </div>
          <div class="right__price" v-if="item.type == 2 ||item.type == 4">
            <span>所需积分</span>
            <span class="price__num">{{item.integral}}</span>
            <div class="market">市场价{{item.marketPrice}}</div>
          </div>
        </div>
        <div class="collection__btn" @click="CouponSwitch(item.id)">
          取消关注
        </div>
        <div class="collection__date" v-if="false">
          已过期
        </div>
      </div>

      <!-- <div class="collection">
        <div class="collection__left">
          <img src="../../assets/shop.png" alt="">
        </div>
        <div class="collection__right">
          <div class="right__title">
            Apple iPhone X 64GB 深空灰 移动联通电信4G手机
          </div>
          <div class="right__price">
            <span>面值</span>
            <span class="price__num">50</span>
            <span>元</span>
          </div>
        </div>
        <div class="collection__btn">
          取消关注
        </div>
        <div class="collection__date">
          已过期
        </div>
      </div> -->
    </div>
  </div>  
</template>

<script>
  export default {
    data() {
      return {
        coupons: []
      }
    },

    created() {
      this.getCouponList();
    },

    methods: {
      getCouponList() {
        this.$Api.getCouponList({a:3}).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.coupons = res.q.coupons;
          }
        })
      },

      //取消关注
      CouponSwitch(id) {
        this.$Api.CouponSwitch(id,2).then((res) => {
          if(res.q.s == 0) {
            this.$toast('取消成功！');
            this.getCouponList();
          }
        })
      }
    }
  }  
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #collect {
    margin-top: boxValue(20);

    .collect__list {
      background: #fff;
      padding-left: boxValue(30);
      overflow: hidden;

      .collection {
        position: relative;
        height: boxValue(150);
        padding-top: boxValue(20);
        padding-bottom: boxValue(20); 

        .collection__left {
          float: left;
          margin-right: boxValue(10);
          line-height: boxValue(150);

          img {
            width: boxValue(140);
            height: boxValue(140);
            vertical-align: middle;
          }
        }

        .collection__right {
          float: left;
          .right__title {
            font-size: boxValue(26);
            width: boxValue(330);
            font-weight: 600;
            color: #222;
          }

          .right__price {
            padding-top: boxValue(10);
            font-size: boxValue(22);
            color: #ff4444;

            .price__num {
              font-size: boxValue(34);
              font-weight: 600;
            }

            .market {
              margin-top: boxValue(10);
              color: #999;
            }
          }
        }

        .collection__btn {
          position: absolute;
          right: boxValue(30);
          bottom: boxValue(20);
          padding: boxValue(10) boxValue(24);
          color: #fff;
          font-size: boxValue(22);
          background: #7695a5;
          border-radius: boxValue(24);
        }

        .collection__date {
          position: absolute;
          right: boxValue(30);
          top: boxValue(20);
          width: boxValue(74);
          height: boxValue(74);
          line-height: boxValue(74);
          font-size: boxValue(20);
          color: #fff;
          background: #a7a7a7;
          transform: rotate(-15deg);
          border-radius: 50%;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          border: 1px solid #eee;
        }
      }
    }
  }
</style>
