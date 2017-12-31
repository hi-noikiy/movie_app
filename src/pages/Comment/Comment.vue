<template>
  <div id="comment">
    <List></List> 

    <div class="comment__respone">
      <div class="comment__respone__tab">
        <span class="tab__comment" :class="{'active':type == 'comment'}" @click="changeType('comment')">评论 ({{$route.query.comment}})</span>
        <span class="tab__praise" :class="{'active':type == 'praise'}" @click="changeType('praise')">点赞 ({{$route.query.praise}})</span>
      </div>

      <div class="comment__respone__reply">
        <UserList :userList="userList" class="respone__reply" v-show="type == 'comment'"/>
        <PraiseList :praiseList="praiseList" class="respone__praise" v-show="type == 'praise'"/>
      </div>
    </div>

    <div class="comment__button" @click="linkToUrl('replyComment?id=' + $route.query.id)">
      <span class="publish"></span><span class="text">我想说两句</span>
    </div>
  </div>
</template>

<script>
  import List from '../../components/List/List';
  import UserList from '../../components/UserList/UserList';
  import PraiseList from '../../components/PraiseList/PraiseList';

  export default {
    data() {
      return {
        type: 'comment',
        userList: [],
        praiseList: []
      }
    },

    created() {
      let id = this.$route.query.id;

      this.getCommentList(id);
      this.getPraiseList(id);
    },

    methods: {
      changeType(type) {
        this.type = type
      },

      getCommentList(id) {
        this.$Api.getCommentList(id, 1, 100).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.userList = res.q.comments;
          }
        })
      },

      getPraiseList(id) {
        this.$Api.getPraiseList(id, 1, 100).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.praiseList = res.q.praises;
          }
        })
      }
    },
    components: {
      List,
      UserList,
      PraiseList
    }
  } 
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #comment {
    position: relative;
    height: 100%;
    padding-top: boxValue(1);
    background: #f5f5f5;

    .list {
      margin-top: boxValue(15);
      background: #fff;
    }

    .comment__respone {
      margin-top: boxValue(15);

      .comment__respone__tab {
        padding-left: boxValue(30);
        padding-top: boxValue(30);
        padding-bottom: boxValue(20);
        background: #fff;

        .tab__comment,
        .tab__praise {
          font-size: boxValue(28);
          color: #7a7a7a;

          &.active {
            position: relative;
            color: #222;

            &::after {
              content: '';
              position: absolute;
              bottom: boxValue(-16);
              left: 50%;
              margin-left: boxValue(-23);
              width: boxValue(46);
              height: boxValue(6);
              background: #00a7ff;
              border-radius: boxValue(8);
            }
          }
        }

        .tab__comment {
          margin-right: boxValue(40);
        }
      }

      .respone__praise,
      .respone__reply {
        padding-bottom: boxValue(100);
      }
    }

    .comment__button {
      position: fixed;
      bottom: 0;
      left: 0;
      height: boxValue(80);
      width: 100%;
      line-height: boxValue(80);
      font-size: boxValue(24);
      color: #bfbfbf;
      text-align: center;
      background: #fff;
      box-shadow: -1px 0px 3px #e2d9d9;

      .publish {
        display: inline-block;
        margin-right: boxValue(20);
        width: boxValue(31);
        height: boxValue(30);
        background: url('../../assets/publish.png');
        background-size: cover;
        background-position: center center;
        vertical-align: middle;
      }

      .text {
        vertical-align: middle;
      }
    }
  }
</style>

