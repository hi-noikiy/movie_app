<template>
  <div id="friending">
    <MyInvite :type="'friend'" :userList="userList"/>
  </div>
</template>

<script>
  import MyInvite from '@/components/Friending/Friending'

  export default {
    data() {
      return {
        userList: []
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      getUserList() {
        let param = {
          a: 3
        }
        this.$Api.getUserList(param).then((res) => {
          console.log(res)
          if(res.q.s == 0 ) {
            this.userList = res.q.users;
          }
        })
      }
    },
    components: {
      MyInvite
    }
  }
</script>

