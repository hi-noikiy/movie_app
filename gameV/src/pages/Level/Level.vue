<template>
    <div id="level">
    <div class="level">
      <div class="level__top">
        <div class="top__title">普通会员</div>
        <div class="top__total">累计获取<span id="points"></span>积分</div>
        <div class="level1 hide">
          <div class="top__process">
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/1.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/2.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/3.png" alt="">
              </div>
            </div>
          </div>
          <div class="top__line level-1">
            <div class="points active">
              <span class="points__text active">大众会员</span>
            </div>
            <div class="points">
              <span class="points__text">黄金会员</span>
            </div>
            <div class="points">
              <span class="points__text">铂金会员</span>
            </div>
          </div>
        </div>
        
        <div class="level2 hide">
          <div class="top__process">
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/1.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/2.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/3.png" alt="">
              </div>
            </div>
          </div>
          <div class="top__line level-2">
            <div class="points active">
              <span class="points__text">大众会员</span>
            </div>
            <div class="points active">
              <span class="points__text active">黄金会员</span>
            </div>
            <div class="points">
              <span class="points__text">铂金会员</span>
            </div>
          </div>
        </div>

        <div class="level3 hide">
          <div class="top__process">
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/2.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/3.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/4.png" alt="">
              </div>
            </div>
          </div>
          <div class="top__line level-3">
            <div class="points active">
              <span class="points__text">黄金会员</span>
            </div>
            <div class="points active">
              <span class="points__text active">铂金会员</span>
            </div>
            <div class="points">
              <span class="points__text">钻石会员</span>
            </div>
          </div>
        </div>

        <div class="level4 hide">
          <div class="top__process">
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/3.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/4.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/5.png" alt="">
              </div>
            </div>
          </div>
          <div class="top__line level-4">
            <div class="points active">
              <span class="points__text">铂金会员</span>
            </div>
            <div class="points active">
              <span class="points__text active">钻石会员</span>
            </div>
            <div class="points">
              <span class="points__text">至尊会员</span>
            </div>
          </div>
        </div>

        <div class="level5 hide">
          <div class="top__process">
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/3.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/4.png" alt="">
              </div>
            </div>
            <div class="icon">
              <div class="icon__img">
                <img src="../../assets/5.png" alt="">
              </div>
            </div>
          </div>
          <div class="top__line level-5">
            <div class="points active">
              <span class="points__text">铂金会员</span>
            </div>
            <div class="points active">
              <span class="points__text">钻石会员</span>
            </div>
            <div class="points active">
              <span class="points__text active">至尊会员</span>
            </div>
          </div>
        </div>

        <div class="top__tips">
          <span class="icon">升级</span>
          <span class="tips">再获取<span id="difference"></span>积分升级为<span id="type"></span></span>
        </div>
      </div>

      <div class="level__content">
        <p>1.会员等级（暂定分为5级）</p>
        <p>（1）大众会员：0-5000积分</p>
        <p>（2）黄金会员：5000-10000积分</p>
        <p>（3）铂金会员：10000-30000积分</p>
        <p>（4）钻石会员：30000-60000积分</p>
        <p>（5）至尊会员：60000积分以上</p>

        <p class="m-20">2.等级特权</p>
        <p>（1）大众会员：积分兑换礼品，每周接受赠送积分上限200分；</p>
        <p>（2）黄金会员：积分兑换礼品折扣（9.5折），每周接受赠送积分上限250分；</p>
        <p>（3）铂金会员：积分兑换礼品优先权，积分兑换礼品折扣（9折），生日特权（系统送礼品），每周接受赠送积分上限300分；</p>
        <p>（4）钻石会员：积分兑换礼品优先权，积分兑换礼品折扣（8.5折），生日特权（系统送礼品），每周接受赠送积分上限350分；</p>
        <p>（5）至尊会员：积分兑换礼品优先权，积分兑换礼品折扣（8折），生日特权（系统送礼品），每周接受赠送积分上限400分。</p>

        <p class="m-20">3.升级规则</p>
        <p>（1）用户在日常累计积分达到升级门槛值后，新等级立即生效，用户可享受新等级特权；</p>
        <p>（2）用户积分长期有效，用户正常获取积分或消耗积分会影响累计积分，使用积分兑换权益，权益兑换失败后积分可退回；</p>
        <p>（3）消耗积分不影响等级；</p>
        <p>（3）温馨提示：请勿违规刷积分，如发现您存在违规行为，我们有权取消您获得积分的资格 ，并追究法律责任。</p>

      </div>

      <div class="level__btn hide">如何获取积分</div>
    </div> 
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },

    mounted() {
      let type = this.$route.query.type;
      let points = this.$route.query.point;

      if(type) {
        $('.level__btn').show();
        $('.level__btn').click(function() {
          location.href = 'http://web.yyh517.com/#/getPoints'
        })
      }

      if(points) {
        points = parseInt(points);
        $('#points').html(points);
        if(points <= 5000) {
          $('.level1').show();
          $('#difference').html(5000 - points);
          $('#type').html('黄金会员');
          $('.top__title').html('大众会员');
        }else if(points <= 10000) {
          $('.level2').show();
          $('#difference').html(10000 - points);
          $('#type').html('铂金会员');
          $('.top__title').html('黄金会员');
        }else if(points <= 30000) {
          $('.level3').show();
          $('#difference').html(30000 - points);
          $('#type').html('钻石会员');
          $('.top__title').html('铂金会员');
        }else if(points <= 60000) {
          $('.level4').show();
          $('#difference').html(60000 - points);
          $('#type').html('至尊会员');
          $('.top__title').html('钻石会员');
        }else if(points > 60000) {
          $('.level5').show();
          $('.top__title').html('至尊会员');
          $('.tips').html('恭喜你已经成为最高等级会员了！');
        }
      }
    }
  }
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }
  /* 会员等级 */
  #level {
    padding-bottom: boxValue(80);

    .level__top {
      padding-top: 1px;
      background: #0d3043;

      .top__title {
        margin-top: boxValue(26);
        font-size: boxValue(26);
        font-weight: 600;
        text-align: center;
        color: #fff;
      }

      .top__total {
        margin-top: boxValue(10);
        margin-bottom: boxValue(40);
        font-size: boxValue(24);
        text-align: center;
        color: #fff;
      }

      .top__process {
        font-size: 0;
        .icon {
          display: inline-block;
          width: 33.3%;
          font-size: 0;
          text-align: center;
          
          .icon__img {
            img {
              width: boxValue(121);
              height: boxValue(93);
            }
          }

          .icon__text {
            font-size: boxValue(24);
          }
        }
      }

      .top__line {
        position: relative;
        margin-top: boxValue(12);
        height: boxValue(6);
        width: 100%;
        font-size: 0;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 33.3%;
          height: boxValue(6);
          background: #39acf4;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 66.3%;
          height: boxValue(6);
          background: #86a0b1;
        }

        .points {
          position: relative;
          display: inline-block;
          font-size: 0;
          width: 33.3%;

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: boxValue(3);
            transform: translate(-50%, -50%);
            width: boxValue(28);
            height: boxValue(28);
            border-radius: 50%;
            background: #86a0b1;
          }

          .points__text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: boxValue(26);
            font-size: boxValue(24);
            color: #86a0b1;

            &.active {
              color: #39acf4;
            }
          }
        }
      }

      .top__line.level-1 {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: boxValue(6);
          background: #39acf4;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 16.65%;
          width: 83.35%;
          height: boxValue(6);
          background: #86a0b1;
        }
      }

      .top__line.level-3,
      .top__line.level-2 {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: boxValue(6);
          background: #39acf4;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: boxValue(6);
          background: #86a0b1;
        }
      }

      .top__line.level-4 {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: boxValue(6);
          background: #39acf4;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 83.35%;
          height: boxValue(6);
          background: #86a0b1;
        }
      }

      .top__line.level-5 {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 83.35%;
          height: boxValue(6);
          background: #39acf4;
        }

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 83.35%;
          height: boxValue(6);
          background: #86a0b1;
        }
      }

      .points.active {
        &::after {
          content: '';
          background: #39acf4;
        }
      }

      .top__tips {
        margin-top: boxValue(60);
        height: boxValue(72);
        line-height: boxValue(72);
        color: #fff;
        text-align: center;

        .icon {
          padding: 0 boxValue(16);
          background: #32aefb;
          border-radius: boxValue(30);
        }
      }
    }

    .level__content {
      padding: boxValue(30);
      font-size: boxValue(24);

      p.m-20 {
        margin-top: boxValue(30);
      }
    }

    .hide {
      display: none;
    }

    .level__btn {
      position: fixed;
      left: 0;
      bottom: 0;
      height: boxValue(80);
      width: 100%;
      line-height: boxValue(80);
      color: #fff;
      text-align: center;
      font-size: boxValue(28);
      background: #1eabfb;
    }
  }
</style>
