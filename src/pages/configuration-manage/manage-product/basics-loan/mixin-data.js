export default {
  data() {
    return {
      columns1: [
        {
          title: '贷款材料ID',
          align: 'center',
          key: 'loanDocCode'
        },
        {
          title: '贷款材料名称',
          key: 'loanDocName'
        },
        {
          title: '客户类型',
          width: 100,
          key: 'custType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.custType, 'CustTypeEnum'));
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                    this.setList($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
