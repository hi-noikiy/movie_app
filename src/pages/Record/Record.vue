<template>
  <div id="record">
    <div class="record__head">
      <div class="record__head__avatar">
        <img src="../../assets/avatar.png" alt="">
      </div>
      <span class="record__head__name">William</span>
      <span class="record__head__location">飞扬影城(天河店)</span>
    </div>

    <div class="record__list">
      <div class="list__title">核销记录</div>
      <Item />
      <Item />
    </div>

    <div class="record__btn"></div>
  </div>
</template>

<script>
  import Item from '@/components/Item/Item';

  export default {
    components: {
      Item
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #record {
    .record__head {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: boxValue(300);

      .record__head__avatar {
        padding-top: boxValue(60);
        width: boxValue(120);
        height: boxValue(120);

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .record__head__name {
        padding: boxValue(16) 0;
        font-size: boxValue(28);
        font-weight: 600;
      }

      .record__head__location {
        font-size: boxValue(26);
      }
    }

    .record__list {
      .list__title {
        position: relative;
        padding-left: boxValue(20);
        height: boxValue(72);
        line-height: boxValue(72);
        font-size: boxValue(26);
        font-weight: 600;
        background: #fff;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(20);
          width: 100%;
          border-bottom: 1px solid #eee;
        }
      }
    }

    .record__btn {
      position: fixed;
      right: boxValue(24);
      bottom: boxValue(58);
      width: boxValue(120);
      height: boxValue(120);
      background: url('../../assets/scanningbtn.png');
      background-size: 100%;
    }
  }
</style>
