<template>
  <!--个人业务合同制作/复核-->
  <div id="contract-making-tab">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item v-if="$route.query.taskNode==='6'" href="/index/loanbusiness/contract">签约管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="$route.query.taskNode==='7'" href="/index/loanbusiness/contract/againExamine">签约管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="$route.query.taskNode==='6'" >个人业务合同制作</i-breadcrumb-item>
      <i-breadcrumb-item v-if="$route.query.taskNode==='7'" >个人业务合同复核</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="合同信息">
        <tab-contract-info ref="contractInfo" @on-tabIndex-func="tabIndexFunc" @on-create-contracted="isCreateContractFun" :CreateRepayPlan="{isCapital, isRental}"></tab-contract-info>
      </i-tab-pane>
      <i-tab-pane label="还款计划表">
        <div v-if="tabIndex===1">
          <!--资金方信息-->
          <bs-form-block :title="'资金方信息'">
            <i-table border :loading="loanCapitalListLoading" ref="proTable" :columns="loanCapitalColumns" :data="loanCapitalData"></i-table>
          </bs-form-block>
          <!--资金方还款计划表-->
          <bs-form-block :title="'资金方还款计划表'">
            <div class="form-top-actions" style="padding-top:0;">
              <i-button v-if="$route.query.taskNode === '6'" @click="capitalGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
            </div>
            <i-table border :loading="capitalPlanCapitalListLoading" ref="capitalTable" :columns="repayPlanCapitalColumns" :data="repayPlanCapitalList">
            </i-table>
          </bs-form-block>
        </div>
      </i-tab-pane>
      <i-tab-pane label="租金计划表">
        <div v-if="tabIndex===2">
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
            <div class="form-top-actions" style="padding-top:0;">
              <i-button v-if="$route.query.taskNode === '6'" @click="rentGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
            </div>
            <i-table border :loading="rentPlanCapitalListLoading" ref="rentTable" :columns="repayPlanRentalColumns" :data="repayPlanRentalList">
            </i-table>
          </bs-form-block>
        </div>
      </i-tab-pane>
      <i-tab-pane label="审批历史信息">
        <i-table v-if="tabIndex===3" :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
        <div class="page-container">
          <i-page @on-change="jumpPageExamine" :total="totalExamine" :page-size="pageSizeExamine" size="small" show-elevator show-total></i-page>
        </div>
      </i-tab-pane>
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i>
        <span v-if="$route.query.taskNode==='7'"> 提交</span>
        <span v-else> 提交审核</span>
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
        loanNo: '',
        isCapital: false, // 资金方是否生成了计划表
        isRental: false, // 租金方是否生成了计划表
        isCreateContract: false,
        tabIndex: 0,
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
      this.getRepayPlanCapitalList(); // 获取资方列表data
      this.getRepayPlanRentalList(); // 获取租金还款计划列表data
      this.examineGetlist(); // 获取审批历史信息列表data
    },
    methods: {
      // 切换tab
      tabIndexFunc(num) {
        if (num) {
          this.$data.tabIndex = num;
        }
      },
      // 合同信息里 点击了“生成合同”
      isCreateContractFun() {
        this.$data.isCreateContract = true;
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
            this.$data.isCapital = true;
          } else {
            this.$data.repayPlanCapitalList = [];
            this.$data.isCapital = false;
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
          ...refData,
          repayPlanCapitalList: this.$data.repayPlanCapitalList, // 资金方还款计划表数据
          repayPlanRentalList: this.$data.repayPlanRentalList // 租金放还款计划表数据
        };
        // 初审的提交
        if (this.$route.query.taskNode === '6') {
          // 初审时 判断是否已点击“生成合同”
          if (!this.$data.isCreateContract) {
            this.$Message.warning('请生成合同！');
            this.$data.tabIndex = 0;
            return;
          }
          let resp = await this.$http.post('/biz/sign/contract/fristApprove', { ...requestData });
          if (resp.success) {
            this.$Message.success('提交成功！');
            // 初审 回到合同制作列表
            this.$router.push({
              path: '/index/loanbusiness/contract',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
          }
        }
        if (this.$route.query.taskNode === '7') {
          let resp = await this.$http.post('/biz/sign/contract/reviewApprove', {
            signNo: requestData.signNo,
            loanApprove: requestData.loanApprove
          });
          if (resp.success) {
            this.$Message.success('提交成功！');
            // 复核 回到合同复核列表
            this.$router.push({
              path: '/index/loanbusiness/contract/againExamine',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
          }
        }
      },
      // 资金方的 生成还款计划事件
      async capitalGenerating() {
        Alertify.confirm('确定生成资金方还款计划吗？', async (ok) => {
          if (ok) {
            const msg = this.$Message.loading('正在生成资金方还款计划...', 0);
            let resp = await this.$http.post('/biz/sign/contract/createRepayPlanCapital', {
              loanNo: this.$data.loanNo
            });
            msg();
            if (resp.success) {
              if (resp.body.length !== 0) {
                this.$data.isCapital = true;
                this.$data.repayPlanCapitalList = resp.body;
                this.$Message.success('生成资金方还款计划成功！');
              }
            }
          }
        });
      },
      // 租金还款生成还款计划
      async rentGenerating() {
        Alertify.confirm('确定生成租金方还款计划吗？', async (ok) => {
          if (ok) {
            const msg = this.$Message.loading('正在生成租金方还款计划...', 0);
            let resp = await this.$http.post('/biz/sign/contract/createRepayPlanRental', {
              loanNo: this.$data.loanNo
            });
            msg();
            if (resp.success) {
              if (resp.body.length !== 0) {
                this.$data.isRental = true;
                this.$data.repayPlanRentalList = resp.body;
                this.$Message.success('生成租金方还款计划成功！');
              }
            }
          }
        });
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
          if (reps.body.resultList.length !== 0) {
            this.$data.examineData = reps.body.resultList;
            this.$data.currentPageExamine = reps.body.currentPage / 1;
            this.$data.totalExamine = reps.body.totalNum / 1;
          } else {
            this.$data.examineData = [];
          }
        } else {
          this.$data.examineData = [];
        }
      },
      jumpPageExamine(page) {
        this.examineGetlist(page);
      },
      // 资金方信息列表更改
      loanCapitalSetRow(row) {
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
