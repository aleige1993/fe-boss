export default {
  /**
   * 生成一个唯一标识字符串
   * @returns {string}
   */
  generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  /**
   * 根据出生日期算出年龄
   * @param strBirthday
   * @returns {*}
   */
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
  /**
   * 获取文件后缀名
   * @param fileUrl
   * @returns {string}
   */
  getFileSuffix(fileUrl) {
    if (fileUrl) {
      return fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
    } else {
      return '';
    }
  },
  /**
   * 根据文件名判断文件是不是图片
   * @param fileUrl
   * @returns {boolean}
   */
  isImg(fileUrl) {
    let suffix = this.getFileSuffix(fileUrl);
    return suffix === 'png' || suffix === 'jpg' || suffix === 'gif' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'pic';
  },
  /**
   * 打开新窗口
   * @param url
   */
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
  },
  requestFullScreen(element) {
    // 判断各种浏览器，找到正确的方法
    let requestMethod = element.requestFullScreen || // W3C
      element.webkitRequestFullScreen ||    // Chrome等
      element.mozRequestFullScreen || // FireFox
      element.msRequestFullScreen; // IE11
    if (requestMethod) {
      requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
      let wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  },
  // 退出全屏 判断浏览器种类
  exitFull() {
    // 判断各种浏览器，找到正确的方法
    let exitMethod = document.exitFullscreen || // W3C
      document.mozCancelFullScreen ||    // Chrome等
      document.webkitExitFullscreen || // FireFox
      document.webkitExitFullscreen; // IE11
    if (exitMethod) {
      exitMethod.call(document);
    } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
      let wscript = new ActiveXObject('WScript.Shell');
      if (wscript !== null) {
        wscript.SendKeys('{F11}');
      }
    }
  },
  /**
   * 数字相加，包括浮点数相加，不会丢失精度
   * @param num1
   * @param num2
   * @returns {number}
   */
  addNum(num1, num2) {
    let sq1;
    let sq2;
    let m;
    try {
      sq1 = num1.toString().split('.')[1].length;
    } catch (e) {
      sq1 = 0;
    }
    try {
      sq2 = num2.toString().split('.')[1].length;
    } catch (e) {
      sq2 = 0;
    }
    m = Math.pow(10, Math.max(sq1, sq2));
    return (num1 * m + num2 * m) / m;
  },
  /**
   * 获取H5链接域名
   */
  getFeH5Host() {
    if (window.location.href.indexOf('http://boss.songcw.com') > -1) {
      return 'https://feh5.songchedai.com';
    } else {
      return 'http://10.164.238.16:9085';
    }
  }
};
