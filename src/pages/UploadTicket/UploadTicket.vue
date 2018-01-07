<template>
  <div id="uploadTicket">
    <div class="uploadTicket__title">
      <span>票根照片</span>
    </div>
    <div class="uploadTicket__pic">
      <div class="pic" @click="open">
        <img :src="img" alt="" v-if="img">
        <img src="../../assets/imgadd.png" alt="" v-else>
      </div>
      <input type="file" class="hide" id="upload" v-on:change="upload">
    </div>
    <div class="uploadTicket__tips">
      请尽量保证票根清晰以供审核，审核通过才能获得积分
    </div>
    <div class="uploadTicket__submit" @click="submit">
      立即上传
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        img: null,
        imagePath: ''
      }
    },

    methods: {
      open() {
        let upload = document.getElementById('upload')
        upload.click()
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
              this.img = oFREvent.currentTarget.result;
              oFile.value = '';
            };

            this.imagePath = res.q.files[0].path;
          }
        })

        event.target.value=null
      },

      submit() {
        if(!this.img) {
          this.$toast('请提交图片', 'fail');
          return false;
        }

        let id = this.$route.query.id;
        if(id) {
          this.$Api.DateUpdate(3, id, this.imagePath).then((res) => {
            console.log(res);
            if(res.q.s == 0) {
              this.$toast('提交成功').then(() => {
                this.$router.go(-1);
              })
            }
          })
        }else {
          this.$Api.TicketSubmit(this.imagePath).then((res) => {
            console.log(res)
            if(res.q.s == 0) {
              this.$toast('提交成功').then(() => {
                this.$router.go(-1);
              })
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #uploadTicket {
    .uploadTicket__title {
      padding-left: boxValue(30);
      width: 100%;
      height: boxValue(78);
      line-height: boxValue(78);
      font-size: boxValue(28);
    }

    .uploadTicket__pic {
      padding: boxValue(10) boxValue(30);
      background: #fff;

      .pic {
        display: inline-block;
        width: boxValue(154);
        height: boxValue(154);
        padding-right: boxValue(14);
        padding-top: boxValue(10);
        padding-bottom: boxValue(10);

        img {
          width: 100%;
          height: 100%;
          border-radius: boxValue(10);
        }
      }
    }

    .uploadTicket__tips {
      padding: boxValue(28) 0;
      font-size: boxValue(24);
      text-align: center;
      color: #5e5e5e;
    }

    .uploadTicket__submit {
      margin: 0 auto;
      width: boxValue(560);
      height: boxValue(72);
      line-height: boxValue(72);
      color: #fff;
      text-align: center;
      background: #02a9ff;
      border-radius: boxValue(16);
    }

    #upload {
      display: none;
    }
  }
</style>
