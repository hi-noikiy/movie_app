<template>
  <div id="meet">
    <div class="meet__header">
      <el-row class="meet__header__tarbar" type="flex" justify="center">
        <el-radio-group  v-model="tabPosition">
          <el-radio-button class="tarbar" label="meet">约电影</el-radio-button>
          <el-radio-button class="tarbar" label="near">附近</el-radio-button>
        </el-radio-group>
      </el-row>

      <div class="meet__header__setting">
        <div class="setting__user"><span></span></div>
        <div class="setting__limit"><span></span></div>
      </div>
    </div>

    <div class="meet__user">
      <div class="user__img">
        <img src="../../assets/photo.png" alt="">
      </div>
      <div class="user__info">
        <div class="user__info__name">
          <span class="name">祖琦Jokie</span>
          <span class="sex"><i class="girl"></i>27</span>
        </div>
        <div class="user__info__tags">
          <span class="tags">科幻</span>
          <span class="tags">喜剧</span>
          <span class="tags">悬疑</span>
          <span class="tags">动作</span>
        </div>
        <div class="user__info__location">
          <span class="location__usually">常出没于飞扬影院（天河店）</span>
          <span class="location__pos">2.5km</span>
        </div>
      </div>
    </div>

    <div class="meet__control">
      <div class="control__btn">
        <div class="control__btn__next">
          <span>下一个</span>
        </div>
        <div class="control__btn__now">
          <span>约电影</span>
        </div>
      </div>

      <div class="control__like"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabPosition: 'meet'
      }
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';

#meet {
  position: relative; 
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #f5f5f5;

  /* 头部tarbar */
  .meet__header {
    position: relative;

    .meet__header__tarbar {
      margin-top: boxValue(24);
      margin-bottom: boxValue(24);

      .tarbar {
        .el-radio-button__inner {
          padding: boxValue(10) boxValue(20);
          width: boxValue(160);
        }
      }
    }

    .meet__header__setting {
      position: absolute;
      right: boxValue(10);
      top: boxValue(0);

      .setting__user,
      .setting__limit {
        position: relative;
        display: inline-block;
        width: boxValue(54);
        height: boxValue(54);
        background-size: 60%;
        z-index: 2;
        background-color: #fff;
        border-radius: 50%;
        background-position: 50% 50%;
        box-shadow: 1px 1px 2px 2px #eee;
      }

      .setting__user {
        @include fixImage('../../assets', 'mine_btn.png');
      }

      .setting__limit {
        @include fixImage('../../assets', 'settings.png');
      }
    }
  }
  /* 头部tarbarend */

  /* 相册 */
  .meet__user {
    margin: 0 auto;
    height: boxValue(756);
    width: boxValue(614);
    background: #fff;
    border-radius: boxValue(20);

    .user__img {
      width: 100%;
      height: boxValue(576);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user__info {
      padding: boxValue(34) boxValue(28) boxValue(28) boxValue(28);
      
      .user__info__name {
        .name {
          font-size: 13px;
          font-weight: 600;
        }

        .sex {
          font-size: 10px;
          color: #fff;
          background: #f773be;
          padding: boxValue(2) boxValue(18);
          border-radius: boxValue(6);
        }
      }

      .user__info__tags {
        padding: boxValue(16) 0;

        .tags {
          display: inline-block;
          width: boxValue(68);
          height: boxValue(38);
          line-height: boxValue(38);
          text-align: center;
          color: #fff;
          border-radius: boxValue(8);
          background: #27adff;
        }
      }

      .user__info__location {
        display: flex;
        color: #54595c;
        justify-content: space-between;

      }
    }
  }
  /* 相册end */


  .meet__control {
    position: absolute;
    bottom: boxValue(100);
    width: 100%;

    .control__btn {
      text-align: center;
      margin: 0 auto;

      .control__btn__next,
      .control__btn__now {
        display: inline-block;
        width: boxValue(104);
        height: boxValue(104);
        line-height: boxValue(104);
        text-align: center;
        border-radius: 50%;
      }

      .control__btn__next {
        color: #27adff;
        background: #fff;
        margin-right: boxValue(50);
      }

      .control__btn__now {
        color: #fff;
        background: #27adff;
      }
    }

    .control__like {
      position: absolute;
      right: boxValue(20);
      bottom: boxValue(5);
      width: boxValue(94);
      height: boxValue(94);
      border-radius: 50%;
      background: #fff;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: boxValue(-15);
        margin-left: boxValue(-15);
        width: boxValue(30);
        height: boxValue(34);
        background: url('../../assets/heart.png') no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>
