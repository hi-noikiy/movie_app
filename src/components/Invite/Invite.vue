<template>
  <div id="invite" class="invite__list">
    <swipeout>
      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow"  v-for="(item,index) in userList" :key="index">
        <div slot="right-menu">
          <swipeout-button @click.native="onButtonClick(index, item.id)" type="warn">删除</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
          <div class="invite">
            <div class="invite__left">
              <img src="../../assets/avatar.png" alt="">
            </div>
            <div class="invite__right">
              <div class="invite__right__info">
                <div class="info__name">{{item.nickname}}</div>
                <div class="info__dis" v-if="type == 'invite'">1.2km</div>
                <div class="info__dis" v-else-if="type == 'friend'">{{item.signature?item.signature:'暂无'}}</div>
                <div class="info__dis" v-else-if="type == 'message'">ccccccccccccccccccccc</div>
              </div>

              <template v-if="type == 'friend'">
                <div class="invite__right__btn" @click="inviteMovie(item.id)">约电影</div>
              </template>
              <template v-else-if="type == 'message'">
                <badge class="invite__right__mes" text="888"></badge>
              </template>
            </div>
          </div>
        </div>
      </swipeout-item>
      
    </swipeout>
  </div>
</template>

<script>
  import { Badge, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'

  export default {
    props: ['type', 'userList'],
    methods: {

      onButtonClick (index, id) {
        let param = {
          a: 4,
          userId: id
        }
        this.$Api.FriendUpdate(param).then((res) => {
          if(res.q.s == 0) {
            this.$toast('删除好友成功!');
            this.userList.splice(index, 1);
            this.updateUserDetail();
          }
        })
      },
      
      handleEvents (type) {
        console.log('event: ', type)
      },

      inviteMovie(id) {
        this.$Api.DateSubmit(id).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('已发送约影请求！')
          }
        })
      }
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Badge
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #invite {
    margin-top: boxValue(16);
    background: #fff;

    .invite {
      height: boxValue(140);
      font-size: 0;

      .invite__left {
        display: inline-block;
        margin: 0 boxValue(15) 0 boxValue(30);
        width: boxValue(84);
        height: boxValue(84);
        line-height: boxValue(140);

        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
          border-radius: 50%;
        }
      }

      .invite__right {
        position: relative;
        display: inline-block;
        height: boxValue(84);
        width: boxValue(510);
        vertical-align: middle;

        .invite__right__info {
          float: left;
          font-size: 13px;
          line-height: boxValue(42);

          .info__name {
            font-weight: 600;
          }

          .info__dis {
            color: #666;
          }
        }

        .invite__right__btn {
          float: right;
          display: inline-block;
          padding: boxValue(10) boxValue(20);
          margin-top: boxValue(14);
          margin-right: boxValue(30);
          font-size: 13px;
          vertical-align: middle;
          color: #fff;
          border-radius: boxValue(20);
          background: #27adff;
        }

        .invite__right__mes {
          float: right;
          display: inline-block;
          margin-top: boxValue(14);
          margin-right: boxValue(30);
        }

        
      }
    }

    .vux-swipeout {
      position: relative;
      &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(130);
          width: 100%;
          border-bottom: 1px solid #eee;
        }
    }
  }
</style>
