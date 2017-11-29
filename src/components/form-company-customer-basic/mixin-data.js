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
          'corpNo': '',
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
            'attachName': '',
            'attachUrl': '',
            'attachSuffixType': ''
          }
        ]
      },
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'name'
        },
        {
          title: '附件文件',
          key: 'url'
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
              }, '下载'),
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
