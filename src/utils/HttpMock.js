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
    if (!Config.HTTPMOCK_ON) {
      return;
    }
    MockConfig.map(item => {
      // console.log(item);
      Mock.mock(Config.HTTPBASEURL + item.url, () => {
        return item.resp;
      });
    });
  }
}
export default new HttpMock();
