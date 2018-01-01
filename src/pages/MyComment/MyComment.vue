<template>
  <div id="myComment">
    <Comment :type="'comment'" :comment="commentList" class="comment"/>
  </div>  
</template>

<script>
  import Comment from '@/components/Comment/Comment';
  
  export default {
    data() {
      return {
        commentList: []
      }
    },
    created() {
      this.getReviewList();
    },
    methods: {
      getReviewList() {
        let param = {
          a: 5,
        }
        this.$Api.getReviewList(param).then((res) => {
          if(res.q.s == 0) {
            this.commentList = res.q.reviews;
          }
        })
      }
    },
    components: {
      Comment
    }
  }
</script>

<style lang="scss">
  #myComment {
    .comment {
      background: #fff;
    }
  }
</style>

