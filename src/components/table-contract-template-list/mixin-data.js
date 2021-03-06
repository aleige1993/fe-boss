export default {
  data() {
    return {
      columns1: [
        {
          title: '合同模板ID',
          width: 100,
          align: 'center',
          key: 'id'
        },
        {
          title: '合同名称',
          key: 'contractTemplateName'
        },
        {
          title: '合同属主',
          key: 'contractSource',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.contractSource, 'ContractSourceEnum'));
          }
        },
        {
          title: '合同类型',
          key: 'contractType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.contractType, 'ContractTypeEnum'));
          }
        },
        {
          title: '签订方式',
          key: 'signType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.signType, 'SignTypeEnum'));
          }
        },
        {
          title: '模板附件',
          width: 200,
          key: 'enclosure',
          render: (h, params) => {
            if (this.isImg(params.row.contractTemplateAttach)) {
              return h('bs-big-img', {
                attrs: {
                  style: 'margin:10px 0'
                },
                props: {
                  thumbHeight: 80,
                  fullWidth: 1000,
                  thumb: params.row.contractTemplateAttach,
                  full: params.row.contractTemplateAttach
                }
              });
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    icon: 'android-download'
                  },
                  on: {
                    click: () => {
                      window.open(params.row.contractTemplateAttach);
                    }
                  }
                }, '点击浏览/下载')
              ]);
            }
          }
        },
        {
          title: '签约平台模板ID',
          key: 'yundaiContractId'
        }
      ],
      columnsFeatureActionColumns: [
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$emit('on-set-row', $.extend({}, params.row));
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    Alertify.confirm('确定要删除吗？', async(ok) => {
                      if (ok) {
                        const loadingMsg = this.$Message.loading('删除中...', 0);
                        let respDel = await this.$http.post('/contract/deleteContractTemplate', {
                          contractTemplateNo: params.row.contractTemplateNo
                        });
                        loadingMsg();
                        if (respDel.success) {
                          this.$Message.success('删除成功');
                          let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
                          this.getPrivateCustomerList(jumpPage);
                        }
                      }
                    });
                  }
                }
              }, '删除')
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   on: {
              //     click: () => {
              //       this.$router.push({
              //         path: '/index/conf/invest/contractsetting',
              //         query: {
              //           id: params.row.contractTemplateNo,
              //           name: params.row.contractTemplateName
              //         }
              //       });
              //     }
              //   }
              // }, '属性配置')
            ]);
          }
        }
      ],
      data1: []
    };
  }
};
