import Mock from 'mockjs';
export default [
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
  },
  // 产品管理
  {
    url: '/product',
    resp: Mock.mock({
      reCode: '0',
      'list|1-20': [
        {
          'codeId|+1': 1,
          'productNumber': 'CP1001',
          'productName': '@name',
          'productType|1': ['乘用车', '商用车', '轻卡', '微卡', '新能源'],
          'productState': '启用',
          'creationTime': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
          'updateTime': '@now("yyyy-MM-dd HH:mm:ss")',
          'Founder': '@name'
        }
      ],
      reMsg: 'success'
    })
  }
];
