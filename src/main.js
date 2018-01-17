//  The Vue build version to load with the `import` command
/** global fundebug */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Config from './utils/Config';
import Page from './utils/page';
import dateTest from './utils/date-test';
Vue.prototype.$config = Config;
Vue.prototype.$JumpPage = Page;     // 在有分页的页面中删除请求成功后 重新加载页面回到指定的当前分页
Vue.prototype.$DateTest= dateTest;  // 在有时间范围选择的页面中判断开始时间不能大于结束时间
Vue.config.productionTip = false;
import iView from 'iview';
Vue.use(iView);
import 'iview/dist/styles/iview.css';    // 使用 CSS
// http utils
import Http from './utils/HttpUtils';
Vue.prototype.$http = new Http();
// http mockjs
import {} from './utils/HttpMock';
// 其他插件和库的引入
import {} from './assets/js/boss';
import './assets/js/alertify';
import './assets/style/alertify.core.css';
import './assets/style/alertify.bootstrap.css';
// 表单区域块组件
import FormBlock from '@/components/bs-form-block';
Vue.component('bs-form-block', FormBlock);
import FormSecondTitle from '@/components/bs-form-child-title';
Vue.component('bs-form-child-title', FormSecondTitle);
import bsDatePicker from '@/components/bs-datepicker';
Vue.component('bs-datepicker', bsDatePicker);
import BsBigImg from '@/components/bs-big-img';
Vue.component('bs-big-img', BsBigImg);
import BsFileItem from '@/components/bs-file-item';
Vue.component('bs-file-item', BsFileItem);
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
Vue.prototype.$showLoading = () => {
  store.dispatch('toggleLoading', true);
};
Vue.prototype.$hideLoading = () => {
  store.dispatch('toggleLoading', false);
};
// fundebug
/*let formatComponentName = (vm) => {
  if (vm.$root === vm) return 'root';
  let name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
};
Vue.config.errorHandler = function(err, vm, info) {
  let componentName = formatComponentName(vm);
  let propsData = vm.$options && vm.$options.propsData;
  fundebug.notifyError(err, {
    metaData: {
      componentName: componentName,
      propsData: propsData,
      info: info
    }
  });
};*/
/* eslint-disable no-new */
$('.page-loading').show();
new Http().post('/common/items', {}).then(response => {
  $('.page-loading').hide();
  if (response.success) {
    let data = response.body;
    let storeData = new Map();
    data.map(item => {
      storeData.set(item.groupKey, item.items);
    });
    // console.log(storeData);
    store.dispatch('updateEnumSelectData', storeData);
  }
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
});
/* eslint-disable */
