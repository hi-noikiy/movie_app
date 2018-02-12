<template>
  <div id="stream">
    <div class="stream__list" v-waterfall-lower="loadMore"
      waterfall-disabled="disabled"
      waterfall-offset="200">
      <div class="stream" v-for="item in integrals">
        <div class="stream__left">
          <div class="left__title">{{item.title}}</div>
          <div class="left__date">{{item.addTime}}</div>
        </div>
        <div class="stream__right">
          <div class="right__control" :class="{'add': parseInt(item.amount) >  0, 'sub': parseInt(item.amount) <  0}">{{(parseInt(item.amount) >  0?'+':'') + item.amount}}</div>
          <div class="right__detail">{{item.content}}</div>
        </div>
      </div>

      <!-- <div class="stream">
        <div class="stream__left">
          <div class="left__title">签到奖励</div>
          <div class="left__date">2017.10.23 12:22</div>
        </div>
        <div class="stream__right">
          <div class="right__control sub">-60</div>
          <div class="right__detail">首次签到</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { Waterfall } from 'vant';

  export default {
    data() {
      return {
        integrals: [],
        page: 1,
        limit: 10,
        isload: false,
        loaded: false
      }
    },

    directives: {
      WaterfallLower: Waterfall('lower'),
      WaterfallUpper: Waterfall('upper')
    },

    created() {
      this.getIntegralList();
    },

    methods: {
      getIntegralList() {
        this.isload = true;
        this.$Api.getIntegralList(this.page++, this.limit).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.integrals = [].concat(this.integrals,res.q.integrals);
            if(res.q.integrals.length == 0) {
              this.loaded = true;
            }
          }
          this.isload = false;
        })
      },

      loadMore() {
        if(this.loaded) {
          this.$toastB('没有更多记录了');
          return false;
        }

        if(this.isload) {
          return false;
        }

        this.getIntegralList();
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

