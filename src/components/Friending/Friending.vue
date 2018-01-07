<template>
  <div id="invite" class="invite__list">
    <swipeout>
      <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" v-for="(item,index) in userList" :key="index">
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
                <div class="info__dis">{{item.validationInfo}}</div>
              </div>
              
              <template v-if="item.status == 1">
                <div class="invite__right__btn sure" @click="agree(index, item.id)">同意</div>
                <div class="invite__right__btn cancel" @click="reject(index, item.id)">拒绝</div>
              </template>

              <template v-else-if="item.status == 2">
                <div class="invite__right__btn pass">已通过</div>
              </template>

              <template v-else-if="item.status == 3">
                <div class="invite__right__btn fail">已拒绝</div>
              </template>
            </div>
          </div>
        </div>
      </swipeout-item>
      
    </swipeout>
  </div>
</template>

<script>
  import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton } from 'vux'

  export default {
    props: ['userList'],
    methods: {

      onButtonClick (index, id) {
        let param = {
          a: 7,
          userId: id
        }
        this.$Api.FriendUpdate(param).then((res) => {
          if(res.q.s == 0) {
            this.$toast('删除成功!');
            this.userList.splice(index, 1);
            this.updateUserDetail();
          }
        })
      },

      handleEvents (type) {
        console.log('event: ', type)
      },

      reject(index,id) {
        let param = {
          a: 6,
          userId: id
        }
        this.$Api.FriendUpdate(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('拒绝成功!');
            this.userList[index].status =3;
          }
        })
      },

      agree(index,id) {
        let param = {
          a: 1,
          userId: id
        }
        this.$Api.FriendUpdate(param).then((res) => {
          if(res.q.s == 0) {
            this.$toast('添加成功!');
            this.userList[index].status = 2;
          }
          console.log(res)
        })
      },

      FriendUpdate() {
        
      }
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
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

        .cancel {
          margin-right: boxValue(16);
          background: #7695a5;
        }

        .pass {
          color: #27adff;
          background: none;
        }

        .fail {
          color: #ff4444;
          background: none;
        }

        &:after {
          content: '';
          position: absolute;
          bottom: boxValue(-28);
          left: 0;
          width: 100%;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
</style>
