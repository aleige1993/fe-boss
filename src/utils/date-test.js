/*
 * Created by HuiyangLi on 2018/1/16.
 */
export default {
  // 封装：两个日期的大小比较。
  // 说明：不允许开始时间大于结束时间，返回布尔类型
  // currentPage：this.$data.currentPage （当前页）
  /*
  * javascript内引入：import testDate from '@/utils/date-test';
   */
  testDateFun(startDate, endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      return false;
    } else {
      return true;
    }
  }
};
