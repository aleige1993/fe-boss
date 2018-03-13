<template>
  <i-table :height="tableFixHeight" :loading="historyLoading" :columns="approveHistoryColumns" :data="approveHistoryData"></i-table>
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
            key: 'taskName',
            render: (h, params) => {
              return h('span', {}, this.enumCode2Name(params.row.taskName, 'LoanBizNodeEnum'));
            }
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
            width: 140,
            key: 'timeConsuming'
          },
          {
            title: '结论',
            key: 'approveStatus',
            render: (h, params) => {
              return h('span', {}, this.enumCode2Name(params.row.approveStatus, 'ApproveStatusEnum'));
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
        if (this.id && this.id !== '') {
          this.$data.historyLoading = true;
          let resp = await this.$http.post('/credit/listAuditLog', { creditLimitApplyNo: this.id });
          this.$data.historyLoading = false;
          if (resp.success) {
            this.$data.approveHistoryData = resp.body;
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
