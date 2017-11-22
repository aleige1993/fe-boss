//  The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Config from './utils/Config';
Vue.prototype.$config = Config;
Vue.config.productionTip = false;
import iView from 'iview';
Vue.use(iView);
import 'iview/dist/styles/iview.css';    // 使用 CSS
// http utils
import Http from './utils/HttpUtils';
Vue.prototype.$http = new Http();
// http mockjs
import {} from './utils/HttpMock';
import {} from './assets/js/boss';
// 表单区域块组件
import FormBlock from '@/components/bs-form-block';
Vue.component('bs-form-block', FormBlock);
import FormSecondTitle from '@/components/bs-form-child-title';
Vue.component('bs-form-child-title', FormSecondTitle);

// 页面title修改
Vue.directive('title', {
  inserted(el, binding) {
    document.title = binding.value
  }
});
// 登录工具类
import UserLogin from '@/utils/UserLogin';
Vue.prototype.$userLogin = UserLogin;
// 全局filter和全局mixins
import filter from './filter';
import mixins from './mixins';
//加载效果公共函数
Vue.prototype.$showLoading = ()=> {
  store.dispatch("toggleLoading", true);
};
Vue.prototype.$hideLoading = ()=> {
  store.dispatch("toggleLoading", false);
};
/* eslint-disable no-new */
$('.page-loading').show();
new Http().post('/common/items', {}).then(response => {
  $('.page-loading').hide();
  let data = response.body;
  let storeData = new Map();
  data.map(item => {
    storeData.set(item.groupKey, item.items);
  });
  // console.log(storeData);
  store.dispatch('updateEnumSelectData', storeData);
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
});
