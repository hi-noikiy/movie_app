<template>
  <div id="merchants">
    <div class="merchants__list">
      <div class="merchant">
        <Merchant />
      </div>
      <div class="merchant">
        <Merchant />
      </div>
      <div class="merchant">
        <Merchant />
      </div>
      <div class="merchant">
        <Merchant />
      </div>
      <div class="merchant">
        <Merchant />
      </div>
    </div>

    <div class="merchants__location">
      地图查看
    </div>
  </div>
</template>

<script>
  import Merchant from '@/components/Merchant/Merchant';

  export default {
    components: {
      Merchant
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #merchants {
    height: 100%;
    margin-top: boxValue(20);
    margin-bottom: boxValue(100);

    .merchant {
    }

    .merchants__location {
      position: fixed;
      bottom: 0;
      left: 0;
      height: boxValue(70);
      width: 100%;
      line-height: boxValue(70);
      font-size: boxValue(28);
      text-align: center;
      color: #fff;
      background: #27adff;
    }
  }
</style>
