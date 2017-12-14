<template>
  <div id="store">
    <div class="store__top">
      <div class="store__top__swiper">
        <img src="../../assets/swiper.png" alt="">
      </div>
      <div class="store__top__search">
        <div class="search__point">
          我的积分: 2331
        </div>
        <div class="search__input">
          <span class="search__input__icon"></span>
          <input class="search__input__value" type="text">
        </div>
      </div>
      <div class="store__top__news">
        <div class="news__title">
          最新动态
        </div>
        <div class="news__detail">
          <ul class="detail__list">
            <li class="detail">monster刚刚抢了保利影院100元红包</li>
            <li class="detail">monster刚刚抢了保利影院100元红包</li>
          </ul>
        </div>
      </div>
    </div>

    <div>
       <tab :line-width=2 active-color='#01a9ff' v-model="index" custom-bar-width="40%">
        <tab-item class="vux-center" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :show-dots="false" height="100px" ref="swiper">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="item__wrap" ref="items">
            <Item />
            <Item />
            <Item />
            <Item />
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  import Item from '@/components/Item/Item'
  const list = () => ['电影票', '手机', '电脑', '家电', '家居', '数码', '服装']

  export default {
    data () {
      return {
        index01: 0,
        list2: list(),
        index: 0,
      }
    },
    methods: {
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Item
    },
    mounted() {
      let items = document.querySelector('.item__wrap')
      this.$nextTick(() => {
        this.$refs.swiper.xheight = items.offsetHeight + 'px'
      })
    }
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
          .detail__list {
            padding: boxValue(7);
            margin: 0;
            list-style-type: none;

            .detail {
              height: boxValue(30);
              line-height: boxValue(30);
            }
          }
        }
      }
    }
  }
</style>
