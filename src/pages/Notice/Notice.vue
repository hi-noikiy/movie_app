<template>
  <div id="notice">
    <ul class="notice__wrap">
      <li class="notice__wrap__detail" v-for="(item,index) in noticeList">
        <h3 class="detail__title">{{item.title}}</h3>
        <p class="detail__time">{{item.addTime}}</p>
        <p class="detail__content">{{item.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        limit: 10,
        noticeList: [],
        isLoad: false,
        isLoadAll: false,
        isUpdated: false
      }
    },

    created() {
      this.getNotificationList();
      this.initScroll();
    },

    mounted() {
      let dom = document.querySelector('.notice__wrap');
      dom.onscroll = () => {
        if(dom.scrollHeight < dom.offsetHeight + dom.scrollTop + 100) {
          this.getNotificationList();
        }
      }
    },

    methods: {
      getNotificationList() {
        if(this.isLoad) {
          console.log('加载中')
          return false;
        }

        if(this.isLoadAll) {
          console.log('加载完')
          return false;
        }

        this.isLoad = true;

        this.$Api.getNotificationList({pa: this.page++, li: this.limit}).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.noticeList.push(...res.q.notifications);
            if(res.q.notifications && res.q.notifications.length == 0) {
              this.isLoadAll = true;
            }

            if(!this.isUpdated) {
              this.updateUserDetail();
              this.isUpdated = true;
            }
          }

          this.isLoad = false;
        })
      }
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';

  #notice {
    height: 100%;

    .notice__wrap {
      height: 100%;
      overflow-y: scroll;

      .notice__wrap__detail {
        margin-top: boxValue(20);
        padding: boxValue(10);
        background: #fff;
        box-shadow: boxValue(7) boxValue(2) boxValue(4) boxValue(2) #eee;

        .detail__title {
          padding: boxValue(15) 0;
          padding-bottom: boxValue(20);
          font-size: boxValue(26);
          color: #333;
        }

        .detail__time {
          font-size: boxValue(22);
          padding-bottom: boxValue(15);
          color: #333;
        }

        .detail__content {
          font-size: boxValue(22);
          color: #888;
          padding-bottom: boxValue(15);
        }
      }
    }

    h3,p {
      margin: 0;
    }
  }
</style>
