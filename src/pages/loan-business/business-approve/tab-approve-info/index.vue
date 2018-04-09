<template>
  <div id="tab-loan-approve">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" ref="busApproveForm" :model="approveData" :label-width="140">
          <bs-form-block :title="'初审信息'">
            <i-row>
              <i-col span="24">
                <div class="form-top-actions" v-if="!readonly">
                  <i-button type="primary" @click="firstApproveForm = {}; firstApproveEditIndex = -1; addFirstApproveModal = !addFirstApproveModal">添加初审信息</i-button>
                </div>
                <i-table :columns="firstApproveColumns" :data="approveData.loanApproveFirstDTOS"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'用信方案'">
            <i-row>
              <i-col span="8">
                <i-form-item label="匹配产品" prop="loanApproveCreditDTO.productNo"
                             :rules="{required: true, message: '请选择匹配产品'}">
                  <input type="hidden" :value="approveData.loanApproveCreditDTO.productNo">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.productName">
                    <i-button v-if="(!isApprove)&&(!readonly)" @click="showSelectProduct=!showSelectProduct" slot="append">选择产品</i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="套餐名称" prop="loanApproveCreditDTO.productPackageName"
                             :rules="{required: true, message: '请选择运营模式'}">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.productPackageName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="还款方式" prop="loanApproveCreditDTO.repaymentMode"
                             :rules="{required: true, message: '请选择还款方式'}">
                  <i-select :disabled="isApprove||readonly" v-model="approveData.loanApproveCreditDTO.repaymentMode">
                    <i-option v-for="item in enumSelectData.get('RepaymentTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="颂车产品名义利率" prop="loanApproveCreditDTO.loanNominalRate"
                             :rules="{required: true, message: '请输入颂车产品名义利率'}">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.loanNominalRate">
                    <span slot="append">%</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="颂车+云贷利率" prop="loanApproveCreditDTO.loanProductRate"
                             :rules="{required: true, message: '请输入颂车+云贷利率'}">
                  <i-input :readonly="true" v-model="isNaN(approveData.loanApproveCreditDTO.loanProductRate)?'请输入定收利率':approveData.loanApproveCreditDTO.loanProductRate">
                    <span slot="append">%</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="利率模式" prop="loanApproveCreditDTO.interestType"
                             :rules="{required: true, message: '请选择利率模式'}">
                  <i-select :disabled="isApprove||readonly" v-model="approveData.loanApproveCreditDTO.interestType">
                    <i-option v-for="item in enumSelectData.get('RateModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="贷款期限" prop="loanApproveCreditDTO.loanPeriods"
                             :rules="{required: true, message: '请选择贷款期限'}">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.loanPeriods">
                    <i-button slot="append" @click="selectPeriodsAndRate = !selectPeriodsAndRate">选择利率方案</i-button>
                  </i-input>
                  <!--<i-option v-for="item in loanPeriodsList" :key="item.loanPeriods" :value="item.loanPeriods">{{item.loanPeriods}}</i-option>-->
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="审批额度" prop="loanApproveCreditDTO.approveLimitAmt"
                             :rules="{required: true, message: '请输入审批额度'}">
                  <i-input :readonly="isFromDetail" @on-change="approveAmtChanged" v-model="approveData.loanApproveCreditDTO.approveLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>

              </i-col>
              <i-col span="8">
                <i-form-item label="颂车定收利率" prop="loanApproveCreditDTO.loanRealRate"
                             :rules="{required: true, message: '请输入颂车定收利率'}">
                  <i-input :readonly="isFromDetail" v-model="approveData.loanApproveCreditDTO.loanRealRate" @on-blur="loanRealRateVerification">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="运营模式" prop="loanApproveCreditDTO.operatingMode"
                             :rules="{required: true, message: '请选择运营模式'}">
                  <!--:disabled="isApprove||readonly"-->
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.operatingMode">
                    <i-option v-for="item in enumSelectData.get('OperatingModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="放款方式" prop="loanApproveCreditDTO.loanMode"
                             :rules="{required: true, message: '请输入放款方式'}">
                  <i-select :disabled="true" @on-change="getBankList" v-model="approveData.loanApproveCreditDTO.loanMode">
                    <i-option v-for="item in enumSelectData.get('LoanModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="车辆保险费" prop="loanApproveCreditDTO.carInsurance"
                             :rules="{required: true, message: '请选择车辆保险费'}">
                  <!--<i-input :readonly="true"  v-model="approveData.loanApproveCreditDTO.carInsurance"></i-input>-->
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.carInsurance" placeholder="请选择">
                    <i-option v-for="item in enumSelectData.get('CarInsuranceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="盗抢险" prop="loanApproveCreditDTO.dqxInsurance"
                             :rules="{required: true, message: '请选择盗抢险' }">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.dqxInsurance">
                    <i-option v-for="item in enumSelectData.get('CarInsuranceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item v-if="!isApprove" label="贷款申报用途" prop="loanApproveCreditDTO.loanApplyUse"
                             :rules="{required: true, message: '请输入贷款申报用途'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.loanApplyUse">
                    <i-option v-for="item in enumSelectData.get('LoanApplyUseEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="是否安装GPS" prop="loanApproveCreditDTO.isNeedGps"
                             :rules="{required: true, message: '请选择是否安装GPS'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.isNeedGps">
                    <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="16">
                <i-form-item label="风控措施" prop="loanApproveCreditDTO.riskControlContent"
                             :rules="{required: true, message: '请输入风控措施'}">
                  <i-input :readonly="readonly" type="textarea" :rows="4" v-model="approveData.loanApproveCreditDTO.riskControlContent"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--资金方信息-->
          <bs-form-block :title="'资金方信息'">
            <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
              <i-table :columns="loanFundPartyCol" :data="approveData.loanCapitalDTOS"></i-table>
            </div>
          </bs-form-block>
          <bs-form-block :title="'费用收取方案'">
            <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
              <i-table ref="feeMethodsTable" :columns="feeMethodCol" :data="approveData.loanApproveFeePlanDTOS"></i-table>
            </div>
            <i-row v-if="approveData.loanApproveFeePlanDTOS.length>0" style="margin-top: 10px;">
              <i-col span="24">
                <i-form-item label="可融资金额" prop="loanApproveCreditDTO.carSaleAmt">
                  <i-input style="width: 120px" :readonly="true" v-model="approveData.loanApproveCreditDTO.carSaleAmt"></i-input>
                  <i-poptip trigger="hover" title="计算方法" content='由选中行的"应收金额"之间的加减运算(当前行的"计算方式")得出'>
                    <i-button type="primary" @click="countFinanceAmount" :loading="countFinanceLoading" size="large">
                      <span v-if="countFinanceLoading">正在计算...</span>
                      <span v-else>计算可融资金额</span>
                    </i-button>
                  </i-poptip>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--放款账户信息-->
          <bs-form-block :title="'放款账户信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="账户名" prop="loanPaymentAccountDTOS.acctName"
                             :rules="{required: true, message: '请选择账户名'}">
                  <i-input :readonly="true" v-model="approveData.loanPaymentAccountDTOS.acctName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item v-if="readonly" label="账号">
                  <i-input type="text" :readonly="true" v-model="approveData.loanPaymentAccountDTOS.acctNo"></i-input>
                </i-form-item>
                <i-form-item v-else label="账号" prop="loanPaymentAccountDTOS.acctNo"
                             :rules="{required: true, message: '请选择放款账户账号'}">
                  <i-select :disabled="readonly" :value="approveData.loanPaymentAccountDTOS.acctNo" @on-change="paymentAccountChange" :label-in-value="true">
                    <i-option v-for="item in paymentAccountList" :key="item.acctNo" :value="item.acctNo">{{item.acctNo}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开户行">
                  <i-input :readonly="true" v-model="approveData.loanPaymentAccountDTOS.openBankName"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--还款账户信息-->
          <bs-form-block :title="'还款账户信息'">`
            <i-row>
              <i-col span="8">
                <i-form-item label="账户名" prop="loanRePaymentAccountDTOS.acctName"
                             :rules="{required: true, message: '请选择账户名'}">
                  <i-input :readonly="true" :value="approveData.loanRePaymentAccountDTOS.acctName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item v-if="readonly" label="账号">
                  <i-input type="text" :readonly="true" v-model="approveData.loanRePaymentAccountDTOS.acctNo"></i-input>
                </i-form-item>
                <i-form-item v-else label="账号" prop="loanRePaymentAccountDTOS.acctNo"
                             :rules="{required: true, message: '请选择还款账户账号'}">
                  <i-select :disabled="readonly" v-model="approveData.loanRePaymentAccountDTOS.acctNo" @on-change="repaymentAccountChange" :label-in-value="true" >
                    <i-option v-for="item in repaymentAccountList" :key="item.acctNo" :value="item.acctNo">{{item.acctNo}}</i-option>
                  </i-select>
                </i-form-item>
                <input type="hidden" v-model="approveData.loanRePaymentAccountDTOS.bankName"/>
              </i-col>
              <i-col span="8">
                <i-form-item label="开户行">
                  <i-input :readonly="true" v-model="approveData.loanRePaymentAccountDTOS.openBankName"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--放款条件-->
          <bs-form-block :title="'放款条件'">
            <div class="form-top-actions" v-if="!readonly">
              <i-button type="primary" @click="conditionForm = {} ; addConditionModal = !addConditionModal">添加放款条件</i-button>
            </div>
            <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
              <i-table :columns="loanPaymentConditionCol" :data="approveData.loanPaymentConditionDTOS"></i-table>
            </div>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" v-if="!isFromDetail">
            <i-row>
              <i-col span="18">
                <i-form-item label="结论" prop="loanApproveDTO.result" :rules="{required: true, message: '请选择你的结论', trigger: 'change'}">
                  <input type="hidden" v-model="approveData.loanApproveDTO.result"/>
                  <i-radio-group @on-change="approveResultChanged" v-model="approveData.loanApproveDTO.result">
                    <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  v-if="approveData.loanApproveDTO.result === 'R'"
                  prop="loanApproveDTO.rejectCause" :rules="{required: true, message: '请选择你的拒绝理由', trigger: 'change'}"
                  label="拒绝原因">
                  <i-select v-model="approveData.loanApproveDTO.rejectCause">
                    <i-option v-for="item in enumSelectData.get('BizApproveRejectEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="意见信息" prop="loanApproveDTO.opinion" :rules="{required: true, message: '意见信息不能为空'}">
                  <i-input type="textarea" v-model="approveData.loanApproveDTO.opinion" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-col>
    </i-row>

    <!--添加初审信息的弹窗-->
    <bs-modal v-model="addFirstApproveModal" :width="520" title="添加/编辑初审信息">
      <i-form :label-width="120" ref="addFirstApproveForm" :model="firstApproveForm">
        <i-form-item label="查询渠道" prop="approveWebsite"
                     :rules="{required: true, message: '请输入查询渠道'}">
          <i-input v-model="firstApproveForm.approveWebsite"></i-input>
        </i-form-item>
        <i-form-item label="查询描述" prop="approveDesc"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="firstApproveForm.approveDesc"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="resultPath">
          <input type="hidden" v-model="firstApproveForm.resultPath"/>
          <i-upload :show-upload-list="false"
                    :max-size="uploadMaxSize"
                    :on-exceeded-size="handleMaxSize"
                    :on-progress="uploadFirstApproveFileLoading"
                    multiple type="drag" :on-success="uploadFirstApproveFileSuccess"
                    :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!firstApproveForm.resultPath || firstApproveForm.resultPath===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>
              <img v-if="isImg(firstApproveForm.resultPath)" :src="firstApproveForm.resultPath"/>
              <span v-else>{{firstApproveForm.resultFileName}}</span>
            </p>
            <i-spin fix v-if="isUploadFirstApproveFileLoading"></i-spin>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitFirstApprove" :disabled="isUploadFirstApproveFileLoading" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--添加放款条件-->
    <bs-modal v-model="addConditionModal" :width="520" title="添加放款条件">
      <i-form :label-width="120" ref="addConditionForm" :model="conditionForm">
        <i-form-item label="项目" prop="paymentConName"
                     :rules="{required: true, message: '请输入项目'}">
          <i-input v-model="conditionForm.paymentConName"></i-input>
        </i-form-item>
        <i-form-item label="内容" prop="paymentConContent"
                     :rules="{required: true, message: '请输入内容'}">
          <i-input type="textarea" :rows="4" v-model="conditionForm.paymentConContent"></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitCondition" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--选择产品的弹窗-->
    <bs-modal title="选择产品" :width="1200" v-model="showSelectProduct">
      <table-product-list v-if="showSelectProduct" :type="'modal'" @on-row-dbclick="selectProduct"></table-product-list>
    </bs-modal>
    <!--选择产品的利率方案-->
    <bs-modal v-model="selectPeriodsAndRate" :width="1200" title="选择产品的利率方案">
      <i-table :columns="loanPeriodsColumns" :data="loanPeriodsList" @on-row-dblclick="selectPeriodsRow"></i-table>
    </bs-modal>
    <i-spin fix v-if="initPageLoading">初始化数据加载中...</i-spin>
  </div>
</template>
<script>
  import Tools from '@/utils/Tools';
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import BsModel from '@/components/bs-modal';
  import TableProductList from '@/pages/configuration-manage/manage-product/product-list'; // 选择产品
  export default {
    name: 'businessApproveTabApproveInfo',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        initPageLoading: false,
        addFirstApproveModal: false,
        addConditionModal: false,
        showSelectProduct: false,
        selectPeriodsAndRate: false,
        loanRateSumProuductRate: '',
        // 初审信息
        firstApproveEditIndex: -1,
        firstApproveForm: {
          approveDesc: '',
          approveWebsite: '',
          resultPath: '',
          resultFileName: '',
          approveFirstId: ''
        },
        conditionForm: {
          'paymentConName': '', // 放款条件项目名称
          'paymentConContent': '' // 放款条件项目内容
        }
      };
    },
    computed: {
      isFromDetail() {
        return location.href.indexOf('detail') !== -1;
      }
    },
    props: {
      applyBasicInfo: {
        default: null,
        required: false,
        type: Object
      },
      readonly: {
        default: false,
        required: false,
        type: Boolean
      },
      isApprove: {
        default: false,
        required: false,
        type: Boolean
      }
    },
    methods: {
      // 定收利率 失去焦点时 验证其是否是数字
      loanRealRateVerification(event) {
        // console.log(event.target.value);
        let newVal = event.target.value;
        if (isNaN(newVal)) {
          this.$Message.error('"定收利率"必须是数字！');
          $(event.target).focus();
          newVal = 0;
        }
      },
      // “基本信息”tab中“客户等级”改变了，则重新请求"/biz/queryApproveProductCredit"接口
      custLevelEmitFun(NewCustLevel) {
        // 如果是一级审批或者二级审批，用业务编号初始化页面数据获取订单申请和审批信息，
        // 如果是初审，用产品和申请期限初始化有关产品的基础信息
        let ReqDataObj = {
          loanNo: this.applyBasicInfo.loanNo,
          productNo: this.applyBasicInfo.productNo,
          productPeriods: this.applyBasicInfo.applyPeriods, // 申请期限
          carBuyAmt: this.applyBasicInfo.carBuyAmt,
          custLevel: NewCustLevel, // 客户等级A,B
          carType: this.applyBasicInfo.carType // 车类
        };
        this.getProductApproveInfo(
          ReqDataObj
        );
      },
      async getPageInitData() {
        // 如果是一级审批或者二级审批，用业务编号初始化页面数据获取订单申请和审批信息，
        // 如果是初审，用产品和申请期限初始化有关产品的基础信息
        let ReqDataObj = {
          loanNo: this.applyBasicInfo.loanNo,
          productNo: this.applyBasicInfo.productNo,
          productPeriods: this.applyBasicInfo.applyPeriods, // 申请期限
          carBuyAmt: this.applyBasicInfo.carBuyAmt,
          custLevel: this.applyBasicInfo.custLevel, // 客户等级A,B
          carType: this.applyBasicInfo.carType // 车类
        };
        await this.getProductApproveInfo(
          ReqDataObj
        );
        this.getFirstApproveList(this.applyBasicInfo.loanNo);
        // 判断产品套餐是否获取成功，如果成功则获取产品贷款期限列表（依赖于接口/biz/queryApproveProductCredit）
        if (this.$data.productPackageNo) {
          this.getLoanPeriodByProductNo(this.$data.productPackageNo, this.applyBasicInfo.custLevel);
        }
        this.getBankList(this.applyBasicInfo.loanNo);
      },
      approveResultChanged(e) {
        this.$emit('on-result-change', e);
      }
    },
    mounted() {
      // TODO
    },
    watch: {
      'applyBasicInfo'(newVal, oldVal) {
        if (newVal && newVal.loanNo) {
          this.getPageInitData();
          this.$data.approveData.loanApproveCreditDTO.loanProductRate =
            (this.$data.approveData.loanApproveCreditDTO.loanRealRate / 1) +
            this.$data.loanRateSumProuductRate;
        }
      },
      'approveData.loanApproveCreditDTO.loanRealRate'(newVal, oldVal) {
        this.$data.approveData.loanApproveCreditDTO.loanProductRate = Tools.addNum(this.$data.loanRateSumProuductRate, newVal);
      }
    },
    components: {
      'bs-modal': BsModel,
      TableProductList
    }
  };
</script>
<style lang="scss">
  #tab-loan-approve{
    position: relative;
  }
</style>
