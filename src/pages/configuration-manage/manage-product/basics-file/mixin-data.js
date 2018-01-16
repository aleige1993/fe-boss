export default {
  data() {
    return {
      columns1: [
        {
          title: '归档材料ID',
          align: 'center',
          width: 200,
          key: 'finishedDocCode'
        },
        {
          title: '归档材料名称',
          key: 'finishedDocName'
        },
        {
          title: '客户类型',
          width: 100,
          key: 'custType',
          render: (h, params) => {
            return this.enumCode2Name(params.row.custType, 'CustTypeEnum');
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
