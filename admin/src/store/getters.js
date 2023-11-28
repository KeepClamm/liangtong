const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userinfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  CurWatchStock: state => state.user.curWatchStockInfo,
  userWhiteList: state => state.user.whiteList
};

export default getters;
