<template>
  <!--个人业务合同制作-->
  <div id="contract-making-tab">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item :href="!isDetails?'/index/loanbusiness/contract':'/index/loanbusiness/contract/againExamine'">签约管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="!isDetails">个人业务合同制作</i-breadcrumb-item>
      <i-breadcrumb-item v-else>个人业务合同复核</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="合同信息">
        <tab-contract-info ref="contractInfo" :CreateRepayPlan="{isCapital, isRental}"></tab-contract-info>
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
              <i-button v-if="!isDetails" @click="capitalGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
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
              <i-button v-if="!isDetails" @click="rentGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
            </div>
            <i-table border :loading="rentPlanCapitalListLoading" ref="rentTable" :columns="repayPlanRentalColumns" :data="repayPlanRentalList">
            </i-table>
          </bs-form-block>
        </div>
      </i-tab-pane>
      <i-tab-pane label="审批历史信息">
        <i-table v-if="tabIndex===3" :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
      </i-tab-pane>
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i>
        <span v-if="!isDetails"> 提交</span>
        <span v-else> 提交审核</span>
        </span>
        <span v-else> loading...</span>
      </i-button>
    </div>
  </div>
</template>

<script>
  import TabContractInfo from './tab-contract-info'; // 合同信息
  import examineMixinData from './examine-mixin-data';
  import capitalMixinData from './capital-mixin-data';
  export default {
    name: 'contractMakingTab',
    mixins: [examineMixinData, capitalMixinData],
    components: {
      TabContractInfo
    },
    data() {
      return {
        loanNo: '',
        isDetails: false,
        isCapital: false,
        isRental: false,
        tabIndex: 0,
        initFormLoading: false,
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
    mounted() {
      if (this.$route.query.isDetails === 'false' || !this.$route.query.isDetails) {
        this.$data.isDetails = false;
      } else {
        this.$data.isDetails = true;
      }
      this.$data.loanNo = this.$route.query.loanNo;
      this.getRepayPlanCapitalList(); // 获取资方列表data
      this.getRepayPlanRentalList(); // 获取租金还款计划列表data
    },
    methods: {
      // 获取资方列表data
      async getRepayPlanCapitalList() {
        this.$data.loanCapitalListLoading = true;
        this.$data.capitalPlanCapitalListLoading = true;
        let resp = await this.$http.post('/biz/sign/contract/listRepayPlanCapital', {
          loanNo: this.$data.loanNo
        });
        console.log(resp);
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
          } else {
            this.$data.repayPlanRentalList = [];
          }
        }
      },
      // 初审/复核的提交
      async saveSubimt() {
        this.$data.initFormLoading = true;
        const msg = this.$Message.loading('正在提交中...', 0);
        // await bsWait(1000);
        let refData = await this.$refs.contractInfo.loanApproveSumbit();
        msg();
        this.$data.initFormLoading = false;
        let requestData = {
          ...refData,
          repayPlanCapitalList: this.$data.repayPlanCapitalList, // 资金方还款计划表数据
          repayPlanRentalList: this.$data.repayPlanRentalList // 租金放还款计划表数据
        };
        // 初审的提交
        if (!this.$route.query.isDetails) {
          let resp = await this.$http.post('/biz/sign/contract/fristApprove', { requestData });
        }
        if (refData !== null) {
          this.$Message.success('提交成功！');
          // 回到合同制作列表
          /* if (!this.$route.query.isDetails) {
            this.$router.push({
              path: '/index/loanbusiness/contract',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
          } else {
            this.$router.push({
              path: '/index/loanbusiness/contract/againExamine',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
          }*/
        };
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
      // 资金方信息列表更改
      loanCapitalSetRow(row) {}
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
