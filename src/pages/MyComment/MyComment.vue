<template>
  <div id="myComment">
    <Comment :type="'comment'" :comment="commentList" class="comment" />
  </div>  
</template>

<script>
  import Comment from '@/components/Comment/Comment';
  
  export default {
    data() {
      return {
        id: this.$route.query.id,
        commentList: []
      }
    },
    created() {
      let param;
      if(this.id) {
        param = {
          a: 0,
          userId: this.id,
        }
        this.getReviewList(param);
      }else {
        param = {
          a: 5,
        }
        this.getReviewList(param);
      }
    },

    activated() {
      let param;
      this.id = this.$route.query.id;
      if(this.id) {
        param = {
          a: 0,
          userId: this.id,
        }
        this.getReviewList(param);
      }else {
        param = {
          a: 5,
        }
        this.getReviewList(param);
      }
    },

    methods: {
      getReviewList(param) {
        this.$Api.getReviewList(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.commentList = res.q.reviews;
          }
        })
      },
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

