<template>
  <div id="message">
    <Message :userList="userList" :type="'message'"/>
  </div>
</template>

<script>
  import Message from '@/components/Invite/Invite';

  export default {
    data() {
      return {
        userList: [],
        loginInfo: {
          'sdkAppID': 1400059482, //用户所属应用id,必填
          'identifier': '', //当前用户ID,必须是否字符串类型，必填
          'accountType': 21206, //用户所属应用帐号类型，必填
          'userSig': '', //当前用户身份凭证，必须是字符串类型，必填
          'identifierNick': null, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
          'headurl': 'img/me.jpg' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
        }
      }
    },
    created() {
      let user = this.getUserStorage();
      console.log(user)
      var accountType = 21206;
      var sdkAppID = 1400059482;
      this.loginInfo.identifier = user.id;
      this.loginInfo.userSig = user.sig;

      this.webimLogin();
    },

    methods: {

      webimLogin() {
        var listeners = {
          "onConnNotify": this.onConnNotify//监听连接状态回调变化事件,必填
          ,"jsonpCallback": this.jsonpCallback//IE9(含)以下浏览器用到的jsonp回调函数，
          ,"onMsgNotify": this.onMsgNotify//监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
          // ,"onBigGroupMsgNotify": onBigGroupMsgNotify//监听新消息(直播聊天室)事件，直播场景下必填
          // ,"onGroupSystemNotifys": onGroupSystemNotifys//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
          // ,"onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
          // ,"onFriendSystemNotifys": onFriendSystemNotifys//监听好友系统通知事件，选填
          // ,"onProfileSystemNotifys": onProfileSystemNotifys//监听资料系统（自己或好友）通知事件，选填
          // ,"onKickedEventCall" : onKickedEventCall//被其他登录实例踢下线
          ,"onC2cEventNotifys": this.onC2cEventNotifys//监听C2C系统消息通道
        }

        var options = {
          isLogOn: true
        }

        webim.login(this.loginInfo, listeners, options, (resp) => {
          console.log('登录成功')
          console.log(resp);
          // this.onSendMsg();

          webim.syncMsgs((res) => {
    				var sessMap = webim.MsgStore.sessMap();
              console.log(sessMap);
              for (var i in sessMap) {
                let sess = sessMap[i];
                console.log(sess);
                let id = sess._impl.id
                this.$Api.getUserDetails(id).then((res) => {
                  console.log(res);
                  if(res.q.s == 0) {
                    let user = res.q.user;
                    user.unread = sess._impl.unread;
                    let msgs = sess._impl.msgs;
                    user.msgs = msgs[msgs.length -1].elems[0].content.text;
                    this.userList.push(res.q.user);
                  }
                })
              }
          })
          
          webim.getRecentContactList(options, function(resp) {
            console.log(resp,'111111111111')
          })
        })
      },

      onSendMsg() {
        var selToID = '6';
        var selType = webim.SESSION_TYPE.C2C;
        var selSess = new webim.Session(selType, selToID, selToID, '', Math.round(new Date().getTime() / 1000));

        var isSend = true; //是否为自己发送
        var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
        var subType; //消息子类型
        if (selType == webim.SESSION_TYPE.C2C) {
          subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        } else {
          //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
          //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
          //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
          //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
          subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
        }
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, this.loginInfo.identifier, subType, this.loginInfo.identifierNick);

        var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var msgContent = '测试赛所所所所22cccc222222所所所'

        var emotions = msgContent.match(expr);
        if (!emotions || emotions.length < 1) {
          text_obj = new webim.Msg.Elem.Text(msgContent);
          console.log(text_obj);
          msg.addText(text_obj);
        }

        msg.PushInfo = {
          "PushFlag": 0,
          "Desc": '测试离线推送内容', //离线推送内容
          "Ext": '测试离线推送透传内容', //离线推送透传内容
          "AndroidInfo": {
            "Sound": "android.mp3" //离线推送声音文件路径。
          },
          "ApnsInfo": {
            "Sound": "apns.mp3", //离线推送声音文件路径。
            "BadgeMode": 1
          }
        };

        msg.PushInfoBoolean = true; //是否开启离线推送push同步
        msg.sending = 1;
        msg.originContent = msgContent;
        console.log(msg);
        webim.sendMsg(msg, function(resp) {
          console.log(resp);
          //发送成功，把sending清理
          // $("#id_" + msg.random).find(".spinner").remove();
          // webim.Tool.setCookie("tmpmsg_" + selToID, '', 0);
        }, function(err) {
          //alert(err.ErrorInfo);
          //提示重发
          // showReSend(msg);
        });
      },

      onConnNotify(resp) {
	      var info;
        switch (resp.ErrorCode) {
          case webim.CONNECTION_STATUS.ON:
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
            break;
          case webim.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
          case webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
          default:
            webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
            break;
        }
      },

      jsonpCallback(rspData) {
        webim.setJsonpLastRspData(rspData);
      },

      onMsgNotify(newMsgList) {
        console.log('newMsgList');
        console.warn(newMsgList);
        var sess, newMsg;
        //获取所有聊天会话
        var sessMap = webim.MsgStore.sessMap();
        console.log(sessMap);

        for (var j in newMsgList) {//遍历新消息
          newMsg = newMsgList[j];

          if (newMsg.getSession().id() == selToID) {//为当前聊天对象的消息
            selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            //console.warn(newMsg);
            addMsg(newMsg);
          }
        }
        //消息已读上报，以及设置会话自动已读标记
        webim.setAutoRead(selSess, true, true);

        for (var i in sessMap) {
          sess = sessMap[i];
          if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
            updateSessDiv(sess.type(), sess.id(), sess.unread());
          }
        }
      },
      
      onC2cEventNotifys: {
        "92": //消息已读通知
        function onMsgReadedNotify(notify) {
          console.log('onC2cEventNotifys');
          console.log(notify)
            var sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C+notify.From_Account];
            console.log(sessMap);
            if(sessMap){
            }
        }
      }
    },
    components: {
      Message
    }
  }
</script>


