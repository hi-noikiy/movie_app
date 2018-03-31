import Vue from 'vue'
import * as types from './mutation-types'

export default {
  //初始化用户信息
  [types.INIT_USER_DETAIL] (state, {user}) {
    this.state.userDetail = user;
  },

  //初始化游客信息
  [types.INIT_VISITOR_DETAIL] (state, {visitor}) {
    console.log('初始化游客信息',visitor);
    this.state.visitorDetail = visitor;
  },

  //清空游客信息
  [types.DEL_VISITOR_DETAIL] (state) {
    this.state.visitorDetail = {};
  },

  //更新loading效果(弃用)
  [types.UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading = payload.isLoading
  },

  //IM的添加sess
  [types.ADD_ONE_SESS] (state, {sess}) {
    state.recentSessMap.push(sess);
  }
}