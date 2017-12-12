import Tools from '../../utils/Tools';

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
        'attachDTOs': []
      },
      formDataInit: {
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
        'attachDTOs': []
      },
      companyAttachFileColumns: [
        {
          title: '附件名称',
          key: 'attachName'
        },
        {
          title: '附件文件',
          key: 'attachUrl',
          render: (h, params) => {
            if (Tools.isImg(params.row.attachUrl)) {
              return h('bs-big-img', {
                props: {
                  thumbWidth: 80,
                  thumbHeight: 80,
                  fullWidth: 1000,
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
