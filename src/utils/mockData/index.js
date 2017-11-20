import Mock from 'mockjs';
import menuList from './menuList';
import product from './product';
let ary = [
  {
    url: '/login',
    on: false,
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
let result = [...ary, ...menuList, ...product];
export default result;
