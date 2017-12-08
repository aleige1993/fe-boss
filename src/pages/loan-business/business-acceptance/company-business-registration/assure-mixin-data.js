export default {
  data() {
    return {
      assureColumns: [
        {
          title: '保证人类型',
          align: 'center',
          width: 100,
          key: 'assureType'
        },
        {
          title: '保证人编号',
          key: 'assureNo'
        },
        {
          title: '保证人',
          key: 'assureName'
        },
        {
          title: '担保方式',
          key: 'assureMode'
        },
        {
          title: '与债务人关系',
          key: 'obligorNexus'
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
                    this.setListAssure($.extend({}, params.row));
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
      assureData: [
        {
          assureType: '个人',
          assureNo: '65761568',
          assureName: '保证人01',
          assureMode: '一般保证',
          obligorNexus: '夫妻'
        },
        {
          assureType: '企业',
          assureNo: '8948923',
          assureName: '保证人02',
          assureMode: '连带责任保证',
          obligorNexus: '小三'
        }
      ]
    };
  }
};
