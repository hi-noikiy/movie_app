<template>
  <div id="im">
    <!-- <div class="mes" v-for="item in MsgList">
      {{item.elems[0].content.text}}
    </div>
    <input type="text" placeholder="请输入">
    <button @click="sendC2cMsg">发送</button> -->
    
    <div class="im__wrap">
      <div class="list" v-for="item in MsgList">
        <template v-if="!item.isSend">
          <div class="im__list">
            <div class="img__avatar">
              <img :src="$ImgUrl + img" alt="" v-if="img">
              <img src="../../assets/avatar.png" alt="" v-else>
            </div>
            <div class="img__content">
              {{item.elems[0].content.text}}
            </div>
          </div>
        </template>
        <template v-else>
          <div class="im__list_r">
            <div class="img__content">
              {{item.elems[0].content.text}}
            </div>
            <div class="img__avatar">
              <img :src="$ImgUrl + userDetail.imagePath" alt="" v-if="userDetail.imagePath">
              <img src="../../assets/avatar.png" alt="" v-else>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="im__send">
      <div class="im__input">
        <input type="text" placeholder="想对ta说点什么?" v-model="textValue">
      </div>
      <div class="im__btn" @click="sendC2cMsg">发送</div>
    </div>
  </div>  
</template>

<script>
  import { mapGetters } from 'vuex';
  import Bus from '../../Bus';

  export default {
    data() {
      return {
        replay: {},
        MsgList: [],
        selToID: this.$route.query.id,
        selSess: {},
        img: this.$route.query.img,
        selType: 'C2C',
        getPrePageC2CHistroyMsgInfoMap: {},
        textValue: ''
      }
    },
    created() {
      var selSess = webim.MsgStore.sessByTypeId('C2C', this.$route.query.id);//初始化当前会话对象
      this.selSess = selSess;
      var sessMap = webim.MsgStore.sessMap();
      var count = webim.MsgStore.sessCount();
      var type = webim.MsgStore.sessByTypeId('C2C');
      webim.setAutoRead(selSess, true, true);
      console.log(sessMap);
      //拉取漫游消息
      this.getLastC2CHistoryMsgs((msgList) => {
        console.log('get');
        console.log(msgList);
        this.MsgList = msgList;
          // getHistoryMsgCallback(msgList);
          //绑定滚动操作
      }, function(err) {
        console.log(err)
      });

      Bus.$on('addMsg', (msg) => {
        console.log('添加数据');
        console.log(msg[0].fromAccount == this.$route.query.id)
        if(msg[0].fromAccount == this.$route.query.id) {
          this.MsgList.push(msg[0]);
        }
        this.$nextTick(() => {
          console.log('到底')
          var dh = document.documentElement.scrollHeight || document.body.scrollHeight;
          window.scrollTo(0, dh); 
        })
      })
    },

    computed: {
      ...mapGetters([
        'userDetail'
      ])
    },
    
    methods: {
      sendC2cMsg(){
        if(!this.textValue) {
          return false;
        }
        let toAccount= this.selToID;

        var sess=webim.MsgStore.sessByTypeId('C2C', toAccount);


        if(!sess) {
          sess = new webim.Session(webim.SESSION_TYPE.C2C, toAccount, toAccount, '', Math.round(new Date().getTime() / 1000));
          // this.$Api.getUserDetails(item.To_Account).then((res) => {
          //   if(res.q.s == 0) {
          //     item['user'] = res.q.user;
          //     commit('ADD_ONE_SESS', {sess: item});
          //   }
          // });
        }else {
          webim.setAutoRead(sess, true, false);
        }

        var isSend = true;//是否为自己发送
        var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
        var subType;//消息子类型

        subType = webim.C2C_MSG_SUB_TYPE.COMMON;

        var msg = new webim.Msg(sess, isSend, seq, random, msgTime, this.userDetail.id, subType, this.userDetail.nickname);

        var text_obj;

        text_obj = new webim.Msg.Elem.Text(this.textValue);
        msg.addText(text_obj);

        webim.sendMsg(msg, (resp) => {
            webim.Tool.setCookie("tmpmsg_" + toAccount, '', 0);
            this.MsgList.push(msg);
            this.textValue = '';
            this.$nextTick(() => {
              console.log('到底')
              var dh = document.documentElement.scrollHeight || document.body.scrollHeight;
              window.scrollTo(0, dh); 
            })
        }, function (err) {
          console.log(err);
        });
      },

      getHistoryMsgCallback(msgList,prepage) {
        var selSess = webim.MsgStore.sessByTypeId('C2C', this.$route.query.id);//初始化当前会话对象
        var msg;
        prepage = prepage || false;

        //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
        if(prepage){
          msgList.reverse();
        }

        for (var j in msgList) {//遍历新消息
          msg = msgList[j];
          if (msg.getSession().id() == this.selToID) {//为当前聊天对象的消息
            selSess = msg.getSession();
            //在聊天窗体中新增一条消息
            addMsg(msg,prepage);
          }
        }
        //消息已读上报，并将当前会话的消息设置成自动已读
        webim.setAutoRead(selSess, true, true);
      },

      getLastC2CHistoryMsgs(cbOk, cbError) {
        var selSess = webim.MsgStore.sessByTypeId('C2C', this.$route.query.id);//初始化当前会话对象
        var lastMsgTime = 0;//第一次拉取好友历史消息时，必须传0
        var msgKey = '';
        var options = {
          'Peer_Account': this.selToID, //好友帐号
          'MaxCnt': 10, //拉取消息条数
          'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
          'MsgKey': msgKey
        };
        selSess = null;
        webim.MsgStore.delSessByTypeId(this.selType, this.selToID);

        webim.getC2CHistoryMsgs(
            options,
            (resp) => {
              var complete = resp.Complete;//是否还有历史消息可以拉取，1-表示没有，0-表示有

              if (resp.MsgList.length == 0) {
                  webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
                  return;
              }

              this.getPrePageC2CHistroyMsgInfoMap[this.selToID] = {//保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
                  'LastMsgTime': resp.LastMsgTime,
                  'MsgKey': resp.MsgKey
              };
              //清空聊天界面
              if (cbOk)
                cbOk(resp.MsgList);
            },
            cbError
        );
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/mixin.scss';

  #im {
    padding-bottom: boxValue(80);

    .im__list {
      display: flex;
      margin: boxValue(16) 0;

      .img__avatar {
        margin-left: boxValue(20);
        width: boxValue(70);
        height: boxValue(70);
        border: 1px solid #eee;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .img__content {
        margin-left: boxValue(26);
        position: relative;
        max-width: boxValue(400);
        padding: boxValue(22) boxValue(16);
        line-height: boxValue(24);
        border-radius: boxValue(12);
        background: #fff;
        color: #666;

        &::after {
          content:"";
          position: absolute;
          right: 100%;
          top: boxValue(20);
          width: 0;
          height: 0;
          border-top: boxValue(10) solid transparent;
          border-right: boxValue(16) solid #fff;
          border-bottom: boxValue(10) solid transparent;
        }
      }
    }

    .im__list_r {
      display: flex;
      justify-content: flex-end;
      margin: boxValue(16) 0;

      .img__avatar {
        margin-right: boxValue(20);
        width: boxValue(70);
        height: boxValue(70);
        border: 1px solid #eee;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .img__content {
        margin-right: boxValue(26);
        position: relative;
        max-width: boxValue(400);
        padding: boxValue(22) boxValue(16);
        line-height: boxValue(24);
        border-radius: boxValue(12);
        background: #269ff0;
        color: #fff;

        &::after {
          content:"";
          position: absolute;
          left: 100%;
          top: boxValue(20);
          width: 0;
          height: 0;
          border-top: boxValue(10) solid transparent;
          border-left: boxValue(16) solid #269ff0;
          border-bottom: boxValue(10) solid transparent;
        }
      }
    }

    .im__send {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: boxValue(70);
      line-height: boxValue(70);
      display: flex;
      justify-content: space-between;
      background: #fff;

      .im__input {
        padding-left: boxValue(20);
        height: boxValue(46);
        width: 100%;

        input {
          height: 100%;
          width: 100%;
          border: none;
          outline: none;
        }
      }

      .im__btn {
        width: boxValue(120);
        background: #269ff0;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>
