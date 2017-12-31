<template>
  <div id="checkList">
    <checklist label-position="left" :options="commonList" v-model="checkList" @on-change="change"></checklist>
  </div>
</template>

<script>
  import { Checklist } from 'vux';

  export default {
    data() {
      return {
        checkList: []
      }
    },
    components: {
      Checklist
    }
  }
</script>

