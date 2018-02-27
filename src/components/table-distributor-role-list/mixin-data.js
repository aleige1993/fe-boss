import BsTooltip from '@/components/bs-tooltip';
export default {
  components: {
    BsTooltip
  },
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
            let moduleAry = params.row.moduleList;
            let moduleNames = '';
            if (moduleAry && (moduleAry.length > 0)) {
              for (let item of moduleAry) {
                moduleNames += `         ${item.moduleName};`;
              }
              return h(BsTooltip, {
                props: {
                  showText: '查看权限',
                  tipText: moduleNames.toString().substring(0, moduleNames.lastIndexOf(';')),
                  placement: 'left',
                  width: '200',
                  wordBreak: 'break-all',
                  whiteSpace: 'normal'
                },
                style: {
                  color: '#2baee9',
                  cursor: 'pointer'
                }
              });
            }
          }
        },
        {
          title: '创建日期',
          key: 'gmtCreate'
        },
        {
          title: '修改日期',
          key: 'gmtModified'
        }
      ],
      columnsFeatureActionColumns: [
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
                    let rowData = $.extend({}, params.row);
                    this.$emit('on-set-row', rowData);
                  }
                }
              }, '修改'),
              h('i-button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: async () => {
                    Alertify.confirm('确定删除当前角色吗？', async(ok) => {
                      if (ok) {
                        let reps = await this.$http.post('/merchant/role/deleteRoleAndModule', {
                          roleId: params.row.roleId
                        });
                        if (reps.success) {
                          this.$Message.success('删除成功');
                          this.getPrivateCustomerList();
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
      roleList: []
    };
  }
};
