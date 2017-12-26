import Tools from '../../utils/Tools';

export default {
  data() {
    return {
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'attachName'
        },
        {
          title: '附件文件',
          key: 'attachUrl',
          render: (h, params) => {
            // alert(params.row.attachUrl);
            if (Tools.isImg(params.row.attachUrl)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  fullWidth: 600,
                  thumb: params.row.attachUrl,
                  full: params.row.attachUrl
                }
              });
            } else {
              return params.row.attachUrl;
            }
          }
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
                    window.open(params.row.attachUrl, '_blank');
                  }
                }
              }, '下载')
              /* h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  disabled: this.isFromDetail
                },
                on: {
                  click: () => {
                    this.$data.applyData.creditApplyAttachParamList.splice(params.index, 1);
                  }
                }
              }, '删除')*/
            ]);
          }
        }
      ],
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
          /* {
            'corpNo': '',
            'corpName': '',
            'attachName': '仓井空.av',
            'attachUrl': '',
            'attachSuffixType': ''
          }*/
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
          'bizDistrictCode': '',
          'corpType': '1',
          'custMgrName': '1',
          'regDate': '1',
          'corpNo': '1',
          'bizCityCode': '',
          'custMgrNo': '1',
          'creditCode': '',
          'mainLinkmanDuty': '1',
          'industryType': '1',
          'legalPersonCertno': '11',
          'legalPerson': '',
          'bizDepartmentCode': '',
          'regCityCode': '',
          'regDistrictCode': '',
          'website': '2121',
          'regProvinceCode': '',
          'corpName': '京东',
          'mainLinkmanCertno': '1',
          'legalPersonCerttype': '1',
          'regDistrictName': '1',
          'bizDistrictName': '1',
          'bizProvinceCode': '',
          'bizDepartmentName': '1'
        },
        'attachDTOs': [
          /* {
            'corpNo': '',
            'corpName': '',
            'attachName': '仓井空.av',
            'attachUrl': '',
            'attachSuffixType': ''
          }*/
        ]
      }
    };
  }
};
