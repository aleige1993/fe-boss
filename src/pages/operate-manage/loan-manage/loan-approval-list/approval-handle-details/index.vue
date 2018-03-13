<template>
<!--放款条件-办理详情-->
  <div id="condition-loan-handle-details">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate">运营管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/operate/approval">放款审批列表</i-breadcrumb-item>
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
                  <span :class="{loanAmtStyle: showLoanAmtStyle}" v-text="formData.paymentRecordDTO.loanAmt"></span>
                  <span v-if="formData.paymentRecordDTO.loanAmt!==''">元</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="放款类型">
                  <i-select placeholder="请选择" value="1" @on-change="paymentTypeChange">
                    <i-option value="1">一次放款</i-option>
                    <i-option value="2">二次放款</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8" v-if="showPaymentSecondAmt">
                <i-form-item label="二次放款金额" class="required">
                  <i-input v-model="formData.paymentRecordDTO.paymentSecondAmt" placeholder="" @on-change="paymentSecondAmtChange"  @on-blur="paymentSecondAmtBlur">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="资金方利率">
                  <span v-text="formData.paymentRecordDTO.capitalRate"></span>
                </i-form-item>
              </i-col>
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
                  v-if="formData.approveStatus === 'R'" :rules="{required: true, message: '拒绝原因不能为空', trigger: 'change'}"
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
    <bs-modal v-model="formalitiesShowModal" title="抵押详情" :width="520">
      <i-form v-if="formalitiesShowModal" ref="formalities" :model="formalities" label-position="right" :label-width="80" class="input-label-color">
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
          <Tooltip content="点击浏览/下载" placement="top">
            <a :href="formalities.mortgageUrl" target="_blank">{{formalities.mortgageName}}</a>
          </Tooltip>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--GPS安装信息-->
    <bs-modal v-model="GPSinstallShowModal" title="GPS安装信息详情" :width="1200">
      <i-table v-if="GPSinstallShowModal" border ref="examineTable" :columns="loanCarGpsDTOColumns" :data="loanCarGpsList"></i-table>
    </bs-modal>
    <!--车辆信息弹窗-->
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
              prop="carModel">
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
        <!--<i-form-item class="text-right">
          <i-button type="primary" @click="setCarDataSubmit">提交</i-button>
        </i-form-item>-->
      </i-form>
    </bs-modal>
    <!--担保落实modal-->
    <bs-modal v-model="guaranteeShowModal" title="担保落实详情" :width="520">
      <i-form v-if="guaranteeShowModal" ref="formagGuarantee" :model="formagGuarantee" label-position="right" :label-width="80" class="input-label-color">
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
            <a :href="formagGuarantee.makeUrl" target="_blank">{{formagGuarantee.makeName}}</a>
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
        detailsCarDataShowModal: false, // GPS安装信息modal
        addGPSButtonLoading: false, // 显示GPS安装信息新增弹窗modal提交按钮的loading
        guaranteeShowModal: false, // 担保落实modal
        // 费用收取落实
        feeTableLoading: false,
        defaultLoanAmt: 0, // 页面初次加载的 放款金额
        showPaymentSecondAmt: false, // 显示"二次放款金额"输入框
        showLoanAmtStyle: false, // 改变放款金额时，改变金额字体颜色
        formData: {
          'approveStatus': '',
          'rejectCause': '',
          'opinion': '',
          'paymentRecordDTO': {
            'shareAmt': '',
            'scRate': '',
            'capitalRate': '',
            'loanAmt': '',
            'paymentType': '',
            'paymentSecondAmt': '',
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
          'mortgageName': '',
          'mortgageUrl': '',
          'makeDate': '',
          'makeUser': '',
          'warrantNo': '',
          'registerCompany': '',
          'mortgageStatus': '',
          'remark': ''
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
          billCorpName: ''
        },
        formagGuarantee: {
          'uploadFileName': '',
          'lsStatus': ''
        }
      };
    },
    async mounted() {
      await this.getFindPaymentApplyRecordInfo(); // 获取放款条件详情
      this.carGetlist(); // 执行获取车辆信息列表的data
      this.assureGtelist(); // 执行获取担保信息列表的data
      this.conditionGetlist(); // 执行获取放款条件列表的data
      this.feeGetlist(); // 执行获取费用收取落实列表的data
      let formPaymentType = this.$data.formData.paymentRecordDTO.paymentType;
      let formPaymentSecondAmt = this.$data.formData.paymentRecordDTO.paymentSecondAmt;
      // 默认为“一次放款金额”
      if (typeof formPaymentType === 'undefined' || formPaymentType === '') {
        this.$data.formData.paymentRecordDTO.paymentType = '1';
      }
      // 当为“一次放款金额”时“二次放款金额”为空字符
      if (typeof formPaymentSecondAmt === 'undefined' || this.$data.formData.paymentRecordDTO.paymentType === '1') {
        this.$data.formData.paymentRecordDTO.paymentSecondAmt = '';
      }
    },
    methods: {
      async changeShowLoanAmtStyle() {
        this.$data.showLoanAmtStyle = true;
        await bsWait(200);
        this.$data.showLoanAmtStyle = false;
      },
      // 离开"二次放款金额"输入框时
      paymentSecondAmtBlur(event) {
        let newVal = event.target.value;
        if (isNaN(newVal)) {
          this.$Message.warning('“二次放款金额”必须是金额格式！');
          $(event.target).focus();
        } else if (newVal >= this.$data.defaultLoanAmt) {
          this.$Message.warning('“二次放款金额”不能大于等于“一次放款金额”!');
          $(event.target).focus();
        } else if (newVal <= 0) {
          this.$Message.warning('“二次放款金额”不能小于等于0!');
          $(event.target).focus();
        } else {
          this.$set(this.$data.formData.paymentRecordDTO, 'loanAmt', (this.$data.defaultLoanAmt - newVal));
        }
      },
      // 输入"二次放款金额"时，放款金额 = 默认放款金额- 二次放款金额
      paymentSecondAmtChange(event) {
        let _val = event.target.value;
        if (isNaN(_val)) {
          this.$Message.warning('输入的必须是金额格式！');
        } else if (_val >= this.$data.defaultLoanAmt) {
          this.$Message.warning('“二次放款金额”不能大于等于“一次放款金额”!');
        } else {
          this.$set(this.$data.formData.paymentRecordDTO, 'loanAmt', (this.$data.defaultLoanAmt - _val));
          this.changeShowLoanAmtStyle();
        }
      },
      // 放款类型变更
      paymentTypeChange(val) {
        if (val === '1') {
          this.$data.showPaymentSecondAmt = false;
          this.$data.formData.paymentRecordDTO.paymentType = '1';
          this.$data.formData.paymentRecordDTO.paymentSecondAmt = '';
        }
        if (val === '2') {
          this.$data.showPaymentSecondAmt = true;
          this.$data.formData.paymentRecordDTO.paymentType = '2';
        }
      },
      // 获取放款条件详情
      async getFindPaymentApplyRecordInfo() {
        let reps = await this.$http.post('/biz/payment/findPaymentApplyRecordInfo', {
          paymentNo: this.$route.query.paymentNo,
          isFktjxq: '0' // 当为放款条件落实则传1，其余全部传0
        });
        if (reps.success) {
          this.$data.formData = reps.body;
          this.$data.defaultLoanAmt = reps.body.paymentRecordDTO.loanAmt;
        } else {
          this.$data.formData = {};
          this.$data.defaultLoanAmt = 0;
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
          if (reps.body.length !== 0) {
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
        let formPaymentType = this.$data.formData.paymentRecordDTO.paymentType;
        let formPaymentSecondAmt = this.$data.formData.paymentRecordDTO.paymentSecondAmt;
        if (this.$data.formData.approveStatus === 'A') {
          // 验证二次金额的必填性
          if ((formPaymentType === '2') && (formPaymentSecondAmt === '')) {
            this.$Message.error('请输入“放款信息”中“二次放款金额”！');
            return;
          }
          // “二次放款金额”必须是金额格式！
          if (isNaN(formPaymentSecondAmt)) {
            this.$Message.error('“二次放款金额”必须是金额格式！');
            return;
          }
          // "二次放款金额"不能大于等于“一次放款金额”
          if (formPaymentSecondAmt >= this.$data.defaultLoanAmt) {
            this.$Message.error('“二次放款金额”不能大于等于“一次放款金额”！');
            return;
          }
          // “二次放款金额”不能小于等于0!
          if (formPaymentSecondAmt <= 0) {
            this.$Message.error('“二次放款金额”不能小于等于0！');
            return;
          }
        }
        // ajax
        this.$AuditPrompt.auditPromptFun(this.$data.formData.approveStatus, async () => {
          let rep = await this.$http.post('/biz/payment/paymentApprove', {
            paymentNo: this.$route.query.paymentNo,
            loanApproveParam: {
              approveStatus: this.$data.formData.approveStatus,
              rejectCause: this.$data.formData.rejectCause,
              opinion: this.$data.formData.opinion
            },
            paymentType: formPaymentType,
            paymentSecondAmt: formPaymentSecondAmt,
            loanAmt: this.$data.formData.paymentRecordDTO.loanAmt
          });
          if (rep.success) {
            this.$Message.success('提交成功');
            this.$router.push({
              path: '/index/operate/loan/approval',
              query: {
                currentPage: this.$route.query.currentPage
              }
            });
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
          title: '错误提示', desc: err
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
          title: '错误提示', desc: err
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
    & .loanAmtStyle {
      color: red;
    }
  }
</style>
