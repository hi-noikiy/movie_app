<template>
  <div id="card">
    <div class="card__tabbar">
      <span class="tabbar" :class="{'active': type=='active'}"@click="changeType('active')">待使用</span>
      <span class="tabbar" :class="{'active': type=='used'}"@click="changeType('used')">已使用</span>
      <span class="tabbar" :class="{'active': type=='overdue'}"@click="changeType('overdue')">已过期</span>
    </div>

    <template v-if="type == 'active'">
      <Card :cardList="cardList" class="card__list" :type="type"/>
    </template>

    <template v-if="type == 'used'">
      <Card :cardList="cardList" class="card__list" :type="type"/>
    </template>

    <template v-if="type == 'overdue'">
      <Card :cardList="cardList" class="card__list" :type="type"/>
    </template>

  </div>
</template>

<script>
  import Card from '@/components/Card/Card'

  export default {
    data() {
      return {
        type: 'active',
        cardList: [],
      }
    },

    created() {
      let param = {
        a:1,
        status: 1
      }

      this.getOrderList(param);
    },

    methods: {
      changeType(type) {
        this.cardList = [];
        this.type = type;
        let status;
        if(type == 'active') {
          status = 1
        }else if(type == 'used') {
          status = 2
        }else if(type == 'overdue') {
          status = 3
        }

        let param = {
          a:1,
          status: status
        }

        this.getOrderList(param);
      },

      getOrderList(param) {
        this.$Api.getOrderList(param).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.cardList = res.q.orders
          }
        })
      }
    },
    components: {
      Card
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #card {
    .card__tabbar {
      padding: boxValue(20) 0;
      height: boxValue(50);
      text-align: center;
      background: #fff;

      .tabbar {
        font-size: boxValue(28);
        padding: 0 boxValue(30);
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
    }

    .card__list {
      margin-top: 0;
    }
  }
</style>


