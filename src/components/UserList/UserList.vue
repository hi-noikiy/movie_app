<template>
  <div class="user__wrap">
    <div class="user__list clearfix" v-for="(item, index) in userList" :key="index">
      <div class="user__list__left">
        <img :src="$ImgUrl + item.user.imagePath" alt="" v-if="item.user.imagePath">
        <img src="../../assets/avatar.png" alt="">
      </div>
      <div class="user__list__right">
        <div class="right__info">
          <div class="info__name">{{item.user.nickname}}</div>
          <div class="info__control">
            <span class="time">今天15:32</span>
            <span class="del">删除</span>
          </div>
        </div>
        <div class="right__comment">
          <div class="comment__text">{{item.content}}</div>
        </div>
      </div>
    </div>

    <!-- <div class="user__list clearfix">
      <div class="user__list__left">
        <img src="../../assets/avatar.png" alt="">
      </div>
      <div class="user__list__right">
        <div class="right__info">
          <div class="info__name">咸鱼Diane</div>
          <div class="info__control">
            <span class="time">今天15:32</span>
            <span class="del">删除</span>
          </div>
        </div>
        <div class="right__comment">
          <div class="comment__text">测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试测试赛所所所所所所测试</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    props: ['userList']
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .user__list {
    padding-top: boxValue(20);
    height: auto;
    font-size: 0;
    background: #fff;

    .user__list__left {
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

    .user__list__right {
      float: left;
      position: relative;
      display: inline-block;
      min-height: boxValue(84);
      width: boxValue(510);
      vertical-align: middle;

      .right__info {
        font-size: boxValue(26);
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
        font-size: boxValue(24);

        .comment__text {
          padding-right: boxValue(8);
          color: #333;
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
