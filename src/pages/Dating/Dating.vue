<template>
  <div id="dating">
    <div class="dating__info">
      <div class="info__detail clearfix">
        <div class="info__detail__left">
          <div class="left__avatar">
            <img src="../../assets/avatar.png" alt="">
          </div>
          
          <div class="left__detail">
            <div class="left__detail__name">
              <span>咸鱼Diane</span>
            </div>
            <div class="left__detail__mes">
              <span>邀请你一起看电影</span>
            </div>
          </div>
        </div>
        <div class="info__detail__right">
          <span>2017.03.23</span>
          <span>19.33</span>
        </div>
      </div>

      <div class="info__control">
        <span class="control__left cancel">拒绝</span>
        <span class="control__right accept">接受邀请</span>
      </div>
    </div>
    
    <div class="dating__info">
      <div class="info__detail clearfix">
        <div class="info__detail__left">
          <div class="left__avatar">
            <img src="../../assets/avatar.png" alt="">
          </div>
          
          <div class="left__detail">
            <div class="left__detail__name">
              <span>咸鱼Diane</span>
            </div>
            <div class="left__detail__mes">
              <span>邀请你一起看电影</span>
            </div>
          </div>
        </div>
        <div class="info__detail__right">
          <span>2017.03.23</span>
          <span>19.33</span>
        </div>
      </div>

      <div class="info__control">
        <span class="control__left cancel">拒绝</span>
        <span class="control__right accept">接受邀请</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #dating {
    .dating__info {
      margin-top: boxValue(24);

      .info__detail {
        padding: boxValue(26) 0;
        height: boxValue(88);
        border-bottom: 1px solid #eee;
        background: #fff;

        .info__detail__left {
          float: left;

          .left__avatar {
            float: left;
            margin-right: boxValue(18);
            width: boxValue(88);
            height: boxValue(88);

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .left__detail {
            float: left;
            padding: boxValue(10) 0;
            height: boxValue(68);
            display: flex;            
            flex-direction: column;
            justify-content: space-between;

            .left__detail__name {
              font-size: boxValue(22);
              font-weight: 600;
            }
          }
        }

        .info__detail__right {
          float: right;
          padding-top: boxValue(10);
          padding-right: boxValue(30);
        }
      }
      
      .info__control {
        height: boxValue(72);
        background: #fff;
        font-size: 0;

        .control__left,
        .control__right {
          display: inline-block;
          width: 50%;
          line-height: boxValue(72);
          font-size: boxValue(30);
          text-align: center;
        }

        .control__left {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: -1px;
            bottom: 50%;
            margin-bottom: boxValue(-14);
            height: boxValue(28);
            border-right: 1px solid #ddd; 
          }
        }

        .cancel {
          color: #ec1313;
        }

        .accept {
          color: #85d594;
        }
      }
    }
  }
</style>


