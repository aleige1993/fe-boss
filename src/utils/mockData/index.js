import Mock from 'mockjs';
import menuList from './menuList';
import product from './product';
import invest from './invest';
let ary = [
  {
    url: '/login',
    resp: {
      reCode: '0',
      body: {
        token: 'XCSDCSXSDSDS',
        username: 'xiaoming',
        userId: 123
      },
      reMsg: 'success'
    }
  }
];
let result = [...ary, ...menuList, ...product, ...invest];
export default result;
