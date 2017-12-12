export default {
  data() {
    return {
      loanColumns: [
        {
          title: '贷款材料名称',
          align: 'center',
          width: 150,
          key: 'loanDocName'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '文件名',
          key: 'attachPath',
          render: (h, params) => {
            return h('div', [
              h('p', {
                style: {
                  width: '100%',
                  height: '20px',
                  lineHeight: '18px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#2b90f8',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    params.row.fileName !== '' && window.open(params.row.fileName);
                  }
                }
              }, params.row.fileName)
            ]);
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
                    this.setListLoan($.extend({}, params.row));
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
                    this.removeLoan($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      loanData: []
    };
  }
};
