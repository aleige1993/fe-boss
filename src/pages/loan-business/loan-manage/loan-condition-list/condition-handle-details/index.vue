<template>
<!--放款条件-办理详情-->
  <div id="condition-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness/loan">放款条件落实列表</i-breadcrumb-item>
      <i-breadcrumb-item>办理详情</i-breadcrumb-item>
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
    <bs-modal v-model="formalitiesShowModal" title="办理抵质押物手续" :width="520">
      <i-form v-if="formalitiesShowModal" ref="formalities" :model="formalities" label-position="right" :label-width="80">
        <i-form-item label="办理时间"
                     prop="makeDate"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formalities.makeDate" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item label="经办人"
                     prop="makeUser"
                     :rules="{required: true, message: '经办人不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.makeUser" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="权证编号"
                     prop="warrantNo"
                     :rules="{required: true, message: '权证编号不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.warrantNo" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="登记机关"
                     prop="registerCompany"
                     :rules="{required: true, message: '登记机关不能为空', trigger: 'blur'}">
          <i-input v-model="formalities.registerCompany" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="抵押状态"
                     prop="mortgageStatus"
                     :rules="{required: true, message: '请选择抵押状态', trigger: 'change'}">
          <i-select v-model="formalities.mortgageStatus">
            <i-option v-for="item in enumSelectData.get('MortgageStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="备注"
                     prop="remark">
          <i-input type="textarea" :rows="2" v-model="formalities.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item
          label="办理文件"
          prop="makeUrl"
          :rules="{required: true, message: '请上传办理文件', trigger: 'blur'}">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccessAlities"
            :on-error="uploadErrorAlities"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
          <p class="show-upload-text" v-text="formalities.makeName"></p>
          <input type="hidden" v-model="formalities.makeUrl" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formalitiesSubmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--GPS安装信息-->
    <bs-modal v-model="GPSinstallShowModal" title="GPS安装信息" :width="1200">
      <div class="form-top-actions">
        <i-button @click="addGPSModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table v-if="GPSinstallShowModal" border ref="examineTable" :columns="loanCarGpsDTOColumns" :data="loanCarGpsDTOList"></i-table>
    </bs-modal>
    <!--GPS安装信息新增和修改模态框-->
    <bs-modal v-model="GPSShowModal" :title="isAddGPS?'新增':'修改'" :width="520"  @on-close="formAddGPS = {}">
      <i-form v-if="GPSShowModal" ref="formAddGPS" :model="formAddGPS" label-position="right" :label-width="90">
        <i-form-item label="GPS型号"
                     prop="gpsModel"
                     :rules="{required: true, message: 'GPS型号不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.gpsModel" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="IMEI"
                     prop="imei"
                     :rules="{required: true, message: 'IMEI不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.imei" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="GPS合作商"
                     prop="gpsJoinMerchant"
                     :rules="{required: true, message: 'GPS合作商不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.gpsJoinMerchant" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="安装状态"
                     prop="gpsInstallStatus"
                     :rules="{required: true, message: '请选择安装状态', trigger: 'change'}">
          <i-select v-model="formAddGPS.gpsInstallStatus">
            <i-option v-for="item in enumSelectData.get('GpsInstallStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="办理人"
                     prop="makeUser"
                     :rules="{required: true, message: '办理人不能为空', trigger: 'blur'}">
          <i-input v-model="formAddGPS.makeUser" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="办理时间"
                     prop="makeDate"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formAddGPS.makeDate" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="addGPSSubmit" :loading="addGPSButtonLoading">
            <span v-if="!addGPSButtonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--担保落实modal-->
    <bs-modal v-model="guaranteeShowModal" title="担保落实" :width="520">
      <i-form v-if="guaranteeShowModal" ref="formagGuarantee" :model="formagGuarantee" label-position="right" :label-width="80">
        <i-form-item label="办理时间"
                     prop="makeDate"
                     :rules="{required: true, message: '办理时间不能为空', trigger: 'blur'}">
          <bs-datepicker v-model="formagGuarantee.makeDate" type="text" placeholder="办理时间"></bs-datepicker>
        </i-form-item>
        <i-form-item label="经办人"
                     prop="makeUser"
                     :rules="{required: true, message: '经办人不能为空', trigger: 'blur'}">
          <i-input v-model="formagGuarantee.makeUser" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="落实状态"
                     prop="lsStatus"
                     :rules="{required: true, message: '请选择落实状态', trigger: 'change'}">
          <i-select v-model="formagGuarantee.lsStatus">
            <i-option v-for="item in enumSelectData.get('LoanLuoShiStatusEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="备注"
                     prop="remark">
          <i-input type="textarea" :rows="2" v-model="formagGuarantee.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item
          label="办理文件"
          prop="makeUrl"
          :rules="{required: true, message: '请上传办理文件', trigger: 'blur'}">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccessGuarantee"
            :on-error="uploadErrorGuarantee"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
          <p class="show-upload-text" v-text="formagGuarantee.makeName"></p>
          <input type="hidden" v-model="formagGuarantee.makeUrl" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formagGuaranteeSubmit">提交</i-button>
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
        GPSShowModal: false, // 显示GPS安装信息新增弹窗modal
        addGPSButtonLoading: false, // 显示GPS安装信息新增弹窗modal提交按钮的loading
        guaranteeShowModal: false, // 担保落实modal
        formData: {
          'paymentRecordDTO': {
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
            'merchantNo': '',
            'approveStatus': '',
            'opinion': ''
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
        // GPS安装信息新增和修改模态框
        formAddGPS: {
          'gpsModel': '',
          'imei': '',
          'gpsJoinMerchant': '',
          'gpsInstallStatus': '',
          'makeDate': '',
          'makeUser': '',
          'id|1-100': '',
          'loanCarNo': '',
          'loanNo': ''
        },
        // 担保落实
        formagGuarantee: {
          'makeName': '',
          'makeUrl': '',
          'makeUser': '',
          'remark': '',
          'makeDate': '',
          'lsStatus': ''
        }
      };
    },
    mounted() {
      this.carGetlist(); // 执行获取车辆信息列表的data
      this.assureGtelist(); // 执行获取担保信息列表的data
      this.conditionGetlist(); // 执行获取放款条件列表的data
      this.getFindPaymentApplyRecordInfo(); // 获取放款条件详情
    },
    methods: {
      // 获取放款条件详情
      async getFindPaymentApplyRecordInfo() {
        let reps = await this.$http.post('/biz/payment/findPaymentApplyRecordInfo', {
          paymentNo: this.$route.query.paymentNo,
          isFktjxq: '1' // 当为放款条件落实则传1，其余全部传0
        });
        console.log(reps);
        if (reps.success) {
          this.$data.formData = reps.body;
        } else {
          this.$data.formData = {};
        }
      },
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
        } else {
          this.$data.carData = [];
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
      // GPS安装弹窗-打开新增弹窗
      addGPSModal() {
        this.$data.isAddGPS = true;
        this.$data.GPSShowModal = true;
      },
      // GPS安装弹窗-新增修改弹窗-提交按钮
      addGPSSubmit() {
        let text = this.$data.isAddGPS ? '新增' : '修改';
        let ind = this.$data.clickRow._index; // 车辆列表的索引index
        this.$data.addGPSButtonLoading = true;
        const formName = 'formAddGPS';
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.$data.isAddGPS) {
              // 插入新数据unshift
              this.$data.carData[ind].loanCarGpsDTOList.unshift(this.$data.formAddGPS);
            } else {
              let index = this.$data.formAddGPS._index; // GPS列表的索引index
              this.$data.carData[ind].loanCarGpsDTOList[index] = this.$data.formAddGPS;
            }
            this.$Message.success(text + 'GPS安装信息成功');
            this.$data.GPSShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          this.$data.addGPSButtonLoading = await false;
          this.$data.formAddGPS = {};
        });
      },

      // 提交的ajax
      async allSubimt() {
        let rep = await this.$http.post('/biz/payment/paymentCondition', {
          paymentNo: this.$route.query.paymentNo,
          paymentConditionSubmitParams: this.$data.conditionData, // 放款条件表集合
          paymentGuaranteeSubmitParams: this.$data.assureData, // 担保信息表集合
          paymentCarSubmitParams: this.$data.carData, // 车辆信息表集合
          loanApproveParam: {
            approveStatus: this.$data.formData.approveStatus,
            opinion: this.$data.formData.opinion
          }
        });
        if (rep.success) {
          this.$Message.success('提交成功');
          this.$router.push({
            path: '/index/loanbusiness/loan',
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
      // 办理抵质押物手续modal-提交按钮
      formalitiesSubmit() {
        let ind = this.$data.clickRow._index; // 车辆列表的索引index
        this.$refs['formalities'].validate(async (valid) => {
          if (valid) {
            this.$data.carData[ind] = this.$data.formalities;
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          this.$data.formalitiesShowModal = false;
        });
      },
      // 担保落实modal-提交按钮
      formagGuaranteeSubmit() {
        let ind = this.$data.formagGuarantee._index;
        this.$refs['formagGuarantee'].validate(async (valid) => {
          if (valid) {
            this.$data.assureData[ind] = this.$data.formagGuarantee;
            this.$Message.success('提交成功');
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
          this.$data.guaranteeShowModal = false;
        });
      },
      // 办理抵质押物手续文件上传成功
      uploadSuccessAlities(res, file, fileList) {
        this.$data.formalities.makeName = file.name;
        this.$data.formalities.makeUrl = res.body.url;
      },
      // 办理抵质押物手续文件上传失败
      uploadErrorAlities(err, file, fileList) {
        this.$data.formalities.makeName = '';
        this.$Notice.error({
          title: '错误提示',
          desc: err
        });
      },
      // 担保落实文件上传成功
      uploadSuccessGuarantee(res, file, fileList) {
        this.$data.formagGuarantee.makeName = file.name;
        this.$data.formagGuarantee.makeUrl = res.body.url;
      },
      // 担保落实文件上传失败
      uploadErrorGuarantee(err, file, fileList) {
        this.$data.formagGuarantee.makeName = '';
        this.$Notice.error({
          title: '错误提示',
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
