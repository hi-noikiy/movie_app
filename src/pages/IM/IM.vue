<template>
  <div id="im">
    <input type="text" placeholder="请输入">
    <button>发送</button>
  </div>  
</template>

<script>
  export default {
    created() {
      let user = this.getUserStorage();
      console.log(user)
      var accountType = 792;

      var loginInfo = {
        'sdkAppID': 1400001533, //用户所属应用id,必填
        'identifier': null, //当前用户ID,必须是否字符串类型，必填
        'accountType': accountType, //用户所属应用帐号类型，必填
        'userSig': null, //当前用户身份凭证，必须是字符串类型，必填
        'identifierNick': null, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
        'headurl': 'img/me.jpg' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
      };
    }
  }
</script>