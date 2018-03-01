export default {
  data() {
    return {
      relationCorpColumns: [
        {
          title: '公司编号',
          key: 'relatedCorpNo'
        },
        {
          title: '公司名称',
          key: 'relatedCorpName'
        },
        {
          title: '统一社会信用代码',
          key: 'relatedCorpCreditCode'
        },
        {
          title: '关系',
          key: 'relation',
          render: (h, params) => {
            return this.enumCode2Name(params.row.relation, 'HaveCompanyRelativeEnum');
          }
        },
        {
          title: '联系人',
          key: 'linkmanName'
        },
        {
          title: '联系电话',
          key: 'linkmanMobile'
        },
        {
          title: '注册时间',
          key: 'regDate'
        },
        {
          title: '注册资金(万元)',
          key: 'regCapital'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$data.formData = { ...params.row };
                    this.$data.addRelationCorpModal = true;
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    // this.remove(params.index);
                    Alertify.confirm('确定要删除吗？', async(ok) => {
                      if (ok) {
                        const loadingMsg = this.$Message.loading('删除中...', 0);
                        let resp = await this.$http.post('/corp/deleteCorpRelationShip', {
                          corpNo: this.corpNo,
                          relatedCorpNo: params.row.relatedCorpNo
                        });
                        loadingMsg();
                        if (resp.success) {
                          this.$Message.success('删除关联企业信息成功');
                          this.getRelationList();
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
      relationCorpDatas: []
    };
  }
};
