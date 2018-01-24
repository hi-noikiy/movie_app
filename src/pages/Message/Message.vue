<template>
  <div id="message">
    <Message :userList="recentSessMap" :type="'message'"/>
  </div>
</template>

<script>
  import Message from '@/components/Sess/Sess';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    created() {
      this.updateIM();
    },

    computed: {
      ...mapGetters([
        'recentSessMap'
      ])
    },

    methods: {
      ...mapActions([
        'updateIM'
      ])
    },

    components: {
      Message
    }
  }
</script>


