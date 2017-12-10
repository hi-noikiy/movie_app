<template>
  <div id="uploadTicket">
    <div class="uploadTicket__title">
      <span>票根照片</span>
    </div>
    <div class="uploadTicket__pic">
      <div class="pic">
        <img src="../../assets/imgadd.png" alt="">
      </div>
    </div>
    <div class="uploadTicket__tips">
      请尽量保证票根清晰以供审核，审核通过才能获得积分
    </div>
    <div class="uploadTicket__submit">
      立即上传
    </div>
  </div>
</template>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #uploadTicket {
    .uploadTicket__title {
      padding-left: boxValue(30);
      width: 100%;
      height: boxValue(78);
      line-height: boxValue(78);
      font-size: boxValue(28);
    }

    .uploadTicket__pic {
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
    }

    .uploadTicket__tips {
      padding: boxValue(28) 0;
      font-size: boxValue(24);
      text-align: center;
      color: #5e5e5e;
    }

    .uploadTicket__submit {
      margin: 0 auto;
      width: boxValue(560);
      height: boxValue(72);
      line-height: boxValue(72);
      color: #fff;
      text-align: center;
      background: #02a9ff;
      border-radius: boxValue(16);
    }
  }
</style>
