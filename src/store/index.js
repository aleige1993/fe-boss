import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    global: {
      currentPlace: '重庆',
      menuList: [],
      secondMenuList: []
    }
  },
  getters: {
    menuList(state) {
      return state.global.menuList;
    },
    secondMenuList(state) {
      return state.global.secondMenuList;
    }
  },
  actions,
  mutations
});
