// 产品列表-新增产品的-产品特性表数据
export default {
  data() {
    return {
      columnsFeature: [
        {
          title: '标签',
          align: 'center',
          key: 'productTag'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.removeFeature($.extend({}, params.row));
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      dataFeature: [
        {
          productTag: '标签1'
        },
        {
          productTag: '标签2'
        },
        {
          productTag: '标签3'
        }
      ]
    };
  }
};
