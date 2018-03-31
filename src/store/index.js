import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const state = {
  userDetail: {},
  visitorDetail: {},
  isLoading: false,

  selType: 'C2C',
  selToID: '',
  selSess: null, //当前聊天会话对象
  unread: [],
  recentSessMap: []
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  // plugins: process.env.NODE_ENV !== 'production'
  //   ? [createLogger()]
  //   : []
  plugins: [createPersistedState()]
})