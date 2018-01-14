<template>
  <div id="code">
    <div class="code__content">
      <div class="content__title">
        商家输入数字验证立即使用
      </div>
      <div class="content__value">
        <div class="wrap">
          <span class="value" v-for="(item,index) in value">
            {{item}}
          </span>
          <span class="value" v-for="item in (12-value.length)">_</span>
        </div>
        <!-- <div class="wrap">
          <span class="value" v-for="item in (12-value.length)">6</span>
        </div> -->
        <!-- <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span>
        <span class="value">6</span> -->
      </div>

      <div class="submit" @click="OrderUpdate" v-if="type == 'input'">核销</div>
    </div>
    <!-- 数字键盘 -->
    <!-- <van-number-keyboard
      :show="type == 'input'"
      close-button-text="完成"
      @input="onInput"
      @delete="onDelete"
      @blur="test"
    /> -->
    <van-number-keyboard
      :show="type == 'input'"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: [],
        show: true,
        type: 'normal'
      };
    },

    created() {
      if(this.$route.query.type == 'input') {
        this.type = 'input'
      }else if(this.$route.query.val) {
        this.value = this.$route.query.val;
      }
    },

    methods: {
      onInput(key) {
        console.log(key)
        if(this.value.length < 12) {
          this.value.push(key);
        }else {
          return false;
        }
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
      },

      OrderUpdate() {
        if(this.value.length != 12) {
          this.$toast('请输入验证码', 'fail')
          return false;
        }

        this.$load(1, '验证中');
        let code = this.value.join('');

        this.$Api.OrderUpdate(code).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('操作成功!');
            this.value = [];
          }else {
            this.$toast(res.q.d, 'fail');
          }
          this.$load(2);
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #code {
    height: 100%;

    .code__content {
      .content__title {
        margin: boxValue(86) 0;
        text-align: center;
        font-size: boxValue(32);
      }

      .content__value {
        margin: 0 auto;
        text-align: center;
        display: flex;

        .wrap {
          margin: 0 auto;
          display: flex;
        }

        .value {
          display: inline-block;
          width: boxValue(42);
          text-align: center;
          font-size: boxValue(32);
          color: #0085f2;
        }

        .value:nth-child(4n) {
          padding-right: boxValue(36);
        }

        .value:last-child {
          padding-right: 0;
        }
      }
    }

    .submit {
      margin: boxValue(200) auto;
      color: #fff;
      width: boxValue(280);
      height: boxValue(68);
      line-height: boxValue(68);
      font-size: 13px;
      text-align: center;
      border-radius: boxValue(60);
      background: #02a9ff;
    }
  }
</style>