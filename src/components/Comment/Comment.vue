<template>
  <div id="comment">
    <div class="list clearfix" v-for="(item,index) in comment" :key="index">
      <div class="list__left">
        <img :src="$ImgUrl + item.user.imagePath" alt="" v-if="item.user.imagePath">
        <img src="../../assets/avatar.png" alt="" v-else>
      </div>
      <div class="list__right">
        <div class="list__right__info">
          <div class="info__name">{{item.user.nickname}}</div>
          <div class="rate__num rate__scale" :class="countRate(item.starRating)"></div>
        </div>
        <div class="list__right__comment">
          <div class="comment__text">{{item.content}}</div>

          <div class="comment__imgs">
            <img class="img" v-lazy="$ImgUrl + img.path" alt="" v-for="(img,index) in item.images" @click="preview(item.images, index)" :key="index" />
          </div>

          <div class="comment__movie" v-if="type=='comment' && item.movie" @click="linkToUrl('movie?id=' + item.movie.id)">
            <div class="movie__img">
              <img v-lazy="$ImgUrl + item.movie.imagePath" alt="" v-if="item.movie.imagePath">
              <img src="../../assets/movie.png" alt="" v-else>
            </div>
            <div class="movie__info">
              <div class="info__name">
                {{item.movie.name}}
              </div>
              <div class="info__rate">
                <span class="rate__num rate__scale_l" :class="countRate(item.movie.starRating)"></span>
                <span class="rate__comment">{{item.movie.statReview}}人评论</span>
              </div>
            </div>
          </div>

          <div class="comment__info">
            <div class="info__left">
              <span class="time">{{item.addTime}}</span>
              <span class="del" @click="del(item.id)">删除</span>
            </div>
            <div class="info__right">
              <span class="praise"><i class="praise__icon"></i>{{item.starRating}}</span>
              <span class="comment"><i class="comment__icon"></i>{{item.statComment}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Rater } from 'vux'

  export default {
    props: ['type', 'comment'],
    
    methods: {
      del(id) {
        this.$confirm('你确定删除吗?','删除', 'confirm').then((res) => {
          console.log(res)
          if(res == 'sure') {
            this.$Api.ReviewUpdate(id).then((res) => {
              console.log(res)
              if(res.q.s == 0) {
                this.$toast('删除成功!')
              }
            })
          }
        });
      },

      preview(imgs, index) {
        let arr = [];
        for(let i in imgs) {
          arr.push(this.$ImgUrl + imgs[i].path)
        }

        this.$ImagePreview(arr, index);
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
      Rater
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .list {
    padding-top: boxValue(20);
    height: auto;
    font-size: 0;

    .list__left {
      float: left;
      display: inline-block;
      margin: 0 boxValue(15) 0 boxValue(30);
      width: boxValue(84);
      height: boxValue(84);

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 50%;
      }
    }

    .list__right {
      float: left;
      position: relative;
      display: inline-block;
      min-height: boxValue(84);
      width: boxValue(510);
      vertical-align: middle;

      .list__right__info {
        font-size: boxValue(26);
        line-height: boxValue(42);
        height: boxValue(84);

        .info__name {
          color: #27adff;
          font-weight: 600;
        }

        .info__rate {
          display: flex;
          align-items: center;
        }

      }

      .list__right__comment {
        height: auto;
        font-size: 12px;

        .comment__text {
          padding-right: boxValue(8);
        }

        .comment__imgs {
          font-size: 0;

          .img {
            margin-top: boxValue(14);
            margin-right: boxValue(10);
            width: boxValue(160);
            height: boxValue(160);

            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }

        .comment__info {
          height: boxValue(60);
          line-height: boxValue(60);
          font-size: 12px;

          .info__left {
            float: left;

            .time {
              color: #666;
              margin-right: boxValue(10);
            }

            .del {
              color: #444;
            }
          }

          .info__right {
            float: right;
            color: #888;
            
            .praise {
              margin-right: boxValue(16);

              .praise__icon {
                display: inline-block;
                margin-right: boxValue(8);
                width: boxValue(27);
                height: boxValue(24);
                background: url('../../assets/praiseh.png');
                background-size: 100%;
              }
            }

            .comment {
              margin-right: boxValue(20);

              .comment__icon {
                display: inline-block;
                margin-right: boxValue(8);
                width: boxValue(27);
                height: boxValue(24);
                background: url('../../assets/commentaries.png');
                background-size: 100%;
              }
            }
          }
        }
      }

      &:after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        border-bottom: 1px solid #eee;
      }
    }

    .comment__movie {
      margin: boxValue(16) 0;
      margin-right: boxValue(16);
      display: flex;
      flex-direction: row;
      background: #f5f5f5;
      height: boxValue(144);

      .movie__img {
        width: boxValue(100);
        height: boxValue(144);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .movie__info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: boxValue(18);
        padding-top: boxValue(30);
        padding-bottom: boxValue(30);

        span {
          display: inline-block;
          color: #faaf00;
        }

        .info__rate {
          display: flex;
          align-items: center;
          height: 30px;
          line-height: 30px;

          .rate__comment {
            margin-left: -10px;
          }
        }
      }
    }
  }

  .rate {
    display: inline-block;
    width: 64px;
    height: 11px;
    background: url('../../assets/rates_small.png');
  }
</style>
