<template>
  <div id="uploadResult">
    <div class="uploadResult__title">
      <span>票根照片</span>
    </div>
    <div class="uploadResult__pic">
      <div class="pic">
        <img :src="$ImgUrl + img" alt="">
      </div>
      <span class="pic__passed">已通过</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        img: this.$route.query.img
      }
    },
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #uploadResult {
    .uploadResult__title {
      padding-left: boxValue(30);
      width: 100%;
      height: boxValue(78);
      line-height: boxValue(78);
      font-size: boxValue(28);
    }

    .uploadResult__pic {
      position: relative;
      padding: boxValue(10) boxValue(30);
      background: #fff;

      .pic {
        display: inline-block;
        width: boxValue(154);
        height: boxValue(154);
        padding-right: boxValue(14);
        padding-top: boxValue(10);
        padding-bottom: boxValue(10);

        img {
          width: 100%;
          height: 100%;
          border-radius: boxValue(10);
        }
      }
      
      .pic__passed {
        position: absolute;
        right: boxValue(30);
        bottom: boxValue(40);
        width: boxValue(74);
        height: boxValue(74);
        line-height: boxValue(74);
        font-size: boxValue(20);
        color: #fff;
        background: #2ed031;
        transform: rotate(-15deg);
        border-radius: 50%;
      }
    }
  }
</style>
