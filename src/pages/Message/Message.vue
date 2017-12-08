<template>
  <div id="message">
    <Message :type="'message'"/>
  </div>
</template>

<script>
  import Message from '@/components/Invite/Invite';

  export default {
    components: {
      Message
    }
  }
</script>


