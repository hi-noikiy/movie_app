<template>
  <!-- <div class="list clearfix">
    <div class="list__left">
      <img src="../../assets/avatar.png" alt="">
    </div>
    <div class="list__right">
      <div class="list__right__info">
        <div class="info__name">咸鱼Diane</div>
        <div class="info__rate"></div>
      </div>
      <div class="list__right__comment">
        <div class="comment__text">测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试</div>

        <div class="comment__imgs">
          <img class="img" src="../../assets/image.png" alt="">
          <img class="img" src="../../assets/image.png" alt="">
          <img class="img" src="../../assets/image.png" alt="">
          <img class="img" src="../../assets/image.png" alt="">
          <img class="img" src="../../assets/image.png" alt="">
          <img class="img" src="../../assets/image.png" alt="">
          <img class="img" src="../../assets/image.png" alt="">
        </div>

        <div class="comment__info">
          <div class="info__left">
            <span class="time">今天15:32</span>
            <span class="del">删除</span>
          </div>
          <div class="info__right">
            <span class="praise"><i class="praise__icon"></i>2587</span>
            <span class="comment"><i class="comment__icon"></i>442</span>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="list__wrap">
    <div class="list clearfix" v-for="(comment,index) in commentList" :key="index">
      <div class="list__left" @click="linkToUrl('person?id='+ comment.user.id)">
        <img :src="$ImgUrl + comment.user.imagePath" alt="" v-if="comment.user.imagePath">
        <img src="../../assets/avatar.png" alt="" v-else>
      </div>
      <div class="list__right">
        <div class="list__right__info">
          <div class="info__name">{{comment.user.nickname?comment.user.nickname:'暂无'}}</div>
          <div class="rate__num scale" :class="countRate(comment.starRating)"></div>
        </div>
        <div class="list__right__comment">
          <div class="comment__text">{{comment.content}}</div>

          <div class="comment__imgs">
            <img class="img" v-lazy="$ImgUrl + img.path" alt="" v-for="(img,index) in comment.images" @click="preview(comment.images, index)" :key="index" />
          </div>

          <div class="comment__info">
            <div class="info__left">
              <span class="time">{{comment.addTime}}</span>
              <span class="del" v-if="userDetail.id == comment.user.id" @click="delComment(comment.id)">删除</span>
            </div>
            <div class="info__right">
              <span class="praise" :class="{'praised': comment.isPraise == 1}" @click="praise(comment.id, comment)"><i class="praise__icon"></i>{{comment.statPraise}}</span>
              <span class="comment" @click="linkToUrl('comment?id=' + comment.id + '&praise=' + comment.statPraise + '&comment=' + comment.statComment)"><i class="comment__icon"></i>{{comment.statComment}}</span>
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
    props: ['commentList'],

    methods: {
      praise(id, comment) {
        console.log(comment)
        if(comment.isPraise == 1) {
          this.$Api.PraiseSwitch(id, 2).then((res) => {
            console.log(res);
            if(res.q.s == 0) {
              comment.isPraise = 2;
              comment.statPraise++;
            }else {
              this.$toast(res.q.d, 'fail')
            }
          })
        }else {
          this.$Api.PraiseSwitch(id, 2).then((res) => {
            if(res.q.s == 0) {
                comment.isPraise = 1;
                comment.statPraise--;
              }else {
                this.$toast(res.q.d, 'fail')
              }
          })
        }
      },

      delComment(id) {
        console.log(id)
        this.$confirm('你确定要删除吗?', '删除', 'fail').then((res) => {
          if(res == 'sure') {
            this.$Api.ReviewUpdate(id).then((res) => {
              if(res.q.s == 0) {
                this.$toast('删除成功！').then(() => {
                  this.$router.go(0);
                });
              }else {
                this.$toast(res.q.d, 'fail');
              }
            })
          }
        })
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
      margin: 0 boxValue(17) 0 boxValue(28);
      width: boxValue(82);
      height: boxValue(82);

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 50%;
        border: 1px solid #eee;
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
          width: 64px;
          height: 11px;
          background: url('../../assets/rates_small.png');
        }
      }

      .list__right__comment {
        height: auto;
        font-size: boxValue(24);

        .comment__text {
          word-break: break-all;
          padding-right: boxValue(8);
          color: #444;
        }

        .comment__imgs {
          // margin-top: boxValue(20);
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
          margin-top: boxValue(10);
          height: boxValue(60);
          line-height: boxValue(60);
          font-size: boxValue(24);

          .info__left {
            float: left;

            .time {
              color: #666;
              margin-right: boxValue(10);
            }

            .del {
              color: #888;
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

            .praised {
              .praise__icon {
                background-image: url('../../assets/praise.png');
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

    .scale {
      transform: scale(0.7);
      transform-origin: 0 boxValue(-20);
    }
  }
</style>
