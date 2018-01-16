export default {
  data() {
    return {
      customerColumns: [
        {
          title: '合同模板编号',
          key: 'contractTemplateNo'
        },
        {
          title: '合同模板名称',
          key: 'contractTemplateName'
        },
        {
          title: '属性名称',
          key: 'fieldName'
        },
        {
          title: '属性描述',
          key: 'fieldDesc'
        },
        {
          title: '属性类型',
          key: 'fieldType',
          render: (h, params) => {
            if (params.row.fieldType === '1') {
              return '常量';
            } else {
              return '变量';
            }
          }
        },
        {
          title: '属性默认值',
          key: 'fieldDefaultValue'
        },
        {
          title: '属性取值来源实体',
          key: 'fieldSourceEntity'
        },
        {
          title: '属性取值来源字段',
          key: 'fieldSourceAttr'
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 160,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: { marginRight: '5px' },
                on: {
                  click: () => {
                    this.$data.isAdd = false;
                    this.$data.addModal = true;
                    this.$data.fromData = $.extend({}, params.row);
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
                    Alertify.confirm('是否确认删除这条数据', async(ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('处理中...', 0);
                        let resp = await this.$http.post('/cfg/contract/remove', {
                          id: params.row.id
                        });
                        loading();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getProxyPayList();
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
      privateCustomerLoanList: []
    };
  }
};
