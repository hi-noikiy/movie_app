<template>
  <div class="points__recommend">
    <div class="recommend__title">推荐卡券</div>
    
    <div class="recommend__list clearfix">
      <div class="recommend" v-for="(item, index) in couponList" :key="index" @click="linkToUrl('goods?id=' + item.id)">
        <div class="recommend__img">
          <img :src="$ImgUrl + item.imagePath" alt="">
        </div>
        <div class="recommend__info">
          <div class="info__name">{{item.name}}</div>
          <div class="info__price">{{item.integral}}积分</div>
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
</style>

