export default {
  data() {
    return {
      cusomerLawsuitColumns: [
        {
          title: '立案时间',
          key: 'makeDate'
        },
        {
          title: '立案原因',
          key: 'makeReason'
        },
        {
          title: '案件金额',
          key: 'makeAmt'
        },
        {
          title: '案件角色',
          key: 'caseRole'
        },
        {
          title: '录入人',
          key: 'inputUserCode'
        },
        {
          title: '录入时间',
          key: 'inputTime'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    Alertify.confirm('是否确认删除这条记录', async (ok) => {
                      if (ok) {
                        const loading = this.$Message.loading('处理中...', 0);
                        let resp = await this.$http.post('/member/case/manage/delete', {
                          recordId: params.row.id
                        });
                        loading();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getList();
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
      cusomerLawsuitDatas: []
    };
  }
};
