<template>
  <div id="im">
    <div class="mes" v-for="item in MsgList">
      {{item.elems[0].content.text}}
    </div>
    <input type="text" placeholder="请输入">
    <button @click="sendC2cMsg">发送</button>
  </div>  
</template>

<script>
  export default {
    data() {
      return {
        replay: {},
        MsgList: [],
        toAccount: this.$route.query.id,
        userDetail: {}
      }
    },
    created() {
      let user = this.getUserStorage();
      this.userDetail = user;

      let toAccount = this.$route.query.id;
      var sess=webim.MsgStore.sessByTypeId(webim.SESSION_TYPE.C2C, toAccount);
      if (!sess) {
        sess = new webim.Session(webim.SESSION_TYPE.C2C, toAccount, toAccount, '', Math.round(new Date().getTime() / 1000));
      }
      webim.setAutoRead(sess, true, false);
      var options = {
        'Peer_Account': toAccount, //好友帐号
        'MaxCnt': 10, //拉取消息条数
        'LastMsgTime': 0, //最近的消息时间，即从这个时间点向前拉取历史消息
        'MsgKey': ''
      };
      webim.getC2CHistoryMsgs(
        options,
        (resp) => {
          console.log(resp)
          if(resp.MsgList) {
            this.MsgList.push(...resp.MsgList)
          }
        },
      );
      // this.MsgList.push(...sess._impl.msgs)
    },
    
    methods: {
      sendC2cMsg(){

          let toAccount= this.toAccount;

          var sess=webim.MsgStore.sessByTypeId(webim.SESSION_TYPE.C2C, toAccount);
          var isSend = true;//是否为自己发送
          var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
          var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
          var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
          var subType;//消息子类型

          subType = webim.C2C_MSG_SUB_TYPE.COMMON;

          var msg = new webim.Msg(sess, isSend, seq, random, msgTime, this.userDetail.id, subType, this.userDetail.nickname);

          var text_obj;

          text_obj = new webim.Msg.Elem.Text('测试哈');
          msg.addText(text_obj);

          webim.sendMsg(msg, function (resp) {
            console.log('cc')
              webim.Tool.setCookie("tmpmsg_" + toAccount, '', 0);
          }, function (err) {
              alert(err.ErrorInfo);
          });
      }
    }
  }
</script>