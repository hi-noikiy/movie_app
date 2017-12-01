<template>
  <div class="list clearfix">
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
  </div>
</template>

<script>
  import { Rater } from 'vux'

  export default {
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
        font-size: 13px;
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
        font-size: 12px;

        .comment__text {
          padding-right: boxValue(8);
        }

        .comment__imgs {
          margin-top: boxValue(20);
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
  }
</style>
