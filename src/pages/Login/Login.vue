<template>
  <div id="login">
    <div class="login__logo">
      <img class="logo" src="../../assets/loginlogo.png" alt="">
    </div>
    <div class="login__input">
      <div class="input__mobile">
        <input type="text" maxlength="11" v-model="mobile" placeholder="请输入手机号">
      </div>
      <div class="input__code">
        <input class="input" type="text" v-model="code" placeholder="请输入验证码">
        <span class="code" @click="getSms">{{sendText}}</span>
      </div>
    </div>
    
    <div class="login__submit" @click="submit">验证手机</div>
    <div class="login__tips">
      <span class="check"></span>
      <span>我已阅读并同意《云影汇用户注册协议》</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mobile: null,
        code: null,
        sendText: '获取验证码',
        isSend: false
      }
    },

    methods: {
      getSms() {
        if(this.isSend) {
          return false;
        }

        this.$load(1, '请求中');
        

        this.$Api.getSMSCode(1, 1, this.mobile).then((res) => {
          if(res.q.s == 0) {
            this.isSend = true;
            let count = 60;
            this.sendText = count + 's';

            for(let i = 1; i <= count; i++) {
              setTimeout(() => {
                if(i == count) {
                  this.isSend = false;
                  this.sendText = '获取验证码'

                  return false;
                }
                this.sendText = (count -i) + 's'
              }, 1000*i)
            }
          }else {
            this.$toast(res.q.d, 'fail')
          }

          this.$load(2);
        })
      },

      submit() {
        this.$Api.getSMSCode(2, 1, this.mobile, this.code).then((res) => {
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
    height: 100%;
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
