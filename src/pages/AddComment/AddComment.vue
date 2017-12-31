<template>
  <div id="comment__add">
    <div class="add__rate">
      <span class="rate__title">电影评分</span>
      <div class="rate__control">
        <span class="star" :class="{'gray': starIndex < 1}" @click="changeStar(1)"></span>
        <span class="star" :class="{'gray': starIndex < 2}" @click="changeStar(2)"></span>
        <span class="star" :class="{'gray': starIndex < 3}" @click="changeStar(3)"></span>
        <span class="star" :class="{'gray': starIndex < 4}" @click="changeStar(4)"></span>
        <span class="star" :class="{'gray': starIndex < 5}" @click="changeStar(5)"></span>
      </div>
    </div>

    <div class="add__text">
      <textarea class="text__input" placeholder="快来说说你的看法~" name="" id="" v-model="content"></textarea>
    </div>

    <div class="add__img">
      <div class="add__img__title">影评照片</div>
      <div class="add__img__list">
        <div class="list" v-for="(list,index) in uploadList" :key="index">
          <img :src="list" alt="">
          <span class="list__del" @click="del(index)"></span>
        </div>
        <div class="add">
          <img src="../../assets/imgadd.png" alt="" @click="open">
          <input type="file" class="hide" id="upload" v-on:change="upload">
        </div>
      </div>
    </div>

    <div class="add__btn" @click="submit">立即发布</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        starIndex: 5,
        uploadList: [],
        imgList: [],
        data: 1,
        content: null
      }
    },
    methods: {
      open() {
        let test = document.getElementById('upload')
        test.click()
      },

      upload(event) {
        var oFile = document.getElementById("upload").files[0];
        let oFReader = new FileReader();
        let formData = new FormData();
        formData.append('file[]', oFile);

        this.$Api.UploadFiles(formData).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            oFReader.readAsDataURL(oFile);
            oFReader.onload = (oFREvent) => {
              this.uploadList.push(oFREvent.currentTarget.result);
              this.imgList.push(res.q.files[0]);
              oFile.value = '';
            };
          }
        })

        event.target.value=null
      },

      //改变评价
      changeStar(type) {
        this.starIndex = type;
      },

      //删除照片
      del(index) {
        this.uploadList.splice(index, 1);
        this.imgList.splice(index, 1);
      },

      submit() {
        if(!this.content) {
          this.$toast('请输入评论', 'fail');
          return false;
        }

        let id = this.$route.query.id;
        let starRating = this.starIndex;
        let content = this.content;
        let images = this.imgList;

        console.log(id, starRating, content, images);

        this.$Api.ReviewSubmit(id, starRating, content, images).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.$toast('提交成功').then(() => {
              this.$router.go(-1);
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #comment__add {
    position: relative;
    .add__rate {
      margin-top: boxValue(20);
      padding-left: boxValue(30);
      height: boxValue(76);
      line-height: boxValue(76);
      font-size: boxValue(26);
      color: #222;
      background: #fff;
    }

    .rate__control {
      position: absolute;
      right: boxValue(30);
      top: boxValue(12);

      .star {
        display: inline-block;
        width: boxValue(42);
        height: boxValue(42);
        background: url('../../assets/star.png') no-repeat;
        background-size: cover;
        background-position: center center;

        &.gray {
          background-image: url('../../assets/star_g.png');
        }
      }
    }

    .add__text {
      margin-top: boxValue(18);
      width: 100%;

      .text__input {
        padding: boxValue(30);
        width: boxValue(580);
        height: boxValue(176);
        font-size: boxValue(26);
        border: none;
        resize: none;
        outline: none;
      }
    }

    .add__img {
      margin-top: boxValue(20);
      background: #fff;

      .add__img__title {
        padding-left: boxValue(30);
        height: boxValue(76);
        line-height: boxValue(76);
        font-size: boxValue(26);
        color: #222;
      }

      .add__img__list {
        font-size: 0;
        padding-right: 1vw;
        padding-left: 0.5vw;
        padding-bottom: boxValue(20);

        .add,
        .list {
          display: inline-block;
          margin-top: boxValue(10);
          padding-left: 1vw;
          height: 24vw;
          width: 23.5vw;

          img {
            height: 100%;
            width: 100%;
          }
        }

        .list {
          position: relative;

          .list__del {
            position: absolute;
            right: boxValue(-4);
            top: boxValue(-10);
            display: inline-block;
            width: boxValue(42);
            height: boxValue(42);
            background: url('../../assets/imgdelete.png');
            background-size: 100%;
            z-index: 2;
          }
        }
      }
    }

    .add__btn {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: boxValue(70);
      line-height: boxValue(70);
      text-align: center;
      background: #27adff;
      font-size: boxValue(28);
      color: #fff;
    }

    #upload {
      display: none;
    }
  }
</style>

