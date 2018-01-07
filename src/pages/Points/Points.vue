<template>
  <div id="points">
    <div class="points__header">
      <div class="points__header__left">
        <div class="left__img">
          <img :src="$ImgUrl + userDetail.imagePath" alt="">
        </div>
        <div class="left__info">
          <div class="info__name">{{userDetail.nickname}}</div>
          <div class="info__points">
            <span>{{userDetail.totalIntegral}}积分</span>
            <span @click="linkTo('Stream')">积分记录 ></span>
          </div>
        </div>
      </div>
      <div class="points__header__right">
        <div>大众会员</div>
      </div>
    </div>
    <div class="points__recommend">
      <div class="recommend__title">推荐卡卷</div>
      
      <div class="recommend__list clearfix">
        <div class="recommend" v-for="(item, index) in coupons" :key="index" @click="linkToUrl('goods?id=' + item.id)">
          <div class="recommend__img">
            <img :src="$ImgUrl + item.imagePath" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">{{item.name}}</div>
            <div class="info__price">{{item.integral}}积分</div>
          </div>
        </div>

        <!-- <div class="recommend">
          <div class="recommend__img">
            <img src="../../assets/shop.png" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">iPhoneX 64ssss</div>
            <div class="info__price">2500积分+1000元</div>
          </div>
        </div>

        <div class="recommend">
          <div class="recommend__img">
            <img src="../../assets/shop.png" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">iPhoneX 64ssss</div>
            <div class="info__price">2500积分+1000元</div>
          </div>
        </div>

        <div class="recommend">
          <div class="recommend__img">
            <img src="../../assets/shop.png" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">iPhoneX 64ssss</div>
            <div class="info__price">2500积分+1000元</div>
          </div>
        </div>

        <div class="recommend">
          <div class="recommend__img">
            <img src="../../assets/shop.png" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">iPhoneX 64ssss</div>
            <div class="info__price">2500积分+1000元</div>
          </div>
        </div>

        <div class="recommend">
          <div class="recommend__img">
            <img src="../../assets/shop.png" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">iPhoneX 64ssss</div>
            <div class="info__price">2500积分+1000元</div>
          </div>
        </div>

        <div class="recommend">
          <div class="recommend__img">
            <img src="../../assets/shop.png" alt="">
          </div>
          <div class="recommend__info">
            <div class="info__name">iPhoneX 64ssss</div>
            <div class="info__price">2500积分+1000元</div>
          </div>
        </div> -->
      </div>
    </div>

    <div class="points__btn">
      <span>如何获得积分</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        coupons: [],
        userDetail: {}
      }
    },

    created() {
      let result = this.getUserStorage();
      if(result) {
        this.userDetail = result;
      }
      this.getCouponList();
    },

    methods: {
      getCouponList() {
        let param = {
          a: 2,
          li: 16, 
          isRecommend: 1
        }
        this.$Api.getCouponList(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.coupons = res.q.coupons;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #points {
    position: relative;

    .points__header {
      position: relative;
      height: boxValue(220);
      width: 100%;
      background: #0c3044;

      .points__header__left {
        padding: boxValue(71);
        height: boxValue(78);
        font-size: 0;

        .left__img {
          display: inline-block;
          margin-right: boxValue(16);
          width: boxValue(78);
          height: boxValue(78);
          line-height: boxValue(78);

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: middle;
          }
        }

        .left__info {
          display: inline-block;
          color: #fff;
          vertical-align: middle;

          .info__name {
            padding-bottom: boxValue(15);
            font-size: boxValue(26);
            font-weight: 600;
          }

          .info__points {
            font-size: boxValue(20);
          }
        }
      }

      .points__header__right {
        position: absolute;
        right: boxValue(30);
        top: boxValue(120);
        color: #42dfd9;
      }
    }

    .points__recommend {
      margin-top: boxValue(20);
      margin-bottom: boxValue(100);
      padding-bottom: boxValue(20);
      background: #fff;

      .recommend__title {
        position: relative;
        padding-left: boxValue(30);
        height: boxValue(78);
        line-height: boxValue(78);
        font-size: boxValue(26);
        font-weight: 600;
        color: #222;
        overflow: hidden;

        &:after {
          content: '';
          position: absolute;
          left: boxValue(30);
          bottom: 0;
          width: 100%;
          border-bottom: 1px solid #eee;
        }
      }

      .recommend__list {
        .recommend {
          float: left;
          margin-top: boxValue(20);
          width: 33.3%;

          .recommend__img {
            margin: 0 auto;
            height: boxValue(172);
            width: boxValue(172);

            img {
              width: 100%;
              height: 100%;
            }
          }

          .recommend__info {
            margin: 0 auto;
            width: boxValue(186);
            height: auto;

            .info__name {
              width: boxValue(186);
              padding: boxValue(16) 0;
              font-size: boxValue(24);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .info__price {
              width: boxValue(186);
              font-size: boxValue(20);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #ff4444;
            }
          }
        }
      }
    }

    .points__btn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: boxValue(78);
      line-height: boxValue(78);
      font-size: boxValue(26);
      text-align: center;
      background: #02a9ff;
      color: #fff;
    }
  }
</style>

