export default {
  data() {
    return {
      dataLoading: false,
      bankAccountColumns: [
        {
          title: '银行卡号',
          key: 'bankCardNo'
        },
        {
          title: '银行预留手机号',
          key: 'remainPhone'
        },
        {
          title: '开户银行',
          key: 'bankName'
        },
        {
          title: '核身时间',
          key: 'checkTime'
        }
      ],
      verifyInfo: {
        idcardAuthStatus: '0',
        bankcardBindStatus: '0',
        creditAuthStatus: '0',
        'memberIntentionOrderDTO': { // 会员信息
          'certType': '',
          'certNo': '',
          'realName': '',
          'idcardAuthStatus': '',
          'idcardAuthTime': '',
          'idCardFaceUrl': '',
          'idCardBackUrl': '',
          'idCardHandUrl': ''
        },
        'memberCardDTOList': [ // 银行卡列表信息
          /* {
            'id': 0,
            'bankCardNo': '',
            'memberNo': 0,
            'bankCode': '',
            'bankName': '',
            'bankAddr': '',
            'isBind': '',
            'checkTime': '',
            'gmtCreate': '',
            'gmtModify': '',
            remainPhone: ''
          }*/
        ],
        'memberCreditDTO': { // 征信授权信息
          'orderNo': 'str',
          'comfirmTime': '',
          'comfirmAddr': '',
          'longitude': '',
          'latitude': '',
          'gmtCreate': '',
          'gmtModify': ''
        }
      }
    };
  }
};
