<template>
  <!--放款费用-办理详情-->
  <div id="fee-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/loan/fee">放款费用落实列表</i-breadcrumb-item>
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
                  <span v-text="formData.paymentApplyRecordDTO.totalPeriods"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="借款金额(元)">
                  <span v-text="formData.paymentApplyRecordDTO.loanTotalAmt"></span>
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
                  <span v-text="formData.paymentApplyRecordDTO.contractStartDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="合同到期日">
                  <span v-text="formData.paymentApplyRecordDTO.contractEndDate"></span>
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
              <!--<i-col span="8">
                <i-form-item label="预计放款日期">
                  <span v-text="formData.paymentRecordDTO.expectLoanDate"></span>
                </i-form-item>
              </i-col>-->
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
                  label="结论" prop="approveStatus"
                  :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-radio-group v-model="formData.approveStatus">
                    <i-radio v-if="item.itemCode!=='B'" v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  v-if="formData.approveStatus === 'R'"
                  label="拒绝原因"
                  prop="rejectCause">
                  <i-select v-model="formData.rejectCause">
                    <i-option v-for="item in enumSelectData.get('BizApproveRejectEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  label="意见信息"
                  prop="opinion"
                  :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
                  <i-input type="textarea" v-model="formData.opinion" :rows="2" placeholder="">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审批信息">
        <table-loan-info v-if="tabIndex===1" :requestData="{loanNo: $route.query.loanNo||''}"></table-loan-info>
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
  import TableLoanInfo from '@/components/table-loan-approval-info';
  export default {
    name: 'feeLoanHandleDetails',
    mixins: [MixinData],
    components: {
      TableLoanInfo
    },
    data() {
      return {
        tabIndex: 0,
        feeTableLoading: false, // 费用收取落实tableLoading
        conditionLoading: false, // 放款条件tableLoading
        initFormLoading: false, // 提交按钮loading
        formData: {
          'approveStatus': '',
          'rejectCause': '',
          'opinion': '',
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
    async mounted() {
      let loanNo = this.$route.query.loanNo;
      let signNo = this.$route.query.signNo;
      this.$data.formData.paymentApplyRecordDTO.loanNo = await loanNo;
      this.$data.formData.paymentApplyRecordDTO.signNo = await signNo;
      await this.getFindPaymentApplyRecordInfo(); //  获取放款条件详情
      this.conditionGetlist(); // 执行获取放款条件列表的data
      this.feeGetlist(); // 执行获取费用收取落实列表的data
    },
    methods: {
      // 获取放款条件详情
      async getFindPaymentApplyRecordInfo() {
        let reps = await this.$http.post('/biz/payment/findPaymentApplyRecordInfo', {
          paymentNo: this.$route.query.paymentNo,
          isFktjxq: '0' // 当为放款条件落实则传1，其余全部传0
        });
        if (reps.success) {
          this.$data.formData = reps.body;
        } else {
          this.$data.formData = {
            paymentApplyRecordDTO: {
              loanNo: ''
            }
          };
        }
      },
      // 获取放款条件列表的data
      async conditionGetlist() {
        this.$data.conditionLoading = true;
        let productNo = this.$data.formData.paymentApplyRecordDTO.productNo;
        let custType = this.$data.formData.paymentApplyRecordDTO.custType;
        let reps = await this.$http.post('biz/getPaymentCondition', {
          loanNo: this.$route.query.loanNo,
          productNo,
          custType
        });
        this.$data.conditionLoading = false;
        if (reps.success) {
          this.$data.conditionData = reps.body;
        } else {
          this.$data.conditionData = [];
        }
      },
      // 获取费用收取落实列表的data
      async feeGetlist() {
        this.$data.feeTableLoading = true;
        let reps = await this.$http.post('/biz/listApproveFeePlan', {
          loanNo: this.$route.query.loanNo
        });
        this.$data.feeTableLoading = false;
        if (reps.success) {
          this.$data.feeData = reps.body;
        } else {
          this.$data.feeData = [];
        }
      },
      // 提交的ajax
      async allSubimt() {
        this.$AuditPrompt.auditPromptFun(this.$data.formData.approveStatus, async () => {
          let rep = await this.$http.post('/biz/payment/paymentFee', {
            paymentNo: this.$route.query.paymentNo,
            paymentFeePlanLuoShiParamList: this.$data.feeData, // 费用收取列表集合
            paymentConditionSubmitParams: this.$data.conditionData, // 放款条件表集合
            loanApproveParam: {
              approveStatus: this.$data.formData.approveStatus,
              rejectCause: this.$data.formData.rejectCause,
              opinion: this.$data.formData.opinion
            }
          });
          if (rep.success) {
            this.$Message.success('提交成功');
            this.$router.push({
              path: '/index/operate/loan/fee',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
          } else {
            /* let errText = rep.reMsg.slice(1, rep.reMsg.length - 1);
            this.$Notice.error({
              title: '错误提示：',
              desc: errText,
              duration: 2
            });*/
          }
        });
      },
      // 所有的提交按钮
      saveSubimt() {
        this.$refs['formData'].validate(async (valid) => {
          if (valid) {
            this.$data.initFormLoading = true;
            await this.allSubimt();
            this.$data.initFormLoading = false;
          } else {
            this.$data.tabIndex = 0;
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
