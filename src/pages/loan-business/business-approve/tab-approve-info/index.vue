<template>
  <div id="tab-loan-approve">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" ref="busApproveForm" :model="approveData" :label-width="140">
          <bs-form-block :title="'贷款准入规则'">
            <i-table :columns="accessRuleCol" :data="approveData.loanApproveRuleDTOS"></i-table>
          </bs-form-block>
          <bs-form-block :title="'初审信息'">
            <i-row>
              <i-col span="24">
                <div class="form-top-actions" v-if="!readonly">
                  <i-button type="primary" @click="firstApproveForm = {} ; addFirstApproveModal = !addFirstApproveModal">添加初审信息</i-button>
                </div>
                <i-table :columns="firstApproveColumns" :data="approveData.loanApproveFirstDTOS"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'用信方案'">
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="匹配产品" prop="loanApproveCreditDTO.productNo"
                             :rules="{required: true, message: '请选择匹配产品'}">
                  <input type="hidden" :value="approveData.loanApproveCreditDTO.productNo">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.productName">
                    <i-button v-if="!readonly" @click="showSelectProduct=!showSelectProduct" slot="append">选择产品</i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="运营模式" prop="loanApproveCreditDTO.operatingMode"
                             :rules="{required: true, message: '请选择运营模式'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.operatingMode">
                    <i-option v-for="item in enumSelectData.get('OperatingModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--<i-col span="8">
                <i-form-item class="required" label="车辆销售价" prop="loanApproveCreditDTO.carSaleAmt"
                             :rules="{required: true, message: '请输入车辆销售价'}">
                  <i-input :readonly="readonly" v-model="approveData.loanApproveCreditDTO.carSaleAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>-->
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="审批额度" prop="loanApproveCreditDTO.approveLimitAmt"
                             :rules="{required: true, message: '请输入审批额度'}">
                  <i-input :readonly="readonly" v-model="approveData.loanApproveCreditDTO.approveLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="贷款期限" prop="loanApproveCreditDTO.loanPeriods"
                             :rules="{required: true, message: '请选择贷款期限'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.loanPeriods">
                    <i-option v-for="item in loanPeriodsList" :key="item.loanPeriods" :value="item.loanPeriods">{{item.loanPeriods}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="还款方式" prop="loanApproveCreditDTO.repaymentMode"
                             :rules="{required: true, message: '请选择还款方式'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.repaymentMode">
                    <i-option v-for="item in enumSelectData.get('RepaymentTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="产品利率" prop="loanApproveCreditDTO.loanNominalRate"
                             :rules="{required: true, message: '请输入产品利率'}">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.loanNominalRate">
                    <span slot="append">%</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="定收利率" prop="loanApproveCreditDTO.loanRealRate"
                             :rules="{required: true, message: '请输入定收利率'}">
                  <i-input :readonly="readonly" v-model="approveData.loanApproveCreditDTO.loanRealRate">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="放款方式" prop="loanApproveCreditDTO.loanMode"
                             :rules="{required: true, message: '请输入放款方式'}">
                  <i-select :disabled="readonly" @on-change="getBankList" v-model="approveData.loanApproveCreditDTO.loanMode">
                    <i-option v-for="item in enumSelectData.get('LoanModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="贷款实际用途" prop="loanApproveCreditDTO.loanRealUse"
                             :rules="{required: true, message: '请输入贷款实际用途'}">
                  <i-input :readonly="readonly" v-model="approveData.loanApproveCreditDTO.loanRealUse"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="贷款申报用途" prop="loanApproveCreditDTO.loanApplyUse"
                             :rules="{required: true, message: '请输入贷款申报用途'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.loanApplyUse">
                    <i-option v-for="item in enumSelectData.get('LoanApplyUseEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="利率模式" prop="loanApproveCreditDTO.interestType"
                             :rules="{required: true, message: '请选择利率模式'}">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.interestType">
                    <i-option v-for="item in enumSelectData.get('RateModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="车辆保险费" prop="loanApproveCreditDTO.carInsurance"
                             :rules="{required: true, message: '请选择车辆保险费'}">
                  <i-input :readonly="true"  v-model="approveData.loanApproveCreditDTO.carInsurance">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="盗抢险" prop="loanApproveCreditDTO.dqxInsurance"
                             :rules="{required: true, message: '请选择盗抢险' }">
                  <i-select :disabled="readonly" v-model="approveData.loanApproveCreditDTO.dqxInsurance">
                    <i-option v-for="item in enumSelectData.get('CarInsuranceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="16">
                <i-form-item class="required" label="风控措施" prop="loanApproveCreditDTO.riskControlContent"
                             :rules="{required: true, message: '请输入风控措施'}">
                  <i-input :readonly="readonly" type="textarea" :rows="4" v-model="approveData.loanApproveCreditDTO.riskControlContent"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'费用收取方案'">
            <i-table ref="feeMethodsTable" :columns="feeMethodCol" @on-select="selectFinanceRow" :data="approveData.loanApproveFeePlanDTOS"></i-table>
            <i-row style="margin-top: 10px;">
              <i-col span="24">
                <i-form-item class="required" label="可融资金额">
                  <i-input style="width: 120px" :readonly="true" v-model="approveData.loanApproveCreditDTO.carSaleAmt"></i-input>
                  <i-poptip trigger="hover" title="提示标题" content="提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容提示内容">
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
                <i-form-item class="required" label="账户名" prop="loanPaymentAccountDTOS.acctName"
                             :rules="{required: true, message: '请选择账户名'}">
                  <i-input :readonly="true" v-model="approveData.loanPaymentAccountDTOS.acctName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item v-if="readonly">
                  <i-input type="text" :readonly="true" v-model="approveData.loanPaymentAccountDTOS.acctNo"></i-input>
                </i-form-item>
                <i-form-item v-else class="required" label="账号" prop="loanPaymentAccountDTOS.bankName"
                             :rules="{required: true, message: '请选择放款账户账号'}">
                  <input type="hidden" v-model="approveData.loanPaymentAccountDTOS.bankName">
                  <i-select :disabled="readonly" @on-change="paymentAccountChange" :label-in-value="true">
                    <i-option v-for="item in paymentAccountList"  :key="item.bankName" :value="item.bankName">{{item.acctNo}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="开户银行">
                  <i-input :readonly="true" v-model="approveData.loanPaymentAccountDTOS.bankName"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--还款账户信息-->
          <bs-form-block :title="'还款账户信息'">
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="账户名" prop="loanRePaymentAccountDTOS.acctName"
                             :rules="{required: true, message: '请选择账户名'}">
                  <i-input :readonly="true" v-model="approveData.loanRePaymentAccountDTOS.acctName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item v-if="readonly">
                  <i-input type="text" :readonly="true" v-model="approveData.loanRePaymentAccountDTOS.acctNo"></i-input>
                </i-form-item>
                <i-form-item v-else class="required" label="账号" prop="loanRePaymentAccountDTOS.bankName"
                             :rules="{required: true, message: '请选择还款账户账号'}">
                  <input type="hidden" v-model="approveData.loanRePaymentAccountDTOS.bankName">
                  <i-select :disabled="readonly" @on-change="repaymentAccountChange" :label-in-value="true" >
                    <i-option v-for="item in repaymentAccountList" :key="item.openBankName" :value="item.bankName">{{item.acctNo}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="开户银行">
                  <i-input :readonly="true" v-model="approveData.loanRePaymentAccountDTOS.bankName"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--放款条件-->
          <bs-form-block :title="'放款条件'">
            <div class="form-top-actions" v-if="!readonly">
              <i-button type="primary" @click="conditionForm = {} ; addConditionModal = !addConditionModal">添加放款条件</i-button>
            </div>
            <i-table :columns="loanPaymentConditionCol" :data="approveData.loanPaymentConditionDTOS"></i-table>
          </bs-form-block>
          <!--资金方信息-->
          <bs-form-block :title="'资金方信息'">
            <i-table :columns="loanFundPartyCol" :data="approveData.loanCapitalDTOS"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" v-if="!readonly">
            <i-row>
              <i-col span="18">
                <i-form-item label="结论">
                  <i-radio-group v-model="approveData.loanApproveDTO.result">
                    <i-radio label="A">通过</i-radio>
                    <i-radio label="R">拒绝</i-radio>
                    <i-radio label="B">退回</i-radio>
                    <i-radio label="D">废弃</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="意见信息">
                  <i-input type="textarea" v-model="approveData.loanApproveDTO.opinion" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-col>
    </i-row>

    <!--添加初审信息的弹窗-->
    <bs-modal v-model="addFirstApproveModal" :width="520" title="添加初审信息">
      <i-form :label-width="120" ref="addFirstApproveForm" :model="firstApproveForm">
        <i-form-item label="查询渠道" prop="approveWebsite"
                     :rules="{required: true, message: '请输入查询渠道'}">
          <i-input v-model="firstApproveForm.approveWebsite"></i-input>
        </i-form-item>
        <i-form-item label="查询描述" prop="approveDesc"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="firstApproveForm.approveDesc"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="resultPath"
                     :rules="{required: true, message: '请上传凭证'}">
          <input type="hidden" :value="firstApproveForm.resultPath">
          <i-upload :show-upload-list="false"
                    multiple type="drag" :on-success="uploadFirstApproveFileSuccess"
                    :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!firstApproveForm.resultPath || firstApproveForm.resultPath===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{firstApproveForm.resultPath}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitFirstApprove" style="width: 120px;" type="primary" size="large">保存</i-button>
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
    <i-spin fix v-if="initPageLoading">加载中...</i-spin>
  </div>
</template>
<script>
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
      }
    },
    methods: {
      getPageInitData() {
        // 如果是一级审批或者二级审批，用业务编号初始化页面数据获取订单申请和审批信息，
        // this.getFirstApproveInfo(this.applyBasicInfo.loanNo);
        // 如果是初审，用产品和申请期限初始化有关产品的基础信息
        this.getProductApproveInfo(this.applyBasicInfo.loanNo, this.applyBasicInfo.productNo, this.applyBasicInfo.applyPeriods);
        this.getFirstApproveList(this.applyBasicInfo.loanNo);
        this.getLoanPeriodByProductNo(this.applyBasicInfo.productNo);
        this.getBankList(this.applyBasicInfo.loanNo);
      }
    },
    mounted() {
      // setTimeout(() => {
      //   if (this.applyBasicInfo && this.applyBasicInfo.loanNo) {
      //     this.getPageInitData();
      //   }
      // }, 500);
    },
    watch: {
      'applyBasicInfo'(newVal, oldVal) {
        if (newVal && newVal.loanNo) {
          this.getPageInitData();
        }
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
