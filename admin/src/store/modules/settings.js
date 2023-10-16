import defaultSettings from '@/settings';
import { getActiveMenuName, setActiveMenuName } from '@/utils/auth';

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  activeMenuName: getActiveMenuName(),
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  setActiveMenuName({ commit }, name) {
    // if (!name) {
    //   return;
    // }
    console.log(111, name)
    setActiveMenuName(name);

    commit('CHANGE_SETTING', {
      key: 'activeMenuName',
      value: name
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

