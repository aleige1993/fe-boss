<template>
<!--放款条件-办理详情-->
  <div id="condition-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/approval">放款审批列表</i-breadcrumb-item>
      <i-breadcrumb-item>放款审批详情</i-breadcrumb-item>
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
                  <span v-text="formData.paymentApplyRecordDTO.certNo"></span>
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
          <bs-form-block :title="'车辆信息'">
            <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'担保信息'">
            <i-table :loading="assureDataLoading" border ref="selection" :columns="assureColumns" :data="assureData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'费用收取落实'">
            <i-table :loading="feeTableLoading" border ref="selection" :columns="feeColumns" :data="feeData"></i-table>
          </bs-form-block>
          <bs-form-block :title="'放款信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="放款金额">
                  <span v-text="formData.loanAmt"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="资金方利率">
                  <span v-text="formData.capitalYearRate"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="应收分润金额">
                  <span v-text="formData.profitAmt"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="颂车利率">
                  <span v-text="formData.songcheRate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="预计放款日期">
                  <span v-text="formData.estimateLoanDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="账户名">
                  <span v-text="formData.loanAcctName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="账号">
                  <span v-text="formData.loanAcctNo"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开户银行">
                  <span v-text="formData.loanOpenBankName"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'还款账户信息'">
            <i-form inline label-position="right" :label-width="100">
              <i-row>
                <i-col span="8">
                  <i-form-item label="账户名">
                    <span v-text="formData.repayAcctName"></span>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="账号">
                    <span v-text="formData.repayAcctNo"></span>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="开户银行">
                    <span v-text="formData.repayOpenBankName"></span>
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
                    <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
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
        <table-loan-info v-if="tabIndex===1" :requestData="{loanNo: $route.query.loanNo}"></table-loan-info>
      </i-tab-pane>
      <div class="form-footer-actions">
        <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
          <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
          <span v-else> loading...</span>
        </i-button>
      </div>
    </i-tabs>
    <!--办理抵质押物手续-->
    <bs-modal v-model="formalitiesShowModal" title="抵押详情" :width="520">
      <i-form v-if="formalitiesShowModal" ref="formalities" :model="formalities" label-position="right" :label-width="80">
        <i-form-item label="办理时间">
          <span v-text="formalities.makeDate"></span>
        </i-form-item>
        <i-form-item label="经办人">
          <span v-text="formalities.makeUser"></span>
        </i-form-item>
        <i-form-item label="权证编号">
          <span v-text="formalities.warrantNo"></span>
        </i-form-item>
        <i-form-item label="登记机关">
          <span v-text="formalities.registerCompany"></span>
        </i-form-item>
        <i-form-item label="抵押状态">
          <span v-text="enumCode2Name(formalities.mortgageStatus, 'MortgageStatusEnum')"></span>
        </i-form-item>
        <i-form-item label="备注">
          <span v-text="formalities.remark"></span>
        </i-form-item>
        <i-form-item label="办理文件">
          <Tooltip content="点击浏览/下载" placement="bottom">
            <a :href="formalities.makeUrl" target="_blank">{{formalities.makeName}}</a>
          </Tooltip>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--GPS安装信息-->
    <bs-modal v-model="GPSinstallShowModal" title="GPS安装信息详情" :width="1200">
      <i-table v-if="GPSinstallShowModal" border ref="examineTable" :columns="loanCarGpsDTOColumns" :data="loanCarGpsDTOList"></i-table>
    </bs-modal>
    <!--担保落实modal-->
    <bs-modal v-model="guaranteeShowModal" title="担保落实详情" :width="520">
      <i-form v-if="guaranteeShowModal" ref="formagGuarantee" :model="formagGuarantee" label-position="right" :label-width="80">
        <i-form-item label="办理时间">
          <span v-text="formagGuarantee.makeDate"></span>
        </i-form-item>
        <i-form-item label="经办人">
          <span v-text="formagGuarantee.makeUser"></span>
        </i-form-item>
        <i-form-item label="落实状态">
          <span v-text="enumCode2Name(formagGuarantee.lsStatus, 'MortgageStatusEnum')"></span>
        </i-form-item>
        <i-form-item label="备注">
          <span v-text="formagGuarantee.remark"></span>
        </i-form-item>
        <i-form-item label="办理文件">
          <Tooltip content="点击浏览/下载" placement="bottom">
            <a :href="formalities.makeUrl" target="_blank">{{formagGuarantee.makeName}}</a>
          </Tooltip>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import TableLoanInfo from '@/components/table-loan-approval-info';
  export default {
    name: 'pageLoanHandleDetails',
    mixins: [MixinData],
    components: {
      BsModal,
      TableLoanInfo
    },
    data() {
      return {
        clickRow: {},
        isAddGPS: true,
        tabIndex: 0,
        carDataLoading: false, // 车辆表loading
        assureDataLoading: false, // 担保表loading
        conditionLoading: false, // 放款条件loading
        initFormLoading: false, // 提交按钮loading
        formalitiesShowModal: false, // 办理抵质押物手续modal
        GPSinstallButtonLoading: false, // GPS安装信息modal里的提交按钮loading
        GPSinstallShowModal: false, // GPS安装信息modal
        addGPSButtonLoading: false, // 显示GPS安装信息新增弹窗modal提交按钮的loading
        guaranteeShowModal: false, // 担保落实modal
        // 费用收取落实
        feeTableLoading: false,
        formData: {
          'approveStatus': '',
          'opinion': '',
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
        },
        // 办理抵质押物手续
        formalities: {
          'makeName': '',
          'makeUrl': '',
          'makeDate': '',
          'makeUser': '',
          'warrantNo': '',
          'registerCompany': '',
          'mortgageStatus': '',
          'remark': ''
        },
        formagGuarantee: {
          'uploadFileName': '',
          'lsStatus': ''
        }
      };
    },
    mounted() {
      this.carGetlist(); // 执行获取车辆信息列表的data
      this.assureGtelist(); // 执行获取担保信息列表的data
      this.conditionGetlist(); // 执行获取放款条件列表的data
      this.feeGetlist(); // 执行获取费用收取落实列表的data
    },
    methods: {
      // 获取车辆信息列表的data
      async carGetlist() {
        this.$data.carDataLoading = true;
        let reps = await this.$http.post('/biz/listLoanCarByLoanNo', {
          loanNo: this.$route.query.loanNo
        });
        this.$data.carDataLoading = false;
        if (reps.success) {
          if (reps.body.resultList.length !== 0) {
            this.$data.carData = reps.body.resultList;
          } else {
            this.$data.carData = [];
          }
        }
      },
      // 获取担保信息列表的data
      async assureGtelist() {
        this.$data.assureDataLoading = true;
        let reps = await this.$http.post('/biz/listGuaranteeByLoanNo', {
          loanNo: this.$route.query.loanNo
        });
        this.$data.assureDataLoading = false;
        if (reps.success) {
          if (reps.body.resultList.length !== 0) {
            this.$data.assureData = reps.body.resultList;
          } else {
            this.$data.assureData = [];
          }
        } else {
          this.$data.assureData = [];
        }
      },
      // 获取放款条件列表的data
      async conditionGetlist() {
        this.$data.conditionLoading = true;
        let reps = await this.$http.post('biz/getPaymentCondition', {
          loanNo: this.$route.query.loanNo
        });
        this.$data.conditionLoading = false;
        if (reps.success) {
          if (reps.body.length !== 0) {
            this.$data.conditionData = reps.body;
          } else {
            this.$data.conditionData = [];
          }
        } else {
          this.$data.conditionData = [];
        }
      },
      // 获取费用收取落实列表的data
      async feeGetlist() {
        this.$data.feeTableLoading = true;
        let reps = await this.$http.post('/biz/listApproveFeePlan');
        this.$data.feeTableLoading = false;
        if (reps.success) {
          if (reps.body !== 0) {
            this.$data.feeData = reps.body;
          } else {
            this.$data.feeData = [];
          }
        } else {
          this.$data.feeData = [];
        }
      },
      // 提交的ajax
      async allSubimt() {
        let rep = await this.$http.post('/biz/payment/paymentApprove', {
          paymentNo: this.$route.query.paymentNo,
          loanApproveParam: {
            approveStatus: this.$data.formData.approveStatus,
            opinion: this.$data.formData.opinion
          }
        });
        if (rep.success) {
          this.$Message.success('提交成功');
          this.$router.push({
            path: '/index/loanbusiness/loan/approval',
            query: {
              currentPage: this.$route.query.currentPage
            }
          });
        }
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
      },
      // 办理抵质押物手续文件上传成功
      uploadSuccessAlities(res, file, fileList) {
        this.$data.formalities.uploadFileName = file.name;
        this.$data.formalities.makeUrl = res.body.url;
      },
      // 办理抵质押物手续文件上传失败
      uploadErrorAlities(err, file, fileList) {
        this.$data.formalities.uploadFileName = '';
        this.$Notice.error({
          desc: err
        });
      },
      // 担保落实文件上传成功
      uploadSuccessGuarantee(res, file, fileList) {
        this.$data.formalities.uploadFileName = file.name;
        this.$data.formalities.makeUrl = res.body.url;
      },
      // 担保落实文件上传失败
      uploadErrorGuarantee(err, file, fileList) {
        this.$data.formalities.uploadFileName = '';
        this.$Notice.error({
          desc: err
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #condition-loan-handle-details {
    & .show-upload-text {
      position: relative;
      padding-right: 36px;
      line-height: 20px;
      min-height: 20px;
      color: #666;
    }
  }
</style>
