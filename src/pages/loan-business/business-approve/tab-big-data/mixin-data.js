export default {
  data() {
    return {
      emergencyColumns: [
        {
          title: '关系',
          key: 'relative',
          render: (h, params) => {
            return this.enumCode2Name(params.row.relative, 'RelativeEnum');
          }
        },
        {
          title: '联系人姓名',
          key: 'contactsName'
        },
        {
          title: '电话',
          key: 'contactsMobile'
        },
        {
          title: '联系人类型',
          key: 'contactType',
          render: (h, params) => {
            return this.enumCode2Name(params.row.contactType, 'ContactTypeEnum');
          }
        }
      ],
      emergencyDatas: [],
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
