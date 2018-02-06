export default {
  data() {
    return {
      contactBookColumns: [
        {
          title: '联系人姓名',
          key: 'contactsName'
        },
        {
          title: '邮箱',
          key: 'ontactsEmail'
        },
        {
          title: '电话',
          key: 'ontactsPhone'
        },
        {
          title: '联系人地址',
          key: 'ontactsAddress'
        },
        {
          title: '联系人备注',
          key: 'contactsRemark'
        }
      ],
      contactBookDatas: [],
      callInColumns: [
        {
          title: '联系人姓名',
          key: 'contactsName'
        },
        {
          title: '电话',
          key: 'contactsPhone'
        },
        {
          title: '通话时间',
          key: 'gmtCreate'
        },
        {
          title: '通话时长',
          key: 'callTime'
        },
        {
          title: '通话次数',
          key: 'callCount'
        }
      ],
      callInDatas: [],
      callOutDatas: []
    };
  }
};
