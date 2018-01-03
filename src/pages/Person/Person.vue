<template>
  <div id="person">
    <div class="person__wrap">
      <div class="person__header">
        <div class="header__avatar">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="header__name">
          <span class="header__name__detail">祖其Jokie</span>
          <span class="header__name__sex">22</span>
        </div>
      </div>

      <div class="person__image">
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
        <div class="image">
          <img src="../../assets/image.png" alt="">
        </div>
      </div>

      <div class="person__part">
        <div class="part__title">喜欢类型</div>
        <div class="part__detail person__type__detail">
          <span class="type">科幻</span>
          <span class="type">喜剧</span>
          <span class="type">悬疑</span>
          <span class="type">动作</span>
        </div>
      </div>

      <div class="person__part">
        <div class="part__title">经常出没</div>
        <div class="part__detail">飞扬影院(天河店)</div>
      </div>

      <div class="person__part">
        <div class="part__title">个性签名</div>
        <div class="part__detail">你若安好 便是晴天</div>
      </div>

      <div class="person__part person__info">
        <div class="part__title">我的信息</div>
        <div class="part__detail">
          <div class="detail">
            <div class="detail__left">个人情感</div>
            <div class="detail__right">已隐藏/单身/情侣/已婚</div>
          </div>
          <div class="detail">
            <div class="detail__left">行业</div>
            <div class="detail__right">IT互联网</div>
          </div>
          <div class="detail">
            <div class="detail__left">地区</div>
            <div class="detail__right">广州 天河区</div>
          </div>
          <div class="detail">
            <div class="detail__left">喜欢明星</div>
            <div class="detail__right">刘德华、刘德华、刘德华、刘德华、刘德华、刘德华、刘德华、刘德华</div>
          </div>
        </div>
      </div>
    </div>

    <group class="person__comment">
      <cell class="comment" title="TA的影评" value="13条" is-link></cell>
    </group>
    
    <div class="person__bottomBtn">
      <span class="buttonBtn">发信息</span>
      <span class="buttonBtn">送积分</span>
      <span class="buttonBtn">送卡卷</span>
      <span class="buttonBtn invite">立即约影</span>
    </div>
  </div>
</template>

<script>
  import { TransferDom, Popup, XButton, Range, Group, Cell } from 'vux'

  export default {
    data() {
      return {

      }
    },
    components: {
      Group,
      Cell
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';
  #person {
    position: relative;
    height: 100%;
    background: #f5f5f5;

    .person__wrap {
      background: #fff;
      padding-bottom: boxValue(30);
    }

    .person__header {
      height: boxValue(114);
      font-size: 0;

      .header__avatar {
        display: inline-block;
        margin-right: boxValue(20);
        height: boxValue(84);
        width: boxValue(84);
        line-height: boxValue(114);
        background: #fff;
  
        img {
          vertical-align: middle;
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      }

      .header__name {
        display: inline-block;

        .header__name__detail {
          margin-right: boxValue(10);
          font-size: 13px;
          font-weight: 600;
        }

        .header__name__sex {
          font-size: 10px;
          padding: boxValue(2) boxValue(12);
          color: #fff;
          background: #f773be;
        }
      }
    }

    .person__image {
      display: flex;
      margin: 0 1%;
      flex-wrap: wrap;
      justify-content: space-around;

      .image {
        display: inline-block;
        width: 24%;

        img {
          width: 100%;
          border-radius: 4px;
        }
      }
    }

    .person__part {
      padding: boxValue(30) boxValue(20) 0 boxValue(20);

      .part__title {
        padding-bottom: boxValue(12);
        font-size: 12px;
        color: #333;
      }

      .part__detail {
        color: #999;
      }

      .person__type__detail {
        .type {
          display: inline-block;
          width: boxValue(80);
          height: boxValue(42);
          line-height: boxValue(42);
          text-align: center;
          color: #fff;
          border-radius: boxValue(20);
          background: #27adff;
        }
      }
    }

    .person__info {
      .part__detail {
        .detail {
          height: boxValue(48);
          
          .detail__left {
            float: left;
            width: 30%;
          }

          .detail__right {
            float: right;
            text-align: right;
            width: 70%;
          }
        }
      }
    }

    .person__comment {
      height: boxValue(74);

      .comment {
        height: boxValue(74);
        padding: 0 boxValue(20);
        font-size: 13px;
      }

      .weui-cells {
        margin-top: boxValue(20);
        margin-bottom: boxValue(100);
      }
    }

    .person__bottomBtn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: boxValue(70);
      font-size: 0;
      box-shadow: 1px -3px 6px 0px #ececec;
      border-top: 1px solid #eee;
      background: #fff;

      .buttonBtn {
        position: relative;
        display: inline-block;
        width: 25%;        
        font-size: 13px;
        line-height: boxValue(70);
        text-align: center;
        color: #777;

        &:after {
          content: '';
          position: absolute;
          right: 0;
          top: boxValue(11);
          height: boxValue(48);
          border-right: 1px solid #ccc;
        }

        &:nth-child(3):after {
          display: none;
        }
      }

      .invite {
        color: #fff;
        background: #27adff;

        &:after {
          display: none;
        }
      }
    }
  }
</style>
