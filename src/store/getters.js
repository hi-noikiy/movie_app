export const userDetail = state => state.userDetail;
export const visitorDetail = state => state.visitorDetail;
//判断是否游客
export const isVisitor = (state) => {
  if(Object.keys(state.visitorDetail).length > 0) {
    return true;
  }else {
    return false;
  }
}
export const unread = state => state.unread;
export const recentSessMap = state => state.recentSessMap;
export const selSess = state => state.selSess;
export const selToID = state => state.selToID;
export const selType = state => state.selType;
