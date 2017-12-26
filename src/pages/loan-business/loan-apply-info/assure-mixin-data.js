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
            return h('span', {}, params.row.guaPersonType === '1' ? '个人' : '企业');
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
          key: 'guaPersonCertType'
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
          title: '担保方式',
          key: 'guaType',
          render: (h, params) => {
            return h('span', {}, params.row.guaType === '1' ? '连带责任保证' : '一般保证');
          }
        },
        {
          title: '与债务人关系',
          key: 'relation',
          render: (h, params) => {
            return h('span', {}, params.row.relation === '1' ? '亲属' : '父母');
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
                  size: 'small'
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
                  size: 'small'
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
