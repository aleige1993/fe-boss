export default {
  data() {
    return {
      columns1: [
        {
          title: '产品编号',
          width: 170,
          align: 'center',
          key: 'productNo'
        },
        {
          title: '产品名称',
          key: 'productName'
        },
        {
          title: '产品类型',
          key: 'productType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.productType, 'ProductTypeEnum'));
          }
        },
        {
          title: '产品状态',
          width: 100,
          key: 'status',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.status, 'ProductStatusEnum'));
          }
        },
        {
          title: '创建时间',
          key: 'gmtCreate'
        },
        {
          title: '更新时间',
          key: 'gmtModified'
        },
        {
          title: '创建人',
          key: 'createUserCode'
        }
      ],
      data1: []
    };
  }
};
