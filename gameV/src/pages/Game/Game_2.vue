<template>
  <div class="container">
    <div id="scroll" :style="{'background-image': 'url(' + gameBg + ')'}">
      <div class="scroll__wrap">
        <div class="wrap">
          <div class="scroll">
            <div class="item" v-for="(gift, index) in giftData" :key="index">
              <div class="item__name">{{gift.name}}</div>
              <img :src="$ImgUrl + gift.imagePath" alt="" v-if="gift.imagePath">
            </div>
          </div>
          <div class="scroll scroll_2">
            <div class="item" v-for="(gift, index) in giftData" :key="index">
              <div class="item__name">{{gift.name}}</div>
              <img :src="$ImgUrl + gift.imagePath" alt="" v-if="gift.imagePath">
            </div>
          </div>
          <div class="scroll scroll_3">
            <div class="item" v-for="(gift, index) in giftData" :key="index">
              <div class="item__name">{{gift.name}}</div>
              <img :src="$ImgUrl + gift.imagePath" alt="" v-if="gift.imagePath">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn">
      <div class="btn__top" @click="start">
        <div class="button">
          立即抽奖
        </div> 
      </div>
      <div class="btn__bottom">
        <div class="button" @click="showDetail">
          游戏规则
        </div>
        <div class="button" @click="share">
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
        gifts: [],
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
      // $.each($('.scroll'), function() {
      //   console.log($(this))
      //   var html = $(this).html();
      //   $(this).html(html + html + html);
      // })

      // var height = 220/64;

      // $('.scroll').eq(0).animate({top: -4*height + 'rem'}, 2000)
      // $('.scroll').eq(1).animate({top: -6*height + 'rem'}, 2000)
      // $('.scroll').eq(2).animate({top: -8*height + 'rem'}, 2000)
      this.$Api.GameDetails(1).then((res) => {
        console.log(res);
        if(res.q.s == 0) {
          this.gifts = res.q.game.gifts;
          this.gifts.push({name: '谢谢参与'});
          this.gameBg = this.$ImgUrl + res.q.game.imagePath;
          this.cost = res.q.game.cost;
        }
      })
    },

    computed: {
      giftData() {
        let result = []
        if(this.gifts.length > 0) {
          let temp = [].concat(this.gifts, this.gifts, this.gifts);
          result = temp;
          return result;
        }else {
          return result;
        }
      }
    },

    methods: {
      start() {
        if(this.isload) {
          return false;
        }

        this.$load(1);
        this.$Api.GameDetails(1).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$load(2)
            this.cost = res.q.game.cost;
            let str;
            if(this.cost == 0) {
              str = '首次不需要扣除积分' 
            }else {
              str = '玩该次游戏需要' + this.cost + '积分';
            }

            this.$confirm('', str, 'noImg').then((res) => {
              if(res == 'sure') {
                this.$load(1);
                this.$Api.getUserDetails().then((res) => {
                  console.log(res);
                  if(res.q.s == 0) {
                    let canUseIntegral = res.q.user.canUseIntegral? res.q.user.canUseIntegral:'0';
                    if(canUseIntegral && parseInt(canUseIntegral) > parseInt(this.cost)) {
                      this.$load(1);
                      this.isload = true;

                      var height = 220/64;
                      $('.scroll').eq(0).animate({top: 0*height + 'rem'}, 0)
                      $('.scroll').eq(1).animate({top: 0*height + 'rem'}, 0)
                      $('.scroll').eq(2).animate({top: 0*height + 'rem'}, 0)
                      this.$Api.GameUpdate(1,1,this.sessionId).then((res) => {
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
                            this.translate(this.gifts.length - 1);
                          }else if(res.q.id) {
                            let result = this.gifts.findIndex((item) => {
                              return item.id == res.q.id;
                            })

                            this.translate(result, this.gifts[result])
                          }
                        }else {
                          this.$toast(res.q.d, 'fail');
                          this.isload = false;
                        }

                        this.$load(2);
                      })
                    }else {
                      this.$toast('你积分不足('+canUseIntegral+'), 需要' + this.cost + '积分', 'fail');
                      this.$load(2);
                    }
                  }else {
                    this.$toast(res.q.d,'fail');
                    this.$load(2);
                  }
                })
              }
            });
          }else {
            this.$load(2);
            this.$toast(res.q.d,'fail');
          }
        })
      },

      translate(index, gift) {
        var height = 220/64;
        if(index != undefined) {
          let len = this.giftData.length;
          let rotate = (-index)*2*(len/3);
          console.log(((-index)+(-2)*len/3))
          $('.scroll').eq(0).animate({top: ((-index)+(-1)*len/3)*height + 'rem'}, 2000)
          $('.scroll').eq(1).animate({top: ((-index)+(-2)*len/3)*height+ 'rem'}, 2000)
          $('.scroll').eq(2).animate({top: ((-index)+(-1)*len/3)*height + 'rem'}, 2000)
        }

        setTimeout(() => {
          if(gift) {
            this.$confirm('', '恭喜获得'+gift.name + '!', 'gift', this.$ImgUrl + gift.imagePath);
          }else {
            this.$toast('抱歉，没有中奖', 'fail');
          }

          this.isload = false;
        }, 2000)
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

  #scroll {
    position: relative;
    width: 100%;
    height: 100%;
    // background: url('../../assets/bg3.jpg') no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;

    .scroll__wrap {
      position: relative;
      margin: boxValue(300) auto 0 auto;
      width: boxValue(609);
      height: boxValue(406);
      background: url('../../assets/scroll.png') no-repeat;
      background-size: 100%;
      font-size: 0;

      .wrap {
        position: absolute;
        left: 0;
        top: boxValue(35);
        width: boxValue(479);
        height: boxValue(220);
        padding: 0 boxValue(65) 0 boxValue(65);
        overflow: hidden;
      }

      .scroll {
        position: absolute;
        width: boxValue(156);
        height: boxValue(220);
        vertical-align:middle;
        font-size: 0;

        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: boxValue(220);

          .item__name {
            width: 100%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            font-weight: 600;
            color: #333;
          }
          img {
            width: boxValue(80);
            height: boxValue(80);   
          }
        }
      }

      .scroll_2 {
        left: boxValue(231);
      }

      .scroll_3 {
        right: boxValue(65);
      }
    }
  }
</style>

