<template>
  <div class="item__wrap">
    <div class="item" v-for="(item, index) in couponList" :key="index" @click="linkToUrl('goods?id=' + item.id)">
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
    </div>
  </div>
</template>

<script>
  export default {
    props: ['couponList']
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
  }
</style>
