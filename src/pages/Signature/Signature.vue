<template>
  <div id="signature">
    <group>
      <x-textarea :max="200" :height="120" v-model="signature" :placeholder="'请填写个性签名~'"></x-textarea>
    </group>

    <div class="signature__btn button" @click="submit">确定</div>
  </div>
</template>

<script>
  import { XTextarea, Group } from 'vux'

  export default {
    data() {
      return {
        signature: ''
      }
    },
    created() {
      let signature = sessionStorage.getItem('signature', this.signature);
      
      if(signature) {
        this.signature = signature;
      }
    },
    methods: {
      submit() {
        if(!this.signature){
          this.$toast('请输入个性签名', 'fail')
          return false;
        }

        this.$toast('提交成功').then(() => {
          sessionStorage.setItem('signature', this.signature);
          this.$router.go(-1);
        });
      }
    },
    components: {
      XTextarea,
      Group
    },
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #signature {
    overflow: hidden;
    padding-top: boxValue(20);
  }
</style>
