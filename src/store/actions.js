export default {
  setMenuList({ commit }, list) {
    commit('setMenuList', list);
  },
  setSecondMenuList({ commit }, list) {
    commit('setSecondMenuList', list);
  },
  setSelectedTopMenuIndex({ commit }, index) {
    commit('setSelectedTopMenuIndex', index);
  },
  toggleLoading({ commit }, isShow) {
    commit('toggleLoading', isShow);
  }
};
