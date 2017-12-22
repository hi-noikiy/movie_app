<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      if(!sessionStorage.getItem('sessionId')) {
        this.$Api.getSession().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            sessionStorage.setItem('sessionId', res.s);
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './scss/mixin.scss';

  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}

  #app .vux-tab .vux-tab-item {
    background: none;
  }

  html,body {
    height: 100%;
    background: #f5f5f5;
  }

  .border_line {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: boxValue(20);
      width: 100%;
      border-bottom: 1px solid #eee;
    }
  }

  #app {
    height: 100%;
  }
</style>
