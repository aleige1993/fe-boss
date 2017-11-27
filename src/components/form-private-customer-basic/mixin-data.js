export default {
  data() {
    return {
      formData: {
        mbMemberDTO: {
          name: '小明', // 姓名
          mobile: '1569564214', // 电话
          certType: '1', // 证件类型
          certNo: '521421452142', // 证件号码
          certValidDate: '2018-12-12', // 证件有效期
          sex: '1', // 性别
          birthday: '1991-08-20', // 出生日期
          maritalStatus: '1', // 婚姻状况
          education: '5', // 教育程度
          workType: '1', // 工作性质
          annualRevenue: '10000', // 年收入
          workYears: '2', // 参加工作年限
          isNative: '1', // 是否本地人
          isLocalHouse: '1', // 本地是否有房产
          liveYears: '8', // 本地居住年限
          liveType: '1', // 居住性质
          // 户籍信息
          censusProvinceCode: '1', // 户籍省份编号
          censusDistrictCode: '1', // 户籍地区编号
          censusCityCode: '1', // 户籍城市编号
          censusProvinceName: '重庆', // 户籍省份名称
          censusDistrictName: '重庆', // 户籍地区名称
          censusCityName: '重庆', // 户籍城市名称
          censusRoadAddr: '重庆云阳江口金子村', // 户籍街道地址
          // 居住信息
          nowProvinceCode: '1', // 户籍省份编号
          nowDistrictCode: '1', // 户籍地区编号
          nowCityCode: '1', // 户籍城市编号
          nowProvinceName: '重庆', // 户籍省份名称
          nowDistrictName: '重庆', // 户籍地区名称
          nowCityName: '重庆', // 户籍城市名称
          nowRoadAddr: '重庆渝中蔡袁路', // 户籍街道地址
          certFrontUrl: '', // 身份证正面
          certBackUrl: '', // 身份证反面
          certHandUrl: '', // 身份证手持
          // 其他信息
          bizDepartmentCode: '', // 业务拓展部门
          bizDepartmentName: '',
          joinStartDate: '', // 开始合作时间
          custMgrNo: '', // 客户经理编号
          custMgrName: '' // 客户经理姓名
        },
        mbMemberWorkDTO: {
          companyName: '丐帮重庆分舵',
          unitType: '1',
          industryType: '1',
          duty: '2',
          joinDate: '2000-12-14',
          department: '3',
          monthRevenue: '1',
          companyTel: '110-119110120',
          provinceCode: '1',
          provinceName: '重庆',
          districtCode: '1',
          districtName: '渝中',
          cityCode: '2',
          cityName: '渝中山咔咔',
          roadAddr: ''
        }
      },
      depColumns: [
        {
          headerText: '',
          headerAlign: 'center',
          dataAlign: 'center',
          width: '20'
        },
        {
          headerText: '部门名称',
          dataField: 'text',
          headerAlign: 'center',
          handler: ''
        }
      ],
      depData: []
    };
  }
};
