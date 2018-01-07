<template>
  <div id="login">
    <input type="text" maxlength="11" v-model="mobile">
    <button @click="getSms">获取验证码</button>
    <input type="text" v-model="code">
    <button @click="submit">验证手机</button>
    <button @click="linkTo('Index')">返回首页</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mobile: null,
        code: null
      }
    },

    methods: {
      getSms() {
        this.$Api.getSMSCode(1, 1, this.mobile).then((res) => {
          console.log(res)
        })
      },

      submit() {
        this.$Api.getSMSCode(2, 1, this.mobile, this.code).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('验证成功，请返回首页')
          }
        })
      },

      get() {
        this.$Api.getUserDetails().then((res) => {
        console.log(res)
      })
      }
    }
  }
</script>
