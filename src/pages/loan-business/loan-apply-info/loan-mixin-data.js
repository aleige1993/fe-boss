import Tools from '../../../utils/Tools';

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
            if (Tools.isImg(params.row.attachPath)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  fullWidth: 1000,
                  thumb: params.row.attachPath,
                  full: params.row.attachPath
                }
              });
            } else {
              return h('span', {}, params.row.attachPath);
            }
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
                    this.setListLoan($.extend({}, params.row));
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
                    this.removeLoan($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      loanData: [
        /* {
          'loanDocCode': '',
          'loanDocName': '',
          'status': '',
          'docDetailAttachList': [
            {
              'loanDocCode': '',
              'attachName': '',
              'attachUrl': ''
            }
          ]
        }*/
      ]
    };
  }
};
