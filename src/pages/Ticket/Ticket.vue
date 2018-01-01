<template>
  <div id="ticket">
    <div class="ticket__list clearfix">
      <!-- <div class="ticket">
        <img src="../../assets/image.png" alt="">
      </div> -->
      <div class="ticket" v-for="(item,index) in ticket" :key="index">
        <img :src="$ImgUrl + item.imagePath" alt="">
      </div>
    </div>

    <div class="ticket__submit" @click="linkTo('UploadTicket')">
      上传票根
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ticket: []
      }
    },

    created() {
      this.getTicketList()
    },

    methods: {
      getTicketList() {
        this.$Api.getTicketList().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.ticket = res.q.tickets;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #ticket {
    width: 100%;
    
    .ticket__list {
      padding: 0 boxValue(20);
      padding-bottom: boxValue(100);
      width: boxValue(600);

      .ticket {
        float: left;
        margin-top: boxValue(16);
        padding-bottom: 49%;
        width: 49%;
        height: 0;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .ticket:nth-child(2n - 1) {
        margin-right: 2%;
      }
    }

    .ticket__submit {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: boxValue(70);
      line-height: boxValue(70);
      font-size: boxValue(26);
      text-align: center;
      color: #fff;
      background: #27adff;
    }
  }
</style>

