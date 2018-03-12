<template>
<!--审批信息列表（放款管理）-->
  <div id="table-loan-approval-info">
    <i-table :height="this.$store.getters.viewHeight" :current="currentPageExamine" :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPageExamine" :total="totalExamine" :page-size="pageSizeExamine" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tableLoanApprovalInfo',
    data() {
      return {
        totalExamine: 0,
        pageSizeExamine: 15,
        currentPageExamine: 1,
        examineTableLoading: false, // 审批信息loading
        // 审批信息
        examineColumns: [
          {
            title: '处理人',
            align: 'center',
            width: 180,
            key: 'handleUserName'
          },
          {
            title: '任务节点',
            key: 'taskName',
            width: 120,
            render: (h, params) => {
              return h('span', {}, this.enumCode2Name(params.row.taskName, 'LoanBizNodeEnum'));
            }
          },
          {
            title: '开始时间',
            width: 120,
            key: 'startTime'
          },
          {
            title: '结束时间',
            width: 120,
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
        examineData: []
      };
    },
    props: {
      requestData: {
        type: Object,
        default: {
          loan: ''
        }
      }
    },
    mounted() {
      this.examineGetlist(); // 执行获取审批信息列表的data
    },
    methods: {
      // 获取审批信息列表的data 分页
      jumpPageExamine(page) {
        this.examineGetlist(page);
      },
      // 获取审批信息列表的data
      async examineGetlist(page) {
        this.$data.examineTableLoading = true;
        if (page) {
          this.$data.currentPageExamine = page;
        }
        let loanNo = this.requestData.loanNo;
        let reps = await this.$http.post('biz/listApproveHistory', {
          loanNo,
          currentPage: this.$data.currentPageExamine,
          pageSize: this.$data.pageSizeExamine
        });
        this.$data.examineTableLoading = false;
        if (reps.success) {
          this.$data.examineData = reps.body.resultList;
          this.$data.currentPageExamine = reps.body.currentPage / 1;
          this.$data.totalExamine = reps.body.totalNum / 1;
        } else {
          this.$data.examineData = [];
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
