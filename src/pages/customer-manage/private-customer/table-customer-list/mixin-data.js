export default {
  data() {
    return {
      columns4: [
        {
          title: '客户编号',
          key: 'memberNo'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex',
          width: 100,
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.sex, 'SexEnum'));
          }
        },
        {
          title: '证件类型',
          key: 'certType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          key: 'certNo'
        },
        {
          title: '手机号码',
          key: 'mobile'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'MemberStatusEnum'));
          }
        }
      ],
      privateCustomerList: []
    };
  }
};
