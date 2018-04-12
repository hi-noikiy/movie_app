<template>
  <div id="exchange">
    <div class="exchange__address" @click="linkTo('Address')">
      <div class="menu clearfix">
        <span class="menu__left"><i class="icon"></i><span class="icon__text">收货人信息</span></span>
        <span class="menu__right"></span>
      </div>

      <div class="menuAuto clearfix">
        <div class="menu__left">
          <p class="left__text">
            <span class="left__text__name">{{transfromData.consignee}}</span>
            <span class="left__text__mobile">{{transfromData.mobile}}</span>
          </p>
          <p class="left__text">{{transfromData.regionInfo + transfromData.street}}</p>
        </div>
        <div class="menu__right"><i class="arrow"></i></div>
      </div>
    </div>
    <div class="exchange__good">
      <div class="item">
        <div class="item__left">
          <img :src="$ImgUrl + item.imagePath" alt="">
        </div>
        <div class="item__right">
          <div class="right__title">
            {{item.name}}
          </div>
          <div class="right__price" v-if="item.type == 1 || item.type == 3">
            <span>面值</span>
            <span class="price__num">{{parseFloat(item.price)}}</span>
            <span>元</span>
          </div>
          <div class="right__price" v-if="item.type == 2 || item.type == 4">
            <span class="price__num">{{parseFloat(item.integral)}}</span>
            <span>积分</span>
          </div>
          <div class="right__origin" v-if="item.type == 2 || item.type == 4">
            <span>原价</span>
            <span>{{parseFloat(item.marketPrice)}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="exchange__btn" @click="active">立即兑换</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {},
        address: {}
      }
    },

    created() {
      let json = sessionStorage.getItem('exchange');
      if(json) {
        this.item = JSON.parse(json);
      }

      this.getAddressDetails();
    },

    computed: {
      transfromData() {
        if(Object.keys(this.address).length > 0) {
          console.log(this.address);
          let address = this.address.regionInfo.map((item) => {
            return item.name
          }).join('');

          let Obj = Object.assign({}, this.address);
          Obj.regionInfo = address;

          return Obj;
        }else {
          return {}
        }
      }
    },

    methods: {
      //获取地址信息
      getAddressDetails() {
        this.$Api.getAddressDetails().then((res) => {
          if(res.q.s == 0) {
            this.address = res.q.address;
            let json = JSON.stringify(this.address);
            sessionStorage.setItem('getAddress', json);
          }
        })
      },

      submit() {
        let result = this.checkIsVisitor();
        if(result) {
          return false;
        }

        this.$load(1, '领取中');
        // this.$toast('抱歉正在开发中', 'fail');
        // return false;
        let param = {
          a: 1,
          couponId: this.item.id,
          transferWay: 1
        }
        this.$Api.OrderSubmit(param).then((res) => {
          if(res.q.s == 0) {
            
            this.$toast('领取成功!');
            this.updateUserDetail();
          }else {
            this.$toast(res.q.d, 'fail')
          }
          this.$load(2);
        })
      },

      //需要积分兑换的
      submitPoints() {
        let result = this.checkIsVisitor();
        if(result) {
          return false;
        }
        
        let sub = parseInt(this.userDetail.canUseIntegral) - parseInt(this.item.integral);
        if(sub < 0) {
          this.$toast('积分不够!', 'fail');
          return false;
        }
        this.$confirm('兑换将消耗'+ this.item.integral +'积分，兑换后剩余'+ sub +'积分，是否继续兑换', '', 'info').then((res) => {
          if(res == 'sure') {
            this.submit();
          }
        });
      },

      active() {
        if(Object.keys(this.item).length == 0) {
          this.$toast('网络错误,稍后再试', 'fail');
          return false;
        }

        if(Object.keys(this.address).length == 0) {
          this.$toast('请填写地址', 'fail');
          return false;
        }

        if(this.item.type == 1 || this.item.type == 3) {
          this.submit();
        }else {
          this.submitPoints();
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #exchange {
    .exchange__address {
      padding: boxValue(20) 0;
    }
    .item {
      position: relative;
      height: boxValue(150);
      padding-top: boxValue(20);
      padding-bottom: boxValue(20);
      background: #fff;
      overflow: hidden;

      .item__left {
        float: left;
        padding-left: boxValue(20);
        margin-right: boxValue(10);
        line-height: boxValue(150);

        img {
          width: boxValue(140);
          height: boxValue(140);
          vertical-align: middle;
        }
      }

      .item__right {
        float: left;
        .right__title {
          font-size: boxValue(26);
          width: boxValue(440);
          font-weight: 600;
          color: #222;
        }

        .right__price {
          padding-top: boxValue(10);
          font-size: boxValue(22);
          color: #ff4444;

          span {
            color: #ff4444;
          }

          .price__num {
            font-size: boxValue(34);
            font-weight: 600;
          }
        }

        .right__origin {
          position: absolute;
          left: boxValue(170);
          bottom: boxValue(30);
          color: #666;
        }
      }

      .right__date {
        padding-top: boxValue(8);
      }

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: boxValue(20);
        width: 100%;
        border-bottom: 1px solid #eee;
      }

      .collection__btn {
        position: absolute;
        right: boxValue(30);
        bottom: boxValue(20);
        padding: boxValue(10) boxValue(24);
        color: #fff;
        font-size: boxValue(22);
        background: #7695a5;
        border-radius: boxValue(24);
      }

      .collection__btn.active {
        background: #02a9ff;
      }
    }

    .menu {
      height: boxValue(74);
      line-height: boxValue(74);
      padding-left: boxValue(34);
      border-bottom: 1px solid #eee;
      background: #fff;

      .menu__left {
        font-size: boxValue(26);
        line-height: boxValue(74);
        color: #222;

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
    }

    .menuAuto {
      display: flex;
      align-items: center;
      height: auto;
      padding-left: boxValue(34);
      border-bottom: 1px solid #eee;
      background: #fff;

      .menu__left {
        width: 80%;
        padding: boxValue(20) 0;
        font-size: boxValue(20);
        color: #666;

        .icon__text {
          display: inline-block;
          vertical-align: middle;
        }

        .left__text {
          padding: boxValue(10) 0;
        }

        .left__text__mobile {
          padding-left: boxValue(20);
        }
      }

      .menu__right {
        margin-left: 12%;
        width: boxValue(16);
        height: boxValue(29);
        background: url('../../assets/arrow_enter.png');
        background-size: cover;
        vertical-align: middle;
      }
    }

    .exchange__btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: boxValue(70);
      line-height: boxValue(70);
      font-size: boxValue(26);
      text-align: center;
      color: #fff;
      background: #27adff;
    }
  }

  p {
    margin: 0;
  }
</style>
