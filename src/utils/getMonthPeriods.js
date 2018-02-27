/*
 * Created by HuiyangLi on 2018/01/22.
 */
export default {
  // 封装：根据开始日期和月份期数获得结束日期（开始日期 + 月份期数 = 结束日期）
  // 说明：
  // dateMonth： 开始日期（如：2018-01-22）
  // monthNumber： 月份期数，可以是String，可以是Number（如：'24' 或者 24）
  // 使用：如 getMonthPeriods(new Date(), 1)即可获得当前时间的下个月份
  getMonthPeriods(dateMonth, monthNumber) {
    // 指定年月的该月份的天数
    function monthDay(year, month) {
      month = parseInt(month, 10);
      let d = new Date(year, month, 0); // 这个是都可以兼容的
      // let date = new Date(year + '/' + month + '/0'); // IE浏览器可以获取天数，谷歌浏览器会返回NaN
      return d.getDate();
    };
    function getNextMonth(date, length) {
      let yy = date.getFullYear();
      let mm = date.getMonth();
      let dd = date.getDate();

      let nm = 0; // 目标月份
      nm = mm + length;
      let nd = 0; // 目标天数
      if (monthDay(yy, nm + 1) <= dd) {
        nd = monthDay(yy, nm + 1);
      } else {
        nd = dd;
      }

      date.setDate(1);
      date.setMonth(nm);
      date.setDate(nd);
      return date;
    }
    monthNumber = monthNumber / 1;
    let d = getNextMonth(new Date(dateMonth), monthNumber);
    let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); // yyyy-MM-dd
    return youWant;
  }
};
