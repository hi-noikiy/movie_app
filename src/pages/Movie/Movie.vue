<template>
  <div id="movie">
    <div class="movie__detail">
      <div class="movie__detail__swiper">
        <img src="../../assets/movie_big.png" alt="">
      </div>
      <div class="movie__detail__info">
        <div class="info__name">雷神3：诸神黄昏</div>
        <div class="info__rate">
          <span class="info__rate__num"></span>
          <span class="info__rate__comment">5128人评论</span>
        </div>
        <div class="info__intro">
          测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册测试测查手册
        </div>
      </div>
    </div>

    <div class="movie__comment">
      <div class="movie__comment__tab">
        <div class="tab__title">影评</div>
        <div class="tab__list">
          <div class="tab active">全部</div>
          <div class="tab">好评22088</div>
          <div class="tab">中评1325</div>
          <div class="tab">差评737</div>
          <div class="tab">图片2712</div>
        </div>
      </div>

      <div class="movie__comment__list">
        <div class="comment">
          <div class="comment__userInfo">
            <div class="userInfo__left">
              
            </div>
            <div class="userInfo__type"></div>
          </div>
          <div class="comment__detail" @click="linkTo('Comment')">
            <List></List>
            <List></List>
          </div>
        </div>
      </div>
    </div>

    <div class="comment__button" @click="linkTo('AddComment')">
      <span class="publish"></span><span class="text">我想说两句</span>
    </div>
  </div>
</template>

<script>
  import { Rater } from 'vux'
  import List from '@/components/List/List'

  export default {
    data() {
      return {
        rate: 4
      }
    },
    methods: {
      test() {
        console.log(1)
      }
    },
    components: {
      Rater,
      List
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';

#movie {
  height: 100%;
  background: #f5f5f5;

  .movie__detail {
    background: #fff;

    .movie__detail__swiper {
      height: boxValue(358);
      width: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .movie__detail__info {
      padding: boxValue(26);

      .info__name {
        font-size: boxValue(32);
        font-weight: 600;
      }

      .info__intro {
        color: #333;
      }

      .info__rate {
        margin: boxValue(10) 0;
        height: 24px;
        line-height: 24px;
        overflow: hidden;

        .info__rate__num {
          display: inline-block;
          width: 83px;
          height: 15px;
          background: url('../../assets/rates.png');
          vertical-align: middle;
        }

        .info__rate__comment {
          display: inline-block;
          padding-top: boxValue(4);
          margin-left: boxValue(10);
          font-size: boxValue(26);
          color: #faaf00;
          vertical-align: middle;
        }
      }
    }
  }

  .movie__comment {
    margin-top: boxValue(15);
    margin-bottom: boxValue(100);
    background: #fff;

    .movie__comment__tab {
      padding: boxValue(30);

      .tab__title {
        font-size: boxValue(28);
        font-weight: 600;
      }

      .tab__list {
        font-size: 0;

        .tab {
          display: inline-block;
          padding: boxValue(6) boxValue(20);
          margin-top: boxValue(20);
          margin-right: boxValue(16);
          font-size: boxValue(24);
          color: #666;
          background: #f6f6f6;
          border-radius: boxValue(20);
        }

        .tab.active {
          color: #fff;
          background: #27adff;
        }
      }
    }
  }

  .comment__button {
    position: fixed;
    bottom: 0;
    left: 0;
    height: boxValue(80);
    width: 100%;
    line-height: boxValue(80);
    font-size: boxValue(24);
    color: #bfbfbf;
    text-align: center;
    background: #fff;
    box-shadow: -1px 0px 3px #e2d9d9;

    .publish {
      display: inline-block;
      margin-right: boxValue(20);
      width: boxValue(31);
      height: boxValue(30);
      background: url('../../assets/publish.png');
      background-size: cover;
      background-position: center center;
      vertical-align: middle;
    }

    .text {
      vertical-align: middle;
    }
  }
}
</style>



