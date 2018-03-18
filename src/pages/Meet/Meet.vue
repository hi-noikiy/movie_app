<template>
  <div id="meet">
    <div class="meet__header">
      <button-tab class="meet__header__tarbar" v-model="demo01">
        <button-tab-item class="tarbar">约电影</button-tab-item>
        <button-tab-item class="tarbar">附近</button-tab-item>
      </button-tab>

      <div class="meet__header__setting">
        <div class="setting__user" @click="linkTo('Person')"><span></span></div>
        <div class="setting__talk" @click="linkTo('Message')"><span></span></div>
        <div class="setting__limit" @click="linkTo('Setting')"><span></span></div>
      </div>
    </div>

    <template v-if="demo01 == 0">
      
      
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide  v-for="item in userList">
          <div class="meet__user" @click="linkToUrl('person?id='+item.id)">
            <div class="user__img">
              <img :src="$ImgUrl + item.imagePath" alt="">
            </div>
            <div class="user__info">
              <div class="user__info__name">
                <span class="name">{{item.nickname}}</span>
                <span :class="{'fsex_b': item.sex == 1, 'fsex_g': item.sex == 2}">{{item.age}}</span>
              </div>
              <div class="user__info__tags">
                <span class="tags" v-for="types in typeList">{{types.value}}</span>
              </div>
              <div class="user__info__location">
                <span class="location__usually">常出没于{{item.cinemaName}}</span>
                <span class="location__pos">{{item.distance}}km</span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      

      <div class="meet__control">
        <div class="control__btn">
          <div class="control__btn__next" @click="nextUser">
            <span>下一个</span>
          </div>
          <div class="control__btn__now" @click="DateSubmit(activeUser.id)">
            <span>约电影</span>
          </div>
        </div>

        <div class="control__like" :class="{'gray': activeUser.isPraise == 1}" @click="DateSwitch(activeUser.id)"></div>
      </div>
    </template>

    <template v-else>
      <div class="meet__list">
        <div class="meet" v-for="item in nearList" @click="linkToUrl('person?id='+item.id)">
          <div class="meet__left">
            <img src="../../assets/avatar.png" v-if="!item.imagePath">
            <img :src="$ImgUrl + item.imagePath" alt="" v-else>
          </div>
          <div class="meet__right">
            <div class="meet__right__info">
              <div class="info__name">{{item.nickname}}<span :class="{'fsex_b': item.sex == 1, 'fsex_g': item.sex == 2}">{{item.age}}</span></div>
              <div class="info__dis">{{item.distance}}km</div>
            </div>
            <div class="meet__right__btn" @click.stop="DateSubmit(item.id)">约电影</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { ButtonTab, ButtonTabItem } from 'vux';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import { movieType,industryType } from '@/data/data.js';

  export default {
    data() {
      return {
        tabPosition: 'meet',
        demo01: 0,
        userList: [],
        nearList: [],
        activeUser: {},
        swiperOption: {
          on: {
            reachEnd :() => {
              // this.userList.push(1);
              if(this.userList.length > 0) {
                this.getUserList();
              }
            },
            slideChange: () => {
              this.activeUser = this.userList[this.swiper.activeIndex];
            }
          }
        },
        page: 1,
        noMore: false,
        longitude: null,
        latitude: null
      }
    },

    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },

      typeList() {
        let user = this.activeUser.favoriteTypes;
        let result = []
        if(user) {
          for(let i in user) {
            let data = movieType.find((item) => {
              return item.key == user[i].id
            })

            result.push(data);
          }
        }
        return result;
      }
    },

    created() {
      this.initMap().then(() => {
        this.getUserList();
        this.getNearList();
      }).catch(() => {
        this.$toast('定位出错!!！');
      })
    },
    
    methods: {
      initMap() {
        let self = this;

        return new Promise((resolve, reject) => {
          let json = sessionStorage.getItem('location');  
          if(json) {
            let obj = JSON.parse(json);
            self.longitude = obj.lng;
            self.latitude = obj.lat;

            resolve();
            return false;
          };

          this.$load(1,'定位中');
          var map, geolocation;
          //加载地图，调用浏览器定位服务
          map = new AMap.Map('container', {
              resizeEnable: true
          });
          map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：无穷大
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              buttonPosition:'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
            AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
          });
          //解析定位结果
          function onComplete(data) {
            var str=['定位成功'];
            str.push('经度：' + data.position.getLng());
            str.push('纬度：' + data.position.getLat());
            if(data.accuracy){
              str.push('精度：' + data.accuracy + ' 米');
            }//如为IP精确定位结果则没有精度信息
            console.log(str);
            let obj = {
              lat: data.position.getLat(),
              lng: data.position.getLng()
            }

            self.longitude = obj.lng;
            self.latitude = obj.lat;

            resolve();
            self.$load(2);
            let json = JSON.stringify(obj)
            console.log(json);
            sessionStorage.setItem('location', json);
          }

          function onError(err) {
            reject();
            self.$load(2);
            console.log(err);
            this.$toast('定位出错！')
          }
        })
      },

      //约影列表
      getUserList() {
        if(this.noMore) {
          this.$toast('没有更多了', 'fail')
          return false;
        }

        let loc = {};
        let json = sessionStorage.getItem('location');  
        if(json) {
          loc = JSON.parse(json);
        }

        let params = {
          a: 1,
          pa: this.page++,
          li: 3,
          longitude: this.longitude,
          latitude: this.latitude
        }

        this.$Api.getUserList(params).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            if(res.q.users.length == 0) {
              // this.$toast('没有更多了', 'fail')
              this.noMore = true;
              return false;
            }
            if(this.userList.length == 0) {
              this.activeUser = res.q.users[0];
            }
            this.userList.push(...res.q.users);
          }
        })
      },

      getNearList() {
        let loc = {};
        let json = sessionStorage.getItem('location');  
        if(json) {
          loc = JSON.parse(json);
        }

        let params = {
          a: 1,
          pa: 1,
          longitude: this.longitude,
          latitude: this.latitude
        }

        this.$Api.getUserList(params).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.nearList.push(...res.q.users);
          }
        })
      },

      //约电影
      DateSubmit(id) {
        this.$load(1, '发送中');
        let userId = id;
        this.$Api.DateSubmit(userId).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('已发送约影请求！')
          }
          this.$load(2);
        })
      },

      //点赞
      DateSwitch(id) {
        let open = 1;
        let activeUser = this.activeUser;
        if(activeUser.isPraise == 1) {
          open = 2;
        }
        this.$Api.DateSwitch(id, open).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            if(open == 1) {
              this.$toast('点赞成功!').then(() => {
                this.activeUser.isPraise = 1;
              });
            }else {
              this.$toast('取消成功!').then(() => {
                this.activeUser.isPraise = 2;
              });
            }
          }
        })
      },

      //下一个
      nextUser() {
        this.swiper.slideNext();
      }
    },
    components: {
      ButtonTab,
      ButtonTabItem,
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';

#meet {
  position: relative; 
  height: 100%;
  width: 100%;
  // overflow: hidden;
  background: #f5f5f5;

  /* 头部tarbar */
  .meet__header {
    position: relative;

    .meet__header__tarbar {
      margin-top: boxValue(24);
      margin-bottom: boxValue(24);
      justify-content: center;

      .tarbar {
        width: boxValue(160);
        flex: none;
        text-decoration: none;

        &:after {
          border: none;

        }
        
        &.vux-button-group-current {
          background: #27adff;
        }
      }
    }


    .meet__header__setting {
      position: absolute;
      right: boxValue(10);
      top: boxValue(0);
      width: 100%;

      .setting__talk,
      .setting__user,
      .setting__limit {
        position: relative;
        display: inline-block;
        width: boxValue(54);
        height: boxValue(54);
        background-size: 60%;
        z-index: 2;
        background-color: #fff;
        border-radius: 50%;
        background-position: 50% 50%;
        box-shadow: 1px 1px 2px 2px #eee;
      }

      .setting__user {
        position: absolute;
        right: boxValue(60);
        top: 0;
        
        // @include fixImage('../../assets', '.png');
        background: #fff;
        background-image: url('../../assets/mine_btn.png');
        background-repeat: no-repeat;
        background-size: 60%;
        background-position: center;
      }

      .setting__talk {
        position: absolute;
        right: 0;
        top: 0;
        
        // @include fixImage('../../assets', '.png');
        background: #fff;
        background-image: url('../../assets/commentaries.png');
        background-repeat: no-repeat;
        background-size: 60%;
        background-position: center;
      }

      .setting__limit {
        position: absolute;
        left: boxValue(30);
        top: 0;
        
        // @include fixImage('../../assets', '.png');
        background: #fff;
        background-image: url('../../assets/screening.png');
        background-size: 100%;
      }
    }
  }
  /* 头部tarbarend */

  /* 相册 */
  .meet__user {
    margin: 0 auto;
    height: 66.5vh;
    width: 95vw;
    background: #fff;
    border-radius: boxValue(20);
    overflow: hidden;

    .user__img {
      width: 100%;
      height: 50.7vh;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user__info {
      padding: boxValue(34) boxValue(28) boxValue(28) boxValue(28);
      
      .user__info__name {
        .name {
          font-size: 13px;
          font-weight: 600;
        }

        .sex {
          font-size: 10px;
          color: #fff;
          background: #f773be;
          padding: boxValue(2) boxValue(18);
          border-radius: boxValue(6);
        }
      }

      .user__info__tags {
        margin: boxValue(16) 0;
        width: 100%;
        height: boxValue(38);
        overflow: hidden;

        .tags {
          display: inline-block;
          width: boxValue(68);
          margin-right: boxValue(4);
          height: boxValue(38);
          line-height: boxValue(38);
          text-align: center;
          color: #fff;
          border-radius: boxValue(8);
          background: #27adff;
        }
      }

      .user__info__location {
        display: flex;
        color: #54595c;
        justify-content: space-between;

      }
    }
  }
  /* 相册end */


  .meet__control {
    margin-top: boxValue(40);
    position: relative;
    width: 100%;

    .control__btn {
      text-align: center;
      margin: 0 auto;

      .control__btn__preview,
      .control__btn__next,
      .control__btn__now {
        display: inline-block;
        width: boxValue(104);
        height: boxValue(104);
        line-height: boxValue(104);
        text-align: center;
        border-radius: 50%;
      }

      .control__btn__next {
        color: #27adff;
        background: #fff;
        margin-right: boxValue(50);
      }

      .control__btn__now {
        color: #fff;
        background: #27adff;
      }
    }

    .control__like {
      position: absolute;
      right: boxValue(20);
      bottom: boxValue(5);
      width: boxValue(94);
      height: boxValue(94);
      border-radius: 50%;
      background: #fff;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: boxValue(-15);
        margin-left: boxValue(-15);
        width: boxValue(30);
        height: boxValue(34);
        background: url('../../assets/heart.png') no-repeat;
        background-size: 100%;
      }
    }
  }
}

#meet {
  .meet__list {
    margin-top: boxValue(16);
    background: #fff;

    .meet {
      height: boxValue(140);
      font-size: 0;

      .meet__left {
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

      .meet__right {
        position: relative;
        display: inline-block;
        height: boxValue(84);
        width: boxValue(510);
        vertical-align: middle;

        .meet__right__info {
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

        .meet__right__btn {
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

  .gray { 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    
    filter: grayscale(100%);
  
    filter: gray;
  }
}
</style>
