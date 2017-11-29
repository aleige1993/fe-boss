export default {
  data() {
    return {
      relationCorpColumns: [
        {
          title: '公司编号',
          key: 'relatedCorpNo'
        },
        {
          title: '公司名称',
          key: 'relatedCorpName'
        },
        {
          title: '统一社会信用代码',
          key: 'relatedCorpCreditCode'
        },
        {
          title: '关系',
          key: 'relation'
        },
        {
          title: '联系人',
          key: 'linkmanName'
        },
        {
          title: '联系电话',
          key: 'linkmanMobile'
        },
        {
          title: '注册时间',
          key: 'regDate'
        },
        {
          title: '注册资金',
          key: 'regCapital'
        },
        {
          title: '操作',
          key: 'action',
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
                    this.show(params.index);
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
                    this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      relationCorpDatas: []
    };
  }
};
