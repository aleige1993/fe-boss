<template>
  <!--个人业务合同制作-合同信息-->
<div id="tab-contract-info">
  <i-form inline label-position="right" :label-width="100" style="padding-top: 20px">
    <i-row>
      <i-col span="8">
        <i-form-item label="项目编号">
          <span v-text="contractInfoForm.loanNo"></span>
        </i-form-item>
      </i-col>
      <i-col span="8">
        <i-form-item label="签约编号">
          <span v-text="contractInfoForm.signNo"></span>
        </i-form-item>
      </i-col>
      <i-col span="8">
        <i-form-item label="经销商">
          <span v-text="contractInfoForm.merchantName"></span>
        </i-form-item>
      </i-col>
    </i-row>
    <!--客户信息-->
    <bs-form-block :title="'客户信息'">
      <i-row>
        <i-col span="8">
          <i-form-item label="姓名">
            <span v-text="contractInfoForm.custName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="证件类型">
            <span v-text="enumCode2Name(contractInfoForm.certType, 'CertTypeEnum')"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="证件号码">
            <span v-text="contractInfoForm.certNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="联系电话">
            <span v-text="contractInfoForm.tel"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="联系地址">
            <span v-text="contractInfoForm.addr"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </bs-form-block>
  </i-form>
  <!--车辆信息-->
  <bs-form-block :title="'车辆信息'">
    <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
      <i-table border :loading="carListLoading" ref="proTable" :columns="carColumns" :data="carData"></i-table>
    </div>
  </bs-form-block>
  <!--担保信息-->
  <bs-form-block :title="'担保信息'">
    <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
      <i-table border :loading="guaPersonListLoading" ref="proTable" :columns="guaPersonColumns" :data="guaPersonData"></i-table>
    </div>
  </bs-form-block>
  <!--借款信息-->
  <bs-form-block :title="'借款信息'">
    <i-form inline label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="车价总额">
            <span v-if="approveCredit.carTotalAmt">{{approveCredit.carTotalAmt || ''}} 元</span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="贷款总额">
            <span v-if="approveCredit.approveLimitAmt">{{approveCredit.approveLimitAmt || ''}} 元</span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="车辆用途">
            <span v-text="enumCode2Name(approveCredit.carUse, 'CarUseTypeEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="产品名称">
            <span v-text="approveCredit.productName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="期数">
            <span v-if="approveCredit.loanPeriods">{{approveCredit.loanPeriods || ''}} 月</span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="借款用途">
            <span v-text="approveCredit.loanApplyUse"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="利率模式">
            <span v-text="enumCode2Name(approveCredit.interestType, 'InterestTypeEnum')"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="颂车利率">
            <span v-if="approveCredit.loanRealRate">{{approveCredit.loanRealRate || ''}} %/年</span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="还款方式">
            <span v-text="enumCode2Name(approveCredit.repaymentMode, 'RepaymentTypeEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="车辆保险费">
            <span v-text="enumCode2Name(approveCredit.carInsurance, 'CarInsuranceEnum')"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="盗抢险">
            <span v-text="enumCode2Name(approveCredit.dqxInsurance, 'DqxInsuranceEnum')"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="运营模式">
            <span v-text="enumCode2Name(approveCredit.operatingMode, 'OperatingModeEnum')"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--费用收取方案-->
  <bs-form-block :title="'费用收取方案'">
    <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
      <i-table border :loading="feeTakeLoading" ref="proTable" :columns="feeTakeColumns" :data="feeTakeData"></i-table>
    </div>
  </bs-form-block>
  <!--放款账户信息-->
  <bs-form-block :title="'放款账户信息'">
    <i-form inline label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="账户名">
            <span v-text="contractInfoForm.loanAccount.loanAcctName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="账号">
            <span v-text="contractInfoForm.loanAccount.loanAcctNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="开户银行">
            <span v-text="contractInfoForm.loanAccount.loanOpenBankName"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--还款账户信息-->
  <bs-form-block :title="'还款账户信息'">
    <i-form inline label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="账户名">
            <span v-text="contractInfoForm.repayAccount.repayAcctName"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="账号">
            <span v-text="contractInfoForm.repayAccount.repayAcctNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="开户银行">
            <span v-text="contractInfoForm.repayAccount.repayOpenBankName"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--合同信息-->
  <bs-form-block :title="'合同信息'">
    <i-form inline ref="contractInfoForm" :model="contractInfoForm" :label-width="100" label-position="right">
      <i-row>
        <i-col span="8">
          <i-form-item
            style="width: 100%"
            :rules="{required: true, message: '请选择合同开始日期', trigger: 'change'}"
            prop="contractInfo.startDate"
            label="合同开始日期">
            <Tooltip placement="right" style="width: 100%;">
              <bs-datepicker :isNowStart="true" v-model="contractInfoForm.contractInfo.startDate" @on-change="changeData"></bs-datepicker>
              <span slot="content" style="white-space: normal;">
                选择合同开始时间，即刷新“还款计划表”和“租金计划表”
              </span>
            </Tooltip>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item
            prop="contractInfo.endDate"
            label="合同结束日期">
            <span v-text="endDate"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <div class="form-top-actions" style="padding-top:0;">
      <i-button @click="contractGenerating" type="info" :loading="contractGeneratingLoading">
      <span v-if="!contractGeneratingLoading"><i class="iconfont icon-xinzeng"></i> 生成合同</span>
      <span v-else>loading...</span>
      </i-button>
      <!-- showDownloadContractAll -->
      <i-button v-if="true" @click="downloadContractAll" type="success" :loading="downloadContractAllLoading">
        <span style="color: #fff; text-underline: none;" v-if="!downloadContractAllLoading"><Icon type="ios-download-outline"></Icon> 下载全部合同</span>
        <span v-else>loading...</span>
      </i-button>
    </div>
    <i-table border :loading="contractInfoListLoading" ref="contractInfoTable" :columns="contractInfoColumns" :data="contractInfoForm.contractInfo.loanContractFileList">
    </i-table>
  </bs-form-block>
  <!--审核意见-->
  <bs-form-block :title="'审核意见'">
    <i-form ref="loanApprove" :model="loanApprove" label-position="right" :label-width="100">
      <i-row>
        <i-col span="8">
          <i-form-item label="结论" prop="approveStatus" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
            <i-radio-group @on-change="approveStatusRadio" v-model="loanApprove.approveStatus">
              <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item
            v-if="loanApprove.approveStatus === 'R'"
            :rules="{required: true, message: '拒绝原因不能为空', trigger: 'change'}"
            label="拒绝原因"
            prop="rejectCause">
            <i-select v-model="loanApprove.rejectCause">
              <i-option v-for="item in enumSelectData.get('BizApproveRejectEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="意见信息"
                       prop="opinion"
                       :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
            <i-input type="textarea" v-model="loanApprove.opinion" :rows="2" placeholder=""></i-input>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--完善车辆信息弹窗-->
  <bs-modal v-model="setCarDataShowModal" title="完善车辆信息" :width="1200">
    <i-form v-if="setCarDataShowModal" ref="setCarDataForm" :model="setCarDataForm" label-position="right" :label-width="120">
      <i-row>
        <i-col span="8">
          <i-form-item
            label="担保类型"
            :rules="{required: true, message: '担保类型不能为空'}"
            prop="guaranteeType">
            <i-select v-model="setCarDataForm.guaranteeType">
              <i-option v-for="item in enumSelectData.get('PawnTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item
            label="权利人类型"
            :rules="{required: true, message: '权利人类型不能为空'}"
            prop="custType">
            <i-select v-model="setCarDataForm.custType">
              <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--权利人-->
        <i-col span="8" v-if="setCarDataForm.custType=='1' || setCarDataForm.custType=='2'">
          <i-form-item
            label="权利人"
            :rules="{required: true, message: '请选择权利人'}"
            prop="carOwnerNo">
            <input type="hidden" v-model="setCarDataForm.carOwnerNo"/>
            <i-input v-if="setCarDataForm.custType=='1'" v-model="setCarDataForm.carOwnerName" :readonly="true" placeholder="选择权利人">
              <i-button @click="showSelectObligee=!showSelectObligee" slot="append">选择权利人 <Icon type="ios-more"></Icon></i-button>
            </i-input>
            <i-input v-if="setCarDataForm.custType=='2'" v-model="setCarDataForm.carOwnerName" :readonly="true" placeholder="选择企业权利人">
              <i-button @click="showSelectCompanyOwner=!showSelectCompanyOwner" slot="append">选择企业权利人 <Icon type="ios-more"></Icon></i-button>
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="车牌号" prop="carPlateNo">
            <i-input v-model="setCarDataForm.carPlateNo" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="是否临时车牌" prop="isTmpPlate">
            <i-select v-model="setCarDataForm.isTmpPlate">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--车辆品牌-->
        <i-col span="24">
          <i-form-item
            label="车辆品牌"
            prop="carModel"
            :rules="{required: true, message: '车辆品牌不能为空'}">
            <input type="hidden" v-model="setCarDataForm.carModel">
            <bs-carpicker :currBrand="setCarDataForm.carBrandName"
                          :currSeries="setCarDataForm.carTypeName"
                          :currModel="setCarDataForm.carModelName"
                          @on-change="selectLoanCar">
            </bs-carpicker>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--车辆颜色-->
        <i-col span="8">
          <i-form-item label="车辆颜色" prop="carColor">
            <i-select v-model="setCarDataForm.carColor">
              <i-option v-for="item in enumSelectData.get('CarColorEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--排量-->
        <i-col span="8">
          <i-form-item label="排量" prop="carOutputVolume">
            <i-input v-model="setCarDataForm.carOutputVolume" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--排放标准-->
        <i-col span="8">
          <i-form-item label="排放标准" prop="carOutputStand">
            <i-input v-model="setCarDataForm.carOutputStand" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--生产厂商-->
        <i-col span="8">
          <i-form-item label="生产厂商" prop="carVendor">
            <i-input v-model="setCarDataForm.carVendor" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--发动机号-->
        <i-col span="8">
          <i-form-item label="发动机号" prop="carEngineNo">
            <i-input v-model="setCarDataForm.carEngineNo" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--车架号-->
        <i-col span="8">
          <i-form-item label="车架号" prop="carFrameNo">
            <i-input v-model="setCarDataForm.carFrameNo" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--出厂日期-->
        <i-col span="8">
          <i-form-item label="出厂日期" prop="carBirthday">
            <bs-datepicker v-model="setCarDataForm.carBirthday" placeholder="出厂日期"></bs-datepicker>
          </i-form-item>
        </i-col>
        <!--上牌城市-->
        <i-col span="8">
          <i-form-item label="上牌城市" prop="carOnCity">
            <i-input v-model="setCarDataForm.carOnCity" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--上牌时间-->
        <i-col span="8">
          <i-form-item label="上牌时间" prop="carOnDate">
            <bs-datepicker v-model="setCarDataForm.carOnDate" placeholder="申请时间"></bs-datepicker>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--过户次数-->
        <i-col span="8">
          <i-form-item label="过户次数" prop="carTransferCount">
            <i-input v-model="setCarDataForm.carTransferCount" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--抵押次数-->
        <i-col span="8">
          <i-form-item label="抵押次数" prop="carGuaCount">
            <i-input v-model="setCarDataForm.carGuaCount" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--行驶里程-->
        <i-col span="8">
          <i-form-item label="行驶里程" prop="carMileage">
            <i-input v-model="setCarDataForm.carMileage" placeholder="">
              <span slot="append">KM</span>
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--合格证号-->
        <i-col span="8">
          <i-form-item label="合格证号" prop="carCertNo">
            <i-input v-model="setCarDataForm.carCertNo" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--车辆状况-->
        <i-col span="8">
          <i-form-item
            label="车辆状况"
            prop="carStatus">
            <i-select v-model="setCarDataForm.carStatus">
              <i-option v-for="item in enumSelectData.get('CarConditionEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--有无事故-->
        <i-col span="8">
          <i-form-item label="有无事故" prop="carIsFault">
            <i-select v-model="setCarDataForm.carIsFault">
              <i-option v-for="item in enumSelectData.get('HaveNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--机动车登记证书号-->
        <i-col span="8">
          <i-form-item label="机动车登记证书号" prop="carRegNo">
            <i-input v-model="setCarDataForm.carRegNo" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--是否挂靠-->
        <i-col span="8">
          <i-form-item label="是否挂靠" prop="carIsAnchored">
            <i-select v-model="setCarDataForm.carIsAnchored">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--发票开具单位-->
        <i-col span="8">
          <i-form-item label="发票开具单位" prop="billCorpName">
            <i-input v-model="setCarDataForm.billCorpName" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--发票号-->
        <i-col span="8">
          <i-form-item label="发票编号" prop="billNo">
            <i-input v-model="setCarDataForm.billNo" placeholder="">
            </i-input>
          </i-form-item>
        </i-col>
        <!--发票价格-->
        <i-col span="8">
          <i-form-item label="发票价格" prop="billAmt">
            <i-input v-model="setCarDataForm.billAmt" placeholder=""></i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <!--厂商指导价-->
        <i-col span="8">
          <i-form-item label="厂商指导价" prop="carGuidePrice">
            <i-input v-model="setCarDataForm.carGuidePrice" placeholder="">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--车辆购买价格-->
        <i-col span="8">
          <i-form-item label="车辆购买价格" prop="carBuyPrice">
            <i-input v-model="setCarDataForm.carBuyPrice" placeholder="">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--车辆价值-->
        <i-col span="8">
          <i-form-item label="车辆价值" prop="carEvaluatePrice">
            <i-input v-model="setCarDataForm.carEvaluatePrice" placeholder="">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-form-item class="text-right">
        <i-button type="primary" @click="setCarDataSubmit">提交</i-button>
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
  import dateMonth from '@/utils/getMonthPeriods.js';
  import TableCustomerList from '@/components/table-customer-list'; // 选择权利人的模态框
  import TableCompanyCustomerList from '@/components/table-company-customer-list'; // 选择企业权利人的模态框
  import BsCarpicker from '@/components/bs-carpicker';
  import Data from './json';
  export default {
    name: 'tabContractInfo',
    mixins: [MixinData],
    components: {
      BsModal,
      'bs-carpicker': BsCarpicker,
      TableCustomerList,
      TableCompanyCustomerList
    },
    data() {
      return {
        clickRowIndex: 0, // 点击车辆信息列表后的当前行索引
        showSelectObligee: false, // 选择车辆权利人
        showDownloadContractAll: false, // 显示“下载全部合同”按钮
        downloadContractAllLoading: false, // “下载全部合同”按钮的loading
        showSelectCompanyOwner: false, // 选择车辆企业权利人
        carListLoading: false, // 车辆表loading
        setCarDataShowModal: false, // 车辆表loading
        guaPersonListLoading: false, // 担保信息表loading
        feeTakeLoading: false, // 费用收取表loading
        contractGeneratingLoading: false, // 费用收取表loading
        contractInfoListLoading: false, // 合同信息表loading
        // 借款信息
        approveCredit: {},
        // 合同信息
        contractInfoForm: {
          'certNo': '',
          'certType': '',
          'custNo': '',
          'loanNo': '',
          'signNo': '',
          'merchantNo': '',
          'custName': '',
          'tel': '',
          'addr': '',
          'merchantName': '',
          'contractInfo': {
            'endDate': '',
            'startDate': '',
            // 合同附件集合
            'loanContractFileList': [
              {
                'contractNo': '',
                'makeContractUrl': '',
                'contractName': '',
                'makeSystem': '',
                'signMode': ''
              }
            ]
          },
         // 租金还款计划集合
          'repayPlanRentalList': [
            {
              'repayTotalAmt': '',
              'repayRate': '',
              'nowPeriods': '',
              'repayDate': '',
              'repayAmt': ''
            }
          ],
          // 资金方还款计划集合
          'repayPlanCapitalList': [
            {
              'repayTotalAmt': '',
              'repayRate': '',
              'nowPeriods': '',
              'repayDate': '',
              'repayAmt': ''
            }
          ],
          // 放款账户信息
          'loanAccount': {
            'loanAcctNo': '',
            'loanAcctName': '',
            'loanOpenBankName': ''
          },
          // 还款账户信息
          'repayAccount': {
            'repayAcctNo': '',
            'repayAcctName': '',
            'repayOpenBankName': ''
          },
          // 审批参数信息
          'loanApprove': {
            'approveStatus': '',
            'rejectCause': '',
            'opinion': ''
          }
        },
        loanApprove: {
          'approveStatus': '',
          'rejectCause': '',
          'opinion': ''
        },
        // 完善车辆信息
        setCarDataForm: {
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
        }
      };
    },
    computed: {
      endDate() {
        if (
          (this.$data.contractInfoForm.contractInfo.startDate !== '') &&
          (typeof this.$data.contractInfoForm.contractInfo.startDate !== 'undefined') &&
          (this.$data.contractInfoForm.contractInfo.startDate !== null)
        ) {
          let startDate = this.$data.contractInfoForm.contractInfo.startDate;
          let loanPeriods = this.$data.approveCredit.loanPeriods;
          let getMonth = dateMonth.getMonthPeriods(new Date(startDate), loanPeriods);
          this.$data.contractInfoForm.contractInfo.endDate = getMonth;
          return getMonth;
        } else {
          this.$data.contractInfoForm.contractInfo.endDate = '';
          return '';
        }
      }
    },
    watch: {
      'setCarDataForm.custType'(newVal, oldVal) {
        if ((oldVal !== '') && (typeof oldVal !== 'undefined')) {
          this.$data.setCarDataForm.carOwnerName = '';
          this.$data.setCarDataForm.carOwnerNo = '';
        }
      }
    },
    async mounted() {
      let loanNo = await this.$route.query.loanNo;
      let signNo = await this.$route.query.signNo;
      this.$data.contractInfoForm.loanNo = loanNo;
      this.$data.contractInfoForm.signNo = signNo;
      await this.getfindContractApproveInfo(); //  获取合同信息详情
      this.getApproveCredit(); //  获取借款信息详情
      this.getCarList(); // 获取车辆信息列表data
      this.getGuaPersonList(); // 获取担保信息列表data
      this.getFeeTakeList(); // 查询费用收取方案列表data
      if ((this.$data.contractInfoForm.contractInfo.startDate === '') || (this.$data.contractInfoForm.contractInfo.startDate === null)) {
        let nowDate = new Date();
        let nowDateStart = dateMonth.getMonthPeriods(new Date(nowDate), 0);
        this.$data.contractInfoForm.contractInfo.startDate = nowDateStart;
      }
      // 如合同信息表里有数据，即已生成合同的情况下（已生成了合同）
      if (this.$data.contractInfoForm.contractInfo.loanContractFileList.length > 0) {
        // 告知父组件的 已经点击了“生成按钮”，此时已经生成了合同
        this.$emit('on-create-contracted');
        this.$data.showDownloadContractAll = true;
      } else {
        this.$data.showDownloadContractAll = false;
      }
      // 生成还款计划表 和 租金计划表
      this.$emit('on-create-repay-plan', this.$data.contractInfoForm.contractInfo.startDate);
    },
    methods: {
      // 合同开始时间变更的回调
      changeData(val) {
        this.$emit('on-create-repay-plan', val);
      },
      // 完善车辆信息弹窗的提交按钮 /biz/sign/update/loanCar
      setCarDataSubmit() {
        let ind = this.$data.clickRowIndex; // 车辆列表的索引index
        this.$refs['setCarDataForm'].validate(async (valid) => {
          if (valid) {
            let reps = await this.$http.post('/biz/sign/update/loanCar', {
              ...this.$data.setCarDataForm
            });
            if (reps.success) {
              this.$data.setCarDataShowModal = false;
              this.$set(this.$data.carData, ind, this.$data.setCarDataForm);
              this.$Message.success('车辆信息提交成功');
            }
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
            this.$data.setCarDataShowModal = true;
          }
        });
      },
      /**
       *  车辆品牌
       * @param car
       */
      selectLoanCar(car) {
        this.$data.setCarDataForm.carBrandCode = car.brandNo;
        this.$data.setCarDataForm.carBrandName = car.brandName;
        this.$data.setCarDataForm.carTypeCode = car.seriesNo;
        this.$data.setCarDataForm.carTypeName = car.seriesName;
        this.$data.setCarDataForm.carModel = car.modelNo;
        this.$data.setCarDataForm.carModelName = car.modelName;
      },
      /**
       *  选择权利人
       * @param row
       * @param index
       */
      selectObligeeRow(row, index) {
        // console.log(row);
        this.$data.setCarDataForm.carOwnerName = row.name;
        this.$data.setCarDataForm.carOwnerNo = row.memberNo;
        this.$data.showSelectObligee = false;
      },
      /**
       *  选择企业权利人
       * @param row
       * @param index
       */
      selectCompanyOwnerRow(row, index) {
        this.$data.setCarDataForm.carOwnerName = row.corpName;
        this.$data.setCarDataForm.carOwnerNo = row.corpNo;
        this.$data.showSelectCompanyOwner = false;
      },
      // 通知父组件返回 结论
      approveStatusRadio(val) {
        this.$emit('on-radio-approveStatus', val); // 告知父组件结论的状态
      },
      // 获取合同信息详情
      async getfindContractApproveInfo() {
        let resp = await this.$http.post('/biz/sign/contract/findContractApproveInfo', {
          signNo: this.$data.contractInfoForm.signNo
        });
        if (resp.success) {
          (resp.body.contractInfo === null) && (resp.body.contractInfo = {});
          (resp.body.loanAccount === null) && (resp.body.loanAccount = {});
          (resp.body.repayAccount === null) && (resp.body.repayAccount = {});
          this.$data.contractInfoForm = resp.body;
          if (resp.body.contractInfo.loanContractFileList && (resp.body.contractInfo.loanContractFileList.length !== 0)) {
            this.$data.contractInfoForm.contractInfo.loanContractFileList = resp.body.contractInfo.loanContractFileList;
          } else {
            this.$data.contractInfoForm.contractInfo.loanContractFileList = [];
          }
        }
      },
      //  获取借款信息详情
      async getApproveCredit() {
        let resp = await this.$http.post('biz/getApproveCredit', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        if (resp.success) {
          this.$data.approveCredit = resp.body;
        }
      },
      // 查询费用收取方案列表data
      async getFeeTakeList() {
        this.$data.feeTakeLoading = true;
        let resp = await this.$http.post('/biz/listApproveFeePlan', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        this.$data.feeTakeLoading = false;
        if (resp.success) {
          this.$data.feeTakeData = resp.body;
        } else {
          this.$data.feeTakeData = [];
        }
      },
      // 获取车辆信息列表data
      async getCarList() {
        this.$data.carListLoading = true;
        let resp = await this.$http.post('/biz/listLoanCarByLoanNo', {
          currentPage: 1,
          pageSize: 9999,
          loanNo: this.$data.contractInfoForm.loanNo
        });
        this.$data.carListLoading = false;
        if (resp.success) {
          this.$data.carData = resp.body.resultList;
        } else {
          this.$data.carData = [];
        }
      },
      // 获取担保信息列表data
      async getGuaPersonList() {
        this.$data.guaPersonListLoading = true;
        let resp = await this.$http.post('/biz/listGuaranteeByLoanNo', {
          loanNo: this.$data.contractInfoForm.loanNo
        });
        this.$data.guaPersonListLoading = false;
        if (resp.success) {
          this.$data.guaPersonData = resp.body.resultList;
        } else {
          this.$data.guaPersonData = [];
        }
      },
      // 点击“下载全部合同”按钮
      async downloadContractAll() {
        // let submitData = {
        //   loanNo: this.$route.query.loanNo,
        //   contractFileDTOS: this.$data.contractInfoForm.contractInfo.loanContractFileList
        // };
        let submitData = Data;
        let form = $('<form></form>');
        form.attr({
          'style': 'display:none',
          'method': 'post',
          'target': '_blank',
          'enctype': 'application/x-www-form-urlencoded',
          'action': this.$config.HTTPBASEURL + '/biz/sign/downloadAllContract'
        });
        let input1 = $('<input>');// 将你请求的数据模仿成一个input表单
        input1.attr({
          'type': 'hidden',
          'name': 'contractJson', // 该输入框的name
          'value': JSON.stringify(submitData) // 该输入框的值JSON.stringify(submitData)
        });
        $('body').append(form);
        form.append(input1);
        await form.submit();
        form.remove();
        // this.$data.downloadContractAllLoading = true;
        /* let reps = await this.$http.post('/biz/sign/downloadAllContract', {
          loanNo: this.$route.query.loanNo,
          contractFileDTOS: this.$data.contractInfoForm.contractInfo.loanContractFileList
        });*/
        /* let reps = await this.$http.post('/biz/sign/downloadAllContract', submitData);
        this.$data.downloadContractAllLoading = false;
        if (reps.success) {
          // window.open();
          console.log(reps.body);
        } else {
          this.$Message.error(reps.reMsg);
        }*/
      },
      // 生成合同ajax
      async createContractAjax() {
        this.$data.contractGeneratingLoading = true;
        // 告知父组件的 已经点击了“生成按钮”,此时为loading状态，“提交按钮”禁止点击
        this.$emit('on-create-contracted-loading');
        const msg = this.$Message.loading({
          content: '正在生成合同中，请稍等...',
          duration: 0
        });
        let resp = await this.$http.post('/biz/sign/create/contract', {
          signNo: this.$data.contractInfoForm.signNo,
          startDate: this.$data.contractInfoForm.contractInfo.startDate,
          endDate: this.$data.contractInfoForm.contractInfo.endDate
        });
        msg();
        this.$data.contractGeneratingLoading = false;
        if (resp.success) {
          this.$Message.success('生成合同完毕');
          this.$data.contractInfoForm.contractInfo.loanContractFileList = resp.body;
          this.$data.showDownloadContractAll = true;
        } else {
          this.$Message.error('生成合同失败！');
          this.$data.contractInfoForm.contractInfo.loanContractFileList = [];
          this.$data.showDownloadContractAll = false;
        }
      },
      // 生成合同
      contractGenerating() {
        const formName = 'contractInfoForm';
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (!this.$DateTest.testDateFun(this.$data.contractInfoForm.contractInfo.startDate, this.$data.contractInfoForm.contractInfo.endDate)) {
              this.$Message.error('“开始日期”不能大于“结束日期”');
              return;
            }
            this.$data.contractInfoForm.loanApprove = this.$data.loanApprove;
            await this.createContractAjax();
            // 告知父组件的 已经点击了“生成按钮”，此时已经生成了合同
            this.$emit('on-create-contracted');
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 点击提交审核 通过父组件来通知此事件触发
      loanApproveSumbit() {
        let returnRef = null;
        const formName = 'loanApprove';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.contractInfoForm.loanApprove = this.$data.loanApprove;
            returnRef = this.$data.contractInfoForm;
          } else {
            this.$Message.error({
              content: '合同信息中审核意见的“结论”和“意见信息”项不能为空',
              duration: 2
            });
            returnRef = null;
          }
        });
        return returnRef;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
