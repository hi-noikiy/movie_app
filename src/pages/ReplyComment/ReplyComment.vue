<template>
  <div id="replyComment">
    <group>
      <x-textarea :max="200" :height="120" v-model="signature" :placeholder="'请填写评论~'"></x-textarea>
    </group>

    <div class="replyComment__btn button" @click="submit">确定</div>
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
        let result = this.checkIsVisitor();
        if(result) {
          return false;
        }
        
        if(!this.signature){
          this.$toast('请输入个性签名', 'fail')
          return false;
        }

        let id = this.$route.query.id;

        this.$Api.CommentSubmit(id, this.signature).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('提交成功').then(() => {
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

  #replyComment {
    overflow: hidden;
    padding-top: boxValue(20);
  }
</style>
