<template>
  <div id="">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" ref="busApproveForm" :model="approveData" :label-width="140">
          <bs-form-block :title="'贷款准入规则'">
            <i-table :columns="accessRuleCol" :data="approveData.loanApproveRuleDTOS"></i-table>
          </bs-form-block>
          <bs-form-block :title="'初审信息'">
            <i-row>
              <i-col span="24">
                <div class="form-top-actions">
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
                    <i-button @click="showSelectProduct=!showSelectProduct" slot="append">选择产品</i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="运营模式" prop="loanApproveCreditDTO.operatingMode"
                             :rules="{required: true, message: '请选择运营模式'}">
                  <i-select v-model="approveData.loanApproveCreditDTO.operatingMode">
                    <i-option value="1">啊啊啊</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="*审批额度" prop="loanApproveCreditDTO.approveLimitAmt"
                             :rules="{required: true, message: '请输入审批额度'}">
                  <i-input v-model="approveData.loanApproveCreditDTO.approveLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="贷款期限" prop="loanApproveCreditDTO.loanPeriods"
                             :rules="{required: true, message: '请选择贷款期限'}">
                  <i-select v-model="approveData.loanApproveCreditDTO.loanPeriods">
                    <i-option v-for="item in enumSelectData.get('DutyEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="还款方式" prop="loanApproveCreditDTO.repaymentMode"
                             :rules="{required: true, message: '请选择还款方式'}">
                  <i-select v-model="approveData.loanApproveCreditDTO.repaymentMode">
                    <i-option v-for="item in enumSelectData.get('RepaymentTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="产品利率" prop="loanApproveCreditDTO.loanNominalRate"
                             :rules="{required: true, message: '请输入产品利率'}">
                  <i-input :readonly="true" v-model="approveData.loanApproveCreditDTO.loanNominalRate"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="定收利率" prop="loanApproveCreditDTO.loanRealRate"
                             :rules="{required: true, message: '请输入定收利率'}">
                  <i-input v-model="approveData.loanApproveCreditDTO.loanRealRate">
                    <span slot="append">%/年</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="放款方式" prop="loanApproveCreditDTO.loanMode"
                             :rules="{required: true, message: '请输入放款方式'}">
                  <i-select v-model="approveData.loanApproveCreditDTO.loanMode">
                    <i-option v-for="item in enumSelectData.get('LoanModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="贷款实际用途" prop="product"
                             :rules="{required: true, message: '请输入贷款实际用途'}">
                  <i-input v-model="approveData.loanApproveCreditDTO.loanRealUse"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="贷款申报用途" prop="product"
                             :rules="{required: true, message: '请输入贷款申报用途'}">
                  <i-select v-model="approveData.loanApproveCreditDTO.loanApplyUse">
                    <i-option v-for="item in enumSelectData.get('LoanApplyUseEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="利率模式" prop="product"
                             :rules="{required: true, message: '请选择利率模式'}">
                  <i-select v-model="approveData.loanApproveCreditDTO.interestType">
                    <i-option v-for="item in enumSelectData.get('DutyEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="车辆保险费" prop="product"
                             :rules="{required: true, message: '请选择车辆保险费'}">
                  <i-input :readonly="true"  v-model="approveData.loanApproveCreditDTO.carInsurance"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="盗抢险" prop="product"
                             :rules="{required: true, message: '请选择盗抢险' }">
                  <i-select v-model="approveData.loanApproveCreditDTO.dqxInsurance">
                    <i-option v-for="item in enumSelectData.get('DutyEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="16">
                <i-form-item class="required" label="风控措施" prop="product"
                             :rules="{required: true, message: '请输入风控措施'}">
                  <i-input type="textarea" :rows="4" v-model="approveData.loanApproveCreditDTO.riskControlContent"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block :title="'费用收取方案'">
            <i-table :columns="feeMethodCol" :data="approveData.loanApproveFeePlanDTOS"></i-table>
          </bs-form-block>
          <!--放款账户信息-->
          <bs-form-block :title="'放款账户信息'">
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="账户名" prop="product"
                             :rules="{required: true, message: '请选择账户名'}">
                  <i-select :value="approveData.loanApproveCreditDTO.productNo"></i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="账号">
                  <i-input :readonly="true" :value="approveData.loanApproveCreditDTO.productNo"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="开户行">
                  <i-input :readonly="true" :value="approveData.loanApproveCreditDTO.productNo"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--还款账户信息-->
          <bs-form-block :title="'还款账户信息'">
            <i-row>
              <i-col span="8">
                <i-form-item class="required" label="账户名" prop="product"
                             :rules="{required: true, message: '请选择账户名'}">
                  <i-select :value="approveData.loanApproveCreditDTO.productNo"></i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="账号">
                  <i-input :readonly="true" :value="approveData.loanApproveCreditDTO.productNo"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item class="required" label="开户行">
                  <i-input :readonly="true" :value="approveData.loanApproveCreditDTO.productNo"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--放款条件-->
          <bs-form-block :title="'放款条件'">
            <div class="form-top-actions">
              <i-button type="primary" @click="conditionForm = {} ; addConditionModal = !addConditionModal">添加放款条件</i-button>
            </div>
            <i-table :columns="loanPaymentConditionCol" :data="approveData.loanPaymentConditionDTOS"></i-table>
          </bs-form-block>
          <!--资金方信息-->
          <bs-form-block :title="'资金方信息'">
            <i-table :columns="loanFundPartyCol" :data="approveData.loanPaymentConditionDTOS"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" >
            <i-row>
              <i-col span="8">
                <i-form-item label="结论">
                  <i-radio-group v-model="approveData.loanApproveDTO.result">
                    <i-radio label="A">通过</i-radio>
                    <i-radio label="R">拒绝</i-radio>
                    <i-radio label="B">退回</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
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
      <i-form :label-width="80" ref="addFirstApproveForm" :model="firstApproveForm">
        <i-form-item label="查询渠道" prop="itemName"
                     :rules="{required: true, message: '请输入查询渠道'}">
          <i-input v-model="firstApproveForm.itemName"></i-input>
        </i-form-item>
        <i-form-item label="查询描述" prop="description"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="firstApproveForm.description"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="fileUrl"
                     :rules="{required: true, message: '请上传凭证'}">
          <input type="hidden" :value="firstApproveForm.fileUrl">
          <i-upload :show-upload-list="false"
                    multiple type="drag" :on-success="uploadFirstApproveFileSuccess"
                    :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!firstApproveForm.fileUrl || firstApproveForm.fileUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{firstApproveForm.fileUrl}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitFirstApprove" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--添加放款条件-->
    <bs-modal v-model="addConditionModal" :width="520" title="添加放款条件">
      <i-form :label-width="80" ref="addConditionForm" :model="conditionForm">
        <i-form-item label="项目" prop="repaymentConName"
                     :rules="{required: true, message: '请输入项目'}">
          <i-input v-model="conditionForm.repaymentConName"></i-input>
        </i-form-item>
        <i-form-item label="内容" prop="repaymentConContent"
                     :rules="{required: true, message: '请输入内容'}">
          <i-input type="textarea" :rows="4" v-model="conditionForm.repaymentConContent"></i-input>
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
        addFirstApproveModal: false,
        addConditionModal: false,
        showSelectProduct: false,
        firstApproveForm: {
          'itemName': '',
          'fileName': '',
          'description': '',
          'fileUrl': ''
        },
        conditionForm: {
          'repaymentConName': '', // 放款条件项目名称
          'repaymentConContent': '' // 放款条件项目内容
        }
      };
    },
    props: {
      applyBasicInfo: {
        default: null,
        required: false,
        type: Object
      }
    },
    methods: {},
    mounted() {
      setTimeout(() => {
        this.getProductAllowRule(this.applyBasicInfo.productNo);
        this.getProductFeeMethods(this.applyBasicInfo.productNo);
      }, 500);
    },
    components: {
      'bs-modal': BsModel,
      TableProductList
    }
  };
</script>
<style lang="scss" scoped="">

</style>