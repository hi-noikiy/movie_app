<template>
  <div class="container">
    <div id="game" :style="{'background-image': 'url(' + gameBg + ')'}">
      <div class="turnt">
        <div class="turnt__game">
          <div class="turnt__game__item" :class="'item_' + (index + 1)" v-for="(gift,index) in gifts" :key="index">
            <div class="item__name">{{gift.name}}</div>
            <img :src="$ImgUrl + gift.imagePath" alt="" v-if="gift.imagePath">
            <!-- <img src="../../assets/gift1.png" alt="" v-else> -->
          </div>
        </div>
        <div class="turnt__pointer"></div>
      </div>
    </div>

    <div class="btn">
      <div class="btn__top">
        <div class="button" id="start" @click="start">
          立即抽奖
        </div> 
      </div>
      <div class="btn__bottom">
        <div class="button" @click="showDetail">
          游戏规则
        </div>
        <div class="button" @click="share" v-if="sessionId">
          分享给好友
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        giftData: [],
        sessionId: this.$route.query.s,
        type: null,
        gameBg: '',
        isload: false,
        cost: 0
      }
    },

    created() {
      if(this.$route.query.type == 'android') {
        this.type = 'android';
      }
      this.$Api.GameDetails(2,this.sessionId).then((res) => {
        console.log(res)
        if(res.q.s == 0) {
          this.giftData = res.q.game.gifts;
          this.gameBg = this.$ImgUrl + res.q.game.imagePath;
          this.cost = res.q.game.cost;
        }
      })
    },

    computed: {
      gifts() {
        let result = [];
        for(let i = 0; i < 6; i++) {
          if(this.giftData[i]) {
            result.push(this.giftData[i]);
          }else {
            result.push({
              name: '谢谢参与'
            })
          }
        }

        return result;
      }
    },

    methods: {
      start() {
        if(this.isload) {
          return false;
        }

        this.$load(1);
        this.$Api.GameDetails(2,this.sessionId).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$load(2);
            this.cost = res.q.game.cost;
            let str;

            if(this.cost == 0) {
              //str = '首次不需要扣除积分'
              this.$load(1);
              this.$Api.getUserDetails(this.sessionId).then((res) => {
                console.log(res);
                if(res.q.s == 0) {
                  let canUseIntegral = res.q.user.canUseIntegral? res.q.user.canUseIntegral:'0';
                  if(canUseIntegral && parseInt(canUseIntegral) > parseInt(this.cost)) {
                    this.isload = true;

                    $('.turnt__game').css({
                      '-webkit-transition': 'unset',
                      '-ms-transition': 'unset',
                      'transition': 'unset',
                      '-webkit-transform': 'rotate(0deg)',
                      '-ms-transform': 'rotate(0deg)',
                      'transform': 'rotate(0deg)'
                    });
                    this.$Api.GameUpdate(2,1,this.sessionId).then((res) => {
                      console.log(res);
                      if(res.q.s == 0) {
                        if(res.q.cost != undefined) {
                          if(res.q.cost == 0) {
                            this.$toastB('第一次不消耗积分');
                          }else {
                            this.$toastB('消耗了'+res.q.cost+'积分');
                          }
                        }
                        if(res.q.id == undefined) {
                          this.translate(6);
                        }else if(res.q.id) {
                          let result = this.gifts.findIndex((item) => {
                            return item.id == res.q.id;
                          })

                          this.translate(result + 1, this.gifts[result])
                        }
                      }else {
                        this.$toast(res.q.d, 'fail')
                        this.isload = false;
                      }
                      this.$load(2);
                    })
                  }else {
                    this.$load(2);
                    this.$toast('你积分不足('+canUseIntegral+'), 需要' + this.cost + '积分', 'fail');
                  }
                }else {
                  this.$load(2);
                  this.$toast(res.q.d,'fail');
                }
              })
            }else {
              str = '玩该次游戏需要' + this.cost + '积分';
              this.$confirm('', str, 'noImg').then((res) => {
                if(res == 'sure') {
                  this.$load(1);
                  this.$Api.getUserDetails(this.sessionId).then((res) => {
                    console.log(res);
                    if(res.q.s == 0) {
                      let canUseIntegral = res.q.user.canUseIntegral? res.q.user.canUseIntegral:'0';
                      if(canUseIntegral && parseInt(canUseIntegral) > parseInt(this.cost)) {
                        this.isload = true;

                        $('.turnt__game').css({
                          '-webkit-transition': 'unset',
                          '-ms-transition': 'unset',
                          'transition': 'unset',
                          '-webkit-transform': 'rotate(0deg)',
                          '-ms-transform': 'rotate(0deg)',
                          'transform': 'rotate(0deg)'
                        });
                        this.$Api.GameUpdate(2,1,this.sessionId).then((res) => {
                          console.log(res);
                          if(res.q.s == 0) {
                            if(res.q.cost != undefined) {
                              if(res.q.cost == 0) {
                                this.$toastB('第一次不消耗积分');
                              }else {
                                this.$toastB('消耗了'+res.q.cost+'积分');
                              }
                            }
                            if(res.q.id == undefined) {
                              this.translate(6);
                            }else if(res.q.id) {
                              let result = this.gifts.findIndex((item) => {
                                return item.id == res.q.id;
                              })

                              this.translate(result + 1, this.gifts[result])
                            }
                          }else {
                            this.$toast(res.q.d, 'fail')
                            this.isload = false;
                          }
                          this.$load(2);
                        })
                      }else {
                        this.$load(2);
                        this.$toast('你积分不足('+canUseIntegral+'), 需要' + this.cost + '积分', 'fail');
                      }
                    }else {
                      this.$load(2);
                      this.$toast(res.q.d,'fail');
                    }
                  })
                }
              });
            }
          }else {
            this.$load(2);
            this.$toast(res.q.d,'fail');
          }
        })
      },

      translate(index, gift) {
        var rotate;
        switch(index) {
          case 1:
            rotate = 3930; //第6个
            console.log('第1个')
            break;
          case 2:
            rotate = 3870; //弟5个
            console.log('第1个')
            break;
          case 3:
            rotate = 3810; //第4个
            console.log('第3个')
            break;
          case 4:
            rotate = 3750; //第3个
            console.log('第4个')
            break;
          case 5:
            rotate = 3690; //第一个
            console.log('第5个')
            break;
          case 6:
            rotate = 3630; //第一个
            console.log('第6个')
            break;
          default:
            rotate = 3750; //第3个
            console.log('第6个')
        }

        setTimeout(function (){
          if(true) {
            $('.turnt__game').css({
            '-webkit-transition': 'all 2s ease-out',
            '-ms-transition': 'all 2s ease-out',
            'transition': 'all 2s ease-out',
            '-webkit-transform': 'rotate('+rotate+'deg)',
            '-ms-transform': 'rotate('+rotate+'deg)',
            'transform': 'rotate('+rotate+'deg)'
          });
          }
        }, 100)

        setTimeout(() => {
          if(gift) {
            this.$confirm('', '恭喜获得'+gift.name + '!', 'gift', this.$ImgUrl + gift.imagePath);
          }else {
            this.$toast('抱歉，没有中奖', 'fail');
          }
          this.isload = false;
        }, 2200)
      },

      share() {
        // if(this.type) {
        //   window.location.href = 'share://';
        // }else {
        //   this.$toast('抱歉，正在开发中', 'fail')
        // }
        window.location.href = 'share://';
      },

      showDetail() {
        this.$pop()
      }
    }
  }
</script>

<style lang="scss">
  @function boxValue($font) {
    @return $font / 64 + rem;
  }

  #game {
    width: 100%;
    height: 100%;
    // background: url('../../assets/bg.jpg') no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    
    .turnt {
      position: relative;
      margin: boxValue(120) auto 0 auto;
      width: boxValue(520);
      height: boxValue(520);

      .turnt__pointer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        width: boxValue(140);
        height: boxValue(140);
        background: url('../../assets/pointer.png') no-repeat;
        background-size: 100%;
      }

      .turnt__game {
        position: relative;
        width: boxValue(520);
        height: boxValue(520);
        background: url('../../assets/turnt.png') no-repeat;
        background-size: 100%;
        // animation: spin 800ms infinite linear;
        // transition: all 2s;

        .turnt__game__item {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1;
          left: 50%;
          // padding-top: boxValue(60);
          height: boxValue(260);
          width: boxValue(200);
          top: 0;
          transform: translate(-50%, 0);
          transform-origin: center bottom;
          font-size: boxValue(30);
          font-weight: 600;

          .item__name {
            font-size: 12px;
            margin-bottom: boxValue(4);
            text-align: center;
            width: boxValue(160);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            width: boxValue(60);
            height: boxValue(60);     
          }
        }

        .item_1 {
          transform: translate(-50%, 0) rotate(30deg);
        }

        .item_2 {
          transform: translate(-50%, 0) rotate(90deg);
        }

        .item_3 {
          transform: translate(-50%, 0) rotate(150deg);
        }

        .item_4 {
          transform: translate(-50%, 0) rotate(210deg);
        }

        .item_5 {
          transform: translate(-50%, 0) rotate(270deg);
        }

        .item_6 {
          transform: translate(-50%, 0) rotate(330deg);
        }
      }
    }
  }

  .rotate {
    animation: spin 0.5s linear infinite;
  }
    

  @keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
