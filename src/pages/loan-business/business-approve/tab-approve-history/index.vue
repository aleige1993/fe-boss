<template>
  <i-table :loading="historyLoading" :columns="approveHistoryColumns" :data="approveHistoryData"></i-table>
</template>
<script>
  export default {
    name: 'creditApplyHistory',
    data() {
      return {
        historyLoading: false,
        approveHistoryColumns: [
          {
            title: '处理人',
            key: 'handleUserName'
          },
          {
            title: '任务节点',
            key: 'taskName'
          },
          {
            title: '开始时间',
            key: 'startTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '耗时',
            key: 'timeConsuming'
          },
          {
            title: '结论',
            key: 'approveStatus',
            render: (h, params) => {
              if (params.row.approveStatus === 'A') {
                return '通过';
              } else if (params.row.approveStatus === 'R') {
                return '拒绝';
              } else {
                return '退回';
              }
            }
          },
          {
            title: '意见信息',
            key: 'opinion'
          }
        ],
        approveHistoryData: []
      };
    },
    props: ['id'],
    methods: {
      async getHistoryInfo() {
        let _id = this.$route.query.id;
        if (_id && _id !== '') {
          this.$data.historyLoading = true;
          let resp = await this.$http.post('/biz/listApproveHistory', { loanNo: _id });
          this.$data.historyLoading = false;
          if (resp.success) {
            this.$data.approveHistoryData = resp.body.resultList;
          }
        } else {
          this.$data.approveHistoryData = [];
        }
      }
    },
    mounted() {
      this.getHistoryInfo();
    }
  };
</script>
<style lang="scss" scoped="">

</style>
