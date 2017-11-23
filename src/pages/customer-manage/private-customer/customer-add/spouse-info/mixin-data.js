export default {
  data() {
    return {
      spouseColumns: [
        {
          title: '配偶客户编号',
          key: 'spoMemberNo'
        },
        {
          title: '配偶姓名',
          key: 'name'
        },
        {
          title: '学历',
          key: 'education',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.education, 'EducationEnum'));
          }
        },
        {
          title: '证件类型',
          key: 'certType',
          render: (h, params) => {
            return h('span', {}, this.enumCode2Name(params.row.certType, 'CertTypeEnum'));
          }
        },
        {
          title: '证件号码',
          key: 'certNo'
        },
        {
          title: '手机号码',
          key: 'mobile'
        },
        {
          title: '单位编号',
          key: 'companyCode'
        },
        {
          title: '单位名称',
          key: 'companyName'
        },
        // {
        //   title: '婚姻关系',
        //   key: 'marriageStatus',
        //   render: (h, params) => {
        //     return h('span', {}, this.enumCode2Name(params.row.marriageStatus, 'MaritalStatusEnum'));
        //   }
        // },
        {
          title: '操作',
          key: 'action',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.replace({
                      path: '/index/customer/modify',
                      query: {
                        id: params.row.spoMemberNo,
                        from: 'detail'
                      }
                    });
                    this.$router.go(0);
                  }
                }
              }, '详情'),
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px',
              //     display: this.isFromDetail ? 'none' : ''
              //   },
              //   on: {
              //     click: () => {
              //       this.show(params.index);
              //     }
              //   }
              // }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  display: this.isFromDetail ? 'none' : ''
                },
                on: {
                  click: () => {
                    this.deleteSpouse(params.row);
                  }
                }
              }, '解除关系')
            ]);
          }
        }
      ],
      spouseDatas: [],
      columns4: [
        {
          title: '客户编号',
          key: 'name'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'name'
        },
        {
          title: '证件类型',
          key: 'name'
        },
        {
          title: '证件号码',
          key: 'name'
        },
        {
          title: '状态',
          key: 'age'
        }
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    };
  }
};
