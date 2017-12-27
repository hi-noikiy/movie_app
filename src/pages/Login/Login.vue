<template>
  <div id="login">
    <input type="text" v-model="mobile">
    <button @click="getSms">获取验证码</button>
    <input type="text" v-model="code">
    <button @click="submit">验证手机</button>
    <button @click="get">获取 </button>
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
        this.$Api.getSMSCode(1, 1, 13192262697).then((res) => {
          console.log(res)
        })
      },

      submit() {
        this.$Api.getSMSCode(2, 1, 13192262697, this.code).then((res) => {
          console.log(res)
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
