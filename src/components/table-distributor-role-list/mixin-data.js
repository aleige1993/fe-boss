export default {
  data() {
    return {
      roleColumns: [
        {
          title: '角色编号',
          key: 'roleId'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '权限名称',
          key: 'moduleList',
          render: (h, params) => {
            let showText = '';
            params.row.moduleList.forEach((item) => {
              showText += (item.moduleName + '; ');
            });
            return h('span', {}, showText);
          }
        },
        {
          title: '创建日期',
          key: 'CreateDate'
        },
        {
          title: '修改日期',
          key: 'SetDate'
        }
      ],
      columnsFeatureActionColumns: [
        {
          title: '操作',
          width: 80,
          align: 'center',
          fixed: 'right',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    let rowData = $.extend({}, params.row);
                    this.$emit('on-set-row', rowData);
                  }
                }
              }, '修改')
            ]);
          }
        }
      ],
      roleList: []
    };
  }
};
