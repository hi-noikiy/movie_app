<template>
  <div id="friend">
    <div class="friend__apply">
      <MenuOnce :img="require('../../assets/newfriend.png')" class="friend__apply__img">
        <template slot="left">好友申请</template>
        <template slot="right">3个好友申请</template>
      </MenuOnce>
    </div>

    <MyInvite />
  </div>
</template>

<script>
  import MyInvite from '@/components/Invite/Invite'
  import MenuOnce from '@/components/Menu/Menu';

  export default {
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


