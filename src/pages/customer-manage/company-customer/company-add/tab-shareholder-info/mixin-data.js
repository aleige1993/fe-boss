export default {
  data() {
    return {
      shareHolerColumns: [
        {
          title: '股东姓名',
          key: 'partnerName'
        },
        {
          title: '股东类别',
          key: 'partnerType'
        },
        {
          title: '出资额（元）',
          key: 'investAmt'
        },
        {
          title: '出资方式',
          key: 'investType'
        },
        {
          title: '持股比例（%）',
          key: 'investPercent'
        },
        {
          title: '备注',
          key: 'remark'
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
                    Object.assign(this.$data.formData, params.row);
                    this.$data.addShareholerModal = true;
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
                  click: async () => {
                    Alertify.confirm('确定要删除当前股东信息吗？', async ok => {
                      if (ok) {
                        const msg = this.$Message.loading('正在删除股东信息...', 0);
                        let resp = await this.$http.post('/corp/deleteCorpPartner', {
                          corpNo: this.corpNo,
                          partnerNo: params.row.corpNo
                        });
                        msg();
                        if (resp.success) {
                          this.$Message.success('删除成功');
                          this.getShareHolderList();
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
      shareHolerDatas: []
    };
  }
};
