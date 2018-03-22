<template>
  <!--个人业务合同制作/复核-->
  <div id="contract-making-tab">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/contract">合同管理</i-breadcrumb-item>
      <i-breadcrumb-item>个人业务合同制作</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="合同信息" name="tabInfo">
        <tab-contract-info ref="contractInfo"
                           @on-create-repay-plan="createRepayPlanFun"
                           @on-create-contracted="isCreateContractFun"
                           @on-create-contracted-loading="isClickGeneratingFun"
                           @on-radio-approveStatus="radioApproveStatus">
        </tab-contract-info>
      </i-tab-pane>
      <i-tab-pane :disabled="!isClickTab" :label="isClickTab?'还款计划表':'还款计划表(选择合同开始时间后即可查看)'" name="tabHK">
        <div v-if="tabIndex==='tabHK'">
          <!--资金方信息-->
          <bs-form-block :title="'资金方信息'">
            <i-table border :loading="loanCapitalListLoading" ref="proTable" :columns="loanCapitalColumns" :data="loanCapitalData"></i-table>
          </bs-form-block>
          <!--资金方还款计划表-->
          <bs-form-block :title="'资金方还款计划表'">
            <i-table border :loading="capitalPlanCapitalListLoading" ref="capitalTable" :columns="repayPlanCapitalColumns" :data="repayPlanCapitalList">
            </i-table>
          </bs-form-block>
        </div>
      </i-tab-pane>
      <i-tab-pane :disabled="!isClickTab" :label="isClickTab?'租金计划表':'租金计划表(选择合同开始时间后即可查看)'" name="tabZJ">
        <div v-if="tabIndex==='tabZJ'">
          <!--海乐行账户信息-->
          <bs-form-block :title="'海乐行账户信息'">
            <i-form ref="formApproval" :model="formApproval" inline label-position="right" :label-width="100">
              <i-row>
                <i-col span="8">
                  <i-form-item label="账户名">
                    <span v-text="formApproval.hlxAcctName"></span>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="开户行">
                    <span v-text="formApproval.hlxOpenBankName"></span>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="账号">
                    <span v-text="formApproval.hlxAcctNo"></span>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </bs-form-block>
          <!--租金还款计划表-->
          <bs-form-block :title="'租金还款计划表'">
            <i-table border :loading="rentPlanCapitalListLoading" ref="rentTable" :columns="repayPlanRentalColumns" :data="repayPlanRentalList">
            </i-table>
          </bs-form-block>
        </div>
      </i-tab-pane>
      <i-tab-pane label="审批历史信息" name="tabSP">
        <i-table v-if="tabIndex==='tabSP'" :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
        <div class="page-container">
          <i-page @on-change="jumpPageExamine" :total="totalExamine" :page-size="pageSizeExamine" size="small" show-elevator show-total></i-page>
        </div>
      </i-tab-pane>
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success" :disabled="isClickContracting">
        <span v-if="!initFormLoading">
          <i class="iconfont icon-tijiao"></i> 提交
        </span>
        <span v-else> loading...</span>
      </i-button>
    </div>
    <!--<bs-modal :title="'更改资金方信息'" :width="520">
      <i-form ref="formMaintain" :model="setCapitalForm" label-position="right" :label-width="120">
      </i-form>
    </bs-modal>-->
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import TabContractInfo from './tab-contract-info'; // 合同信息
  import examineMixinData from './examine-mixin-data';
  import capitalMixinData from './capital-mixin-data';
  export default {
    name: 'contractMakingTab',
    mixins: [examineMixinData, capitalMixinData],
    components: {
      BSModal,
      TabContractInfo
    },
    data() {
      return {
        isClickTab: false, // 资金方还款计划表和租金方还款计划表tab是否可点击
        approveStatus: '',
        loanNo: '',
        isCapital: false, // 资金方是否生成了计划表
        isRental: false, // 租金方是否生成了计划表
        isCreateContract: false,
        isClickContracting: false, // 点击生成合同按钮时，提交按钮禁止点击。
        tabIndex: 'tabInfo',
        initFormLoading: false,
        currentPageExamine: 1,
        pageSizeExamine: 15,
        totalExamine: 0,
        examineTableLoading: false,
        loanCapitalListLoading: false, // 资金方信息loading
        capitalPlanCapitalListLoading: false, // 资金方还款计划表loading
        rentPlanCapitalListLoading: false, // 租金方还款计划表loading
        formApproval: {
          hlxAcctName: '',
          hlxAcctNo: '',
          hlxOpenBankName: ''
        }
      };
    },
    async mounted() {
      this.$data.loanNo = await this.$route.query.loanNo;
      this.examineGetlist(); // 获取审批历史信息列表data
    },
    methods: {
      // 子级通知父级，合同时间已变更。更新“还款计划表”和租金计划表
      createRepayPlanFun(startDate) {
        if ((startDate !== '') && this.createRepayPlanCapitalFun(startDate) && this.createRepayPlanRentalFun(startDate)) {
          this.$data.isClickTab = true;
        } else {
          this.$data.isClickTab = false;
        }
      },
      // 生成资方还款计划表
      async createRepayPlanCapitalFun(startDate) {
        let repsReturn = false;
        let reps = await this.$http.post('/biz/sign/contract/createRepayPlanCapital', {
          signNo: this.$route.query.signNo,
          contractStartDate: startDate
        });
        if (reps.success) {
          // 获取资方列表data
          this.getRepayPlanCapitalList();
          this.$Message.success('已刷新“还款计划表”');
          repsReturn = true;
        } else {
          this.$Message.error('“还款计划表”刷新失败！');
          repsReturn = false;
        }
        return repsReturn;
      },
      // 生成资方还款计划表
      async createRepayPlanRentalFun(startDate) {
        let repsReturn = false;
        let reps = await this.$http.post('/biz/sign/contract/createRepayPlanRental', {
          signNo: this.$route.query.signNo,
          contractStartDate: startDate
        });
        if (reps.success) {
          // 获取租金还款计划列表data
          this.getRepayPlanRentalList();
          this.$Message.success('已刷新“租金计划表”');
          repsReturn = true;
        } else {
          this.$Message.error('“租金计划表”刷新失败！');
          repsReturn = false;
        }
        return repsReturn;
      },
      // 通过子组件的告知 得到结论状态
      radioApproveStatus(val) {
        this.$data.approveStatus = val;
      },
      // 合同信息里 点击了“生成合同”
      isCreateContractFun() {
        this.$data.isClickContracting = false;
        this.$data.isCreateContract = true;
      },
      //  合同信息里 点击了“生成合同”loading状态时
      isClickGeneratingFun() {
        this.$data.isClickContracting = true;
      },
      // 获取资方列表data
      async getRepayPlanCapitalList() {
        this.$data.loanCapitalListLoading = true;
        this.$data.capitalPlanCapitalListLoading = true;
        let resp = await this.$http.post('/biz/sign/contract/listRepayPlanCapital', {
          loanNo: this.$data.loanNo
        });
        this.$data.loanCapitalListLoading = false;
        this.$data.capitalPlanCapitalListLoading = false;
        if (resp.success) {
          // 资方信息列表data
          if (resp.body.loanCapitalList.length !== 0) {
            this.$data.loanCapitalData = resp.body.loanCapitalList;
          } else {
            this.$data.loanCapitalData = [];
          }
          // 资方还款计划列表data
          if (resp.body.repayPlanCapitalList.length !== 0) {
            this.$data.repayPlanCapitalList = resp.body.repayPlanCapitalList;
          } else {
            this.$data.repayPlanCapitalList = [];
          }
        }
      },
      // 获取租金还款计划列表data
      async getRepayPlanRentalList() {
        this.$data.rentPlanCapitalListLoading = true;
        let resp = await this.$http.post('/biz/sign/contract/listRepayPlanRental', {
          loanNo: this.$data.loanNo
        });
        this.$data.rentPlanCapitalListLoading = false;
        if (resp.success) {
          resp.body.haiLeXingAccount && (this.$data.formApproval = resp.body.haiLeXingAccount);
          if (resp.body.repayPlanRentalList.length !== 0) {
            resp.body.repayPlanRentalList && (this.$data.repayPlanRentalList = resp.body.repayPlanRentalList);
            this.$data.isRental = true;
          } else {
            this.$data.repayPlanRentalList = [];
            this.$data.isRental = false;
          }
        }
      },
      // 初审/复核的提交
      async saveSubimt() {
        this.$data.initFormLoading = true;
        const msg = this.$Message.loading('正在提交中...', 0);
        let refData = await this.$refs.contractInfo.loanApproveSumbit();
        msg();
        this.$data.initFormLoading = false;
        if (refData === null) {
          return;
        }
        let requestData = await {
          ...refData
          // repayPlanCapitalList: this.$data.repayPlanCapitalList, // 资金方还款计划表数据
          // repayPlanRentalList: this.$data.repayPlanRentalList // 租金放还款计划表数据
        };
        // 初审的提交
        if (this.$route.query.taskNode === '6') {
          // 初审时 审核意见的结论是“同意”的情况下才判断是否已点击“生成合同”
          if (!this.$data.isCreateContract && this.$data.approveStatus === 'A') {
            this.$Message.warning('请生成合同！');
            this.$data.tabIndex = 'tabInfo';
            return;
          }
          this.$AuditPrompt.auditPromptFun(refData.loanApprove.approveStatus, async () => {
            let resp = await this.$http.post('/biz/sign/contract/fristApprove', { ...requestData });
            if (resp.success) {
              this.$Message.success('提交成功！');
              // 初审 回到合同制作列表
              this.$router.push({
                path: '/index/contract/list',
                query: {
                  currentPage: this.$route.query.currentPage
                }
              });
            }
          });
        }
      },
      // 获取审批信息列表的data
      async examineGetlist(page) {
        this.$data.examineTableLoading = true;
        if (page) {
          this.$data.currentPageExamine = page;
        }
        let loanNo = this.$data.loanNo;
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
      },
      jumpPageExamine(page) {
        this.examineGetlist(page);
      }
      // 资金方信息列表更改
      /* loanCapitalSetRow(row) {
      }*/
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
