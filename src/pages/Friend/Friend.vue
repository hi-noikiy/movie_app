<template>
  <div id="friend">
    <div class="friend__apply" @click="linkTo('Friending')">
      <MenuOnce :img="require('../../assets/newfriend.png')" class="friend__apply__img">
        <template slot="left">好友申请</template>
        <template slot="right">{{userDetail.statNewFriends?userDetail.statNewFriends:'0'}}个好友申请</template>
      </MenuOnce>
    </div>

    <MyInvite :type="'friend'" :userList="userList"/>
  </div>
</template>

<script>
  import MyInvite from '@/components/Invite/Invite'
  import MenuOnce from '@/components/Menu/Menu';

  export default {
    data() {
      return {
        userList: []
      }
    },
    created() {
      // let json = sessionStorage.getItem('user');
      // if(json) {
      //   this.userDetail = JSON.parse(json);
      // }

      // this.updateUserDetail();
      this.getUserList();
    },
    methods: {
      getUserList() {
        let param = {
          a: 2
        }
        this.$Api.getUserList(param).then((res) => {
          if(res.q.s == 0) {
            this.userList = res.q.users;
          }
        })
      }
    },
    components: {
      MenuOnce,
      MyInvite
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  .friend__apply__img {
    margin: boxValue(20) 0;
    background: #fff;
    
    img {
      width: boxValue(40)!important;
      height: boxValue(40)!important;
    } 
  }
</style>


