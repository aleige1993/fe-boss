export default {
  data() {
    return {
      moduleColumns: [
        {
          title: '权限名称',
          key: 'moduleName'
        },
        {
          title: '权限类型',
          key: 'moduleType'
        },
        {
          title: '链接地址',
          key: 'moduleUrl'
        },
        {
          title: '上级权限',
          key: 'modulePname'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '排序',
          key: 'sort'
        },
        {
          title: '操作',
          width: 150,
          align: 'center',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('i-button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.setRow($.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: async () => {
                    Alertify.confirm('确定删除当前权限“' + params.row.moduleName + '”吗？', async(ok) => {
                      if (ok) {
                        let reps = await this.$http.post('/merchant/module/delete', {
                          moduleId: params.row.moduleId
                        });
                        if (reps.success) {
                          this.$Message.success('删除成功');
                          this.getModuleList();
                        }
                      }
                    });
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      moduleList: []
    };
  }
};
