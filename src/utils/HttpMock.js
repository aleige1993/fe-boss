/*
 * Created by MarvenGong on 2017/4/21.
 */
import Mock from 'mockjs';
import MockConfig from './mockData';
import Config from './Config';
class HttpMock {
  constructor() {
    Mock.setup({
      timeout: Config.HTTPMOCK_TIMEOUT
    });
    // 判断是否全局开启mock
    if (!Config.HTTPMOCK_ON) {
      return;
    }
    MockConfig.map(item => {
      // 判断是否单个mock的开启状态
      if (item.on) {
        let rtype = item.type ? item.type : 'post';
        let url = '';
        if (rtype === 'post') {
          url = Config.HTTPBASEURL + item.url;
        } else {
          /* eslint-disable */
          String.prototype.replaceAll = function(s1,s2){
            return this.replace(new RegExp(s1,"gm"),s2);
          };
          let urlTemp = (Config.HTTPBASEURL + item.url).replaceAll('\/', '\\/');
          urlTemp = urlTemp.replaceAll('\:', '\\:');
          urlTemp = urlTemp.replaceAll('\[\.]', '\\.');
          url = new RegExp('^' + urlTemp + '\\?');
          /* eslint-disable */
        }
        //console.log('url========' + url);
        Mock.mock(url, () => {
          return item.resp;
        });
      }
    });
  }
}
export default new HttpMock();
