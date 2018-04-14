<template>
  <div id="login">
    <div class="login__logo">
      <img class="logo" src="../../assets/loginlogo.png" alt="">
    </div>
    <div class="login__input">
      <div class="input__mobile">
        <input type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号">
      </div>
      <div class="input__mobile">
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
    </div>
    
    <div class="login__submit" @click="submit">立即登录</div>
    
    <div class="login__reg">
      <span class="login__reg__active" @click="linkTo('Register')">注册</span>
      <div class="login__reg__forget" @click="linkTo('Forget')">忘记密码</div>
    </div>
  </div>
</template>

<script>
  const md5 = require('md5');
  export default {
    data() {
      return {
        mobile: null,
        password: null,
        checked: true,
        type: this.$route.query.type
      }
    },

    created() {
      if(this.$route.query.info) {
        this.$toast('登录失效,重新登录', 'fail');
      }
    },

    methods: {
      submit() {
        if(!this.mobile) {
          this.$toast('请输入手机号', 'fail');
          return false;
        }

        if(!this.password) {
          this.$toast('请输入密码', 'fail');
          return false;
        }


        this.$Api.UserLogin({mobile: this.mobile, password: md5(this.password)}).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$toast('验证成功，请返回首页').then(() => {
              this.updateUserDetail();
              this.$router.push({name:'Index'})
            })
          }else {
            this.$toast(res.q.d, 'fail');
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #login {
    height: auto;
    min-height: 100%;
    padding-top: 1px;
    background: url('../../assets/loginbg.jpg');
    background-size: 100%;

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
        color: #5d73f5;
        border-radius: boxValue(50);
        font-size: boxValue(28);
        text-align: center;
        background: #fff;
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
      color: #5d73f5;
      border-radius: boxValue(50);
      font-size: boxValue(28);
      background: #fff;
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
      margin: 0 10%;
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
      border-bottom: 1px solid #fff;
      font-size: boxValue(28);
      outline: none;
      background: transparent;
      color: #fff;
      border-radius: 0;

      &::-webkit-input-placeholder {
        color: #fff;
      }
    }
  }
</style>
