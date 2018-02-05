import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import mutations from './mutations';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const state = {
  userDetail: {},
  isLoading: false,

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