<template>
  <div class="menu clearfix">
    <span class="menu__left"><img :src="img" class="icon" /><span class="icon__text">
      <slot name="left"></slot>
      </span>
    </span>
    
    <span class="menu__right">
      <span><slot name="right"></slot></span>
      <i class="arrow"></i>
    </span>
  </div>
</template>

<script>
  export default {
    props: ['img'],
  }
</script>


<style lang="scss">
  @import '../../scss/mixin.scss';
  .menu {
    height: boxValue(74);
    line-height: boxValue(74);
    padding-left: boxValue(34);
    border-bottom: 1px solid #eee;

    .menu__left {
      font-size: boxValue(26);
      line-height: boxValue(74);
      color: #222;

      .icon {
        display: inline-block;
        padding-bottom: boxValue(6);
        width: boxValue(40);
        height: boxValue(43);
        margin-right: boxValue(20);
        vertical-align: middle;
      }

      .icon__text {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .menu__right {
      float: right;
      position: relative;
      line-height: boxValue(74);

      .arrow {
        position: absolute;
        right: boxValue(32);
        top: boxValue(22.5);
        display: inline-block;
        width: boxValue(16);
        height: boxValue(29);
        background: url('../../assets/arrow_enter.png');
        background-size: cover;
        vertical-align: middle;
      }

      span {
        margin-right: boxValue(60); 
        display: inline-block;
        line-height: boxValue(74);
        vertical-align: middle;
        color: #ff4444;
      }
    }
  }
</style>

