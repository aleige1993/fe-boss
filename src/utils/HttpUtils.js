/**
 * Created by marven on 2017/4/23.
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
class Http {
  /**
   * 发起post请求
   * @param _url
   * @param _data
   * @param _success
   * @param _error
   */
  post(_url, _data) {
    if (Config.XHRLOG) {
      console.info(`----来自${_url}的请求----`);
      console.info(JSON.stringify(_data));
    }
    // alert(UserLogin.getLoginToken());
    return axios({
      url: _url,
      dataType: 'json',
      data: _data,
      headers: {
        'token': '' + UserLogin.getLoginToken()
      },
      method: 'POST'
    }).then(res => {
      if (res.data.reCode === '0004') {
        alert('登录超时');
        MyRouter.push(
          {
            path: '/login',
            query: {
              redirect_url: 'home'
            }
          }
        );
      } else {
        return res.data;
      }
    }).catch(err => {
      // error todo
      toastr.error(err);
    });
  }
  get(_url) {
    if (Config.XHRLOG) {
      console.info(`----来自${_url}的请求----`);
    }
    return axios({
      url: _url,
      dataType: 'json',
      headers: {
        'token': UserLogin.getLoginInfo().token
      },
      method: 'GET'
    }).then(res => {
      // console.log(res);
      if (res.data.reCode === '0004') {
        alert('登录超时');
        MyRouter.push(
          {
            path: '/login',
            query: {
              redirect_url: 'home'
            }
          }
        );
      } else {
        return res.data;
      }
    }).catch(err => {
      // error todo
      toastr.error(err);
    });
  }
}
export default Http;
