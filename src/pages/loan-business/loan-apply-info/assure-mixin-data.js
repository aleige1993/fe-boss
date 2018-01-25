export default {
  data() {
    return {
      assureColumns: [
        {
          title: '保证人类型',
          align: 'center',
          width: 100,
          key: 'guaPersonType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaPersonType, 'CustTypeEnum'));
          }
        },
        {
          title: '保证人编号',
          key: 'guaPersonNo'
        },
        {
          title: '保证人',
          key: 'guaPersonName'
        },
        {
          title: '证件类型',
          key: 'guaPersonCertType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaPersonCertType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          key: 'guaPersonCertNo'
        },
        {
          title: '联系电话',
          key: 'guaPersonMobile'
        },
        {
          title: '联系地址',
          key: 'guaPersonAddr'
        },
        {
          title: '担保方式', // GuaranteeTypeEnum
          key: 'guaType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.guaType, 'GuaranteeTypeEnum'));
          }
        },
        {
          title: '与债务人关系', // RelativeEnum
          key: 'relation',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.relation, 'RelativeEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.readonly
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setListAssure(Object.assign({}, params.row));
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.readonly
                },
                on: {
                  click: () => {
                    this.removeAssure($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      assureData: []
    };
  }
};
