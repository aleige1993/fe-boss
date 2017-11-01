/**
 * Created by MarvenGong on 2017/4/21.
 */
import Mock from 'mockjs';
class HttpMock {
  constructor() {
    Mock.setup({
      timeout: 3000
    });
    Mock.mock('/login', function() {
      return {
        code: 0,
        'list|1-10': [{
          'name': '@name',
          'image': '@image(20-20)'
        }],
        msg: 'success'
      };
    });
    Mock.mock('/productList', function() {
       return Mock.mock({
         code: 0,
         'list|20': [{
           img: '@image(160X160)',
           name:'@name',
           price: '@integer(100, 10000)'
         }]
       })
    });
  }
}
export default new HttpMock();
