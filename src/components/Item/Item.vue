<template>
  <div class="item__wrap">
    <div class="item" v-for="(item, index) in couponList" :key="index" @click.self="linkToUrl('goods?id=' + item.id)" v-if="couponList">
      <div class="item__left">
        <img :src="$ImgUrl + item.imagePath" alt="">
      </div>
      <div class="item__right">
        <div class="right__title">
          {{item.name}}
        </div>
        <div class="right__price">
          <span>面值</span>
          <span class="price__num">{{item.price}}</span>
          <span>元</span>
        </div>
        <div class="right__date" v-if="false">
          <span>核销时间</span>
          <span>2017.12.11 13:22</span>
        </div>
      </div>
      <div class="collection__btn active" @click="submit(item.id)">
        领取
      </div>
    </div>
    
    <div class="item" v-for="(item, index) in orderList" :key="index" v-if="orderList">
      <div class="item__left">
        <img :src="$ImgUrl + item.imagePath" alt="">
      </div>
      <div class="item__right">
        <div class="right__title">
          {{item.name}}
        </div>
        <div class="right__price">
          <span>面值</span>
          <span class="price__num">{{item.price}}</span>
          <span>元</span>
        </div>
        <div class="right__date">
          <span>核销时间</span>
          <span>{{item.useTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['couponList','orderList'],
    methods: {
      submit(id) {
        this.$load(1, '领取中');
        // this.$toast('抱歉正在开发中', 'fail');
        // return false;
        let param = {
          a: 1,
          couponId: id,
          transferWay: 1
        }
        this.$Api.OrderSubmit(param).then((res) => {
          if(res.q.s == 0) {
            
            this.$toast('领取成功!');
            this.updateUserDetail();
          }else {
            this.$toast(res.q.d, 'fail')
          }
          this.$load(2);
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .item {
    position: relative;
    height: boxValue(150);
    padding-top: boxValue(20);
    padding-bottom: boxValue(20);
    background: #fff;
    overflow: hidden;

    .item__left {
      float: left;
      padding-left: boxValue(20);
      margin-right: boxValue(10);
      line-height: boxValue(150);

      img {
        width: boxValue(140);
        height: boxValue(140);
        vertical-align: middle;
      }
    }

    .item__right {
      float: left;
      .right__title {
        font-size: boxValue(26);
        width: boxValue(440);
        font-weight: 600;
        color: #222;
      }

      .right__price {
        padding-top: boxValue(10);
        font-size: boxValue(22);
        color: #ff4444;

        span {
          color: #ff4444;
        }

        .price__num {
          font-size: boxValue(34);
          font-weight: 600;
        }
      }
    }

    .right__date {
      padding-top: boxValue(8);
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: boxValue(20);
      width: 100%;
      border-bottom: 1px solid #eee;
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

    .collection__btn.active {
      background: #02a9ff;
    }
  }
</style>
