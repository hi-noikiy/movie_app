<template>
  <div class="praise__wrap">
    <div class="praise__list clearfix">
      <div class="praise__list__left">
        <img src="../../assets/avatar.png" alt="">
      </div>
      <div class="praise__list__right">
        <div class="right__info">
          <div class="info__name">咸鱼Diane</div>
          <div class="info__control">
            <span class="time">今天15:32</span>
          </div>
        </div>
      </div>
    </div>

    <div class="praise__list clearfix">
      <div class="praise__list__left">
        <img src="../../assets/avatar.png" alt="">
      </div>
      <div class="praise__list__right">
        <div class="right__info">
          <div class="info__name">咸鱼Diane</div>
          <div class="info__control">
            <span class="time">今天15:32</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .praise__list {
    padding-top: boxValue(20);
    padding-bottom: boxValue(20);
    height: auto;
    font-size: 0;
    background: #fff;

    .praise__list__left {
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

    .praise__list__right {
      float: left;
      position: relative;
      display: inline-block;
      min-height: boxValue(84);
      width: boxValue(510);
      vertical-align: middle;

      .right__info {
        font-size: 13px;
        line-height: boxValue(42);
        height: boxValue(84);

        .info__name {
          color: #27adff;
          font-weight: 600;
        }

        .info__control {
          font-size: boxValue(22);
          color: #666;
          

          .time {
            margin-right: boxValue(10);
          }
        }
      }

      .right__comment {
        margin: boxValue(18) 0;
        height: auto;
        font-size: 12px;

        .comment__text {
          padding-right: boxValue(8);
          color: #222;
        }
      }

      &:after {
        content: '';
        position: absolute;
        bottom: boxValue(-20);
        left: 0;
        width: 100%;
        border-bottom: 1px solid #eee;
      }
    }
  }
</style>
