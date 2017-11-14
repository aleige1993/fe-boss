//  The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
Vue.config.productionTip = false;
import iView from 'iview';
Vue.use(iView);
import 'iview/dist/styles/iview.css';    // 使用 CSS
// http utils
import Http from './utils/HttpUtils';
Vue.prototype.$http = new Http();
// http mockjs
import {} from './utils/HttpMock';
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
// global filter
import filter from './filter';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
