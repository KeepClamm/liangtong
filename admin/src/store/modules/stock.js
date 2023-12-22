import Storage from '@/utils/storage';
import router from '@/router'
const state = {
    activeStock: Storage.get('activeStock') || {},
    standByStock: Storage.get('standByStock') || {},
    stockList: Storage.get('stockList') || [] // 导航栏收集的股票列表
}
const mutations = {
    SET_ACTIVE_STOCK: (state, info) => {
      state.activeStock = {
        stockName: info.stockName,
        stockCode: info.stockCode
      }
      Storage.set('activeStock', state.activeStock);
      Storage.set('standByStock', state.activeStock);
    },
    SET_STOCK_LIST: (state, info) => {
      console.log('stockList', info)
      if (!info.stockCode) return;
      const index = state.stockList.findIndex(item => item.stockCode === info.stockCode);
  
      if (index == -1) {
        state.stockList.push(info);
        Storage.set('stockList', state.stockList);
      }
    },
    REMOVE_STOCK: (state, code) => {
console.log('router', router)

      const index = state.stockList.findIndex(item => item.stockCode === code);
      const aaaList = state.stockList.map(item => item.stockCode == code);
      let nam = '';
      if (aaaList.length > 0){
        nam = aaaList[0]
      }
      state.stockList.splice(index, 1);
      Storage.set('stockList', state.stockList);
      if (index > 0) {
        // 跳转到上一个详情标签
        state.activeStock = state.stockList[index - 1];
        Storage.set('activeStock', state.activeStock);
        router.push({
          path: '/risk-home/client-detail',
          query: {
            stockName: nam ? nam : ''
          }
        })
        // jumpToModule('IndividualStockDetail');
      } else {
        // 跳转到首页
        state.activeStock = {};
        Storage.remove('activeStock');
        // jumpToModule('RiskHome');
        router.push({
          path: '/risk-home/same-client/same-client'
        })
      }
      return state.stockList.length;
    }
  }
  const actions = {
    setActiveStock({ commit }, info) {
      commit('SET_ACTIVE_STOCK', info);
      commit('SET_STOCK_LIST', info);
    },
    setStandByStock({ commit, state }) {
      commit('SET_ACTIVE_STOCK', state.standByStock);
      commit('SET_STOCK_LIST', state.standByStock);
    },
    removeStock({ commit }, code) {
      commit('REMOVE_STOCK', code);
    }
  }
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }