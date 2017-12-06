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
      data1: []
    };
  }
};
