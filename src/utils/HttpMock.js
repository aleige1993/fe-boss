/**
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
        Mock.mock(Config.HTTPBASEURL + item.url, () => {
          return item.resp;
        });
      }
    });
  }
}
export default new HttpMock();
