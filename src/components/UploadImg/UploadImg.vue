<template>
  <div id="uploadImg">
    <div class="add__img">
      <div class="add__img__list">
        <div class="list" v-for="(list,index) in uploadedList" :key="index">
          <img :src="$ImgUrl + list.path" alt="" v-if="list.path">
          <img :src="list" alt="" v-else>
          <span class="list__del" @click="delImg(index)"></span>
        </div>
        <!-- <div class="list" v-for="(list,index) in uploadList" :key="index">
          <img :src="$ImgUrl + list.path" alt="" v-if="list.path">
          <img :src="list" alt="" v-else>
          <span class="list__del"></span>
        </div> -->
        <div class="add">
          <img src="../../assets/imgadd.png" alt="" @click="open">
          <input type="file" class="hide" id="upload" v-on:change="upload">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['uploadedList'],

    methods: {
      open() {
        let test = document.getElementById('upload')
        test.click()
      },

      delImg(index) {
        this.uploadedList.splice(index,1);
        this.$emit('ImgChange', this.uploadedList);
      },

      upload(event) {
        this.$load(1);

        var oFile = document.getElementById("upload").files[0];
        let oFReader = new FileReader();
        let formData = new FormData();
        formData.append('file[]', oFile);

        this.$Api.UploadFiles(formData).then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            oFReader.readAsDataURL(oFile);
            oFReader.onload = (oFREvent) => {
              // this.uploadList.push(oFREvent.currentTarget.result);
              // this.imgList.push(res.q.files[0])
              this.uploadedList.push(res.q.files[0])
              this.$emit('ImgChange', this.uploadedList);
              oFile.value = '';
            };
          }
          this.$load(2);
        })

        event.target.value=null
      },
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

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

  #upload {
    display: none;
  }
</style>
