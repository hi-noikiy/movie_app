<template>
  <div id="edit">
    <div class="edit__image"></div>
    <div class="edit__input">
      <div class="input input__avatar">
        <div class="input__left">
          <span>头像</span>
        </div>
        <div class="input__right">
          <img class="input__right__avatar" src="../../assets/headportrait.png" alt="">
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>昵称</span>
        </div>
        <div class="input__right">
          <input class="input__right__text" type="text" placeholder="请输入昵称">
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>性别</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">男</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>生日</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">1994-02-01</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>情感状态</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">单身/已婚/情侣</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>地区</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">广东广州</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>行业</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">互联网</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>个性签名</span>
        </div>
        <div class="input__right">
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>喜欢类型</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">悬疑、悬疑、悬疑、悬疑、悬疑</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>喜欢明星</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">悬疑、悬疑、悬疑、悬疑、悬疑</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>

      <div class="input">
        <div class="input__left">
          <span>手机号</span>
        </div>
        <div class="input__right">
          <span class="input__right__value">1342124141</span>
          <span class="input__right__arrow"></span>
        </div>
      </div>
    </div>

    <div class="edit__btn">
      <span class="btn">放弃修改</span>
      <span class="btn sure">保存</span>
    </div>
  </div>
</template>

<script>
  import { Cell, Group, Picker, GroupTitle, XButton } from 'vux';
  let years = []
  for (var i = 2000; i <= 2030; i++) {
    years.push({
      name: i + '年',
      value: i + ''
    })
  }
  export default {
    data() {
      return {
        years: [years,years],
        year1: []
      }
    },
    methods: {
      change() {
        console.log(1)
      }
    },
    components: {
      Picker,
      GroupTitle,
      XButton,
      Cell,
      Group
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #edit {
    margin-bottom: boxValue(100);

    .input {
      display: flex;
      padding: boxValue(0) boxValue(30);
      justify-content: space-between;
      align-items: center;
      margin-bottom: boxValue(20);
      height: boxValue(74);
      background: #fff;

      .input__left {
        font-size: boxValue(26);
      }

      .input__right {
        display: flex;
        align-items: center;

        .input__right__arrow {
          display: inline-block;
          margin-top: boxValue(-2);
          margin-left: boxValue(15);
          width: boxValue(16);
          height: boxValue(29);
          background: url('../../assets/arrow_enter.png');
          background-size: 100%;
          vertical-align: middle;
        }

        .input__right__text {
          text-align: right;
          border: none;
          outline: none;
        }

        .input__right__value {
          color: #666;
        }

        .input__right__avatar {
          width: boxValue(88);
          height: boxValue(88);
          border-radius: 50%;
        }
      }
    }

    .input__avatar {
      height: boxValue(140);
    }

    .edit__btn {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: boxValue(72);
      width: 100%;
      line-height: boxValue(72);
      font-size: boxValue(28);
      border-top: 1px solid #eee;

      .btn {
        flex: 1;
        text-align: center;
        background: #fff;
        color: #999;
      }

      .btn.sure {
        color: #fff;
        background: #27adff;
      }
    }
  }
</style>
