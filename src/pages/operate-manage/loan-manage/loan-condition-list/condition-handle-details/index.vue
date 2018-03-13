<template>
<!--放款条件-办理详情-->
  <div id="condition-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/loan">放款条件落实列表</i-breadcrumb-item>
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
                    <i-radio v-if="item.itemCode!=='B'" v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  v-if="formData.approveStatus === 'R'"
                  :rules="{required: true, message: '拒绝原因不能为空', trigger: 'change'}"
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
      <i-form ref="formalities" :model="formalities" label-position="right" :label-width="80">
        <i-form-item label="抵押状态">
          <span v-text="enumCode2Name('1', 'MortgageStatusEnum')"></span>
        </i-form-item>
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
        <i-form-item label="备注"
                     prop="remark">
          <i-input type="textarea" :rows="2" v-model="formalities.remark" placeholder=""></i-input>
        </i-form-item>
        <i-form-item
          label="办理文件"
          prop="mortgageUrl"
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
          <p v-text="formalities.mortgageName"></p>
          <input type="hidden" v-model="formalities.mortgageUrl" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formalitiesSubmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--完善车辆信息弹窗-->
    <bs-modal v-model="detailsCarDataShowModal" title="车辆信息" :width="1200">
      <i-form v-if="detailsCarDataShowModal" ref="detailsCarDataForm" :model="detailsCarDataForm" label-position="right" :label-width="120" class="input-label-color">
        <i-row>
          <i-col span="8">
            <i-form-item
              label="担保类型"
              prop="guaranteeType">
              <span v-text="enumCode2Name(detailsCarDataForm.guaranteeType, 'PawnTypeEnum')"></span>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item
              label="权利人类型"
              prop="custType">
              <span v-text="enumCode2Name(detailsCarDataForm.custType, 'CustTypeEnum')"></span>
            </i-form-item>
          </i-col>
          <!--权利人-->
          <i-col span="8" v-if="detailsCarDataForm.custType=='1' || detailsCarDataForm.custType=='2'">
            <i-form-item
              label="权利人"
              prop="carOwnerNo">
              <span v-text="detailsCarDataForm.carOwnerName"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="车牌号" prop="carPlateNo">
              <span v-text="detailsCarDataForm.carPlateNo"></span>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="是否临时车牌" prop="isTmpPlate">
              <span v-text="enumCode2Name(detailsCarDataForm.isTmpPlate, 'YesNoEnum')"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--车辆品牌-->
          <i-col span="24">
            <i-form-item
              label="车辆品牌"
              prop="carModelName">
              <span v-text="detailsCarDataForm.carModelName"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--车辆颜色-->
          <i-col span="8">
            <i-form-item label="车辆颜色" prop="carColor">
              <span v-text="enumCode2Name(detailsCarDataForm.carColor, 'CarColorEnum')"></span>
            </i-form-item>
          </i-col>
          <!--排量-->
          <i-col span="8">
            <i-form-item label="排量" prop="carOutputVolume">
              <span v-text="detailsCarDataForm.carOutputVolume"></span>
            </i-form-item>
          </i-col>
          <!--排放标准-->
          <i-col span="8">
            <i-form-item label="排放标准" prop="carOutputStand">
              <span v-text="detailsCarDataForm.carOutputStand"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--生产厂商-->
          <i-col span="8">
            <i-form-item label="生产厂商" prop="carVendor">
              <span v-text="detailsCarDataForm.carVendor"></span>
            </i-form-item>
          </i-col>
          <!--发动机号-->
          <i-col span="8">
            <i-form-item label="发动机号" prop="carEngineNo">
              <span v-text="detailsCarDataForm.carEngineNo"></span>
            </i-form-item>
          </i-col>
          <!--车架号-->
          <i-col span="8">
            <i-form-item label="车架号" prop="carFrameNo">
              <span v-text="detailsCarDataForm.carFrameNo"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--出厂日期-->
          <i-col span="8">
            <i-form-item label="出厂日期" prop="carBirthday">
              <span v-text="detailsCarDataForm.carBirthday"></span>
            </i-form-item>
          </i-col>
          <!--上牌城市-->
          <i-col span="8">
            <i-form-item label="上牌城市" prop="carOnCity">
              <span v-text="detailsCarDataForm.carOnCity"></span>
            </i-form-item>
          </i-col>
          <!--上牌时间-->
          <i-col span="8">
            <i-form-item label="上牌时间" prop="carOnDate">
              <span v-text="detailsCarDataForm.carOnDate"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--过户次数-->
          <i-col span="8">
            <i-form-item label="过户次数" prop="carTransferCount">
              <span v-text="detailsCarDataForm.carTransferCount"></span>
            </i-form-item>
          </i-col>
          <!--抵押次数-->
          <i-col span="8">
            <i-form-item label="抵押次数" prop="carGuaCount">
              <span v-text="detailsCarDataForm.carGuaCount"></span>
            </i-form-item>
          </i-col>
          <!--行驶里程-->
          <i-col span="8">
            <i-form-item label="行驶里程" prop="carMileage">
              <span v-text="(detailsCarDataForm.carMileage&&detailsCarDataForm.carMileage!=='')?detailsCarDataForm.carMileage+'KM':detailsCarDataForm.carMileage"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--合格证号-->
          <i-col span="8">
            <i-form-item label="合格证号" prop="carCertNo">
              <span v-text="detailsCarDataForm.carCertNo"></span>
            </i-form-item>
          </i-col>
          <!--车辆状况-->
          <i-col span="8">
            <i-form-item
              label="车辆状况"
              prop="carStatus">
              <span v-text="enumCode2Name(detailsCarDataForm.carStatus, 'CarConditionEnum')"></span>
            </i-form-item>
          </i-col>
          <!--有无事故-->
          <i-col span="8">
            <i-form-item label="有无事故" prop="carIsFault">
              <span v-text="enumCode2Name(detailsCarDataForm.carIsFault, 'HaveNoEnum')"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--机动车登记证书号-->
          <i-col span="8">
            <i-form-item label="机动车登记证书号" prop="carRegNo">
              <span v-text="detailsCarDataForm.carRegNo"></span>
            </i-form-item>
          </i-col>
          <!--是否挂靠-->
          <i-col span="8">
            <i-form-item label="是否挂靠" prop="carIsAnchored">
              <span v-text="enumCode2Name(detailsCarDataForm.carIsAnchored, 'YesNoEnum')"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--发票开具单位-->
          <i-col span="8">
            <i-form-item label="发票开具单位" prop="billCorpName">
              <span v-text="detailsCarDataForm.billCorpName"></span>
            </i-form-item>
          </i-col>
          <!--发票号-->
          <i-col span="8">
            <i-form-item label="发票编号" prop="billNo">
              <span v-text="detailsCarDataForm.billNo"></span>
            </i-form-item>
          </i-col>
          <!--发票价格-->
          <i-col span="8">
            <i-form-item label="发票价格" prop="billAmt">
              <span v-text="detailsCarDataForm.billAmt"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--厂商指导价-->
          <i-col span="8">
            <i-form-item label="厂商指导价" prop="carGuidePrice">
              <span v-text="(detailsCarDataForm.billAmt&&detailsCarDataForm.billAmt!=='')&&(detailsCarDataForm.billAmt+'元')"></span>
            </i-form-item>
          </i-col>
          <!--车辆购买价格-->
          <i-col span="8">
            <i-form-item label="车辆购买价格" prop="carBuyPrice">
              <span v-text="(detailsCarDataForm.carBuyPrice&&detailsCarDataForm.carBuyPrice!=='')&&(detailsCarDataForm.carBuyPrice+'元')"></span>
            </i-form-item>
          </i-col>
          <!--车辆价值-->
          <i-col span="8">
            <i-form-item label="车辆价值" prop="carEvaluatePrice">
              <span v-text="(detailsCarDataForm.carEvaluatePrice&&detailsCarDataForm.carEvaluatePrice!=='')&&(detailsCarDataForm.carEvaluatePrice+'元')"></span>
            </i-form-item>
          </i-col>
        </i-row>
        <!--<i-form-item class="text-right">
          <i-button type="primary" @click="setCarDataSubmit">提交</i-button>
        </i-form-item>-->
      </i-form>
    </bs-modal>
    <!--车辆列表设置回传天数-->
    <bs-modal v-model="backDaysShowModal" title="设置回传天数" :width="500">
      <i-form ref="backDaysForm" :model="backDaysForm" label-position="right" :label-width="80">
        <i-form-item label="回传天数"
                     prop="backDays"
                     :rules="{required: true, message: '请输入回传天数'}">
          <i-input v-model="backDaysForm.backDays" placeholder=""></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="backDaysFormSubmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--担保落实modal-->
    <bs-modal v-model="guaranteeShowModal" title="担保落实" :width="520">
      <i-form ref="formagGuarantee" :model="formagGuarantee" label-position="right" :label-width="80">
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
    <!--选择权利人的模态框-->
    <bs-modal :title="'选择权利人'" v-model="showSelectObligee" :width="1200">
      <table-customer-list v-if="showSelectObligee" ref="obligeeTable" type="modal" @on-row-dbclick="selectObligeeRow"></table-customer-list>
    </bs-modal>
    <!--选择企业权利人的模态框-->
    <bs-modal :title="'选择企业权利人'" v-model="showSelectCompanyOwner" :width="1200">
      <table-company-customer-list v-if="showSelectCompanyOwner" ref="obligeeTable" type="modal" @on-row-dbclick="selectCompanyOwnerRow"></table-company-customer-list>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import TableLoanInfo from '@/components/table-loan-approval-info';
  import TableCustomerList from '@/components/table-customer-list'; // 选择权利人的模态框
  import TableCompanyCustomerList from '@/components/table-company-customer-list'; // 选择企业权利人的模态框
  import BsCarpicker from '@/components/bs-carpicker';
  export default {
    name: 'pageLoanHandleDetails',
    mixins: [MixinData],
    components: {
      BsModal,
      'bs-carpicker': BsCarpicker,
      TableCustomerList,
      TableCompanyCustomerList,
      TableLoanInfo
    },
    data() {
      return {
        clickRow: {},
        isAddGPS: true,
        tabIndex: 0,
        showSelectObligee: false, // 选择车辆权利人
        showSelectCompanyOwner: false, // 选择车辆企业权利人
        carDataLoading: false, // 车辆表loading
        assureDataLoading: false, // 担保表loading
        conditionLoading: false, // 放款条件loading
        initFormLoading: false, // 提交按钮loading
        formalitiesShowModal: false, // 办理抵质押物手续modal
        detailsCarDataShowModal: false, // 完善车辆信息modal
        guaranteeShowModal: false, // 担保落实modal
        backDaysShowModal: false, // 车辆回传天数弹窗
        warrantType: '', // 权证回传方式
        backDaysForm: {
          backDays: ''
        },
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
            'rejectCause': '',
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
        // 完善车辆信息
        detailsCarDataForm: {
          carOutputStand: '',
          loanNo: '',
          carGuaCount: '',
          remark: '',
          carBuyPrice: '',
          carEngineNo: '',
          carRegNo: '',
          carCertNo: '',
          carColor: '',
          carOnCity: '',
          carOwnerNo: '',
          carGuidePrice: '',
          billNo: '',
          carTypeName: '',
          carOwnerName: '',
          carIsFault: '',
          carStatus: '',
          carPlateNo: '',
          carBirthday: '',
          carTransferCount: '',
          carIsAnchored: '',
          carBrandCode: '',
          carOnDate: '',
          carVendor: '',
          carBrandName: '',
          billAmt: '',
          carEvaluatePrice: '',
          guaranteeType: '',
          isTmpPlate: '',
          carOutputVolume: '',
          custType: '',
          carTypeCode: '',
          carIsPubPlate: '',
          carFrameNo: '',
          carMileage: '',
          carModel: '',
          carModelName: '',
          billCorpName: ''
        },
        // 办理抵质押物手续
        formalities: {
          'makeDate': '',
          'makeUser': '',
          'backDays': '',
          'warrantNo': '',
          'registerCompany': '',
          'mortgageStatus': '',
          'mortgageName': '',
          'mortgageUrl': '',
          'remark': ''
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
    watch: {
      'detailsCarDataForm.custType'(newVal, oldVal) {
        if ((oldVal !== '') && (typeof oldVal !== 'undefined')) {
          this.$data.detailsCarDataForm.carOwnerName = '';
          this.$data.detailsCarDataForm.carOwnerNo = '';
        }
      }
    },
    async mounted() {
      await this.getFindPaymentApplyRecordInfo(); // 获取放款条件详情
      this.carGetlist(); // 执行获取车辆信息列表的data
      this.assureGtelist(); // 执行获取担保信息列表的data
      this.conditionGetlist(); // 执行获取放款条件列表的data

      // 权证回传方式为《先入库后抵押》则展示办理抵押按钮,且办理抵押时抵押状态为“已抵押”
      if (this.$data.warrantType === '2') {
        this.$data.formalities.mortgageStatus = '1';
      }
      // 权证回传方式为《先抵押后入库》则展示权证回传天数按钮,且办理抵押时抵押状态为“未抵押”
      if (this.$data.warrantType === '1') {
        this.$data.formalities.mortgageStatus = '0';
      }
    },
    methods: {
      /**
       *  车辆品牌
       * @param car
       */
      selectLoanCar(car) {
        this.$data.detailsCarDataForm.carBrandCode = car.brandNo;
        this.$data.detailsCarDataForm.carBrandName = car.brandName;
        this.$data.detailsCarDataForm.carTypeCode = car.seriesNo;
        this.$data.detailsCarDataForm.carTypeName = car.seriesName;
        this.$data.detailsCarDataForm.carModel = car.modelName;
      },
      /**
       *  选择权利人
       * @param row
       * @param index
       */
      selectObligeeRow(row, index) {
        // console.log(row);
        this.$data.detailsCarDataForm.carOwnerName = row.name;
        this.$data.detailsCarDataForm.carOwnerNo = row.memberNo;
        this.$data.showSelectObligee = false;
      },
      /**
       *  选择企业权利人
       * @param row
       * @param index
       */
      selectCompanyOwnerRow(row, index) {
        this.$data.detailsCarDataForm.carOwnerName = row.corpName;
        this.$data.detailsCarDataForm.carOwnerNo = row.corpNo;
        this.$data.showSelectCompanyOwner = false;
      },
      // 获取放款条件详情
      async getFindPaymentApplyRecordInfo() {
        let reps = await this.$http.post('/biz/payment/findPaymentApplyRecordInfo', {
          paymentNo: this.$route.query.paymentNo,
          isFktjxq: '1' // 当为放款条件落实则传1，其余全部传0
        });
        if (reps.success) {
          this.$data.formData = reps.body;
          this.$data.warrantType = reps.body.paymentApplyRecordDTO.warrantType;
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
          this.$data.carData = reps.body.resultList;
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
          this.$data.assureData = reps.body.resultList;
        } else {
          this.$data.assureData = [];
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
        if (reps.success && reps.body.length !== 0) {
          this.$data.conditionData = reps.body;
        } else {
          this.$data.conditionData = [];
        }
      },
      // 提交的ajax
      async allSubimt() {
        if (this.$data.carData.length === 0) {
          this.$Message.error({
            content: '没有车辆信息，无法提交！',
            duration: 2
          });
          return;
        }
        // 权证回传方式为《先入库后抵押》时 车辆信息中须配置好“办理抵押” 通过其中的必填项“办理时间”字段判断
        for (let item of this.$data.carData) {
          if (this.$data.warrantType === '2' && (typeof item.makeDate === 'undefined' || item.makeDate === '' || item.makeDate === null)) {
            this.$Message.error({
              content: '车辆信息中须配置好“办理抵押”！',
              duration: 2
            });
            return;
          }
        }
        // 权证回传方式为《先入库后抵押》时 回传天数必填
        for (let item of this.$data.carData) {
          if (this.$data.warrantType === '1' && (typeof item.backDays === 'undefined' || item.backDays === '')) {
            this.$Message.error({
              content: '车辆信息中须配置好“回传天数”！',
              duration: 2
            });
            return;
          }
        }
        // 放款条件列表中 备注和落实状态的必填性验证
        if (this.$data.conditionData && this.$data.conditionData.length === 0) {
          this.$Message.error({
            content: '放款条件中没有数据！',
            duration: 2
          });
          return;
        }
        let conditionArray = this.$data.conditionData;
        if (conditionArray && conditionArray.length > 0) {
          for (let item of conditionArray) {
            if (!item.remark || item.remark === '') {
              this.$Message.error({
                content: '放款条件中的“备注”不能为空！',
                duration: 2
              });
              return;
            }
            if (!item.status || item.status === '') {
              this.$Message.error({
                content: '放款条件中的“落实状态”不能为空！',
                duration: 2
              });
              return;
            }
          }
        }
        this.$AuditPrompt.auditPromptFun(this.$data.formData.approveStatus, async () => {
          this.$data.initFormLoading = true;
          let rep = await this.$http.post('/biz/payment/paymentCondition', {
            paymentNo: this.$route.query.paymentNo,
            paymentConditionSubmitParams: this.$data.conditionData, // 放款条件表集合
            paymentGuaranteeSubmitParams: this.$data.assureData, // 担保信息表集合
            loanCarList: this.$data.carData, // 车辆信息表集合
            loanApproveParam: {
              approveStatus: this.$data.formData.approveStatus,
              rejectCause: this.$data.formData.rejectCause,
              opinion: this.$data.formData.opinion
            }
          });
          this.$data.initFormLoading = false;
          if (rep.success) {
            this.$Message.success('提交成功');
            this.$router.push({
              path: '/index/operate/loan',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
          }
        });
      },
      // 所有的提交按钮
      saveSubimt() {
        this.$refs['formData'].validate((valid) => {
          if (valid) {
            this.allSubimt();
          } else {
            this.$data.tabIndex = 0;
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 完善车辆信息弹窗的提交按钮
      setCarDataSubmit() {
        let ind = this.$data.clickRow._index; // 车辆列表的索引index
        this.$refs['detailsCarDataForm'].validate(async (valid) => {
          if (valid) {
            this.$set(this.$data.carData, ind, this.$data.detailsCarDataForm);
            this.$Message.success('提交成功');
            this.$data.detailsCarDataShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 办理抵质押物手续modal-提交按钮
      formalitiesSubmit() {
        let ind = this.$data.clickRow._index; // 车辆列表的索引index
        this.$refs['formalities'].validate(async (valid) => {
          if (valid) {
            const formField = [
              'makeDate',
              'makeUser',
              'backDays',
              'warrantNo',
              'registerCompany',
              'mortgageStatus',
              'mortgageName',
              'mortgageUrl',
              'remark'
            ];
            // 当权证回传方式为《先入库后抵押》则抵押状态为“已抵押”
            this.$data.formalities.mortgageStatus = '1';
            formField.forEach((item) => {
              this.$set(this.$data.carData[ind], '' + item, this.$data.formalities['' + item]);
            });
            this.$Message.success('提交成功');
            this.$data.formalitiesShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 车辆回传天数modal-提交按钮
      backDaysFormSubmit() {
        let ind = this.$data.clickRow._index; // 车辆列表的索引index
        this.$refs['backDaysForm'].validate(async (valid) => {
          if (valid) {
            // 当权证回传方式为《先抵押后入库》则展示权证回传天数按钮,且抵押状态为“未抵押”
            this.$set(this.$data.carData[ind], 'mortgageStatus', '0');
            this.$set(this.$data.carData[ind], 'backDays', this.$data.backDaysForm['backDays']);
            this.$Message.success('提交成功');
            this.$data.backDaysShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 担保落实modal-提交按钮
      formagGuaranteeSubmit() {
        let ind = this.$data.formagGuarantee._index;
        this.$refs['formagGuarantee'].validate(async (valid) => {
          if (valid) {
            this.$data.assureData[ind] = {
              ...this.$data.assureData[ind],
              ...this.$data.formagGuarantee
            };
            this.$Message.success('提交成功');
            this.$data.guaranteeShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 办理抵质押物手续文件上传成功
      uploadSuccessAlities(res, file, fileList) {
        this.$data.formalities.mortgageName = file.name;
        this.$data.formalities.mortgageUrl = res.body.url;
      },
      // 办理抵质押物手续文件上传失败
      uploadErrorAlities(err, file, fileList) {
        this.$data.formalities.mortgageName = '';
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
