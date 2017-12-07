import Mock from 'mockjs';

export default [
  // 公用的新增的接口（测试）
  {
    url: '/commonSave',
    on: true,
    resp: Mock.mock({
      'body': {
        'resultList': []
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  },
  // 公用的删除的接口（测试）
  {
    url: '/commonRemove',
    on: true,
    resp: Mock.mock({
      'body': {
        'resultList': []
      },
      'reCode': '0000',
      'reMsg': '成功',
      'success': true
    })
  }
];
