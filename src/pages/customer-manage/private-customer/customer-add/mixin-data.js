export default {
  data() {
    return {
      formData: {
        mbMemberDTO: {
          name: '', // 姓名
          mobile: '', // 电话
          certType: '', // 证件类型
          certNo: '', // 证件号码
          certValidDate: '', // 证件有效期
          sex: '', // 性别
          birthday: '', // 出生日期
          age: '', // 根据出生日期计算
          maritalStatus: '', // 婚姻状况
          education: '', // 教育程度
          workType: '', // 工作性质
          annualRevenue: '', // 年收入
          workYears: '', // 参加工作年限
          isNative: '', // 是否本地人
          isLocalHouse: '', // 本地是否有房产
          liveYears: '', // 本地居住年限
          liveType: '', // 居住性质
          // 户籍信息
          censusProvinceCode: '', // 户籍省份编号
          censusDistrictCode: '', // 户籍地区编号
          censusCityCode: '', // 户籍城市编号
          censusProvinceName: '', // 户籍省份名称
          censusDistrictName: '', // 户籍地区名称
          censusCityName: '', // 户籍城市名称
          censusRoadAddr: '', // 户籍街道地址
          // 居住信息
          nowProvinceCode: '', // 户籍省份编号
          nowDistrictCode: '', // 户籍地区编号
          nowCityCode: '', // 户籍城市编号
          nowProvinceName: '', // 户籍省份名称
          nowDistrictName: '', // 户籍地区名称
          nowCityName: '', // 户籍城市名称
          nowRoadAddr: '', // 户籍街道地址
          certFrontUrl: '', // 身份证正面
          certBackUrl: '', // 身份证反面
          certHandUrl: '' // 身份证手持
        },
        mbMemberWorkDTO: {
          companyName: '',
          unitType: '',
          industryType: '',
          duty: '',
          joinDate: '',
          department: '',
          monthRevenue: '',
          companyTel: '',
          provinceCode: '',
          provinceName: '',
          districtCode: '',
          districtName: '',
          cityCode: '',
          cityName: ''
        }
      },
      contactTableColume: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '关系',
          key: 'relationShip'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '操作',
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
                    this.show(params.index);
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      companyColumns: [
        {
          title: '客户编号',
          key: 'name'
        },
        {
          title: '公司名称',
          key: 'name'
        },
        {
          title: '统一社会信用代码',
          key: 'name',
          width: 150
        },
        {
          title: '法定代表人',
          key: 'name'
        },
        {
          title: '注册时间',
          key: 'name'
        },
        {
          title: '注册资金',
          key: 'age'
        },
        {
          title: '公司电话',
          key: 'age'
        },
        {
          title: '状态',
          key: 'age'
        }
      ],
      companyList: [
        {
          id: 1,
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        },
        {
          id: 2,
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        },
        {
          id: 3,
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        },
        {
          id: 4,
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }
      ]
    };
  }
};
