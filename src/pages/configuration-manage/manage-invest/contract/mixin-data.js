export default {
  data() {
    return {
      columns1: [
        {
          title: '合同模板ID',
          width: 100,
          align: 'center',
          key: 'id'
        },
        {
          title: '合同名称',
          key: 'contractTemplateName'
        },
        {
          title: '模板附件',
          key: 'enclosure',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'android-download'
                },
                on: {
                  click: () => {
                    window.open(params.row.contractTemplateAttach);
                  }
                }
              }, '点击浏览/下载')
            ]);
          }
        },
        {
          title: '签约平台模板ID',
          key: 'yundaiContractId'
        }
      ],
      columnsFeatureActionColumns: [
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
