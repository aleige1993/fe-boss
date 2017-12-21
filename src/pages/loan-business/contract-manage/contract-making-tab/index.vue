<template>
  <!--个人业务合同制作-->
  <div id="contract-making-tab">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/contract">签约管理</i-breadcrumb-item>
      <i-breadcrumb-item>个人业务合同制作</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="合同信息">
        <tab-contract-info :CreateRepayPlan="{isCapital, isRental}"></tab-contract-info>
      </i-tab-pane>
      <i-tab-pane label="还款计划表">
        <div>
          <!--资金方信息-->
          <bs-form-block :title="'资金方信息'">
            <i-table border :loading="loanCapitalListLoading" ref="proTable" :columns="loanCapitalColumns" :data="loanCapitalData"></i-table>
          </bs-form-block>
          <!--资金方还款计划表-->
          <bs-form-block :title="'资金方还款计划表'">
            <div class="form-top-actions" style="padding-top:0;">
              <i-button @click="capitalGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
            </div>
            <i-table border :loading="capitalPlanCapitalListLoading" ref="capitalTable" :columns="capitalPlanCapitalColumns" :data="capitalPlanCapitalData">
            </i-table>
          </bs-form-block>
        </div>
      </i-tab-pane>
      <i-tab-pane label="租金计划表">
        <div>
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
              <i-button @click="rentGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
            </div>
            <i-table border :loading="rentPlanCapitalListLoading" ref="rentTable" :columns="rentPlanCapitalColumns" :data="rentPlanCapitalData">
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
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
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
        isCapital: false,
        isRental: false,
        tabIndex: 0,
        initFormLoading: false,
        examineTableLoading: false,
        loanCapitalListLoading: false, // 资金方信息loading
        capitalPlanCapitalListLoading: false, // 资金方还款计划表loading
        rentPlanCapitalListLoading: false, // 租金方还款计划表loading
        formApproval: {}
      };
    },
    mounted() {
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
        this.$data.loanCapitalListLoading = false;
        this.$data.capitalPlanCapitalListLoading = false;
        if (resp.success) {
          // 资方信息列表data
          if (resp.body.loanCapitalList.length !== 0) {
            this.$data.loanCapitalData = resp.body.loanCapitalList;
          } else {
            this.$Notice.warning({
              title: '资金方信息列表没有数据可加载',
              duration: 2
            });
            this.$data.loanCapitalData = [];
          }
          // 资方还款计划列表data
          if (resp.body.repayPlanCapitalList.length !== 0) {
            this.$data.capitalPlanCapitalData = resp.body.repayPlanCapitalList;
          } else {
            this.$Notice.warning({
              title: '资金方还款计划列表没有数据可加载',
              duration: 2
            });
            this.$data.capitalPlanCapitalData = [];
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
          this.$data.formApproval = resp.body.haiLeXingAccount;
          if (resp.body.repayPlanRentalList.length !== 0) {
            this.$data.rentPlanCapitalData = resp.body.repayPlanRentalList;
          } else {
            this.$Notice.warning({
              title: '租金还款计划列表没有数据可加载',
              duration: 2
            });
            this.$data.rentPlanCapitalData = [];
          }
        }
      },
      saveSubimt() {},
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
                this.$data.capitalPlanCapitalData = resp.body;
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
                this.$data.rentPlanCapitalData = resp.body;
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
