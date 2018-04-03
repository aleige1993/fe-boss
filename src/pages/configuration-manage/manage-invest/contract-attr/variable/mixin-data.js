export default {
  data() {
    return {
      customerColumns: [
        {
          title: '实体来源',
          key: 'sourceEntityName'
        },
        {
          title: '字段名',
          key: 'fieldName'
        },
        {
          title: '字段描述',
          key: 'fieldDesc'
        },
        {
          title: '枚举',
          key: 'fieldEnum',
          render: (h, params) => {
            let fieldEnum = params.row.fieldEnum;
            if (fieldEnum && fieldEnum.indexOf('.') > -1) {
              fieldEnum = fieldEnum.split('.');
              return h('span', {}, fieldEnum[fieldEnum.length - 1]);
            } else {
              return h('span', {}, '');
            }
          }
        },
        {
          title: '枚举名',
          key: 'fieldEnumCode'
        },
        {
          title: '枚举值',
          key: 'fieldEnumValue'
        }
      ],
      customerActionColumns: [],
      dataList: []
    };
  }
};
