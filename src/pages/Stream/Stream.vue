<template>
  <div id="stream">
    <div class="stream__list">
      <div class="stream">
        <div class="stream__left">
          <div class="left__title">签到奖励</div>
          <div class="left__date">2017.10.23 12:22</div>
        </div>
        <div class="stream__right">
          <div class="right__control add">+60</div>
          <div class="right__detail">首次签到</div>
        </div>
      </div>

      <div class="stream">
        <div class="stream__left">
          <div class="left__title">签到奖励</div>
          <div class="left__date">2017.10.23 12:22</div>
        </div>
        <div class="stream__right">
          <div class="right__control sub">-60</div>
          <div class="right__detail">首次签到</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },

    created() {
      this.getIntegralList();
    },

    methods: {
      getIntegralList() {
        this.$Api.getIntegralList().then((res) => {
          console.log(res);
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #stream {
    margin-top: boxValue(20);
    .stream__list {
      .stream {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 boxValue(30);
        height: boxValue(110);
        background: #fff;
        overflow: hidden;

        .stream__left,
        .stream__right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: boxValue(10) 0;
          height: boxValue(90);
        }
      
        .stream__left {
          .left__title {
            font-weight: 600;
            font-size: boxValue(28);
          }

          .left__date {
            font-size: boxValue(20);
            color: #888;
          }
        }

        .stream__right {
          text-align: right;
          .right__control {
            font-weight: 600;
            font-size: boxValue(28);

            &.add {
              color: #009e38;
            }

            &.sub {
              color: #e31a31;
            }
          }

          .right__detail {
            font-size: boxValue(20);
            color: #888;
          }
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(30);
          width: 100%;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>

