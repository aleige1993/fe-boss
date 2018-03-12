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
      secondMenuList: [],
      enumSelectData: null
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
    },
    enumSelectData(state) {
      return state.global.enumSelectData;
    },
    viewHeight() {
      // console.log(document.documentElement.clientHeight);
      let _Height = document.documentElement.clientHeight;
      // 设置默认值 table距离窗口顶部的距离 默认356px(面包屑区 + 搜索区 + 新增按钮区 + 分页区)
      let retHeight = _Height - 356;
      // 考虑浏览器至少有600的高度 600-356=244
      if (retHeight <= 244) {
        retHeight = 244;
      }
      return retHeight;
    }
  },
  actions,
  mutations
});
