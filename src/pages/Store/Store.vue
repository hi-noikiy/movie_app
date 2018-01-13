<template>
  <div id="store">
    <div class="store__top">
      <div class="store__top__swiper">
        <!-- <img src="../../assets/swiper.png" alt=""> -->
        <swiper :list="adList" :aspect-ratio="290/640" dots-position="center"></swiper>
      </div>
      <div class="store__top__search">
        <div class="search__point">
          我的积分: {{userDetail.totalIntegral}}
        </div>
        <div class="search__input" @click="linkTo('Search')">
          <span class="search__input__icon"></span>
          <input class="search__input__value" type="text" placeholder="请输入搜索词">
        </div>
      </div>
      <div class="store__top__news">
        <div class="news__title">
          最新动态
        </div>
        <div class="news__detail">
          <ul class="detail__list">
            <swiper auto loop height="30px" direction="vertical" :interval=1000 :show-dots="false">
              <swiper-item v-for="(item,index) in newList" :key="index"><li class="detail">{{item.title}}</li></swiper-item>
            </swiper>
          </ul>
        </div>
      </div>
    </div>

    <div>
      <div class="tab" style="overflow-y:hidden">
        <tab  style="width:500px;" :line-width=2 active-color='#01a9ff' v-model="index" custom-bar-width="40%">
          <tab-item class="vux-center" v-for="(item, index) in list" @on-item-click="changeType(item.id)" :key="index">{{item.name}}</tab-item>
        </tab>
      </div>

      <div class="item__wrap" ref="items">
        <Item :couponList="couponList"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import Item from '@/components/Item/Item'

  export default {
    data () {
      return {
        index01: 0,
        list: null,
        adList: [],
        newList: [],
        couponList: [],
        index: 0,
        userDetail: {}
      }
    },

    created() {
      this.getCategoryList();
      this.getAdList();
      this.getNews();

      let result = this.getUserStorage();
      this.userDetail = result;
    },

    mounted() {
      // var count = 0; // needed for safari
      // window.onpopstate = () => { 
      //   history.pushState('back', null, null);              
      //   if(count == 1){
      //     console.log('？？？？？？？？？？！！！！！')
      //     if(this.$route.name == 'Store') {
      //       this.$router.push({name: 'Index'})
      //     }
      //   }
      // }
      // setTimeout(function(){count = 1;},200);
    },

    methods: {
      changeType(id) {
        console.log(id);
        this.getCouponList(1, id);
      },

      getCategoryList() {
        this.$Api.getCategoryList().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.list = res.q.categorys;
            if(this.list.length > 0) {
              this.getCouponList(1, 4);
            }
          }
        })
      },

      //卡卷列表
      getCouponList(pa, categoryId) {
        let param = {
          a:2, 
          pa, 
          li: 10, 
          categoryId
        }
        this.$Api.getCouponList(param).then((res) => {
          console.log(res);
          if(res.q.s == 0) {
            this.couponList =  res.q.coupons;
          }
        })
      },

      //广告列表
      getAdList() {
        this.$Api.getAdList(2).then((res) => {
          if(res.q.s == 0) {
            let data = res.q.ads;
            let url = [];

            for(let i in data) {
              let imgObj = {
                url: 'http://'+data[i].link,
                img: this.$ImgUrl + data[i].imagePath
              }

              url.push(imgObj);
            }

            this.adList = url;            
          }
        })
      },

      //滚动列表
      getNews() {
        this.$Api.getNews().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.newList = res.q.news.lists;
          }
        })
      }
    },

    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Item
    },
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #store {
    .store__top {
      position: relative;
      margin-bottom: boxValue(20);

      .store__top__swiper {
        width: 100%;
        height: boxValue(290);
        
        img {
          width: 100%;
          height: 100%;
        }
      }

      .store__top__search {
        position: absolute;
        left: boxValue(30);
        top: boxValue(20);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: boxValue(580);

        .search__point {
          padding: 0 boxValue(10);
          height: boxValue(48);
          line-height: boxValue(48);
          font-size: boxValue(20);
          color: #fff;
          background: #04a6fb;
          border-radius: boxValue(20);
        }

        .search__input {
          display: flex;
          flex-direction: row;
          padding: boxValue(10);
          height: boxValue(26);
          border-radius: boxValue(20);
          background: #f4f7f7;

          .search__input__icon {
            display: inline-block;
            width: boxValue(28);
            height: boxValue(26);
            background: url('../../assets/search.png') no-repeat;
            background-size: cover;
          }

          .search__input__value {
            margin-left: boxValue(10);
            border: none;
            outline: none;
            background: #f4f7f7;
          }
        }
      }

      .store__top__news {
        display: flex;
        flex-direction: row;
        height: boxValue(74);
        background: #fff;

        .news__title {
          padding: 0 boxValue(30);
          font-size: boxValue(30);
          line-height: boxValue(74);
          color: #ff4747;
        }

        .news__detail {
          padding-right: boxValue(30);
          width: 100%;

          .detail__list {
            padding: boxValue(7);
            margin: 0;
            list-style-type: none;

            .detail {
              height: 30px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
</style>
