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
      }
    };
  }
};
