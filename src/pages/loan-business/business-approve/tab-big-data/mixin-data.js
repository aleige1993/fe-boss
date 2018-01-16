export default {
  data() {
    return {
      contactColumns: [
        {
          title: '联系人姓名',
          key: 'contactsName'
        },
        {
          title: '关系',
          key: 'relative'
        },
        {
          title: '手机号码',
          key: 'contactsMobile'
        },
        {
          title: '联系人类型',
          key: 'contactType'
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
                    this.$data.addForm = $.extend({}, params.row);
                    this.$data.showAddModal = true;
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
                    Alertify.confirm('确定删除这个联系人吗？', async(ok) => {
                      if (ok) {
                        const msg = this.$Message.loading('正在删除联系人', 0);
                        let resp = await this.$http.post('/member/ohter/contacts/delete', {
                          recordId: params.row.id
                        });
                        msg();
                        if (resp.success) {
                          this.getContactList();
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
      contactDatas: [],
      contactBookColumns: [
        {
          title: '联系人姓名',
          key: 'contactsName'
        },
        {
          title: '邮箱',
          key: 'contactsEmail'
        },
        {
          title: '电话',
          key: 'contactsPhone'
        },
        {
          title: '联系人地址',
          key: 'contactsAddr'
        },
        {
          title: '联系人备注',
          key: 'contactsRemark'
        }
      ],
      contactBookDatas: [],
      callInColumns: [
        {
          title: '联系人姓名',
          key: 'contactsName'
        },
        {
          title: '电话',
          key: 'contactsPhone'
        },
        {
          title: '通话时间',
          key: 'gmtCreate'
        },
        {
          title: '通话时长',
          key: 'callTime'
        },
        {
          title: '通话次数',
          key: 'callCount'
        }
      ],
      callInDatas: [],
      callOutDatas: []
    };
  }
};
