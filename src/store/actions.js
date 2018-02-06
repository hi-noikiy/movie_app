import * as types from './mutation-types'
import Api from '../Api/Api';
import Bus from '../Bus';

var status = 'init';
var id = null;

export const initUserDetail = ({ state,commit }, payload) => {
  if(status != 'init') {
    return false;
  }

  if(payload.userId != undefined) {
    id = payload.userId;
  }

  return new Promise((resolve, reject) => {
    status = 'requsting';
    if(Object.keys(state.userDetail) == 0) {
      if(id != null) {
        Api.getUserDetails(id).then((res) => {
          console.log('初始化user')
          if(res.q.s == 0) {
            let user = res.q.user;
            commit(types.INIT_USER_DETAIL, {user});
            setTimeout(() => {
              console.log(user)
              resolve(user);
            }, 1020)
          }
          status = 'init';
        })
      }else {
        Api.getUserDetails().then((res) => {
          console.log('初始化user')
          if(res.q.s == 0) {
            let user = res.q.user;
            commit(types.INIT_USER_DETAIL, {user});
            setTimeout(() => {
              console.log(user)
              resolve(user);
            }, 1020)
          }
          status = 'init';
        })
      }
      
    }else {
      status = 'init';
    }
  })
}

export const utilUserDetail = ({state}) => {
  return new Promise((resolve) => {
    var timer = setInterval(() => {
        if(Object.keys(state.userDetail).length > 0) {
          resolve();
          clearInterval(timer);
        }
      }, 50)
  })
}

export const updateUserDetail = ({ state,commit }, payload) => {
  if(id != null) {
    Api.getUserDetails(id).then((res) => {
      console.log('更新user')
      if(res.q.s == 0) {
        let user = res.q.user;
        commit(types.INIT_USER_DETAIL, {user});
      }
    })
  }else {
    Api.getUserDetails().then((res) => {
      console.log('更新user')
      if(res.q.s == 0) {
        let user = res.q.user;
        commit(types.INIT_USER_DETAIL, {user});
      }
    })
  }
  
}

var openIM = false;
export const initIM = ({ commit, state }, payload) => {
  if(!openIM) {
    openIM = true;
    loginInfo.identifier = state.userDetail.id;
    loginInfo.userSig = state.userDetail.sig;
    webimLogin(commit, state).bind(this); 
  }
}

export const updateIM = ( { commit, state }) => {
  initRecentContactList(commit, state);
}

var loginInfo = {
  'sdkAppID': 1400059482, //用户所属应用id,必填
  'identifier': '', //当前用户ID,必须是否字符串类型，必填
  'accountType': 21206, //用户所属应用帐号类型，必填
  'userSig': '', //当前用户身份凭证，必须是字符串类型，必填
  'identifierNick': null, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
  'headurl': 'img/me.jpg' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
}

var selToID = '6';

var onC2cEventNotifys = {
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

function webimLogin(commit, state) {
  var listeners = {
    "onConnNotify": onConnNotify//监听连接状态回调变化事件,必填
    ,"jsonpCallback": jsonpCallback//IE9(含)以下浏览器用到的jsonp回调函数，
    ,"onMsgNotify": onMsgNotify.bind(this)//监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
    // ,"onKickedEventCall" : onKickedEventCall//被其他登录实例踢下线
    ,"onC2cEventNotifys": onC2cEventNotifys//监听C2C系统消息通道
  }

  var options = {
    isLogOn: true
  }

  webim.login(loginInfo, listeners, options, (resp) => {
    console.log('登录成功')
    
    // initRecentContactList(commit);
  })
}

function onSendMsg() {
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
}

function onConnNotify(resp) {
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
}

function jsonpCallback(rspData) {
  webim.setJsonpLastRspData(rspData);
}

function onMsgNotify(newMsgList) {
  console.log('newMsgList');
  console.log(newMsgList);
  Bus.$emit('addMsg', newMsgList);
}

var recentSessMap = {};

function initRecentContactList(commit, state) {
  var options = {
    'Count': 20//要拉取的最近会话条数
  };
  var maxNameLen = 10;
  state.recentSessMap = []; //清空
  webim.getRecentContactList(
    options,
    function (resp) {
        var tempSess;//临时会话变量
        var firstSessType;//保存第一个会话类型
        var firstSessId;//保存第一个会话id
        //清空聊天对象列表
        console.log(resp)
        var count = 0;
        var tempList = [];
        if (resp.SessionItem && resp.SessionItem.length > 0) {//如果存在最近会话记录

          for (let i in resp.SessionItem) {
              let item = resp.SessionItem[i];
              var type = item.Type;//接口返回的会话类型
              console.log(item);
              item.selType = webim.SESSION_TYPE.C2C;
              var sessType,typeZh, sessionId, sessionNick='', sessionImage='', senderId='', senderNick='';
              if (type == webim.RECENT_CONTACT_TYPE.C2C) {//私聊
                typeZh = '私聊';
                sessType=webim.SESSION_TYPE.C2C;//设置会话类型
                sessionId = item.To_Account;//会话id，私聊时为好友ID或者系统账号（值为@TIM#SYSTEM，业务可以自己决定是否需要展示），注意：从To_Account获取,

                if(sessionId=='@TIM#SYSTEM'){//先过滤系统消息，，
                    webim.Log.warn('过滤好友系统消息,sessionId='+sessionId);
                    continue;
                }
                var key=sessType+"_"+sessionId;
                // var c2cInfo=infoMap[key];
                // if (c2cInfo && c2cInfo.name) {//从infoMap获取c2c昵称
                //     sessionNick = c2cInfo.name;//会话昵称，私聊时为好友昵称，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
                // }else{//没有找到或者没有设置过
                //     sessionNick = sessionId;//会话昵称，如果昵称为空，默认将其设成会话id
                // }
                // if (c2cInfo && c2cInfo.image) {//从infoMap获取c2c头像
                //     sessionImage = c2cInfo.image;//会话头像，私聊时为好友头像，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
                // }else{//没有找到或者没有设置过
                //     sessionImage = friendHeadUrl;//会话头像，如果为空，默认将其设置demo自带的头像
                // }
                senderId=senderNick='';//私聊时，这些字段用不到，直接设置为空
              } else {
                  typeZh = '未知类型';
                  sessionId = item.ToAccount;//
              }
              if(!sessionId){//会话id为空
                  webim.Log.warn('会话id为空,sessionId='+sessionId);
                  continue;
              }

              if(sessionId=='@TLS#NOT_FOUND'){//会话id不存在，可能是已经被删除了
                  webim.Log.warn('会话id不存在,sessionId='+sessionId);
                  continue;
              }

              if (sessionNick.length > maxNameLen) {//帐号或昵称过长，截取一部分，出于demo需要，业务可以自己决定
                  sessionNick = sessionNick.substr(0, maxNameLen) + "...";
              }

              tempSess=recentSessMap[sessType+"_"+sessionId];

              // for(let i in unread) {
              //   console.log(unread,'unread');
              //   if(item.To_Account == unread[i].id) {
              //     item.UnreadMsgCount = unread[i].unread;
              //   }
              // }

              Api.getUserDetails(item.To_Account).then((res) => {
                if(res.q.s == 0) {
                  item['user'] = res.q.user;
                  // commit('ADD_ONE_SESS', {sess: item});
                  tempList.push({sess: item})
                  count++;
                  if(count == resp.SessionItem.length) {
                    console.log('调用结束');
                    webim.syncMsgs((res) => {
                      var sessMap = webim.MsgStore.sessMap();
                      var unread = [];
                      for (var i in sessMap) {
                        console.log(i)
                        let impl = sessMap[i]._impl;
                        let obj = {
                          id: impl.id,
                          unread: impl.unread
                        }
                        console.log(tempList);
                        for(let i in tempList) {
                          if(tempList[i].sess.To_Account == impl.id) {
                            tempList[i].sess.UnreadMsgCount = impl.unread;
                          }
                        }
                        unread.push(obj);
                      }

                      for(let i in tempList) {
                        commit('ADD_ONE_SESS', tempList[i]);
                      }
                      console.log(unread);
                    })
                  }
                }
              });
              // if(!tempSess){//先判断是否存在（用于去重），不存在增加一个
                  
              //     if(!firstSessId){
              //         firstSessType=sessType;//记录第一个会话类型
              //         firstSessId=sessionId;//记录第一个会话id
              //     }
              //     recentSessMap[sessType+"_"+sessionId]={
              //         SessionType: sessType,//会话类型
              //         SessionId: sessionId,//会话对象id，好友id或者群id
              //         SessionNick: sessionNick,//会话昵称，好友昵称或群名称
              //         SessionImage:sessionImage,//会话头像，好友头像或者群头像
              //         C2cAccount:senderId,//发送者id，群聊时，才有用
              //         C2cNick:senderNick,//发送者昵称，群聊时，才有用
              //         UnreadMsgCount: item.UnreadMsgCount,//未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
              //         MsgSeq:item.MsgSeq,//消息seq
              //         MsgRandom: item.MsgRandom,//消息随机数
              //         MsgTimeStamp:webim.Tool.formatTimeStamp(item.MsgTimeStamp),//消息时间戳
              //         MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
              //         MsgShow: item.MsgShow//消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
              //     };

              //     //在左侧最近会话列表框中增加一个会话div
              //     addSess(sessType,webim.Tool.formatText2Html(sessionId), webim.Tool.formatText2Html(sessionNick), sessionImage, item.UnreadMsgCount, 'sesslist');
              // }
          }
          //清空聊天界面
          // tempSess = recentSessMap[firstSessType+"_"+firstSessId];//选中第一个会话
          // selType = tempSess.SessionType;//初始化当前聊天类型
          // selToID = tempSess.SessionId;//初始化当前聊天对象id
          // selSess = webim.MsgStore.sessByTypeId(selType, selToID);//初始化当前会话对象
          // this.$Api.getUserDetails(selToID).then((res) => {
          //   if(res.q.s == 0) {
          //     let user = res.q.user;
          //     user.unread = sess._impl.unread;
          //     let msgs = sess._impl.msgs;
          //     user.msgs = msgs[msgs.length -1].elems[0].content.text;
          //     commit('ADD_ONE_SESS', {sess: user});
          //   }
          // });

          // webim.syncMsgs(initUnreadMsgCount);//初始化最近会话的消息未读数5

          // if (cbOK)//回调
          //     cbOK();

      }

    },
    // cbErr
  );

  
}

//初始化最近会话的消息未读数
function initUnreadMsgCount(){
  var sess;
  var sessMap=webim.MsgStore.sessMap();
  var count = webim.MsgStore.sessCount();
  var type = webim.MsgStore.sessByTypeId('C2C');
  for (var i in sessMap) {
      sess = sessMap[i];
      if (selToID && selToID != sess.id()) {//更新其他聊天对象的未读消息数
          // updateSessDiv(sess.type(), sess.id(), sess.name(), sess.unread());
      }
  }
}

// function updateSessDiv(sess_type, to_id, name, unread_msg_count) {
//   var badgeDiv = document.getElementById("badgeDiv_" + to_id);
//   if (badgeDiv && unread_msg_count > 0) {
//       if (unread_msg_count >= 100) {
//           unread_msg_count = '99+';
//       }
//       badgeDiv.innerHTML = "<span>" + unread_msg_count + "</span>";
//       badgeDiv.style.display = "block";
//   } else if (badgeDiv == null) { //没有找到对应的聊天id
//       var headUrl;
//       if (sess_type == webim.SESSION_TYPE.C2C) {
//           headUrl = friendHeadUrl;
//       } else {
//           headUrl = groupHeadUrl;
//       }
//       // addSess(sess_type, to_id, name, headUrl, unread_msg_count, 'sesslist');
//   }
// }