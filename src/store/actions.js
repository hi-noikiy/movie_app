import * as types from './mutation-types'
import Api from '../Api/Api';

var status = 'init';

export const initUserDetail = ({ state,commit }, payload) => {
  if(status != 'init') {
    return false;
  }

  return new Promise((resolve, reject) => {
    status = 'requsting';
    if(Object.keys(state.userDetail) == 0) {
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
  Api.getUserDetails().then((res) => {
    console.log('更新user')
    if(res.q.s == 0) {
      let user = res.q.user;
      commit(types.INIT_USER_DETAIL, {user});
    }
  })
}
// export const getAllMessages = ({ commit }) => {
//   api.getAllMessages(messages => {
//     commit(types.RECEIVE_ALL, {
//       messages
//     })
//   })
// }

// export const sendMessage = ({ commit }, payload) => {
//   api.createMessage(payload, message => {
//     commit(types.RECEIVE_MESSAGE, {
//       message
//     })
//   })
// }

// export const switchThread = ({ commit }, payload) => {
//   commit(types.SWITCH_THREAD, payload)
// }
