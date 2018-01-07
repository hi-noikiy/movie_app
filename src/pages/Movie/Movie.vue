<template>
  <div id="movie">
    <div class="movie__detail">
      <div class="movie__detail__swiper">
        <!-- <img src="../../assets/movie_big.png" alt=""> -->
        <!-- <img :src="$ImgUrl + movie.imagePath" alt="" v-if="movie"> -->
        <swiper :list="imgList" :aspect-ratio="320/350" dots-position="center"></swiper>
      </div>
      <div class="movie__detail__info">
        <div class="info__name" v-if="movie">{{movie.name}}</div>
        <div class="info__rate">
          <span class="info__rate__num" :class="rateType"></span>
          <span class="info__rate__comment">5128人评论</span>
        </div>
        <div class="info__intro" :class="{'limit':!showDetail, 'no__limit': showDetail}" v-if="movie">
          {{movie.content}}
        </div>
        <div class="arrow__control" @click="transition">
          <span class="arrow" :class="{'up':showDetail}"></span>
        </div>
      </div>
    </div>

    <div class="movie__comment">
      <div class="movie__comment__tab">
        <div class="tab__title">影评</div>
        <div class="tab__list" v-if="movie">
          <div class="tab" :class="{'active': activeIndex == 0}" @click="changeComment(0)">全部</div>
          <div class="tab" :class="{'active': activeIndex == 1}" @click="changeComment(1)">好评{{movie.statGoodsReview}}</div>
          <div class="tab" :class="{'active': activeIndex == 2}" @click="changeComment(2)">中评{{movie.statMiddleReview}}</div>
          <div class="tab" :class="{'active': activeIndex == 3}" @click="changeComment(3)">差评{{movie.statBadReview}}</div>
          <div class="tab" :class="{'active': activeIndex == 4}" @click="changeComment(4)">图片{{movie.statImageReview}}</div>
        </div>
      </div>

      <div class="movie__comment__list">
        <div class="comment">
          <div class="comment__userInfo">
            <div class="userInfo__left">
              
            </div>
            <div class="userInfo__type"></div>
          </div>
          <div class="comment__detail">
            <List :commentList="commentList"></List>
          </div>
        </div>
      </div>
    </div>

    <div class="comment__button" @click="linkToUrl('addComment?id=' + $route.query.id)">
      <span class="publish"></span><span class="text">我想说两句</span>
    </div>
  </div>
</template>

<script>
  import { Rater,Swiper } from 'vux'
  import List from '@/components/List/List'

  export default {
    data() {
      return {
        movie: null,
        rateType: 'rate1', //星星等级
        imgList: [],  //轮播图列表
        commentList: [],  //评论列表
        activeIndex: 0,
        showDetail: false
      }
    },

    created() {
      console.log(this.$route)
      let id = this.$route.query.id;
      if(id) {
        this.getMovieDetails(id);
        let param = {
          a: 0,
          id,
          pa: 1,
          li: 10
        }

        this.getReviewList(param);
      }
    },

    methods: {
      //获取电影详情
      getMovieDetails(id) {
        this.$Api.getMovieDetails(id).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.movie = res.q.movie;
            this.rateType = this.countRate(res.q.movie.starRating);

            let url = [];
            let mainObj = {
              url: 'javascript:',
              img: this.$ImgUrl + this.movie.imagePath
            }

            url.push(mainObj);

            for(let i in this.movie.images) {
              let imgObj = {
                url: 'javascript:',
                img: this.$ImgUrl + this.movie.images[i].path
              }

              url.push(imgObj);
            }

            this.imgList = url;            
          }
        })
      },

      //获取电影详情
      getReviewList(param) {
        this.$Api.getReviewList(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.commentList = res.q.reviews;
          }
        })
      },

      changeComment(type) {
        this.activeIndex = type;
        let id = this.$route.query.id;
        
        let param = {
          a: type,
          id,
          pa: 1,
          li: 10
        }

        this.getReviewList(param);
      },

      transition() {
        this.showDetail = !this.showDetail;
      },

      countRate(num) {
        let number = parseFloat(num);
        if(number <= 0.5) {
          return 'rate0'
        }else if(1 > number && number >= 0.5){
          return 'rate0_5'
        }else if(1.5 > number && number >= 1){
          return 'rate1'
        }else if(2 > number && number >= 1.5){
          return 'rate1.5'
        }else if(2.5 > number && number >= 2){
          return 'rate2'
        }else if(3 > number && number >= 2.5){
          return 'rate2_5'
        }else if(3.5 > number && number >= 3){
          return 'rate3'
        }else if(4 > number && number >= 3.5){
          return 'rate3_5'
        }else if(4.5 > number && number >= 4){
          return 'rate4'
        }else if(5 > number && number >= 4.5){
          return 'rate4_5'
        }else if(number == 5) {
          return 'rate5'
        }
      }
    },
    components: {
      Rater,
      Swiper,
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

    .vux-slider,
    .movie__detail__swiper {
      width: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .movie__detail__info {
      padding: boxValue(26);
      padding-bottom: 0;

      .info__name {
        font-size: boxValue(32);
        font-weight: 600;
      }

      .info__intro {
        // transition: all 1s;
        color: #333;
      }

      .info__rate {
        margin: boxValue(10) 0;
        height: boxValue(48);
        line-height: boxValue(48);
        overflow: hidden;

        .info__rate__num {
          display: inline-block;
          width: boxValue(166);
          height: boxValue(30);
          background: url('../../assets/rates.png');
          vertical-align: middle;
        }

        .rate0 {
          background-position: boxValue(-166) 0;
        }

        .rate0_5 {
          background: url('../../assets/rates_half.png');
          background-position: boxValue(-138) 0;
        }

        .rate1 {
          background-position: boxValue(-132) 0;
        }

        .rate1_5 {
          background: url('../../assets/rates_half.png');
          background-position: boxValue(-106) 0;
        }

        .rate2 {
          background-position: boxValue(-98) 0;
        }

        .rate2_5 {
          background: url('../../assets/rates_half.png');
          background-position: boxValue(-70) 0;
        }

        .rate3 {
          background-position: boxValue(-64) 0;
        }

        .rate3_5 {
          background: url('../../assets/rates_half.png');
          background-position: boxValue(-38) 0;
        }

        .rate4 {
          background-position: boxValue(-32) 0;
        }

        .rate4_5 {
          background: url('../../assets/rates_half.png');
          background-position: boxValue(-2) 0;
        }

        .rate5 {
          background-position: boxValue(0) 0;
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

  .limit {
    max-height: boxValue(100);
    height: auto;
    overflow: hidden;
  }

  .no__limit {
    max-height: auto;
  }

  .arrow__control {
    height: boxValue(40);
    line-height: boxValue(40);
    text-align: center;

    .arrow {
      display: inline-block;
      height: boxValue(19);
      width: boxValue(32);
      transform: rotate(0);
      background-image: url('../../assets/arrow_down.png');
      background-repeat: no-repeat;
      background-size: 100%;
      vertical-align: middle;
      transition: all 0.2s ease-in-out;
    }

    .arrow.up {
      transform: rotate(180deg);
    }
  }
}
</style>



