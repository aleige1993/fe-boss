import Mock from 'mockjs';
export default [
  {
    url: '/repment',
    on: true,
    resp: Mock.mock({
      'body': [{
        'loanNo': '1',
        'memberName': '1'
      }],
      'reCode': '0000',
      'reMsg': '成功:成功',
      'success': true
    })
  }
];
