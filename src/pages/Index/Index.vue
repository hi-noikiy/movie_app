<template>
  <div id="index">
    <div class="index__header">
      <div class="header__left">
        <div class="header__left__avatar">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="header__left__user">
          <div class="user__name">William</div>
          <div class="user__points">
            <span class="points">24320</span>
            <span>积分</span>
          </div>
        </div>
      </div>
      <div class="header__rihgt">
        <span class="header__right__tag">
          大众会员
        </span>
        <span class="header__right__singIn">
          签到+60
        </span>
      </div>
    </div>
    <div class="index__carousel">
      <div class="carousel__list">
        <img src="../../assets/swiper.png" alt="">
      </div>
      <div class="carousel__control">
        <span class="control"></span>
        <span class="control"></span>
        <span class="control active"></span>
        <span class="control"></span>
        <span class="control"></span>
      </div>
    </div>
    <div class="index__menu">
      <div class="menu">
        <div class="menu__join"></div>
        <div class="menu__text">约电影</div>
      </div>
      <div class="menu">
        <div class="menu__game"></div>
        <div class="menu__text">玩游戏</div>
      </div>
      <div class="menu">
        <div class="menu__gift"></div>
        <div class="menu__text">兑商品</div>
      </div>
      <div class="menu">
        <div class="menu__user"></div>
        <div class="menu__text">个人中心</div>
      </div>
    </div>
    <div class="index__movie"></div>
    <div class="index__rank"></div>
  </div>
</template>

<style lang="scss">
@import '../../scss/mixin.scss';
$base: 32rem;

#index {
  background: #f5f5f5;
  /* 顶部区域 */
  .index__header {
    height: boxValue(90);
    width: 100%;
    background: #f5f5f5;
    
    .header__left {
      float: left;
      margin-left: boxValue(26);
      height: 100%;
      line-height: boxValue(90);

      //头像
      .header__left__avatar {
        float: left;
        margin-right: boxValue(20);
        height: boxValue(60);
        width: boxValue(60);
        border-radius: 50%;

        img {
          height: 100%;
          width: 100%;
          vertical-align: middle;
        }
      }

      //用户信息
      .header__left__user {
        float: left;
        color: #222;
        line-height: normal;

        .user__name {
          margin-top: boxValue(18);
          font-size: 11px;
        }

        .user__points {
          font-size: 10px;

          .points {
            color: #ef4238;
          }
        }
      }
    }

    //按钮区域
    .header__rihgt {
      float: right;
      margin-right: boxValue(24);
      font-size: 0;
      vertical-align: middle;
      line-height: boxValue(90);

      .header__right__singIn,
      .header__right__tag {
        display: inline-block;
        width: boxValue(120);
        height: boxValue(46);
        line-height: boxValue(46);
        vertical-align: middle;
        font-size: 11px;
        text-align: center;
        color: #fff;
        background: #2ecc71;
        border-radius: 10px;
      }

      .header__right__singIn {
        margin-left: boxValue(12);
        background: #02a9ff;
      }
    }
  }
  /* 顶部区域end */

  /* 轮播图区域 */
  .index__carousel {
    position: relative;
    width: 100%;
    height: boxValue(290);
    overflow: hidden;

    .carousel__list {
      img {
        width: 100%;
        vertical-align: middle;
      }
    }

    .carousel__control {
      position: absolute;
      right: boxValue(30);
      bottom: boxValue(8);

      .control {
        display: inline-block;
        width: boxValue(24);
        height: boxValue(5);
        background: #9e9d9b;
        border-radius: 2px;

        &.active {
          background: #fff;
        }
      }
    }

  }
  /* 轮播图区域end */

  /* 菜单选区 */
  .index__menu {
    height: boxValue(134);
    width: 100%;
    font-size: 0;
    background: #fff;
    box-shadow: 0px 1px 12px #f0f0f0;

    .menu {
      display: inline-block;
      margin-top: boxValue(22);
      height: boxValue(90);
      width: 25%;
      text-align: center;
    }

    .menu__game,
    .menu__gift,
    .menu__user,
    .menu__join {
      margin: 0 auto;
      height: boxValue(56);
      width: boxValue(56);
      background-size: contain;
    }

    .menu__join {
      @include fixImage('../../assets', 'movies.png');
    }

    .menu__game {
      @include fixImage('../../assets', 'games.png');
    }

    .menu__gift {
      @include fixImage('../../assets', 'shopping.png');
    }

    .menu__user {
      @include fixImage('../../assets', 'mine.png');
    }

    .menu__text {
      margin-top: boxValue(14);
      font-size: 11px;
      text-align: center;
    }
  }


  /* 菜单选区end */
}
</style>

