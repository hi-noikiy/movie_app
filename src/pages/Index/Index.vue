<template>
  <div id="index">
    <!-- 头部 -->
    <div class="index__header">
      <div class="header__left">
        <div class="header__left__avatar" @click="linkTo('Mine')">
          <img :src="$ImgUrl + userDetail.imagePath" alt="" v-if="userDetail.imagePath">
          <img src="../../assets/avatar.png" alt="" v-else>
        </div>
        <div class="header__left__user" v-if="userDetail">
          <div class="user__name">{{userDetail.nickname}}</div>
          <div class="user__points">
            <span class="points">{{userDetail.canUseIntegral}}</span>
            <span>积分</span>
          </div>
        </div>
      </div>
      <div class="header__rihgt">
        <span class="header__right__tag" @click="linkTo('Mine')">
          {{userDetail.integralLevel == '1'?'大众会员':userDetail.integralLevel == '2'?'黄金会员':userDetail.integralLevel == '3'?'铂金会员':userDetail.integralLevel == '4'?'钻石会员':userDetail.integralLevel == '5'?'至尊会员':''}}
        </span>
        <span class="header__right__singIn" @click="linkTo('Sign')">
          签到+{{userDetail.getFromSign}}
        </span>
      </div>
    </div>
    <!-- 头部 -->

    <!-- 轮播图 -->
    <div class="index__carousel">
      <div class="carousel__list">
        <!-- <img src="../../assets/swiper.png" alt=""> -->
        <swiper :list="adList" :aspect-ratio="290/640" dots-position="center"></swiper>
      </div>
    </div>
    <!-- 轮播图 -->

    <!-- 按钮区域 -->
    <div class="index__menu">
      <div class="menu" @click="linkTo('Meet')">
        <div class="menu__join"></div>
        <div class="menu__text">约电影</div>
      </div>
      <div class="menu" @click="linkTo('Game')">
        <div class="menu__game"></div>
        <div class="menu__text">玩游戏</div>
      </div>
      <div class="menu" @click="linkTo('Store')">
        <div class="menu__gift"></div>
        <div class="menu__text">兑商品</div>
      </div>
      <div class="menu" @click="linkTo('Mine')">
        <div class="menu__user"></div>
        <div class="menu__text">个人中心</div>
      </div>
    </div>
    <!-- 按钮区域 -->

    <!-- 上映电影 -->
    <div class="index__movie">
      <div class="movie__tarbar">
        <span class="tarbar" :class="{'active': type == 'near'}" @click="changeType('near')">近期上映</span>
        <span class="tarbar" :class="{'active': type == 'now'}" @click="changeType('now')">即将上映</span>
      </div>
      <div class="movie__list" v-show="type == 'near'">
        <div class="list" @click="linkToUrl('movie?id='+movie.id)" :data-id="movie.id" v-for="(movie,index) in NearMovie" :key="index">
          <img v-lazy="$ImgUrl + movie.imagePath" alt="" v-if="movie.imagePath">
          <img src="../../assets/movie.png" alt="" v-else>
        </div>
      </div>
      <div class="movie__list" v-show="type == 'now'">
        <div class="list" @click="linkToUrl('movie?id='+movie.id)" :data-id="movie.id" v-for="(movie,index) in NowMovie" :key="index">
          <img v-lazy="$ImgUrl + movie.imagePath" alt="" v-if="movie.imagePath">
          <img src="../../assets/movie.png" alt="" v-else>
        </div>
        <!-- <div class="list" @click="linkTo('Movie')">
          <img src="../../assets/movie.png" alt="">
        </div>
        !-->
      </div>
    </div>
    <!-- 上映电影 -->

    <!-- 排行榜 -->
    <div class="index__rank">
      <div class="rank__tarbar">
        <span class="tarbar active">票房排行榜</span>
      </div>
      <div class="rank__table">
        <table class="table" cellspacing="0">
          <thead class="table__head">
            <th class="head__name">片名</th>
            <th class="head__money">票房(万元)</th>
            <th class="head__rate">拍片率</th>
            <th class="head__popular">上座率</th>
          </thead>

          <tbody>
            <!-- <tr class="rank">
              <td class="rank__movie">
                <div class="rank__movie__name">全球风暴</div>
                <div class="rank__movie__days">上映14天</div>
              </td>
              <td>1121.36</td>
              <td>14.3%</td>
              <td class="rank__popular">14.3%</td>
            </tr>
            <tr class="empty">
              <td colspan="4"></td>
            </tr>
            
            <tr class="rank">
              <td class="rank__movie">
                <div class="rank__movie__name">全球风暴</div>
                <div class="rank__movie__days">上映14天</div>
              </td>
              <td>1121.36</td>
              <td>14.3%</td>
              <td class="rank__popular">14.3%</td>
            </tr>
            <tr class="empty">
              <td colspan="4"></td>
            </tr>
            
            <tr class="rank">
              <td class="rank__movie">
                <div class="rank__movie__name">全球风暴</div>
                <div class="rank__movie__days">上映14天</div>
              </td>
              <td>1121.36</td>
              <td>14.3%</td>
              <td class="rank__popular">14.3%</td>
            </tr>
            <tr class="empty">
              <td colspan="4"></td>
            </tr> -->
            <template v-for="(movie,index) in MovieRank">
              <tr class="rank">
                <td class="rank__movie">
                  <div class="rank__movie__name">{{movie.name}}</div>
                  <div class="rank__movie__days">上映{{movie.duration}}天</div>
                </td>
                <td style="color:#ff4747">{{movie.receipts}}</td>
                <td style="color:#ff4747">{{movie.occupancyRate}}%</td>
                <td style="color:#ff4747" class="rank__popular">{{movie.exclusivePieceRate}}%</td>
              </tr>
              <tr class="empty">
                <td colspan="4"></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperItem,Tabbar, TabbarItem } from 'vux';
  import { mapGetters,mapActions } from 'vuex';

  export default {
    name:'Index',
    data() {
      return {
        type: 'near',
        NearMovie: [],
        NowMovie: [],
        MovieRank: [],
        adList: [], //广告列表
      }
    },

    created() {
      // let result = this.getUserStorage();
      // let result = false;
      // if(result) {
      //   this.userDetail = result;
      // }else {
      //   //用户信息
      //   this.getUserDetail();
      // }
      // this.initUserDetail();
      //广告列表
      this.getAdList();
  
      //上映列表
      this.getMovieList(1);
      this.getMovieList(2); //预加载

      //获取用户信息

      //排行列表
      this.getMovieRankingList();
      // this.$Api.getSetting().then((res) => {
      //   console.log(res)
      // })
    },

    methods: {
      //切换电影类型
      changeType(type) {
        this.type = type;
      },

      //广告列表
      getAdList() {
        this.$Api.getAdList(1).then((res) => {
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

      getUserDetail() {
        this.$Api.getUserDetails().then((res) => {
          if(res.q.s == 0) {
            this.userDetail = res.q.user;
            let json = JSON.stringify(res.q.user);
            sessionStorage.setItem('user', json);
          }
        })
      },

      //获取电影列表
      getMovieList(type) {
        this.$Api.getMovieList(type).then((res) => {
          if(res.q.s ==0) {
            if(type == 1) {
              this.NearMovie = res.q.movies
            }else {
              this.NowMovie = res.q.movies
            }
          }
        })
      },

      //获取排行榜列表
      getMovieRankingList() {
        this.$Api.getMovieRankingList().then((res) => {
          if(res.q.s == 0) {
            this.MovieRank = res.q.movieRankings
          }
        })
      },

      ...mapActions([
        'initUserDetail'
      ])
    },
    components: {
      Swiper
    }
  }
</script>

<style lang="scss">
@import '../../scss/mixin.scss';
$base: 32rem;

#index {
  height: 100%;
  background: #f5f5f5;
  /* 顶部区域 */
  .index__header {
    height: boxValue(90);
    width: 100%;
    background: #f5f5f5;
    
    .header__left {
      float: left;
      margin-left: boxValue(26);
      height: 100%;
      line-height: boxValue(90);

      //头像
      .header__left__avatar {
        float: left;
        margin-right: boxValue(20);
        height: boxValue(60);
        width: boxValue(60);

        img {
          height: 100%;
          width: 100%;
          vertical-align: middle;
          border-radius: 50%;
          border: 1px solid #eee;
        }
      }

      //用户信息
      .header__left__user {
        float: left;
        color: #222;
        line-height: normal;

        .user__name {
          margin-top: boxValue(18);
          font-size: boxValue(22);
        }

        .user__points {
          font-size: boxValue(20);

          .points {
            color: #ef4238;
          }
        }
      }
    }

    //按钮区域
    .header__rihgt {
      float: right;
      margin-right: boxValue(24);
      font-size: 0;
      vertical-align: middle;
      line-height: boxValue(90);

      .header__right__singIn,
      .header__right__tag {
        display: inline-block;
        width: boxValue(120);
        height: boxValue(46);
        line-height: boxValue(46);
        vertical-align: middle;
        font-size: boxValue(22);
        text-align: center;
        color: #fff;
        background: #2ecc71;
        border-radius: boxValue(20);
      }

      .header__right__singIn {
        margin-left: boxValue(12);
        background: #02a9ff;
      }
    }
  }
  /* 顶部区域end */

  /* 轮播图区域 */
  .index__carousel {
    position: relative;
    width: 100%;
    height: boxValue(290);
    overflow: hidden;

    .carousel__list {
      img {
        width: 100%;
        vertical-align: middle;
      }
    }

    .carousel__control {
      position: absolute;
      right: boxValue(30);
      bottom: boxValue(8);

      .control {
        display: inline-block;
        width: boxValue(24);
        height: boxValue(5);
        background: #9e9d9b;
        border-radius: boxValue(4);

        &.active {
          background: #fff;
        }
      }
    }

  }
  /* 轮播图区域end */

  /* 菜单选区 */
  .index__menu {
    height: boxValue(134);
    width: 100%;
    font-size: 0;
    background: #fff;
    box-shadow: 0px 1px 12px #f0f0f0;

    .menu {
      display: inline-block;
      margin-top: boxValue(22);
      height: boxValue(90);
      width: 25%;
      text-align: center;
    }

    .menu__game,
    .menu__gift,
    .menu__user,
    .menu__join {
      margin: 0 auto;
      height: boxValue(56);
      width: boxValue(56);
      background-size: contain;
    }

    .menu__join {
      @include fixImage('../../assets', 'movies.png');
    }

    .menu__game {
      @include fixImage('../../assets', 'games.png');
    }

    .menu__gift {
      @include fixImage('../../assets', 'shopping.png');
    }

    .menu__user {
      @include fixImage('../../assets', 'mine.png');
    }

    .menu__text {
      margin-top: boxValue(14);
      font-size: boxValue(22);
      text-align: center;
    }
  }
  /* 菜单选区end */

  /* 上映电影 */
  .index__movie {
    margin-top: boxValue(16);
    padding: 0 boxValue(30);
    background: #fff;
    font-size: 0;

    .movie__tarbar {
      height: boxValue(92);
      line-height: boxValue(92);

      .tarbar {
        position: relative; 
        font-weight: 600; 
        font-size: boxValue(28);
        color: #808080;
        
        &:after{
          content: "";
          display: none;
          position: absolute;
          bottom: boxValue(-10);
          left: 50%;
          margin-left: boxValue(-20);
          width: boxValue(40);
          height: boxValue(4); 
          background: #009fff;
        }

        &:first-child {
          margin-right: boxValue(20);
        }

        &.active {
          color: #404040;
        }

        &.active:after {
          display: block;
        }
      }
    }

    .movie__list {
      font-size: 0;
      padding-bottom: boxValue(16);

      .list {
        display: inline-block;
        margin-right: boxValue(16);
        margin-bottom: boxValue(16);
        width: boxValue(182);
        height: boxValue(254);

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        &:nth-child(3n) {
          margin-right: 0;
        } 
      }
    }
  }
  /* 上映电影end */

  /* 排行榜 */
  .index__rank {
    margin:boxValue(16) 0;
    padding-bottom: boxValue(16);
    background: #fff;
    
    .rank__tarbar {
      padding: 0 boxValue(30);
      height: boxValue(92);
      line-height: boxValue(92);

      .tarbar {
        position: relative; 
        font-weight: 600; 
        font-size: boxValue(28);
        color: #808080;
        
        &:after{
          content: "";
          display: none;
          position: absolute;
          bottom: boxValue(-10);
          left: 50%;
          margin-left: boxValue(-20);
          width: boxValue(40);
          height: boxValue(4); 
          background: #009fff;
        }

        &:first-child {
          margin-right: boxValue(20);
        }

        &.active {
          color: #404040;
        }

        &.active:after {
          display: block;
        }
      }
    }

    .rank__table {
      width: 100%;
      text-align: center;

      .table__head {
        height: boxValue(64);
        line-height: boxValue(64);
        background: #02a9ff;
      }

      .head__name,
      .head__money,
      .head__rate,
      .head__popular {
        color: #fff;
      }

      .head__name {
        width: boxValue(260);
        padding-left: boxValue(30);
        text-align: left;
      }

      .head__money {
        width: boxValue(120);
      }

      .head__rate {
        width: boxValue(100);
      }

      .head__popular {
        width: boxValue(100);
        padding-right: boxValue(30);
      }
    }

    .rank {
      position: relative;
      height: boxValue(106);
      width: 100%;

      .rank__movie {
        text-align: left;
        padding-left: boxValue(30);

        .rank__movie__name {
          font-size: boxValue(26);
          font-weight: 600;
          color: #333;
          padding: boxValue(18);
          padding-left: 0;
        }

        .rank__movie__days {
          font-size: boxValue(20);
          color: #999;
        }
      }

      .rank__popular {
        padding-right: boxValue(30);
      }
    }
    
    .empty {
      td {
        position: relative;
        
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: boxValue(30);
          width: boxValue(580);
          border-bottom: 1px solid #e5e4e6;
        }
      }
    }
  }
}
</style>

