import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.INIT_USER_DETAIL] (state, {user}) {
    this.state.userDetail = user;
  },

  [types.UPDATE_LOADING_STATUS] (state, payload) {
    state.isLoading = payload.isLoading
  },

  ['hello'] (state, payload) {
    state.userDetail.canUseIntegral--;
  }
}