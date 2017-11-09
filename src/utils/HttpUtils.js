/**
 * Created by marven on 2017/4/23.
 */
import Vue from 'vue';
import axios from 'axios';
// 处理Raw纯json字符串得请求
axios.defaults.baseURL = 'http://10.164.1.37:8080/';
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
    return axios({
      url: _url,
      dataType: 'json',
      data: _data,
      headers: {
        // token: UserLogin.getLoginInfo().token
      },
      method: 'POST'
    }).catch(err => {
      // error todo
      console.error(err);
    });
  }
}
export default Http;
