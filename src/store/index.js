import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    dataLoadingShow: false,
    global: {
      currentPlace: '重庆',
      menuList: [],
      selectedTopMenuIndex: 0,
      secondMenuList: []
    }
  },
  getters: {
    menuList(state) {
      return state.global.menuList;
    },
    selectedTopMenuIndex(state) {
      return state.global.selectedTopMenuIndex;
    },
    secondMenuList(state) {
      return state.global.secondMenuList;
    }
  },
  actions,
  mutations
});
