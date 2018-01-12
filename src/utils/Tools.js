export default {
  generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  /* 根据出生日期算出年龄 */
  getAgeFromBirthday(strBirthday) {
    if (!strBirthday || strBirthday === '') {
      return '';
    }
    let returnAge;
    let strBirthdayArr = strBirthday.split('-');
    let birthYear = strBirthdayArr[0] / 1;
    let birthMonth = strBirthdayArr[1] / 1;
    let birthDay = strBirthdayArr[2] / 1;
    let d = new Date();
    let nowYear = d.getFullYear();
    let nowMonth = d.getMonth() + 1;
    let nowDay = d.getDate();
    if (nowYear === birthYear) {
      returnAge = 0;// 同年 则为0岁
    } else {
      let ageDiff = nowYear - birthYear; // 年之差
      if (ageDiff >= 0) {
        if (nowMonth === birthMonth) {
          let dayDiff = nowDay - birthDay; // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          let monthDiff = nowMonth - birthMonth; // 月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge; // 返回周岁年龄
  },
  getFileSuffix(fileUrl) {
    if (fileUrl) {
      return fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
    } else {
      return '';
    }
  },
  isImg(fileUrl) {
    let suffix = this.getFileSuffix(fileUrl);
    return suffix === 'png' || suffix === 'jpg' || suffix === 'gif' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'pic';
  },
  openWin(url) {
    // let url = 'Add.aspx'; // 转向网页的地址;
    let name = '颂车贷BOSS'; // 网页名称，可为空;
    let iWidth = 1280; // 弹出窗口的宽度;
    let iHeight = 768; // 弹出窗口的高度;
    // 获得窗口的垂直位置
    let iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    // 获得窗口的水平位置
    let iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, name,
      'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',' +
      'status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no');
    // window.open("AddScfj.aspx", "newWindows", 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
  }
};
