export default {
  data() {
    return {
      cusomerLawsuitColumns: [
        {
          title: '立案时间',
          key: 'lawCaseDate'
        },
        {
          title: '立案原因',
          key: 'lawCaseCause'
        },
        {
          title: '案件金额',
          key: 'lawCaseAmt'
        },
        {
          title: '案件角色',
          key: 'lawCaseRole'
        },
        {
          title: '录入人',
          key: 'createUserCode'
        },
        {
          title: '录入时间',
          key: 'gmtCreate'
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
                        let resp = await this.$http.post('/corp/deleteCorpLawcase', {
                          corpNo: params.row.corpNo,
                          lawCaseNo: params.row.lawCaseNo
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
