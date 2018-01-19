<template>
  <div class="merchant__list">
    <div class="merchant border_line" v-if="cinema">
      <div class="merchant__left">
        <div class="left__name">{{cinema.name}}</div>
        <div class="left__content">{{cinema.address}}</div>
      </div>
      <div class="merchant__right"  @click="linkToTel">
        <span class="merchant__right__phone"></span>
      </div>
    </div>
    <div class="merchant border_line" v-else-if="cinemaList" v-for="cinema in cinemaList">
      <div class="merchant__left">
        <div class="left__name">{{cinema.name}}</div>
        <div class="left__content">{{cinema.address}}</div>
      </div>
      <div class="merchant__right" @click="linkToTel">
        <span class="merchant__right__phone"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['cinema', 'cinemaList'],
    data() {
      return {

      }
    },

    methods: {
      linkToTel() {
        window.location.href='tel:123456789'
      }
    }
  }  
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .merchant {
    display: flex;
    flex-direction: row;
    padding: boxValue(14) 0;
    height: boxValue(114);
    background: #fff;

    .merchant__left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: boxValue(10) 0;
      padding-left: boxValue(20);
      height: boxValue(94);
      width: boxValue(520);

      .left__name {
        font-weight: 600;
        font-size: boxValue(20);
      }

      .left__content {
        font-size: boxValue(20);
        color: #888;
      }
    }

    .merchant__right {
      position: relative;
      width: boxValue(100);
      line-height: boxValue(114);
      text-align: center;

      .merchant__right__phone {
        display: inline-block;
        width: boxValue(54);
        height: boxValue(54);
        background: url('../../assets/telephone.png');
        background-size: cover;
        vertical-align: middle;
      }

      &:after {
        content: '';
        position: absolute;
        left: -1px;
        top: 50%;
        margin-top: boxValue(-35);
        height: boxValue(70);
        border-left: 1px solid #eee;
      }
    }
  }
</style>

