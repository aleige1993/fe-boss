import Mock from 'mockjs';
export default [
  // 资方管理
  {
    url: '/maintain',
    on: true,
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
  },
  // 资方管理 - 新增弹窗 - 合同协议
  {
    url: '/agreement',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|5': [
        {
          'id|+1': 1,
          'name|1': ['协议名称01', '协议名称02', '协议名称03'],
          'enclosure|1': ['001.jpg', '002.jpg', '003.jpg']
        }
      ],
      reMsg: 'success'
    })
  },
  // 资方管理 - 资方映射配置
  {
    url: '/mapping',
    on: true,
    resp: Mock.mock({
      reCode: '0',
      'list|5': [
        {
          'proNumber|1': ['产品编号01', '产品编号02', '产品编号03'],
          'proName|1': ['欢乐颂', '任分期'],
          'investName|1': ['海尔云贷', '海乐行融资租赁'],
          'investProNumber|1': ['资方产品编号01', '资方产品编号02', '资方产品编号03'],
          'channelNumber|1': ['渠道编号01', '渠道编号02', '渠道编号03'],
          'managerNumber|1': ['客户经理编号01', '客户经理编号02', '客户经理编号03']
        }
      ],
      reMsg: 'success'
    })
  }
];
