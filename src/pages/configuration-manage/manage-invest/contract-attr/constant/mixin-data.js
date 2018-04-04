export default {
  data() {
    return {
      customerColumns: [
        {
          title: '常量名',
          key: 'fieldName'
        },
        {
          title: '常量描述',
          key: 'fieldDesc'
        },
        {
          title: '常量值',
          key: 'fieldValue'
        },
        {
          title: '常量类型',
          key: 'fieldType',
          render: (h, params) => {
            return h('span', {}, params.row.fieldType === '1' ? '系统常量' : '自定义常量');
          }
        }
      ],
      customerActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 160,
          align: 'center',
          render: (h, params) => {
            if (params.row.fieldType === '2') {
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
                  // style: { marginRight: '5px' },
                  on: {
                    click: () => {
                      Alertify.confirm('是否确认删除这条数据', async(ok) => {
                        if (ok) {
                          const loading = this.$Message.loading('处理中...', 0);
                          let resp = await this.$http.post('/PmsContractConstField/remove', {
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
        }
      ],
      privateCustomerLoanList: []
    };
  }
};
