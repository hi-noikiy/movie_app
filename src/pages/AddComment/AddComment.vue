<template>
  <div id="comment__add">
    <div class="add__rate">
      <span class="rate__title">电影评分</span>
      <div class="rate__control">
        <span class="star"></span>
        <span class="star"></span>
        <span class="star"></span>
        <span class="star"></span>
        <span class="star"></span>
      </div>
    </div>

    <div class="add__text">
      <textarea class="text__input" placeholder="快来说说你的看法~" name="" id=""></textarea>
    </div>

    <div class="add__img">
      <div class="add__img__title">影评照片</div>
      <div class="add__img__list">
        <div class="add">
          <img src="../../assets/imgadd.png" alt="" @click="open">
          <input type="file" class="hide" id="test" v-on:change="upload">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      open() {
        let test = document.getElementById('test')
        test.click()
      },

      upload() {
        var oFile = document.getElementById("test").files[0];
        let oFReader = new FileReader();
        oFReader.readAsDataURL(oFile);
        
        oFReader.onload = (oFREvent) => {
          console.log(oFREvent)
        };
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
      background: #fff;

      .add__img__title {
        padding-left: boxValue(30);
        height: boxValue(76);
        line-height: boxValue(76);
        font-size: boxValue(26);
        color: #222;
      }

      .add__img__list {
        padding: 0 boxValue(6);

        .add,
        .list {
          display: inline-block;
          height: boxValue(152);
          width: boxValue(152);

          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }

    #test {
      display: none;
    }
  }
</style>

