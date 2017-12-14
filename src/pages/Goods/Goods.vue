<template>
  <div id="goods">
    <div class="goods__top">
      <div class="top__swiper">
        <img src="../../assets/goods.png" alt="">
      </div>
      <div class="top__info">
        <div class="top__info__title">
          猎奇(LIEQI) LQ-011 手机镜头 广角+鱼眼+微距套装手机外置镜头 单反手机
        </div>
        <div class="top__info__price">
          <span class="top__price__num">2500</span>
          <span>积分+ 199元</span>
        </div>
        <div class="top__info__mes">
          <span class="mes__detail">市场参考值：599元</span>
          <span class="mes__date">有效期至2018.12.12</span>
        </div>
      </div>
    </div>

    <div class="goods__detail">
      <div class="detail">
        <span>卡卷类型:</span>
        <span>积分/积分+现金卷</span>
      </div>
      <div class="detail">
        <span>行业:</span>
        <span>积分/积分+现金卷</span>
      </div>
      <div class="detail">
        <span>限制兑换:</span>
        <span>积分/积分+现金卷</span>
      </div>
      <div class="detail">
        <span>适用等级:</span>
        <span>积分/积分+现金卷</span>
      </div>
    </div>


    <div class="goods__intro">
      <div class="intro">
        <div class="intro__title border_line">
          适用门店
        </div>
        <div class="intro__content">
          <Merchant />
        </div>
        <div class="intro__more">
          <span>查看全部8家门店</span>
          <i class="arrow"></i>
        </div>
      </div>

      <div class="intro">
        <div class="intro__title border_line">
          门店说明
        </div>
        <div class="intro__text">
          <p>飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城</p>
        </div>
      </div>

      <div class="intro">
        <div class="intro__title border_line">
          使用说明
        </div>
        <div class="intro__text">
          <p>飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城飞扬影城</p>
        </div>
      </div>
    </div>

    <div class="goods__info">
      <div class="goods__info__title">
        <span>点击查看图文详情</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Merchant from '@/components/Merchant/Merchant';

  export default {
    components: {
      Merchant
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #goods {
    .goods__top {
      background: #fff;

      .top__swiper {
        width: 100%;
        height: boxValue(640);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .top__info {
        position: relative;
        padding: boxValue(20) boxValue(20) boxValue(12) boxValue(20);

        .top__info__title {
          padding: boxValue(12) 0 boxValue(4) 0;
          font-size: boxValue(30);
          font-weight: 600;
        }

        .top__info__price {
          padding: boxValue(12) 0;
          color: #ff242e;

          .top__price__num {
            font-size: boxValue(30);
            font-weight: 600;
          }

          span {
            color: #ff242e;
          }
        }

        .top__info__mes {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .mes__date {
            color: #ff242e;
          }

          .mes__detail {
            color: #999;
          }
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(20);
          width: 100%;
          border-bottom: 1px solid #eee;
        }
      }
    }

    .goods__detail {
      padding: 0 boxValue(20);
      background: #fff;

      .detail {
        height: boxValue(50);
        line-height: boxValue(50);
        font-size: boxValue(20);
        
        span {
          color: #999;
        }
      }
    }

    .goods__intro {
      margin-top: boxValue(20);

      .intro {
        background: #fff;
        margin-bottom: boxValue(20);

        .intro__title {
          padding-left: boxValue(20);
          height: boxValue(72);
          line-height: boxValue(72);
          font-size: boxValue(30);
          font-weight: 600;
        }

        .intro__more {
          display: flex;
          position: relative;
          padding-left: boxValue(20);
          height: boxValue(72);
          line-height: boxValue(72);
          font-size: boxValue(30);

          span {
            color: #2bc4f3;
          }

          .arrow {
            position: absolute;
            right: boxValue(32);
            top: boxValue(22.5);
            display: inline-block;
            width: boxValue(16);
            height: boxValue(29);
            background: url('../../assets/arrow_enter.png');
            background-size: cover;
            vertical-align: middle;
          }
        }

        .intro__text {
          padding: boxValue(0) boxValue(20) boxValue(20) boxValue(20);
          color: #999;

          p {
            color: #999;
          }
        }
      }
    }

    .goods__info {
      .goods__info__title {
        height: boxValue(74);
        line-height: boxValue(74);
        text-align: center;
        background: #fff;

        span {
          color: #2bc4f3;
        }
      }
    }
  }
</style>
