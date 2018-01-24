// export const threads = state => state.threads
export const userDetail = state => state.userDetail;
export const unread = state => state.unread;
export const recentSessMap = state => state.recentSessMap;

// export const currentThread = state => {
//   return state.currentThreadID
//     ? state.threads[state.currentThreadID]
//     : {}
// }

// export const currentMessages = state => {
//   const thread = currentThread(state)
//   return thread.messages
//     ? thread.messages.map(id => state.messages[id])
//     : []
// }
