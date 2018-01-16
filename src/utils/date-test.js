/*
 * Created by HuiyangLi on 2018/1/16.
 */
export default {
  // 封装：两个日期的大小比较。
  // 说明：不允许开始时间大于结束时间，返回布尔类型
  // currentPage：this.$data.currentPage （当前页）
  /*
  * 使用例子：
  * search() {
  *    if (!this.$DateTest.testDateFun(this.$data.searchForm.applyStartTime, this.$data.searchForm.applyEndTime)) {
  *      this.$Message.error('“开始日期”不能大于“结束日期”');
  *        return;
  *    }
  *    this.getList();
  * },
  */
  testDateFun(startDate, endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      return false;
    } else {
      return true;
    }
  }
};
