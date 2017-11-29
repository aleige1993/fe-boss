export default {
  data() {
    return {
      formData: {
        'baseDTO': {
          'mainLinkmanName': '',
          'actualControllersTel': '',
          'joinStartDate': '',
          'bizRoadAddr': '',
          'about': '',
          'isMerchant': '',
          'legalPersonMobile': '',
          'isPermanentlyValid': '',
          'regRoadAddr': '',
          'regProvinceName': '',
          'legalPersonNo': '',
          'legalPersonStock': '',
          'mainLinkmanNo': '',
          'fax': '',
          'bizProvinceName': '',
          'mainLinkmanSex': '',
          'mainLinkmanPhone': '',
          'telephone': '',
          'bizCityName': '',
          'mainLinkmanEmail': '',
          'legalPersonSex': '',
          'actualControllers': '',
          'regCityName': '',
          'regCapital': '',
          'bizExpDate': '',
          'bizDistrictCode': '',
          'corpType': '',
          'custMgrName': '',
          'regDate': '',
          // 'corpNo': '',
          'bizCityCode': '',
          'custMgrNo': '',
          'creditCode': '',
          'mainLinkmanDuty': '',
          'industryType': '',
          'legalPersonCertno': '',
          'legalPerson': '',
          'bizDepartmentCode': '',
          'regCityCode': '',
          'regDistrictCode': '',
          'website': '',
          'regProvinceCode': '',
          'corpName': '',
          'mainLinkmanCertno': '',
          'legalPersonCerttype': '',
          'regDistrictName': '',
          'bizDistrictName': '',
          'bizProvinceCode': '',
          'bizDepartmentName': ''
        },
        'attachDTOs': [
          {
            'corpNo': '',
            'corpName': '',
            'attachName': '仓井空.av',
            'attachUrl': '',
            'attachSuffixType': ''
          }
        ]
      },
      formDataInit: {
        'baseDTO': {
          'mainLinkmanName': '1',
          'actualControllersTel': '1',
          'joinStartDate': '1',
          'bizRoadAddr': '1',
          'about': '1',
          'isMerchant': '1',
          'legalPersonMobile': '1',
          'isPermanentlyValid': '1',
          'regRoadAddr': '1',
          'regProvinceName': '1',
          'legalPersonNo': '1',
          'legalPersonStock': '1',
          'mainLinkmanNo': '1',
          'fax': '1',
          'bizProvinceName': '',
          'mainLinkmanSex': '1',
          'mainLinkmanPhone': '1',
          'telephone': '1',
          'bizCityName': '1',
          'mainLinkmanEmail': '1',
          'legalPersonSex': '1',
          'actualControllers': '1',
          'regCityName': '1',
          'regCapital': '1',
          'bizExpDate': '1',
          'bizDistrictCode': '1',
          'corpType': '1',
          'custMgrName': '1',
          'regDate': '1',
          // 'corpNo': '1',
          'bizCityCode': '1',
          'custMgrNo': '1',
          'creditCode': '1',
          'mainLinkmanDuty': '1',
          'industryType': '1',
          'legalPersonCertno': '11',
          'legalPerson': '',
          'bizDepartmentCode': '1',
          'regCityCode': '1',
          'regDistrictCode': '1',
          'website': '2121',
          'regProvinceCode': '1',
          'corpName': '海尔云贷添加测试',
          'mainLinkmanCertno': '1',
          'legalPersonCerttype': '1',
          'regDistrictName': '1',
          'bizDistrictName': '1',
          'bizProvinceCode': '1',
          'bizDepartmentName': '1'
        },
        'attachDTOs': [
          {
            'corpNo': '',
            'corpName': '',
            'attachName': '仓井空.av',
            'attachUrl': '',
            'attachSuffixType': ''
          }
        ]
      },
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'attachName'
        },
        {
          title: '附件文件',
          key: 'attachUrl'
        },
        {
          title: '操作',
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
                    this.show(params.index);
                  }
                }
              }, '下载'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    // console.log(params);
                    this.$data.formData.attachDTOs.splice(params.index, 1);
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      companyAttachFiles: [
        {
          name: '仓井空.av',
          url: 'http://www.baidu.com'
        }
      ],
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
