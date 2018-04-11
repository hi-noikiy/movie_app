<template>
  <div id="forget">
    <div class="login__input">
      <div class="input__mobile">
        <input type="password" maxlength="11" v-model="password" placeholder="请输入密码">
      </div>
      <div class="input__mobile">
        <input type="password" maxlength="11" v-model="password2" placeholder="重复输入密码">
      </div>
    </div>
    
    <div class="login__submit" @click="submit">立即验证</div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: null,
        password2: null,
        sendText: '获取验证码',
        isSend: false,
        checked: true,
        type: this.$route.query.type,
        mobile: this.$route.query.mobile
      }
    },

    methods: {
      submit() {
        let type = 9;
        let mobile;

        if(!this.password || !this.password2) {
          this.$toast('请输入密码', 'fail');
          return false;
        }

        if(this.password != this.password2) {
          this.$toast('密码不一致', 'fail');
          return false;
        }

        if(this.type) {
          type = 8;
        }

        this.$load(1, '请求中');

        this.$Api.UserUpdate({a: type, mobile: this.mobile, password: this.password}).then((res) => {
          if(res.q.s == 0) {
            this.$toast('验证成功，返回登录页').then(() => {
              this.updateUserDetail();
              this.$router.push({name:'Login'})
            })
          }else {
            this.$toast(res.q.d, 'fail');
          }
        })
        this.$load(2);
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #forget {
    height: auto;
    min-height: 100%;
    padding-top: 1px;
    background: #fff;

    .login__logo {
      margin-top: boxValue(180);
      text-align: center;

      .logo {
        width: boxValue(230);
        height: boxValue(223);
      }
    }

    .login__input {
      width: 90%;
      margin: 0 auto;
      margin-top: boxValue(70);
      overflow: hidden;
    }

    .input__mobile,
    .input__code {
      margin: 0 auto;
    }

    .input__mobile {
      margin-bottom: boxValue(40);
      height: boxValue(70);
      // width: 100%;
      line-height: boxValue(70);
      color: #fff;
      box-sizing: border-box;
    }

    .input__code {
      display: flex;
      justify-content: space-between;

      .input {
        height: boxValue(70);
        line-height: boxValue(70);
        width: auto;
      }

      .code {
        display: inline-block;
        height: boxValue(70);
        width: boxValue(240);
        line-height: boxValue(70);
        color: #fff;
        border-radius: boxValue(50);
        font-size: boxValue(28);
        text-align: center;
        background: #02a9ff;
        white-space: nowrap;
        box-sizing: border-box;

        &.sended {
          color: #fff;
          background: #666;
        }
      }
    }

    .login__submit {
      margin: 0 auto;
      margin-top: boxValue(60);
      width: 90%;
      height: boxValue(70);
      line-height: boxValue(70);
      text-align: center;
      color: #fff;
      border-radius: boxValue(50);
      font-size: boxValue(28);
      background: #02a9ff;
    }

    .login__tips {
      margin-top: boxValue(20);
      height: boxValue(70);
      line-height: boxValue(70);
      font-size: boxValue(24);
      text-align: center;
      color: #fff;
      .check {
        display: inline-block;
        width: boxValue(26);
        height: boxValue(26);
        background-image: url('../../assets/ticker.png');
        background-size: 100%;
        vertical-align: middle;

        &.unchecked {
          background-image: none;
        }
      }
    }

    .login__reg {
      display: flex;
      margin: 0 5%;
      margin-top: boxValue(40);
      justify-content: space-between;
      font-size: boxValue(20);
      color: #fff;

      .login__reg__active {

      }
    }

    input {
      height: 100%;
      width: 100%;
      border: none;
      border-bottom: 1px solid #eee;
      font-size: boxValue(28);
      outline: none;
      background: transparent;
      color: #666;
      border-radius: 0;

      &::-webkit-input-placeholder {
        color: #ccc;
      }
    }
  }
</style>
