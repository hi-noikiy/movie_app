<template>
  <div id="ticket">
    <div class="ticket__list clearfix">
      <!-- <div class="ticket">
        <img src="../../assets/image.png" alt="">
      </div> -->
      <div class="ticket" v-for="(item,index) in ticket" :key="index" @click="showPerview(index)">
        <img :src="$ImgUrl + item.imagePath" alt="">
        <span class="ticket__del" @click.stop="delImg(item.id)"></span>
      </div>
    </div>
    <input type="file" class="hide" id="upload" v-on:change="upload">
    <!-- <div class="ticket__submit" @click="linkTo('UploadTicket')">
      上传票根
    </div> -->
    <div class="ticket__submit" @click="submit">
      上传票根
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ticket: []
      }
    },

    created() {
      this.getTicketList()
    },

    methods: {
      //票根列表
      getTicketList() {
        this.$Api.getTicketList().then((res) => {
          console.log(res)
          if(res.q.s == 0) {
            this.ticket = res.q.tickets;
          }
        })
      },

      //点击显示大图
      showPerview(index) {
        let arr = [];
        for(let i in this.ticket) {
          arr.push(this.$ImgUrl + this.ticket[i].imagePath)
        }

        this.$ImagePreview(arr, index);
      },

      delImg(id) {
        this.$confirm('你确定要删除该票根吗？', '删除', '').then((res) => {
          if(res == 'sure') {
            this.$Api.TicketUpdate({ids: [id]}).then((res) => {
              if(res.q.s == 0) {
                this.$toast('删除成功!').then(() => {
                  this.getTicketList()
                })
              }else {
                this.$toast(res.q.d, 'fail');
              }
            })
          }
        })
      },

      submit() {
        let upload = document.getElementById('upload')
        upload.click();
      },

      upload(event) {
        var oFile = document.getElementById("upload").files[0];
        // let oFReader = new FileReader();
        let formData = new FormData();
        formData.append('file[]', oFile);

        this.$Api.UploadFiles(formData).then((res) => {
          if(res.q.s == 0) {
            // oFReader.readAsDataURL(oFile);
            // oFReader.onload = (oFREvent) => {
            //   this.img = oFREvent.currentTarget.result;
            //   oFile.value = '';
            // };
            this.$Api.TicketSubmit(res.q.files[0].path).then((res) => {
              if(res.q.s == 0) {
                this.$toast('提交成功').then(() => {
                  this.getTicketList();
                })
              }else {
                this.$toast(res.q.d, 'fail');
              }
            })
          }
        })

        event.target.value=null
      },
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #ticket {
    width: 100%;
    
    .ticket__list {
      padding: 0 boxValue(20);
      padding-bottom: boxValue(100);
      width: boxValue(600);

      .ticket {
        position: relative;
        float: left;
        margin-top: boxValue(16);
        width: 49%;
        height: 49vw;
        line-height: 49vw;
        background: #fff;
        

        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
          border-radius: 10px;
        }

        .ticket__del {
          position: absolute;
          right: boxValue(-10);
          top: boxValue(-10);
          display: inline-block;
          width: boxValue(50);
          height: boxValue(50);
          background: url('../../assets/imgdelete.png');
          background-size: 100%;
          z-index: 2;
        }
      }

      .ticket:nth-child(2n - 1) {
        margin-right: 2%;
      }
    }

    .ticket__submit {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: boxValue(70);
      line-height: boxValue(70);
      font-size: boxValue(26);
      text-align: center;
      color: #fff;
      background: #27adff;
    }

    .hide {
      display: none;
    }
  }
</style>

