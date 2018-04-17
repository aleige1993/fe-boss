export default {
  data() {
    return {
      // 合同信息表
      contractInfoColumns: [
        {
          title: '合同编号',
          // width: 170,
          align: 'center',
          key: 'contractNo'
        },
        {
          title: '合同名称',
          key: 'contractName'
        },
        {
          title: '签约方式',
          key: 'signMode',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.signMode, 'SignTypeEnum'));
          }
        },
        {
          title: '线上签署状态',
          key: 'onlineSignStatus',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.onlineSignStatus, 'ContractOnlineSignStatusEnum'));
          }
        },
        {
          title: '签署状态',
          key: 'signStatus',
          render: (h, params) => {
            return h('i-select', {
              props: {
                // 'disabled': this.$data.isDetails,
                'value': params.row.signStatus
              },
              on: {
                'on-change': (val) => {
                  this.$data.formData.contractList[params.index].signStatus = val;
                }
              }
            }, this.enumSelectData.get('ContractSignStatusEnum').map((item) => {
              return h('i-option', {
                props: {
                  label: item.itemName,
                  value: item.itemCode
                }
              });
            }));
          }
        },
        {
          title: '合同签署附件',
          key: 'contractName',
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                'content': '点击浏览/下载',
                'placement': 'bottom'
              }
            }, [
              h('a', {
                props: {
                  href: 'params.row.signContractUrl',
                  target: '_blank'
                },
                style: {
                  'textDecoration': 'underline'
                },
                on: {
                  click: () => {
                    window.open(params.row.signContractUrl, '_blank');
                  }
                }
              }, params.row.contractName)
            ]);
          }
        },
        {
          title: '操作',
          align: 'center',
          // width: '200',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$data.seePictureModal = true;
                    this.$data.contractRowIndex = params.index;
                    if (params.row.loanContractAttachmentList) {
                      this.$data.loanPicVOListModalData = params.row.loanContractAttachmentList.map((item) => {
                        item.PicUrl = item.attachmentUrl;
                        item.PicName = item.attachmentName;
                        return item;
                      });
                    } else {
                      this.$data.loanPicVOListModalData = [];
                    }
                  }
                }
              }, this.$data.isDetails ? '查看合同文件' : '上传/查看合同文件')
              /* h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  disabled: params.row.onlineSignStatus !== '2'
                },
                style: {
                  marginLeft: '5px'
                },
                on: {
                  click: () => {
                    alert('点击此按钮后生成一笔待签约任务，推送至APP');
                  }
                }
              }, '重新签署')*/
            ]);
          }
        }
      ]
    };
  }
};
