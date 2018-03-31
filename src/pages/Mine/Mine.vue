<template>
  <div id="mine">
    <div class="mine__header" v-if="isVisitor">
      <div class="header__mes">
        <!-- <div class="mes">
          <span class="mes__num">2</span>
        </div> -->
      </div>
      <div class="header__info clearfix">
        <div class="info__left">
          <div class="left__name">{{visitorDetail.nickname}}</div>
          <div class="left__tips" @click="linkTo('Person', true)">完善资料，送500积分</div>
          <div class="left__tab">
            <span class="tab tab__member" @click="linkToLevel">
              大众会员
            </span>
            <span class="tab tab__singIn" @click="linkTo('Sign', true)">
              签到+10
            </span>
          </div>
        </div>
        <div class="info__right">
          <div class="right__avatar" @click="linkTo('Person', true)">
            <img :src="visitorDetail.imagePath" alt="" v-if="visitorDetail.imagePath">
            <img src="../../assets/avatar.png" alt="" v-else>
          </div>
        </div>
      </div>
      <div class="header__form">
        <div class="form__tab" @click="linkTo('Points', true)">
          <div class="tab__top">
            -
          </div>
          <div class="tab__bottom">
            积分
          </div>
        </div>
        <div class="form__tab" @click="linkTo('CardList', true)">
          <div class="tab__top">
            <span class="num">-</span>
          </div>
          <div class="tab__bottom">
            卡券 
          </div>
        </div>
        <div class="form__tab" @click="linkTo('Friend', true)">
          <div class="tab__top">
            <span class="num">-</span>
          </div>
          <div class="tab__bottom">
            好友
          </div>
        </div>
        <div class="form__tab" @click="linkTo('Dating', true)">
          <div class="tab__top">
            <span class="num">-</span>
          </div>
          <div class="tab__bottom">
            约影
          </div>
        </div>
      </div>
    </div>

    <div class="mine__header" v-else>
      <div class="header__mes">
        <!-- <div class="mes">
          <span class="mes__num">2</span>
        </div> -->
      </div>
      <div class="header__info clearfix">
        <div class="info__left">
          <div class="left__name">{{userDetail.nickname}}</div>
          <div class="left__tips" @click="linkTo('Person')">{{userDetail.isCompleteData == '0' || userDetail.isCompleteData == '2'?'完善资料，送500积分':''}}</div>
          <div class="left__tab">
            <span class="tab tab__member" @click="linkToLevel">
              {{userDetail.integralLevel == '1'?'大众会员':userDetail.integralLevel == '2'?'黄金会员':userDetail.integralLevel == '3'?'铂金会员':userDetail.integralLevel == '4'?'钻石会员':userDetail.integralLevel == '5'?'至尊会员':''}}
            </span>
            <span class="tab tab__friend" v-if="userDetail.isManyFriend == 1">交友达人</span>
            <span class="tab tab__singIn singed" @click="linkTo('Sign')" v-if="userDetail.isSign == 1">
              已签到
            </span>
            <span class="tab tab__singIn" @click="linkTo('Sign')" v-else>
              签到+{{userDetail.getFromSign}}
            </span>
          </div>
        </div>
        <div class="info__right">
          <div class="right__avatar" @click="linkTo('Person')">
            <img :src="$ImgUrl + userDetail.imagePath" alt="" v-if="userDetail.imagePath">
            <img src="../../assets/avatar.png" alt="" v-else>
          </div>
        </div>
      </div>
      <div class="header__form">
        <div class="form__tab" @click="linkTo('Points')">
          <div class="tab__top">
            {{userDetail.canUseIntegral}}
          </div>
          <div class="tab__bottom">
            积分
          </div>
        </div>
        <div class="form__tab" @click="linkTo('CardList')">
          <div class="tab__top">
            <span class="num">{{userDetail.statCoupon}}<span class="tab__num" v-if="userDetail.statNewCoupon > 0">{{userDetail.statNewCoupon}}</span></span>
          </div>
          <div class="tab__bottom">
            卡券 
          </div>
        </div>
        <div class="form__tab" @click="linkTo('Friend')">
          <div class="tab__top">
            <span class="num">{{userDetail.statFriends}}<span class="tab__num" v-if="userDetail.statNewFriends > 0">{{userDetail.statNewFriends}}</span></span>
          </div>
          <div class="tab__bottom">
            好友
          </div>
        </div>
        <div class="form__tab" @click="linkTo('Dating')">
          <div class="tab__top">
            <span class="num"> {{userDetail.statDate}}<span class="tab__num" v-if="userDetail.statNewDate > 0">{{userDetail.statNewDate}}</span></span>
          </div>
          <div class="tab__bottom">
            约影
          </div>
        </div>
      </div>
    </div>

    <div class="mine__menu">
      <div class="menu__top">
        <div class="menu top__money clearfix" @click="linkTo('Collect', true)">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">我的关注</span></span>
          <span class="menu__right"><i class="arrow"></i></span>
        </div>
        <div class="menu bottom__rank clearfix" @click="linkTo('Rank', true)">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">积分排行榜</span></span>
          <span class="menu__right"><span v-if="userDetail.lastsDaysRanking > 0">已连续{{userDetail.lastsDaysRanking}}天排行前三</span><i class="arrow"></i></span>
        </div>
        <div class="menu top__follow clearfix" @click="linkTo('Message', true)">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">我的消息</span></span>
          <span class="menu__right"><i class="arrow"></i></span>
        </div>
      </div>

      <div class="menu__bottom">
        <div class="menu bottom__comment clearfix" @click="linkTo('MyComment', true)">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">我的影评</span></span>
          <span class="menu__right"><i class="arrow"></i></span>
        </div>
        <div class="menu bottom__ticket clearfix" @click="linkTo('Ticket', true)">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">我的票根</span></span>
          <span class="menu__right"><i class="arrow"></i></span>
        </div>
        <div class="menu bottom__rank clearfix" @click="linkTo('Record', true)" v-if="userDetail.type == 2">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">我的核销</span></span>
          <span class="menu__right"><i class="arrow"></i></span>
        </div>
        <div class="menu bottom__phone clearfix" @click="linkToTel">
          <span class="menu__left"><i class="icon"></i><span class="icon__text">客服电话</span></span>
          <span class="menu__right"><span class="nored">020-31525503</span><i class="arrow"></i></span>
        </div>
      </div>

      <div class="menu__logout button" @click="logout">登出</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // userDetail: {}
      }
    },

    created() {
      this.updateUserDetail();
    },

    methods: {
      getUserDetail() {
        this.$Api.getUserDetails().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.userDetail = res.q.user;
            let json = JSON.stringify(this.userDetail);
            sessionStorage.setItem('user', json);
          }
        })
      },

      logout() {
        this.$Api.UserLogout().then((res) => {
          this.$router.push({name:'Login'})
        })
      },

      linkToLevel() {
        if(this.isVisitor) {
          this.$router.push({
            name: 'Login'
          })
          return false;
        }
        location.href = 'http://game.yyh517.com/#/level?point='+ this.userDetail.totalIntegral;
      },

      linkToTel() {
        window.location.href='tel: 020-34534324'
      }
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';

  #mine {
    background: #f5f5f5;
    height: 100%;
    
    .mine__header {
      background: #fff;
      
      .header__mes {
        height: boxValue(60);

        .mes {
          position: relative;
          float: right;
          margin-top: boxValue(20);
          margin-right: boxValue(28);
          height: boxValue(48);
          width: boxValue(48);
          background: url('../../assets/information.png');
          background-size: cover;

          .mes__num {
            position: absolute;
            right: boxValue(-6);
            top: boxValue(-4);
            height: boxValue(28);
            width: boxValue(28);
            text-align: center;
            font-size: boxValue(20);
            line-height: boxValue(28);
            color: #fff;
            border-radius: boxValue(14);
            background: #ff4444;
          }
        }
      }

      .header__info {
        position: relative;
        padding-bottom: boxValue(20);

        &::before {
          content: '';
          position: absolute;
          bottom: boxValue(-16);
          left: boxValue(30);
          width: boxValue(610);
          border-bottom: 1px solid #eee; 
        }
        
        .info__left {
          margin-left: boxValue(30);

          .left__name {
            font-size: boxValue(32);
            font-weight: 600;
            color: #222;
          }

          .left__tips {
            padding: boxValue(20) 0;
            font-size: boxValue(20);
            color: #ff4444;
          }

          .left__tab {
            margin-top: boxValue(13);
            font-size: 0;

            .tab {
              margin: 0 boxValue(4);
              height: boxValue(46);
              color: #fff;
              font-size: boxValue(20);
              padding: boxValue(13) boxValue(20);
              background: #2ecc71;
              border-radius: boxValue(24);
            }

            .tab__friend {
              background: #9b59b6;
            }

            .tab__singIn {
              background: #02a9ff;

              &.singed {
                background: #86919b;
              }
            }
          }
        }

        .info__right {
          position: absolute;
          top: boxValue(18);
          right: boxValue(30);

          .right__avatar {
            height: boxValue(86);
            width: boxValue(86);

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 1px solid #eee;
            }
          }
        }
      }

      .header__form {
        display: flex;
        margin-top: boxValue(20);
        height: boxValue(98);
        font-size: 0;

        .form__tab {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: center;
          width: 25%;

          .tab__top {
            position: relative;
            font-size: boxValue(26);
            color: #222;
            .num {
              position: relative;
            }
          }

          .tab__bottom {
            font-size: boxValue(20);
            color: #888;
          }
        }
      }
    }

    .mine__menu {
      .menu__setting,
      .menu__bottom,
      .menu__top {
        margin-top: boxValue(20);
        background: #fff;
      }

      .menu {
        height: boxValue(74);
        line-height: boxValue(74);
        padding-left: boxValue(34);
        border-bottom: 1px solid #eee;

        .menu__left {
          font-size: boxValue(26);
          line-height: boxValue(74);
          color: #222;

          .icon {
            display: inline-block;
            width: boxValue(40);
            height: boxValue(43);
            margin-right: boxValue(20);
            background-image: url('../../assets/balance.png');
            background-size: cover;
            background-position: center;
            vertical-align: middle;
          }

          .icon__text {
            display: inline-block;
            vertical-align: middle;
          }
        }

        .menu__right {
          float: right;
          position: relative;
          line-height: boxValue(74);

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

          span {
            margin-right: boxValue(60); 
            display: inline-block;
            line-height: boxValue(74);
            vertical-align: middle;
            color: #ff4444;

            &.nored {
              color: #666;
            }
          }
        }

        &.top__bonus .menu__left .icon {
          background-image: url('../../assets/envelope.png');
        }

        &.top__follow .menu__left .icon {
          background-image: url('../../assets/attention.png');
        }

        &.bottom__rank .menu__left .icon {
          background-image: url('../../assets/list.png');
        }

        &.bottom__phone .menu__left .icon {
          background-image: url('../../assets/call@2x.png');
        }

        &.bottom__comment .menu__left .icon {
          background-image: url('../../assets/film_review.png');
        }

        &.bottom__ticket .menu__left .icon {
          background-image: url('../../assets/voucher.png');
        }
        
        &.setting .menu__left .icon {
          background-image: url('../../assets/settings.png');
        }
        
      }
    }

    .tab__num {
      position: absolute;
      right: boxValue(-40);
      top: boxValue(-6);
      height: boxValue(28);
      width: boxValue(28);
      text-align: center;
      font-size: boxValue(20);
      line-height: boxValue(28);
      color: #fff;
      border-radius: boxValue(14);
      background: #ff4444;
    }

    .menu__logout {
      margin-top: boxValue(60);
      background: #ccc;
      width: boxValue(460);
      height: boxValue(60);
      line-height: boxValue(60);
    }
  }
</style>


