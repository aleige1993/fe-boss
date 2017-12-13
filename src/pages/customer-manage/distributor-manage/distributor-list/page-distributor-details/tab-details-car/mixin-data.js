export default {
  data() {
    return {
      columnsCar: [
        {
          title: '车型ID',
          align: 'center',
          key: 'modelId'
        },
        {
          title: '车型名称',
          key: 'modelName'
        },
        {
          title: '厂商指导价（万元）',
          key: 'guidancePrice'
        },
        {
          title: '售价（万元）',
          key: 'sellingPrice'
        },
        {
          title: '销售状态',
          align: 'center',
          key: 'salesStatus'
        }
      ],
      dataCar: []
    };
  }
};
