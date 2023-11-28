import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  clearUserInfo,
  getUserInfo,
  getCurWatchStockInfo,
  setCurWatchStockInfo,
  removeActiveMunuName,
  removeAccount,
  removeBlackList
} from '@/utils/auth';

import { reqUserInfo } from '@/api/service/login';

const user = {
  state: {
    token: getToken(),
    userInfo: getUserInfo(),
    roles: [],
    curWatchStockInfo: getCurWatchStockInfo(),
    whiteList: ['admin']
  },

  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data;
      setToken(data);
    },
    GET_USER: (state, data) => {
      state.userInfo = data;
      setUserInfo(data);
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_CUR_WATCH_STOCK_INFO: (state, data) => {
      state.curWatchStockInfo = data;
      setCurWatchStockInfo(data);
    },
  },
  actions: {
    setToken({ commit }, data) {
      commit('SET_TOKEN', data);
    },
    getLoginUserInfo({ commit }) {
      // return new Promise((resolve, reject) => {
      //   const rolesList = ["admin"];
      //   // const rolesList = [];

      //   const userInfo = {
      //     account: "admin",
      //     rolesList: rolesList,
      //   };

      //   commit('GET_USER', userInfo);
      //   commit('SET_ROLES', rolesList);
      //   resolve(userInfo);

      //   // const userInfo = getUserInfo();
      //   // commit('SET_ROLES', userInfo && userInfo.rolesList || []);
        
      //   // resolve(userInfo);
      // })

      return  new Promise((resolve, reject) => {
        reqUserInfo().then(ret => {
          console.log("----获取的用户信息-----",ret);
          let userInfo = ret.data;
          let rolesList = [];

          if (userInfo.account == 'admin') {
            rolesList.push('admin')
          } else {
            rolesList = userInfo.permissions;
          }

          userInfo.rolesList = rolesList;
          
          commit('GET_USER', userInfo)
          commit('SET_ROLES', rolesList)
          resolve(userInfo)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LOGOUT({ commit, state }) {
      removeToken();
      removeAccount();
      removeBlackList();
      removeActiveMunuName();
      clearUserInfo();
      commit('SET_ROLES', []);
      commit('SET_CUR_WATCH_STOCK_INFO', null);
    },
    setCurWatchStockInfo({ commit }, data){
      commit('SET_CUR_WATCH_STOCK_INFO', data);
    },
  }
}

export default user
