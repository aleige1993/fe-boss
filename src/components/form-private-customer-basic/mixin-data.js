export default {
  data() {
    return {
      formData: {
        mbMemberDTO: {
          name: '小明', // 姓名
          mobile: '1569564214', // 电话
          certType: '1', // 证件类型
          isSocialSecurity: '',
          isPublicReserveFunds: '',
          creditType: '',
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
          censusProvinceCode: '', // 户籍省份编号
          censusDistrictCode: '', // 户籍地区编号
          censusCityCode: '', // 户籍城市编号
          censusProvinceName: '', // 户籍省份名称
          censusDistrictName: '', // 户籍地区名称
          censusCityName: '', // 户籍城市名称
          censusRoadAddr: '重庆云阳江口金子村', // 户籍街道地址
          // 居住信息
          nowProvinceCode: '', // 户籍省份编号
          nowDistrictCode: '', // 户籍地区编号
          nowCityCode: '', // 户籍城市编号
          nowProvinceName: '', // 户籍省份名称
          nowDistrictName: '', // 户籍地区名称
          nowCityName: '', // 户籍城市名称
          nowRoadAddr: '重庆渝中蔡袁路', // 户籍街道地址
          certFrontUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511847552791&di=53d39cf20' +
          'd92f864cd86ddba4a79c5d9&imgtype=0&src=http%3A%2F%2Fatt2.citysbs.com%2Ftaizhou%2' +
          'Fimage%2F2009%2F02%2F19%2Fmiddle_20090219_8a6b22241050a15bbc1d4ieuPntWprGh.jpg', // 身份证正面
          certBackUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511847552791&di=53d39cf20' +
          'd92f864cd86ddba4a79c5d9&imgtype=0&src=http%3A%2F%2Fatt2.citysbs.com%2Ftaizhou%2' +
          'Fimage%2F2009%2F02%2F19%2Fmiddle_20090219_8a6b22241050a15bbc1d4ieuPntWprGh.jpg', // 身份证反面
          certHandUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511847552791&di=53d39cf20' +
          'd92f864cd86ddba4a79c5d9&imgtype=0&src=http%3A%2F%2Fatt2.citysbs.com%2Ftaizhou%2' +
          'Fimage%2F2009%2F02%2F19%2Fmiddle_20090219_8a6b22241050a15bbc1d4ieuPntWprGh.jpg', // 身份证手持
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
          provinceCode: '',
          provinceName: '',
          districtCode: '',
          districtName: '',
          cityCode: '',
          cityName: '',
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
