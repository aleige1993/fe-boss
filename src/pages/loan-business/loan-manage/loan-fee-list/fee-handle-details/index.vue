<template>
  <!--放款费用-办理详情-->
  <div id="fee-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/loan/fee">放款费用落实列表</i-breadcrumb-item>
      <i-breadcrumb-item>放款费用落实详情</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <i-tabs v-model="tabIndex" :animated="false" type="card">
      <i-tab-pane label="基本信息">
        <i-form ref="formData" :model="formData" label-position="right" :label-width="120">
          <bs-form-block :title="'借款信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="项目编号">
                  <span v-text="formData.paymentApplyRecordDTO.loanNo"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="经销商">
                  <span v-text="formData.paymentApplyRecordDTO.merchantName"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="姓名">
                  <span v-text="formData.paymentApplyRecordDTO.custName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件类型">
                  <span v-text="enumCode2Name(formData.paymentApplyRecordDTO.certType, 'CertTypeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码">
                  <span v-text="formData.paymentApplyRecordDTO.custName"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="联系电话">
                  <span v-text="formData.paymentApplyRecordDTO.telPhone"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="联系地址">
                  <span v-text="formData.paymentApplyRecordDTO.addr"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="申请日期">
                  <span v-text="formData.paymentApplyRecordDTO.applyDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="产品">
                  <span v-text="formData.paymentApplyRecordDTO.productName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="期数(月)">
                  <span v-text="formData.paymentApplyRecordDTO.loanPeriods"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="借款金额(元)">
                  <span v-text="formData.paymentApplyRecordDTO.loanAmt"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="运营模式">
                  <span v-text="enumCode2Name(formData.paymentApplyRecordDTO.operatingMode, 'OperatingModeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="合同起始日">
                  <span v-text="formData.paymentApplyRecordDTO.startDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="合同到期日">
                  <span v-text="formData.paymentApplyRecordDTO.endDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'费用收取落实'">
            <i-table :loading="feeTableLoading" border ref="selection" :columns="feeColumns" :data="feeData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'放款信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="放款金额">
                  <span v-text="formData.paymentRecordDTO.loanAmt"></span>
                  <span v-if="formData.paymentRecordDTO.loanAmt!==''">元</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="资金方利率">
                  <span v-text="formData.paymentRecordDTO.capitalRate"></span>
                  <span v-if="formData.paymentRecordDTO.capitalRate!==''">%/年</span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="应收分润金额">
                  <span v-text="formData.paymentRecordDTO.shareAmt"></span>
                  <span v-if="formData.paymentRecordDTO.shareAmt!==''">元</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="颂车利率">
                  <span v-text="formData.paymentRecordDTO.scRate"></span>
                  <span v-if="formData.paymentRecordDTO.scRate!==''">%/年</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="预计放款日期">
                  <span v-text="formData.paymentRecordDTO.expectLoanDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="账户名">
                  <span v-text="formData.loanAccountDTO.loanAcctName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="账号">
                  <span v-text="formData.loanAccountDTO.loanAcctNo"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开户银行">
                  <span v-text="formData.loanAccountDTO.loanOpenBankName"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'还款账户信息'">
            <i-form inline label-position="right" :label-width="100">
              <i-row>
                <i-col span="8">
                  <i-form-item label="账户名">
                    <span v-text="formData.repayAccountDTO.repayAcctName"></span>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="账号">
                    <span v-text="formData.repayAccountDTO.repayAcctNo"></span>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="开户银行">
                    <span v-text="formData.repayAccountDTO.repayOpenBankName"></span>
                  </i-form-item>
                </i-col>
              </i-row>
            </i-form>
          </bs-form-block>
          <bs-form-block :title="'放款条件'">
            <i-table :loading="conditionLoading" border ref="selection" :columns="conditionColumns" :data="conditionData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'审核意见'">
            <i-row>
              <i-col span="8">
                <i-form-item
                  label="结论" prop="auditStatus"
                  :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-radio-group v-model="formData.auditStatus">
                    <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  label="意见信息"
                  prop="auditOpinion"
                  :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                  <i-input type="textarea" v-model="formData.auditOpinion" :rows="2" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审批信息">
        <i-table :loading="examineTableLoading" border ref="examineTable" :columns="examineColumns" :data="examineData"></i-table>
        <div class="page-container">
          <i-page @on-change="jumpPageExamine" :total="totalExamine" :page-size="pageSizeExamine" size="small" show-elevator show-total></i-page>
        </div>
      </i-tab-pane>
      <div class="form-footer-actions">
        <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
          <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
          <span v-else> loading...</span>
        </i-button>
      </div>
    </i-tabs>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'feeLoanHandleDetails',
    mixins: [MixinData],
    data() {
      return {
        tabIndex: 0,
        feeTableLoading: false, // 费用收取落实tableLoading
        conditionLoading: false, // 放款条件tableLoading
        currentPageExamine: 1,
        totalExamine: 0,
        pageSizeExamine: 15,
        examineTableLoading: false, // 审批信息loading
        initFormLoading: false, // 提交按钮loading
        formData: {
          'paymentRecordDTO': {
            'shareAmt': '',
            'scRate': '',
            'capitalRate': '',
            'loanAmt': '',
            'expectLoanDate': ''
          },
          'loanRecordDTO': {
            'shareAmt': '',
            'scRate': '',
            'capitalRate': '',
            'loanAmt': '',
            'expectLoanDate': ''
          },
          'paymentApplyRecordDTO': {
            'custNo': '',
            'certType': '',
            'loanNo': '',
            'operatingMode': '',
            'contractStartDate': '',
            'contractEndDate': '',
            'paymentNo': '',
            'custName': '',
            'productName': '',
            'totalPeriods': '',
            'merchantName': '',
            'signConfirmDate': '',
            'certNo': '',
            'telPhone': '',
            'custType': '',
            'addr': '',
            'applyDate': '',
            'loanTotalAmt': '',
            'productNo': '',
            'merchantNo': ''
          },
          'loanAccountDTO': {
            'loanAcctNo': '',
            'loanBankCode': '',
            'loanOpenBankCode': '',
            'loanBankName': '',
            'loanAcctName': '',
            'loanOpenBankName': ''
          },
          'repayAccountDTO': {
            'repayBankCode': '',
            'repayOpenBankCode': '',
            'repayAcctName': '',
            'repayOpenBankName': '',
            'repayAcctNo': '',
            'repayBankName': ''
          }
        }
      };
    },
    mounted() {
      this.conditionGetlist(); // 执行获取放款条件列表的data
      this.examineGetlist(); // 执行获取审批信息列表的data
      this.feeGetlist(); // 执行获取费用收取落实列表的data
    },
    methods: {
      // 获取放款条件列表的data
      async conditionGetlist() {
        this.$data.conditionLoading = true;
        let reps = await this.$http.post('biz/getPaymentCondition', {
          loanNo: this.$route.query.loanNo
        });
        this.$data.conditionLoading = false;
        if (reps.success) {
          if (reps.body.resultList.length !== 0) {
            this.$data.conditionData = reps.body.resultList;
          } else {
            this.$Notice.warning({
              title: '放款条件列表没有数据可加载',
              duration: 2
            });
            this.$data.conditionData = [];
          }
        }
      },
      // 获取费用收取落实列表的data
      async feeGetlist() {
        this.$data.feeTableLoading = true;
        let reps = await this.$http.post('biz/listApproveFeePlan');
        this.$data.feeTableLoading = false;
        if (reps.success) {
          if (reps.body.resultList.length !== 0) {
            this.$data.conditionData = reps.body.resultList;
          } else {
            this.$Notice.warning({
              title: '费用收取落实列表没有数据可加载',
              duration: 2
            });
            this.$data.conditionData = [];
          }
        } else {
          this.$data.conditionData = [];
        }
      },
      // 获取审批信息列表的data
      async examineGetlist(page) {
        this.$data.examineTableLoading = true;
        if (page) {
          this.$data.currentPageExamine = page;
        }
        let reps = await this.$http.post('biz/listApproveHistory', {
          loanNo: this.$route.query.loanNo,
          currentPage: this.$data.currentPageExamine,
          pageSize: this.$data.pageSizeExamine
        });
        this.$data.examineTableLoading = false;
        if (reps.success) {
          if (reps.body.resultList.length !== 0) {
            this.$data.examineData = reps.body.resultList;
            this.$data.currentPageExamine = reps.body.currentPage;
            this.$data.totalExamine = reps.body.totalNum;
          } else {
            this.$Notice.warning({
              title: '审批信息列表没有数据可加载',
              duration: 2
            });
            this.$data.examineData = [];
          }
        }
      },
      // 获取审批信息列表的data 分页
      jumpPageExamine(page) {
        this.examineGetlist(page);
      },
      // 所有的提交
      saveSubimt() {
        let formName = 'formData';
        this.$refs[formName].validate(async (valid) => {
          this.$data.initFormLoading = true;
          const msg = await this.$Message.loading('正在提交...', 0);
          if (valid) {
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          await bsWait(1000);
          msg();
          this.$data.initFormLoading = false;
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
