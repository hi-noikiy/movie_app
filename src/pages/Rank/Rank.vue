<template>
  <div id="rank">
    <div class="rank__info">
      需20名以上好友，且连续7天排行前三，送1000积分
    </div>
    <div class="rank__myself">
      <div class="myself__left">
        <div class="left__img">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="left__info">
          <div class="info__name">William</div>
          <div class="info__detail">第2名，已连续5天排行前三</div>
        </div>
      </div>
      <div class="myself__right">8646</div>
    </div>

    <div class="rank__list">
      <div class="rank">
        <div class="rank__left">
          <div class="rank__left__num">1</div>
          <div class="rank__left__img">
            <img src="../../assets/avatar.png" alt="">
          </div>
          <div class="rank__left__name">医仔小太妹</div>
        </div>
        <div class="rank__right">19292</div>
      </div>

      <div class="rank">
        <div class="rank__left">
          <div class="rank__left__num">2</div>
          <div class="rank__left__img">
            <img src="../../assets/avatar.png" alt="">
          </div>
          <div class="rank__left__name">医仔小太妹</div>
        </div>
        <div class="rank__right">19292</div>
      </div>

      <div class="rank">
        <div class="rank__left">
          <div class="rank__left__num">3</div>
          <div class="rank__left__img">
            <img src="../../assets/avatar.png" alt="">
          </div>
          <div class="rank__left__name">医仔小太妹</div>
        </div>
        <div class="rank__right">19292</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },

    created() {
      this.getUserRankList();
    },

    methods: {
      getUserRankList() {
        this.$Api.getUserRankList().then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';
  
  #rank {
    .rank__info {
      height: boxValue(62);
      line-height: boxValue(62);
      text-align: center;
      font-size: boxValue(24);
      color: #fff;
      background: #228be4;
    }

    .rank__myself {
      padding: boxValue(18) 0;
      height: boxValue(74);
      font-size: 0;
      background: #fff;

      .myself__left {
        float: left;
        padding-left: boxValue(44);

        .left__img {
          display: inline-block;
          width: boxValue(60);
          height: boxValue(60);
          line-height: boxValue(60);

          img {
            width: boxValue(60);
            height: boxValue(60);
            border-radius: 50%;
            vertical-align: middle;
          }
        }

        .left__info {
          display: inline-block;
          padding-top: boxValue(14);
          padding-left: boxValue(16);
          height: boxValue(60);
          vertical-align: middle;

          .info__name {
            padding-bottom: boxValue(4);
            font-size: boxValue(24);
            font-weight: 600;
          }

          .info__detail {
            font-size: boxValue(20);
          }
        }
      }

      .myself__right {
        float: right;
        margin-right: boxValue(30);
        line-height: boxValue(74);
        font-size: boxValue(38); 
        font-weight: 600;
        color: #009d00;
      }
    }

    .rank__list {
      margin-top: boxValue(18);

      .rank {
        position: relative;
        padding: boxValue(18) 0;
        height: boxValue(74);
        font-size: 0;
        background: #fff;

        .rank__left {
          float: left;
          
          .rank__left__num {
            display: inline-block;
            width: boxValue(44);
            font-size: boxValue(30);
            text-align: center;
            vertical-align: middle;
          }

          .rank__left__img {
            display: inline-block;
            width: boxValue(60);
            height: boxValue(60);
            line-height: boxValue(60);

            img {
              width: boxValue(60);
              height: boxValue(60);
              border-radius: 50%;
              vertical-align: middle;
            }
          } 

          .rank__left__name {
            display: inline-block;
            padding-left: boxValue(16);
            font-size: boxValue(20);
            font-weight: 600;
            vertical-align: middle;
          }
        }

        .rank__right {
          float: right;
          margin-right: boxValue(30);
          line-height: boxValue(74);
          font-size: boxValue(38); 
          font-weight: 600;
          color: #f7941d;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(104);
          width: 100%;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>
