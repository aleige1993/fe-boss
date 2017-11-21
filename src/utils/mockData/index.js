// import Mock from 'mockjs';
import menuList from './menuList';
import product from './product';
import invest from './invest';
import customerManage from './customer-manage';
let ary = [
  {
    url: '/login',
    on: true,
    resp: {
      reCode: '0000',
      body: {
        token: 'XCSDCSXSDSDS',
        username: 'xiaoming',
        userId: 123
      },
      reMsg: 'success'
    }
  }
];
let result = [...ary, ...menuList, ...product, ...invest, ...customerManage];
export default result;
