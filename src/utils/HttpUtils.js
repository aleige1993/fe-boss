/**
 * Created by marven on 2017/09/23.
 */
import Vue from 'vue';
import axios from 'axios';
import Config from './Config';
import MyRouter from '@/router';
import UserLogin from './UserLogin';
import toastr from '@/assets/js/toastr';
// 处理Raw纯json字符串得请求
axios.defaults.baseURL = Config.HTTPBASEURL;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$ajax = axios;
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: 'toast-top-right',
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '3000',
  extendedTimeOut: '1000'
};
class Http {
  /**
   * 发起post请求
   * @param _url
   * @param _data
   * @param isNeedLogin 是否需要登录token默认为需要，不需要传递false即可
   */
  post(_url, _data, isNeedLogin = true) {
    if (Config.XHRLOG) {
      /* eslint-disable */
      console.info(`----来自${_url}的POST请求----`);
      console.info(JSON.stringify(_data));
      /* eslint-disable */
    }
    let _headers = {};
    if (isNeedLogin) {
      _headers = {
        'token': '' + UserLogin.getLoginToken()
      };
    }
    return axios({
      url: _url,
      dataType: 'json',
      data: _data,
      headers: _headers,
      method: 'POST'
    }).then(res => {
      if (res.data.reCode === '0004' || res.data.reCode === 'BS0004') {
        toastr.error('登录超时');
        MyRouter.push(
          {
            path: '/login',
            query: {
              redirect_url: 'home'
            }
          }
        );
      } else if (res.data.reCode === '0000' || res.data.reCode === 'BS0000') {
        let data = res.data;
        data.success = data.success === 'true' || data.success === true;
        return data;
      } else {
        // toastr.error(_url + '<br/>' + res.data.reCode + ' <br/> ' + res.data.reMsg);
        Vue.prototype.$Notice.error({ title: '错误提示',  desc: _url + '<br/>' + res.data.reCode + ' <br/> ' + res.data.reMsg });
        let data = res.data;
        data.success = data.success === 'true' || data.success === true;
        return data;
      }
    }).catch(err => {
      // error todo
      Vue.prototype.$Notice.error({ title: '错误提示', desc: err });
    });
  }
  /**
   * 发起get请求
   * @param _url
   * @param isNeedLogin 是否需要登录token默认为需要，不需要传递false即可
   */
  get(_url, _params = {}, isNeedLogin = true) {
    if (Config.XHRLOG) {
      /* eslint-disable */
      console.info(`----来自${_url}的GET请求----`);
      /* eslint-disable */
    }
    let _headers = {};
    if (isNeedLogin) {
      _headers = {
        'token': '' + UserLogin.getLoginToken()
      };
    }
    return axios({
      url: _url,
      dataType: 'json',
      headers: _headers,
      method: 'GET',
      params: _params
    }).then(res => {
      // console.log(res);
      if (res.data.reCode === '0004' || res.data.reCode === 'BS0004') {
        toastr.error('登录超时');
        MyRouter.push(
          {
            path: '/login',
            query: {
              redirect_url: 'home'
            }
          }
        );
      } else if (res.data.reCode === '0000' || res.data.reCode === 'BS0000') {
        let data = res.data;
        data.success = data.success === 'true' || data.success === true;
        return data;
      } else {
        Vue.prototype.$Notice.error({ title: '错误提示', desc: _url + '<br/>' + res.data.reCode + ' <br/> ' + res.data.reMsg });
        let data = res.data;
        data.success = data.success === 'true' || data.success === true;
        return data;
      }
    }).catch(err => {
      // error todo
      Vue.prototype.$Notice.error({ title: '错误提示', desc: err });
    });
  }
}
export default Http;
