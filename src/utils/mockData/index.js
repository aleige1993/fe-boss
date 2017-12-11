import Mock from 'mockjs';
import menuList from './menuList';
import product from './product';
import invest from './invest';
import customerManage from './customer-manage';
import employerManage from './employer-manage';
import enumSelectData from './enum-select-data';
import department from './department';
import companyCredit from './company-credit';
import loanbusiness from './loanbusiness';

let ary = [
  {
    url: '/login',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        token: 'XCSDCSXSDSDS',
        username: 'xiaoming',
        userId: 123
      },
      reMsg: 'success'
    }
  },
  // 文件上传
  {
    url: '/common/upload',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        url: 'http://www.sinaimg.cn/qc/autoimg/car/30/34/129863430_950.jpg'
      },
      reMsg: 'success'
    }
  },
  // 地址获取
  {
    url: '/common/region/list',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      'body': [
        {
          regionCode: '1',
          regionName: '@province'
        },
        {
          regionCode: '2',
          regionName: '@province'
        },
        {
          regionCode: '3',
          regionName: '@province'
        }
      ]
    })
  },
  // 银行下拉
  {
    url: '/common/support/bank/list',
    on: true,
    resp: Mock.mock({
      reCode: '0000',
      success: true,
      'body|10': [
        {
          bankCode: '1',
          bankName: '@name'
        }
      ]
    })
  }
];
let result = [...ary, ...menuList, ...product, ...invest, ...customerManage, ...enumSelectData, ...employerManage, ...department, ...companyCredit, ...loanbusiness];
export default result;
