<template>
  <div id="friending">
    <MyInvite />
  </div>
</template>

<script>
  import MyInvite from '@/components/Friending/Friending'
  import MenuOnce from '@/components/Menu/Menu';

  export default {
    components: {
      MenuOnce,
      MyInvite
    }
  }
</script>

