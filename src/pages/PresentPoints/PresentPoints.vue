<template>
  <div id="presentPoints">
    <div class="presentPoints__form">
      <div class="form__input">
        <div class="form__input__text">赠送积分</div>
        <input type="text" class="form__input__input" v-model="point" placeholder="请输入赠送数量">
      </div>
      <div class="form__tips">可用积分{{userDetail.canUseIntegral}}</div>
    </div>
    <div class="presentPoints__btn button" @click="submit">立即赠送</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        point: null,
        id: this.$route.query.id
      }
    },

    methods: {
      submit() {
        if(!this.point) {
          this.$toast('请输入赠送的数量', 'fail');
          return false;
        }

        console.log(this.point.match(/^\d*$/))

        if(!this.point.match(/^\d*$/)) {
          this.$toast('只能输入数字', 'fail');
          return false;
        }

        if(parseInt(this.point) > parseInt(this.userDetail.canUseIntegral)) {
          this.$toast('不能大于可用积分', 'fail');
          return false;
        }

        this.$router.push({name: 'PhoneCode', query: {
          id: this.id,
          type: 5,
          point: this.point
        }})

        // this.$Api.FriendUpdate({a:2, integral: parseInt(this.point), userId: this.id}).then((res) => {
        //   console.log(res);
        //   if(res.q.s == 0) {
        //     this.$toast('操作成功!').then(() => {
        //       this.$router.go(-1);
        //     })
        //   }else {
        //     this.$toast(res.q.d, 'fail')
        //   }
        // })
      }
    }
  }  
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #presentPoints {
    margin-top: boxValue(20);

    .presentPoints__form {
      padding: boxValue(20) boxValue(30);
      background: #fff;
    }
    .form__input {
      display: flex;
      justify-content: space-between;
      font-size: boxValue(28);

      .form__input__text {
        width: boxValue(160);
      }

      .form__input__input {
        text-align: right;
        width: 80%;
        border: none;
        outline: none;
      }
    }
    
    .form__tips {
      margin-top: boxValue(30);
      font-size: boxValue(24);
      color: #666;
    }

    .presentPoints__btn {
      margin-top: boxValue(20);
    }
  }
</style>

