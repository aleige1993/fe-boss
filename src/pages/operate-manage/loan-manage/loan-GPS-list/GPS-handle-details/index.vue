<template>
<!--放款条件-办理详情-->
  <div id="condition-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/loan">GPS安装落实</i-breadcrumb-item>
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
    <!--查看车辆信息弹窗-->
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
              <span v-text="detailsCarDataForm.carBrandName+detailsCarDataForm.carTypeName+detailsCarDataForm.carModel"></span>
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
      </i-form>
    </bs-modal>
    <!--GPS安装信息-->
    <bs-modal v-model="GPSinstallShowModal" title="GPS安装信息" :width="1200">
      <div class="form-top-actions">
        <i-button @click="addGPSModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table :height="tableFixHeight+48" v-if="GPSinstallShowModal" border ref="examineTable" :columns="loanCarGpsDTOColumns" :data="loanCarGpsList"></i-table>
    </bs-modal>
    <!--GPS安装信息新增和修改模态框-->
    <bs-modal v-model="GPSShowModal" :title="isAddGPS?'新增':'修改'" :width="520" @on-close="formAddGPS = {}">
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
          <i-button type="primary" @click="addGPSSubmit">提交</i-button>
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
        initFormLoading: false, // 提交按钮loading
        detailsCarDataShowModal: false, // 完善车辆信息modal
        GPSinstallButtonLoading: false, // GPS安装信息modal里的提交按钮loading
        GPSinstallShowModal: false, // GPS安装信息modal
        GPSShowModal: false, // 显示GPS安装信息新增弹窗modal
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
      // GPS安装弹窗-打开新增弹窗
      addGPSModal() {
        this.$data.isAddGPS = true;
        this.$data.GPSShowModal = true;
        this.$data.formAddGPS = {};
      },
      // GPS安装弹窗-新增修改弹窗-提交按钮
      addGPSSubmit() {
        let text = this.$data.isAddGPS ? '新增' : '修改';
        let ind = this.$data.clickRow._index || 0; // 车辆列表的索引index
        this.$refs['formAddGPS'].validate(async (valid) => {
          if (valid) {
            if (this.$data.isAddGPS) {
              // 插入新数据unshift
              if (!this.$data.carData[ind].loanCarGpsList) {
                this.$data.carData[ind].loanCarGpsList = [];
              }
              let gpsList = this.$data.carData[ind].loanCarGpsList;
              gpsList.unshift(this.$data.formAddGPS);
              this.$set(this.$data.carData[ind], 'loanCarGpsList', gpsList);
            } else {
              let index = this.$data.formAddGPS._index; // GPS列表的索引index
              const gpsSetArray = [
                'gpsModel',
                'imei',
                'gpsJoinMerchant',
                'gpsInstallStatus',
                'makeDate',
                'makeUser',
                'id|1-100',
                'loanCarNo',
                'loanNo'
              ];
              gpsSetArray.forEach((item) => {
                this.$set(this.$data.carData[ind].loanCarGpsList[index], '' + item, this.$data.formAddGPS['' + item]);
              });
            }
            this.$Message.success(text + 'GPS安装信息成功');
            this.$data.GPSShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
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
        // 车辆信息中须配置好“GPS安装落实”
        for (let item of this.$data.carData) {
          if (item.loanCarGpsList && item.loanCarGpsList.length === 0) {
            this.$Message.error({
              content: '车辆信息中须配置好“GPS安装落实”！',
              duration: 2
            });
            return;
          }
        }
        this.$AuditPrompt.auditPromptFun(this.$data.formData.approveStatus, async () => {
          this.$data.initFormLoading = true;
          let rep = await this.$http.post('/biz/payment/paymentGpsInstall', {
            paymentNo: this.$route.query.paymentNo,
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
              path: '/index/operate/loan/GPS',
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
              'mortgageName',
              'mortgageUrl',
              'remark'
            ];
            formField.forEach((item) => {
              this.$set(this.$data.carData[ind], '' + item, this.$data.formalities['' + item]);
            });
            this.$Message.success('提交成功');
            this.$data.formalitiesShowModal = false;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
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
