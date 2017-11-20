import Mock from 'mockjs';
export default [
  // 资方管理
  {
    url: '/maintain',
    resp: Mock.mock({
      reCode: '0',
      'list|5': [
        {
          'id|+1': 1,
          'name|1': ['海尔云贷', '马云', '王健林'],
          'state|1': ['正常', '不正常']
        }
      ],
      reMsg: 'success'
    })
  }
];
