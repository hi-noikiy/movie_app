<template>
  <div id="search">
    <div class="search__bar">
      <div class="bar">
        <span class="icon"></span>
        <input class="input" type="text" placeholder="请搜索">
        <span class="btn">取消</span>
      </div>
    </div>

    <div class="search__content">
      <div class="content__title">
        <span class="tab" :class="{'active': type == 1}" @click="changeType(1)">商品</span>
        <span class="tab" :class="{'active': type == 2}" @click="changeType(2)">用户</span>
      </div>
      <div class="content">
        <template v-if="type == 1">
          <Card class="card__list" :type="type"/>
        </template>
        <template v-if="type == 2">
          <div class="meet__list">
            <div class="meet">
              <div class="meet__left">
                <img src="../../assets/avatar.png" alt="">
              </div>
              <div class="meet__right">
                <div class="meet__right__info">
                  <div class="info__name">测试</div>
                  <div class="info__dis">1.2km</div>
                </div>
                <div class="meet__right__btn">约电影</div>
              </div>
            </div>
            <div class="meet">
              <div class="meet__left">
                <img src="../../assets/avatar.png" alt="">
              </div>
              <div class="meet__right">
                <div class="meet__right__info">
                  <div class="info__name">测试</div>
                  <div class="info__dis">1.2km</div>
                </div>
                <div class="meet__right__btn">约电影</div>
              </div>
            </div>
            <div class="meet">
              <div class="meet__left">
                <img src="../../assets/avatar.png" alt="">
              </div>
              <div class="meet__right">
                <div class="meet__right__info">
                  <div class="info__name">测试</div>
                  <div class="info__dis">1.2km</div>
                </div>
                <div class="meet__right__btn">约电影</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>  
</template>

<script>
  import Card from '@/components/Card/Card';

  export default {
    data() {
      return {
        type: 1 
      }
    },

    methods: {
      changeType(type) {
        this.type = type;
      }
    },

    components: {
      Card
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #search {
    .search__bar {
      .bar {
        position: relative;
        height: boxValue(64);
        background: #fff;
        border-bottom: #eee;

        .icon {
          position: absolute;
          display: inline-block;
          top: boxValue(17);
          left: boxValue(20);;
          width: boxValue(30);
          height: boxValue(30);
          background: url('../../assets/search.png') no-repeat;
          background-position: center;
          background-size: 100%;
        }

        .input {
          margin-left: boxValue(10);
          margin-top: boxValue(4);
          padding: 0;
          padding-left: boxValue(60);
          height: boxValue(56);
          width: boxValue(440);
          border: none;
          outline: none;
          border-radius: boxValue(40);
          background: #f5f5f5;
        }

        .btn {
          position: absolute;
          top: 50%;
          right: boxValue(30);
          transform: translateY(-50%);
        }
      }
    }

    .search__content {
      background: #fff;

      .content__title {
        font-size: 0;

        .tab{
          display: inline-block;
          width: 50%;
          height: boxValue(80);
          line-height: boxValue(80);
          font-size: boxValue(28);
          text-align: center;
          color: #7a7a7a;

          &.active {
            position: relative;
            color: #00a7ff;

            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: boxValue(130);
              height: boxValue(6);
              background: #00a7ff;
              border-radius: boxValue(8);
            }
          }
        }
      }
    }

    .meet__list {
      margin-top: boxValue(16);
      background: #fff;

      .meet {
        height: boxValue(140);
        font-size: 0;

        .meet__left {
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

        .meet__right {
          position: relative;
          display: inline-block;
          height: boxValue(84);
          width: boxValue(510);
          vertical-align: middle;

          .meet__right__info {
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

          .meet__right__btn {
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
  }
</style>

