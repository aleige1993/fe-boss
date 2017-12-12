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
      console.info(`----来自${_url}的POST请求----`);
      console.info(JSON.stringify(_data));
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
        console.log(MyRouter);
        MyRouter.push(
          {
            path: '/login',
            query: {
              redirect_url: 'home'
            }
          }
        );
      } else if (res.data.reCode === '0000') {
        return res.data;
      } else {
        toastr.error(res.data.reCode + ' = ' + res.data.reMsg);
        return res.data;
      }
    }).catch(err => {
      // error todo
      toastr.error(err);
    });
  }
  /**
   * 发起get请求
   * @param _url
   * @param isNeedLogin 是否需要登录token默认为需要，不需要传递false即可
   */
  get(_url, _params = {}, isNeedLogin = true) {
    if (Config.XHRLOG) {
      console.info(`----来自${_url}的GET请求----`);
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
      if (res.data.reCode === '0004') {
        toastr.error('登录超时');
        MyRouter.push(
          {
            path: '/login',
            query: {
              redirect_url: 'home'
            }
          }
        );
      } else if (res.data.reCode === '0000') {
        return res.data;
      } else {
        toastr.error(res.data.reMsg);
        return res.data;
      }
    }).catch(err => {
      // error todo
      toastr.error(err);
    });
  }
}
export default Http;
