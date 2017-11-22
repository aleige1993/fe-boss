import Mock from 'mockjs';
export default [
  {
    url: '/common/user/page',
    on: true,
    resp: Mock.mock(
      {
        'body': {
          'currentPage': 1,
          'isMore': 0,
          'pageSize': 15,
          'resultList|10': [
            {
              'userCode': '@Integer(18)',
              'mobile': '@Integer(10)',
              'userName': '@name',
              'deptName': '@name'
            }
          ],
          'startIndex': 0,
          'totalNum': 100,
          'totalPage': 1
        },
        'reCode': '0000',
        'reMsg': '成功',
        'success': true
      }
    )
  }
];
