<template>
  <div id="invite" class="invite__list">
    <div class="invite">
      <div class="invite__left">
        <img src="../../assets/avatar.png" alt="">
      </div>
      <div class="invite__right">
        <div class="invite__right__info">
          <div class="info__name">咸鱼Diane</div>
          <div class="info__dis">1.2km</div>
        </div>
        <div class="invite__right__btn">约电影</div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
#invite {
  margin-top: boxValue(16);
  background: #fff;

  .invite {
    height: boxValue(140);
    font-size: 0;

    .invite__left {
      display: inline-block;
      margin: 0 boxValue(15) 0 boxValue(30);
      width: boxValue(84);
      height: boxValue(84);
      line-height: boxValue(140);

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        border-radius: 50%;
      }
    }

    .invite__right {
      position: relative;
      display: inline-block;
      height: boxValue(84);
      width: boxValue(510);
      vertical-align: middle;

      .invite__right__info {
        float: left;
        font-size: 13px;
        line-height: boxValue(42);

        .info__name {
          font-weight: 600;
        }

        .info__dis {
          color: #666;
        }
      }

      .invite__right__btn {
        float: right;
        display: inline-block;
        padding: boxValue(10) boxValue(20);
        margin-top: boxValue(14);
        margin-right: boxValue(30);
        font-size: 13px;
        vertical-align: middle;
        color: #fff;
        border-radius: boxValue(20);
        background: #27adff;
      }

      &:after {
        content: '';
        position: absolute;
        bottom: boxValue(-28);
        left: 0;
        width: 100%;
        border-bottom: 1px solid #eee;
      }
    }
  }
}
</style>
