export default {
  // 封装：删除请求成功后 重新加载页面回到指定的当前分页
  // 说明：
  // currentPage：this.$data.currentPage （当前页）
  // pageSize：this.$data.pageSize （每分页加载的数据条数）
  // total：this.$data.total （总数据量）
  getPageRemove(currentPage, pageSize, total) {
    let goCurrentPage = currentPage;
    if (
      total % pageSize === 1 &&
      currentPage !== 1 &&
      (total - 1) / pageSize !== currentPage
    ) {
      goCurrentPage = currentPage - 1;
    }
    return goCurrentPage;
  }
};
