<template>
  <div id="dating">
    <div class="dating__info" v-for="(item, index) in dateList" :key="index">
      <div class="info__detail clearfix">
        <div class="info__detail__left">
          <div class="left__avatar">
            <img src="../../assets/avatar.png" alt="" v-if="!item.user.imagePath">
            <img :src="$ImgUrl + item.user.imagePath" alt="" v-else>
          </div>
          
          <div class="left__detail">
            <div class="left__detail__name">
              <span class="name">{{item.user.nickname}}</span>
              <span>{{item.addTime}}</span>
            </div>
            <div class="left__detail__mes">
              <span>{{item.content}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="info__control" v-if="item.status == 1">
        <span class="control__left cancel" @click="reject(index, item.id)">拒绝</span>
        <span class="control__right accept" @click="agree(index, item.id)">接受邀请</span>
      </div>

      <div class="info__control" v-else-if="item.status == 2">
        <span class="control__left send" @click="linkToUrl('IM?id=' + item.user.id + '&img=' + item.imagePath)">发信息</span>
        <span class="control__right ticket" @click="linkToUrl('uploadTicket?id='+item.id)">晒票根</span>
      </div>

      <div class="info__control" v-else-if="item.status == 3">
        <span class="control__left send" @click="linkToUrl('IM?id=' + item.user.id + '&img=' + item.imagePath)">发信息</span>
        <span class="control__right send" @click="linkToUrl('uploadResult?img='+item.imagePath)">查看票根</span>
      </div>

      <div class="info__control" v-else-if="item.status == 4">
        <span class="control__left send" @click="linkToUrl('IM?id=' + item.user.id + '&img=' + item.imagePath)">发信息</span>
        <span class="control__right cancel" @click="linkToUrl('uploadTicket?id='+item.id)">重新上传票根</span>
      </div>

      <div class="info__control" v-else-if="item.status == 5">
        <span class="control__left send" @click="linkToUrl('IM?id=' + item.user.id + '&img=' + item.imagePath)">发信息</span>
        <span class="control__right ticket" @click="linkToUrl('uploadResult?img='+item.imagePath)">查看票根</span>
      </div>

      <div class="info__control" v-else-if="item.status == 6">
        <span class="control__left send" @click="linkToUrl('IM?id=' + item.id + '&img=' + item.imagePath)">发信息</span>
        <span class="control__right send">已拒绝</span>
      </div>
    </div>
    
    <!-- <div class="dating__info">
      <div class="info__detail clearfix">
        <div class="info__detail__left">
          <div class="left__avatar">
            <img src="../../assets/avatar.png" alt="">
          </div>
          
          <div class="left__detail">
            <div class="left__detail__name">
              <span>咸鱼Diane</span>
            </div>
            <div class="left__detail__mes">
              <span>邀请你一起看电影</span>
            </div>
          </div>
        </div>
        <div class="info__detail__right">
          <span>2017.03.23</span>
          <span>19.33</span>
        </div>
      </div>

      <div class="info__control">
        <span class="control__left send">发信息</span>
        <span class="control__right ticket" @click="linkTo('UploadTicket')">晒票根</span>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dateList: []
      }
    },

    created() {
      this.getDateList()
    },

    methods: {
      getDateList() {
        this.$Api.getDateList().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.dateList = res.q.dates;
          }
        })
      },

      reject(index, id) {
        this.$Api.DateUpdate(2, id).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$toast('拒绝成功!');
            this.dateList[index].status = 6;
            this.updateUserDetail();
          }
        })
      },

      agree(index, id) {
        this.$Api.DateUpdate(1, id).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.$toast('同意成功!');
            this.dateList[index].status = 2;
            this.updateUserDetail();
          }
        })
      }
    }
  }  
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #dating {
    .dating__info {
      margin-top: boxValue(24);

      .info__detail {
        padding: boxValue(26) 0;
        height: boxValue(88);
        border-bottom: 1px solid #eee;
        background: #fff;

        .info__detail__left {
          float: left;
          width: 100%;

          .left__avatar {
            float: left;
            margin-right: boxValue(18);
            margin-left: boxValue(20);
            width: boxValue(88);
            height: boxValue(88);

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .left__detail {
            float: left;
            padding: boxValue(10) 0;
            height: boxValue(68);
            width: boxValue(496);
            display: flex;            
            flex-direction: column;
            justify-content: space-between;

            .left__detail__name {
              display: flex;
              justify-content: space-between;
              font-size: boxValue(22);

              .name {
                font-weight: 600;
              }
            }
          }
        }
      }
      
      .info__control {
        height: boxValue(72);
        background: #fff;
        font-size: 0;

        .control__left,
        .control__right {
          display: inline-block;
          width: 50%;
          line-height: boxValue(72);
          font-size: boxValue(30);
          text-align: center;
        }

        .control__left {
          position: relative;

          &::after {
            content: '';
            position: absolute;
            right: -1px;
            bottom: 50%;
            margin-bottom: boxValue(-14);
            height: boxValue(28);
            border-right: 1px solid #ddd; 
          }
        }

        .cancel {
          color: #ec1313;
        }

        .accept {
          color: #85d594;
        }

        .send {
          color: #444;
        }

        .ticket {
          color: #02a9ff;
        }
      }
    }
  }
</style>


