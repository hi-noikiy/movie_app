<template>
  <div id="signature">
    <group>
      <x-textarea :max="200" :height="120" v-model="signature" :placeholder="'请填写好友申请~'"></x-textarea>
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
    methods: {
      submit() {
        if(!this.signature){
          this.$toast('请填写好友申请', 'fail')
          return false;
        }

        let param = {
          a: 5,
          userId: this.$route.query.id,
          validationInfo: this.signature
        }
        this.$Api.FriendUpdate(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('提交成功!').then(() => {
              this.$router.go(-1);
            })
          }
        })
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