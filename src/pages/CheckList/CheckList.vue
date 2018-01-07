<template>
  <div id="checkList">
    <checklist label-position="left" :options="checkList" v-model="checked" @on-change="change" v-if="!type"></checklist>
    <checklist label-position="left" :options="checkOneList" :max="1" v-model="checkOne" @on-change="changeI" v-else></checklist>
  </div>
</template>

<script>
  import { movieType,industryType } from '@/data/data.js';
  import { Checklist } from 'vux'

  export default {
    data() {
      return {
        checkList: movieType,
        checked: null,
        type: this.$route.query.type,
        checkOne: null,
        checkOneList: industryType
      }
    },
    methods: {
      change() {
        console.log(this.checked);
        let json = JSON.stringify(this.checked);
        sessionStorage.setItem('favoriteTypes', json);
      },
      changeI() {
        sessionStorage.setItem('industrySelect', this.checkOne[0]);
      }
    },
    components: {
      Checklist
    }
  }
</script>

