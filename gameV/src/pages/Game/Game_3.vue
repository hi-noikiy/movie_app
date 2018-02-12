<template>
  <div class="container">
    <div id="egg" :style="{'background-image': 'url(' + gameBg + ')'}">
      <div class="egg__list">
        <div class="egg"  @click="eggClick(1)">
          <div class="wrap" :class="{'rotate': startStatus}">
            <img src="../../assets/egg_a.png" alt="" v-if="active== 1 && loading">
            <img src="../../assets/egg.png" alt="" v-else>
          </div>
          <span class="hammer" v-if="active== 1"></span>
        </div>
        <div class="egg" @click="eggClick(2)">
          <div class="wrap" :class="{'rotate': startStatus}">
            <img src="../../assets/egg_a.png" alt="" v-if="active== 2 && loading">
            <img src="../../assets/egg.png" alt="" v-else>
          </div>
          <span class="hammer" v-if="active== 2"></span>
        </div>
        <div class="egg" @click="eggClick(3)">
          <div class="wrap" :class="{'rotate': startStatus}">
            <img src="../../assets/egg_a.png" alt="" v-if="active== 3 && loading">
            <img src="../../assets/egg.png" alt="" v-else>
          </div>
          <span class="hammer" v-if="active== 3"></span>
        </div>
      </div>
    </div>

    <div class="btn">
      <div class="btn__top">
        <div class="button" @click="start">
          立即砸蛋
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
        active: '',
        startStatus: false,
        loading: false,
        gifts: [],
        sessionId: this.$route.query.s,
        type: null,
        gameBg: '',
        isload: false
      }
    },

    created() {
      if(this.$route.query.type == 'android') {
        this.type = 'android';
      }
      // $('.egg__list').on('click', '.egg', function() {
      //   $(this).find('img').attr('src', require('../../assets/egg_a.png'))
      // })
      this.$Api.GameDetails(3).then((res) => {
        console.log(res)
        if(res.q.s == 0) {
          this.gifts = res.q.game.gifts;
          this.gameBg = this.$ImgUrl + res.q.game.imagePath;
        }
      })
    },

    methods: {
      eggClick(index) {
        if(this.isload) {
          return false;
        }
        if(!this.startStatus) {
          this.$toast('请开始游戏', 'fail');
          return false;
        }

        this.startStatus = false;
        this.active = index;
        this.loading = true;
        let time = 600;

        this.$load(1);
        this.isload = true;

        this.$Api.GameUpdate(3,1,this.sessionId).then((res) => {
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
              setTimeout(() => {
                this.$toast('很抱歉没有中奖','fail');
                this.active = '';
                this.loading = false;
                this.isload = false;
              }, time)
            }else if(res.q.id) {
              let gift = this.gifts.find((item) => {
                return item.id == res.q.id;
              })

              if(!gift) {
                setTimeout(() => {
                  this.$toast('出错了,找不到对应的奖品','fail');
                  this.active = '';
                  this.loading = false;
                  this.isload = false;
                }, time)
                return false;
              }

              setTimeout(() => {
                this.$confirm('', '恭喜获得'+ gift.name + '!', 'gift', this.$ImgUrl + gift.imagePath);
                this.active = '';
                this.loading = false;
                this.isload = false;
              }, time)
            }
          }else {
            setTimeout(() => {
              this.$toast(res.q.d,'fail');
              this.active = '';
              this.loading = false;
              this.isload = false;
            }, time)
          }
          this.$load(2);
        })
      },

      start() {
        this.startStatus = true;
      },

      share() {
        // if(this.type) {
        window.location.href = 'share://';
        // }else {
        //   this.$toast('抱歉，正在开发中', 'fail')
        // }
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
  
  #egg {
    position: relative;
    width: 100%;
    height: 100%;
    // background: url('../../assets/bg2.jpg') no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    text-align: center;

    .egg__list {
      margin-top: boxValue(340);
      display: inline-block;
      font-size: 0;

      .egg {
        position: relative;
        display: inline-block;
        width: boxValue(200);
        height: boxValue(170);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .rotate {
        animation: scaleBig 1s ease-in-out infinite;
      }

      .hammer {
        position: absolute;
        top: boxValue(-80);
        right: boxValue(-20);
        display: inline-block;
        height: boxValue(118);
        width: boxValue(100);
        background: url('../../assets/hammer.png') no-repeat;
        background-size: 100%;
        animation: hammer 1s ease-in-out infinite;
        transform-origin: bottom right;
      }

      @keyframes hammer {
        0% {
          transform: rotate(-5deg);
        }

        30% {
          transform: rotate(-14deg);
        }

        100% {
          transform: rotate(-5deg);
        }
      }

      @keyframes scaleBig {
        0%,100% {
          transform: rotate(0);
        }

        20%,40%,60%,80% {
          transform: rotate(-3deg);
        }

        10%,30%,50%,70%,90% {
          transform: rotate(3deg);
        }
      }
    }
  }
</style>
