import MortgagePictureList from '@/components/file-picture-list';
export default {
  data() {
    return {
      mortgageList: []
    };
  },
  components: {
    MortgagePictureList
  },
  methods: {
    // 把车辆信息里的办理文件名和地址解析成数组 间隔字符‘@’,第一个参数时文件地址，第二个时文件名称
    mortgageStrToArray(urLStr, nameStr) {
      let urlAry = urLStr.split('@');
      let nameAry = nameStr.split('@');
      let mortgageAry = [];
      urlAry.map((item, index) => {
        mortgageAry[index] = {
          attachmentUrl: urlAry[index],
          attachmentName: nameAry[index]
        };
        return item;
      });
      // console.log(mortgageAry);
      return mortgageAry;
    },
    // 把车辆信息里的办理文件名和地址解析返回成字符串 间隔字符‘@’,参数是要转换的数组集合(attachmentUrl和attachmentName)
    mortgageArrayToObj(urLAry) {
      let mortgageObj = {
        mortgageUrl: '',
        mortgageName: ''
      };
      urLAry.map((item, index) => {
        mortgageObj.mortgageUrl += item.attachmentUrl + '@';
        mortgageObj.mortgageName += item.attachmentName + '@';
        return item;
      });
      mortgageObj.mortgageUrl = mortgageObj.mortgageUrl.substring(0, mortgageObj.mortgageUrl.lastIndexOf('@'));
      mortgageObj.mortgageName = mortgageObj.mortgageName.substring(0, mortgageObj.mortgageName.lastIndexOf('@'));
      // console.log(mortgageObj);
      return mortgageObj;
    }
  }
};
