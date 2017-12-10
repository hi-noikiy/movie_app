<template>
  <div id="myComment">
    <Comment :type="'comment'" class="comment"/>
  </div>  
</template>

<script>
  import Comment from '@/components/Comment/Comment';
  
  export default {
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

