<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #333;
  }

  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}

  html,body {
    height: 100%;
    background: #f5f5f5;
  }

  #app {
    height: 100%;
  }
</style>
