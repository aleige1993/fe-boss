export default {
  setMenuList(state, list) {
    state.global.menuList = list;
  },
  setSecondMenuList(state, list) {
    state.global.secondMenuList = list;
  },
  setSelectedTopMenuIndex(state, index) {
    state.global.selectedTopMenuIndex = index;
  },
  toggleLoading(state, isShow) {
    state.dataLoadingShow = isShow;
  },
  updateEnumSelectData(state, data) {
    state.global.enumSelectData = data;
  }
};
