<template>
  <div id="conf-model-lilv">
    <i-form ref="ProductPackageForm" :model="ProductPackageForm" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--套餐名称-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '套餐名称不能为空！', trigger: 'blur'}"
            label="套餐名称"
            prop="packageName">
            <i-input placeholder="" v-model="ProductPackageForm.packageName"></i-input>
          </i-form-item>
        </i-col>
        <!--个人单车最低额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '个人单笔额度不能为空！', trigger: 'blur'}"
            label="个人单车最低额度"
            prop="personalSingleCarMinLimit">
            <i-input placeholder="" v-model="ProductPackageForm.personalSingleCarMinLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--个人单车最高额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '个人单笔额度不能为空！', trigger: 'blur'}"
            label="个人单车最高额度"
            prop="personalSingleCarMaxLimit">
            <i-input placeholder="" v-model="ProductPackageForm.personalSingleCarMaxLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--车类-->
        <i-col span="8">
          <i-form-item
            label="车类"
            :rules="{required: true, message: '请选择车类', trigger: 'change'}"
            prop="bizType">
            <i-select v-model="ProductPackageForm.bizType" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--个人单户额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '个人单户额度不能为空', trigger: 'blur'}"
            label="个人单户额度"
            prop="personalSingleDoorLimit">
            <i-input type="text" placeholder="" v-model="ProductPackageForm.personalSingleDoorLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单笔额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '企业单笔额度不能为空', trigger: 'blur'}"
            label="企业单笔额度"
            prop="companySingleCarLimit">
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.companySingleCarLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--企业单户额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '企业单户额度不能为空', trigger: 'blur'}"
            label="企业单户额度"
            prop="companySingleDoorLimit">
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.companySingleDoorLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--还款方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '还款方式不能为空', trigger: 'change'}"
            label="还款方式"
            prop="loanMode">
            <i-select v-model="ProductPackageForm.loanMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('RepaymentTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--运营模式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '运营模式不能为空', trigger: 'change'}"
            label="运营模式"
            prop="operatingMode">
            <i-select v-model="ProductPackageForm.operatingMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('OperatingModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--模型设定-->
        <i-col span="8">
          <i-form-item
            label="模型设定"
            prop="modelSet">
            <i-select v-model="ProductPackageForm.modelSet" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('ModelTypeEnum')":key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--月息方式-->
        <i-col span="8">
          <i-form-item
            label="月息方式"
            prop="monthAccrualMode">
            <i-select v-model="ProductPackageForm.monthAccrualMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('InterestTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--年模型-->
        <i-col span="8">
          <i-form-item label="年模型" prop="yearModel">
            <i-select v-model="ProductPackageForm.yearModel" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('YearModelEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--还款日规则-->
        <i-col span="8">
          <i-form-item
            label="还款日规则"
            prop="loanDayMode">
            <i-row>
              <i-col span="12"  style="padding: 0 5px 0 0">
                <i-select v-model="ProductPackageForm.loanDayMode" placeholder="请选择">
                  <i-option v-for="item in enumSelectData.get('RepaymentRuleEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
              </i-col>
              <i-col span="12"  style="padding: 0">
                <i-input  type="text" placeholder="还款日" v-model="ProductPackageForm.loanDay" :disabled="ProductPackageForm.loanDayMode!=='2'">
                  <span slot="append">日</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--逾期计算方式-->
        <i-col span="8">
          <i-form-item
            label="逾期计算方式"
            prop="overdueCountMode">
            <i-select v-model="ProductPackageForm.overdueCountMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--逾期利率-->
        <i-col span="8">
          <i-form-item
            label="逾期利率"
            prop="dayOverduePenaltyRatio">
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.dayOverduePenaltyRatio">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--逾期管理费-->
        <i-col span="8">
          <i-form-item
            label="逾期管理费"
            prop="dayOverdueManageFee">
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.dayOverdueManageFee">
              <span slot="append">元/天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--逾期宽限天数-->
        <i-col span="8">
          <i-form-item
            label="逾期宽限天数"
            prop="overdueExtendDays">
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.overdueExtendDays">
              <span slot="append">天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--罚息计算方式-->
        <!--<i-col span="8">-->
          <!--<i-form-item-->
            <!--label="罚息计算方式"-->
            <!--prop="penaltyCountMode">-->
            <!--<i-select v-model="ProductPackageForm.penaltyCountMode" placeholder="请选择">-->
              <!--<i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
            <!--</i-select>-->
          <!--</i-form-item>-->
        <!--</i-col>-->
      </i-row>
      <i-row :gutter="16">
        <!--罚息利率-->
        <!--<i-col span="8">-->
          <!--<i-form-item-->
            <!--label="罚息利率"-->
            <!--prop="penaltyDayRatio">-->
            <!--<i-input  type="text" placeholder="" v-model="ProductPackageForm.penaltyDayRatio">-->
              <!--<span slot="append">%/元</span>-->
            <!--</i-input>-->
          <!--</i-form-item>-->
        <!--</i-col>-->
        <!--是否允许提前还款-->
        <i-col span="8">
          <i-form-item
            label="是否允许提前还款"
            prop="isUpRepay">
            <i-select v-model="ProductPackageForm.isUpRepay" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--提前还款违约金比例-->
        <i-col span="8" v-if="ProductPackageForm.isUpRepay === '1'">
          <i-form-item
            label="提前还款违约金比例"
            prop="protype">
            <i-row>
              <i-col span="13"  style="padding: 0 5px 0 0">
                <i-select v-model="ProductPackageForm.upRepayPenaltyCountMode" placeholder="请选择">
                  <i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
              </i-col>
              <i-col span="11"  style="padding: 0">
                <i-input  type="text" placeholder="提前还款违约金比例" v-model="ProductPackageForm.upRepayPenaltyRatio">
                  <span slot="append">%</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--提前还款利息-->
        <i-col span="16" class-name="col-inline">
          <i-form-item
            :rules="{required: true, message: '提前还款利息天数不能为空', trigger: 'blur'}"
            label="提前还款利息"
            prop="upRepayCountDays">
            <span>不足</span>
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.upRepayCountDays" style="width: 80px"></i-input>
            <span>天，按实际发生天数收，否则整月收！最低收</span>
          </i-form-item>
          <i-form-item
            :rules="{required: true, message: '提前还款利息天数不能为空', trigger: 'blur'}"
            label=""
            style="margin-left: -120px;"
            prop="upRepayMinCountDays">
            <i-input  type="text" placeholder="" v-model="ProductPackageForm.upRepayMinCountDays" style="width: 80px"></i-input>
            <span>天利息。</span>
          </i-form-item>
        </i-col>
        <!--保证金释放方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '保证金释放方式不能为空', trigger: 'change'}"
            label="保证金释放方式"
            prop="depositReleaseMode">
            <i-select v-model="ProductPackageForm.depositReleaseMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('FreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--授信释放方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '授信释放方式不能为空', trigger: 'change'}"
            label="授信释放方式"
            prop="creditLimitReleaseMode">
            <i-select v-model="ProductPackageForm.creditLimitReleaseMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('CreditFreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--租赁服务费收取方式-->
        <i-col span="8">
          <i-form-item
            label="租赁服务费收取方式"
            prop="serviceFeeType">
            <i-select v-model="ProductPackageForm.serviceFeeType" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('ServiceFeeTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--车辆保险费-->
        <i-col span="8">
          <i-form-item
            label="车辆保险费"
            prop="carInsurance">
            <i-select v-model="ProductPackageForm.carInsurance" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('CarInsuranceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row :gutter="16">
        <!--盗抢险-->
        <i-col span="8">
          <i-form-item
            label="盗抢险"
            prop="dqxInsurance">
            <i-select v-model="ProductPackageForm.dqxInsurance" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('DqxInsuranceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--放款方式-->
        <i-col span="8">
          <i-form-item
            label="放款方式"
            :rules="{required: true, message: '请选择放款方式', trigger: 'change'}"
            prop="loanPaymentType">
            <i-select v-model="ProductPackageForm.loanPaymentType" placeholder="请选择">
              <!--<i-option v-for="item in enumSelectData.get('DqxInsuranceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
              <i-option v-for="item in enumSelectData.get('LoanModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--权证入库方式-->
        <i-col span="8">
          <i-form-item
            label="权证入库方式"
            :rules="{required: true, message: '请选择权证入库方式', trigger: 'change'}"
            prop="warrantType">
            <i-select v-model="ProductPackageForm.warrantType" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('LoanWarrantTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <div v-if="!isParentAdd">
        <div class="form-top-actions">
          <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
        <i-table border ref="lilvTable" :columns="columns1" :data="data1" :loading="dataLoading"></i-table>
        <br>
        <br>
      </div>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formSubmit" :loading="btnLoading">
          <span v-if="!btnLoading">提交</span>
          <span v-else>loading...</span>
        </i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
      </i-form-item>
    </i-form>
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAdd" :width="520">
      <i-form ref="formInModel" :model="formInModel" label-position="left" :label-width="100">
        <!--<i-form-item label="车类" prop="bizType">-->
          <!--<i-select v-model="formInModel.bizType" placeholder="请选择">-->
            <!--<i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>-->
          <!--</i-select>-->
        <!--</i-form-item>-->
        <i-form-item label="客户等级" prop="custLevel">
          <i-select v-model="formInModel.custLevel" placeholder="请选择">
            <i-option value="A">A</i-option>
            <i-option value="B">B</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="期限" prop="loanPeriods">
          <i-input placeholder="期限" v-model="formInModel.loanPeriods">
            <span slot="append">月</span>
          </i-input>
        </i-form-item>
        <i-form-item label="利率模式" prop="interestType">
          <i-select v-model="formInModel.interestType" placeholder="请选择">
            <i-option v-for="item in enumSelectData.get('RateModeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="名义利率" prop="loanNominalRate">
          <i-input placeholder="" v-model="formInModel.loanNominalRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item label="实际利率" prop="loanRealRate">
          <i-input placeholder="" v-model="formInModel.loanRealRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formInSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formInCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <bs-modal :title="'资方利率'" v-model="zfLilvModel" :width="1200">
      <div>
        <div class="form-top-actions">
          <i-button @click="addModalOpenZFLV" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
        <i-table :loading="ZFLVdataLoading" border ref="zfTable" :columns="columnsZFLV" :data="dataZFLV"></i-table>
      </div>
    </bs-modal>
    <!--选择资方的弹窗-->
    <bs-modal title="选择资方" :width="1200" v-model="showSelectCapital" :zIndex="999">
      <table-invest-list type="modal" ref="tableInvestList" @on-row-dbclick="selectCapital"></table-invest-list>
    </bs-modal>
    <!--资方利率的新增与修改-->
    <bs-modal :title="isAddZFLV ? '新增' : '修改'" v-model="ZFLVshowAddModal">
      <i-form v-if="ZFLVshowAddModal" ref="rateForm" :model="rateForm" label-position="right" :label-width="100" style="padding-bottom:0;">
        <i-form-item
          label="资方"
          prop="capitalNo">
          <input type="hidden" v-model="rateForm.capitalNo"/>
          <i-input v-model="rateForm.capitalName" :readonly="true" placeholder="选择资方">
            <i-button @click="showSelectCapital=!showSelectCapital" slot="append">选择资方 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="名义利率" prop="nominalRate">
          <i-input placeholder="" v-model="rateForm.nominalRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item label="实际利率" prop="realRate">
          <i-input placeholder="" v-model="rateForm.realRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmitZFLV" :loading="ZFLVbtnLoading">
            <span v-if="!ZFLVbtnLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>

    <!--费用收取配置-->
    <bs-modal title="新增" v-model="showCostModel" :width="1200">
      <div class="form-top-actions">
        <i-button @click="addCostModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
      <i-table :loading="costDataLoading" border ref="FyTable" :columns="costcolumns" :data="costdata"></i-table>
    </bs-modal>
    <bs-modal title="新增" v-model="showCostAdd" :width="520">
      <i-form ref="formCostModel" :model="formCostModel" label-position="left" :label-width="100">
        <i-form-item
          :rules="{required: true, message: '费用类型不能为空', trigger: 'change'}"
          label="费用类型"
          prop="feeTypeNo">
          <i-select v-model="formCostModel.feeTypeNo" placeholder="请选择" @on-change="feeTypeCodeChange">
            <i-option v-for="item in costTypeSelect" :key="item.feeTypeNo" :value="item.feeTypeNo">{{item.feeTypeName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '费用类型代码不能为空', trigger: 'blur'}"
          label="费用类型代码"
          prop="feeTypeCode">
          <i-input :readonly="true" placeholder="费用类型代码" v-model="formCostModel.feeTypeCode"></i-input>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '计算方式不能为空', trigger: 'change'}"
          label="计算方式"
          prop="incomeType">
          <i-select transfer v-model="formCostModel.incomeType" placeholder="请选择" @on-change="selpro">
            <i-option v-for="item in enumSelectData.get('ReceiveTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '收支方向不能为空', trigger: 'change'}"
          label="收支方向"
          prop="feeType">
          <i-select v-model="formCostModel.feeType" placeholder="请选择">
            <i-option v-for="item in enumSelectData.get('FeeTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          label="收费依据"
          :rules="{required: true, message: '请选择收费依据', trigger: 'change'}"
          prop="feeAccording">
          <i-select v-model="formCostModel.feeAccording" placeholder="请选择">
            <i-option v-for="item in enumSelectData.get('LoanFeeAccordingTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            <!--<i-option value="1">贷款金额</i-option>-->
            <!--<i-option value="2">申请金额</i-option>-->
            <!--<i-option value="3">购车金额</i-option>-->
          </i-select>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '利率标准不能为空', trigger: 'blur'}"
          label="利率标准"
          prop="ratio"
          v-if="formCostModel.incomeType === '1'">
          <i-input placeholder="利率标准" v-model="formCostModel.ratio">
            <span slot="append">%</span>
          </i-input>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '固定金额不能为空', trigger: 'blur'}"
          label="固定金额"
          prop="fixedAmount"
          v-if="formCostModel.incomeType === '2'">
          <i-input placeholder="固定金额" v-model="formCostModel.fixedAmount">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formInSubmitCost" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formInCancelCost">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import MixinDataZFLV from './zf-lilv-model-Mixin-data';
  import TableInvestList from '@/components/table-invest-list'; // 选择资方
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import CostMinData from './cost-mixin-data';
  import CostMinMethod from './cost-mixin-method';
  export default {
    name: 'confModeLilv',
    mixins: [MixinData, MixinDataZFLV, CostMinData, CostMinMethod],
    components: {
      TableInvestList,
      BsModal
    },
    props: {
      childMsg: Object,
      isParentAdd: {
        type: Boolean,
        default: true,
        required: true
      }
    },
    data() {
      return {
        isAdd: true,
        isAddZFLV: true, // 资方利率表的 是否新增
        ZFLVshowAddModal: false, // 资方利率表的 模态框
        ZFLVbtnLoading: false,
        ZFLVdataLoading: false,
        rateForm: {
          capitalName: '', // 出资方
          capitalNo: '',
          nominalRate: '', // 名义利率
          realRate: '' // 实际利率
        },
        showSelectCapital: false,
        dataLoading: false, // 表格的loading
        btnLoading: false, // 外部提交按钮的loading
        buttonLoading: false, // 新增提交按钮的loading
        showAdd: false, // 增删的模态框
        zfLilvModel: false, // 增删的模态框
        zfClickRow: {}, // 点击模态框里tabel的一行时
        ProductPackageForm: { // 当前的模态框的数据表单
          packageNo: '', // 套餐编号
          packageName: '', // 套餐名称
          personalSingleCarMinLimit: '',
          personalSingleCarMaxLimit: '',
          bizType: '',
          personalSingleDoorLimit: '',  // 个人单户额度
          companySingleCarLimit: '',  // 企业单笔额度
          companySingleDoorLimit: '', // 企业单户额度
          loanMode: '', // 还款方式
          operatingMode: '', // 运营模式
          modelSet: '', // 模型设定
          monthAccrualMode: '', // 月息方式
          yearModel: '',  // 年模型
          loanDayMode: '',  // 还款日规则
          loanDay: '',  // 还款日
          overdueCountMode: '', // 逾期计算方式
          dayOverduePenaltyRatio: '', // 逾期利率
          dayOverdueManageFee: '',  // 逾期管理费
          overdueExtendDays: '',  // 逾期宽限天数
//          penaltyCountMode: '', // 罚息计算方式
//          penaltyDayRatio: '',  // 罚息利率
          isUpRepay: '',  // 是否允许提前还款
          upRepayPenaltyCountMode: '',  // 提前还款违约金计算方式
          upRepayPenaltyRatio: '',  // 提前还款违约金比例
          upRepayCountDays: '', // 提前还款利息不足天数
          upRepayMinCountDays: '',  // 提前还款利息最低天数
          depositReleaseMode: '', // 保证金释放方式
          creditLimitReleaseMode: '', // 授信释放方式
          serviceFeeType: '', // 租赁服务费收取方式
          carInsurance: '', // 车辆保险费
          dqxInsurance: '', // 盗抢险
          loanPaymentType: '', // 放款方式
          warrantType: '' // 权证入库方式
        },
        formInModel: {  // 增删的模态框的数据表单
//          bizType: '',  // 车类
          custLevel: '', // 客户等级
          loanPeriods: '',  // 贷款期限
          interestType: '',  // 利率模式
          loanNominalRate: '',  // 贷款名义利率
          loanRealRate: ''  // 贷款实际利率
        },
        // 费用收取列表
        costdata: [],
        packageRateNo: ''
      };
    },
    async mounted() {
      this.$data.ProductPackageForm.packageNo = this.childMsg.packageNo;
      if (!this.isParentAdd) {
        await this.getFormList();  // 获取表单数据
        this.getPrivateCustomerList();  // 获取模态框列表数据
      }
    },
    methods: {
      /******************************************************************************************/
      // 查询列表数据
      async getPrivateCustomerListZFLV() {
        this.$data.ZFLVdataLoading = true;
        let resp = await this.$http.get('/pms/productRate/fundRateList', {
          packageRateNo: this.zfClickRow.packageRateNo
        });
        this.$data.ZFLVdataLoading = false;
        if (resp.success) {
          this.$data.dataZFLV = resp.body;
        } else {
          this.$data.dataZFLV = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmitZFLV() {
        let resAdd = await this.$http.post('/pms/productRate/fundRateSave', {
          packageRateNo: this.zfClickRow.packageRateNo,
          capitalName: this.$data.rateForm.capitalName, // 出资方
          capitalNo: this.$data.rateForm.capitalNo, // 出资方NO
          nominalRate: this.$data.rateForm.nominalRate, // 名义利率
          realRate: this.$data.rateForm.realRate // 名义利率
        });
        this.$data.ZFLVbtnLoading = false; // 关闭按钮的loading状态
        this.$data.ZFLVshowAddModal = false;
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerListZFLV();
        }
      },
      addModalOpenZFLV() {
        this.isAddZFLV = true;
        this.$data.ZFLVshowAddModal = true;
        this.$data.rateForm = {};
      },
      setListZFLV(row) {
        this.isAddZFLV = false;
        this.$data.ZFLVshowAddModal = true;
        this.rateForm = row;
      },
      // 修改情况下的提交数据
      async setSubmitZFLV() {
        let fundRateNo = this.rateForm.fundRateNo;
        let resModify = await this.$http.post('/pms/productRate/fundRateModify', {
          fundRateNo,
          packageRateNo: this.zfClickRow.packageRateNo,
          capitalNo: this.$data.rateForm.capitalNo,
          capitalName: this.$data.rateForm.capitalName, // 出资方
          nominalRate: this.$data.rateForm.nominalRate, // 名义利率
          realRate: this.$data.rateForm.realRate // 名义利率
        });
        this.$data.ZFLVshowAddModal = false;
        this.$data.ZFLVbtnLoading = false;
        if (resModify.success) {
          this.$Message.success('修改成功');
          this.getPrivateCustomerListZFLV();
        }
      },
      // 删除数据的请求
      async removeZFLV(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let fundRateNo = row.fundRateNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/productRate/fundRateRemove', {
              fundRateNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerListZFLV();
            }
          }
        });
      },
      // 新增模态框的保存按钮点击事件
      formSubmitZFLV() {
        this.$data.ZFLVbtnLoading = true;
        // 如果是新增
        if (this.isAddZFLV) {
          this.addSuBmitZFLV();
        } else {
          this.setSubmitZFLV();
        }
      },
      /****************************************************************************************/
      // 选择资方 将数据传给子组件
      async selectCapital(row, index) {
        this.$data.rateForm.capitalNo = await row.capitalNo;
        this.$data.rateForm.capitalName = await row.capitalName;
        this.$data.showSelectCapital = false;
      },
      // 获取表单数据
      async getFormList() {
        let productNo = this.childMsg.productNo;
        let urlStr = '';
        let dataObj = {};
        let ind = 0;
        // 新增情况
        if (this.isParentAdd) {
          urlStr = '/pms/productPackage/list';
          ind = this.childMsg._index;
          dataObj = { productNo };
        } else {
          urlStr = '/pms/productPackage/edit';
          dataObj = {
            productNo,
            productPackageNo: this.childMsg.packageNo
          };
          ind = 0;
        }
        let resp = await this.$http.get(urlStr, dataObj);
        // console.log(JSON.stringify(resp));
        if (resp.success && resp.body.length !== 0) {
          let dataObject = resp.body[ind];
          for (let item in dataObject) {
            (dataObject[item] !== null) ? (dataObject[item] = dataObject[item] + '') : (dataObject[item] = '');
          }
          this.$data.ProductPackageForm = dataObject;
        } else {
        }
      },
      // 获取模态框列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.get('/pms/productRate/list', {
          productNo: this.childMsg.productNo,
          packageNo: this.$data.ProductPackageForm.packageNo // 套餐编号
        });
        // console.log(JSON.stringify(resp));
        this.$data.dataLoading = false;
        if (resp.success) {
          let formData = resp.body.resultList;
          this.$data.data1 = formData;
        } else {
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        this.$data.buttonLoading = true;
        let productNo = this.childMsg.productNo;
        let resAdd = await this.$http.post('/pms/productRate/save', {
          productNo, // 产品编号
          packageNo: this.$data.ProductPackageForm.packageNo, // 套餐编号
          ...this.$data.formInModel
        });
        this.$data.buttonLoading = false;
        this.$data.showAdd = false;
        this.getPrivateCustomerList();  // 获取模态框列表数据
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      addModal() {
        this.isAdd = true;
        this.$data.formInModel = {};
        this.$data.showAdd = true;
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAdd = true;
        this.formInModel = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        this.$data.buttonLoading = true;
        let resModify = await this.$http.post('/pms/productRate/modify', {
          productNo: this.childMsg.productNo, // 产品编号
          packageNo: this.$data.ProductPackageForm.packageNo, // 套餐编号
          packageRateNo: this.formInModel.packageRateNo,
//          bizType: this.formInModel.bizType, // 车类
          custLevel: this.formInModel.custLevel, // 客户等级
          loanPeriods: this.formInModel.loanPeriods, // 贷款期限
          loanNominalRate: this.formInModel.loanNominalRate, // 贷款名义利率
          loanRealRate: this.formInModel.loanRealRate // 贷款实际利率
        });
        this.$data.buttonLoading = false;
        this.$data.showAdd = false;
        if (resModify.success) {
          this.$data.showAddModal = false;
          this.$Message.success('修改成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/productRate/remove', {
              packageRateNo: row.packageRateNo // 套餐编号
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      // 提交表单
      async formDataAdd() {
        this.$data.btnLoading = true;
        let DataObj = {
          productNo: this.childMsg.productNo,
          productName: this.childMsg.productName,
          ...this.$data.ProductPackageForm
        };
        let resAdd = await this.$http.post('/pms/productPackage/save', DataObj);
        this.$data.btnLoading = false;
        if (resAdd.success) {
          this.$Message.success('套餐信息配置成功');
          this.formCancel();
          // this.getFormList();  // 获取表单数据
        }
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        this.$refs['ProductPackageForm'].validate((valid) => {
          if (valid) {
            this.formDataAdd();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 告知父组件关闭利率配置窗口
      formCancel() {
        this.$emit('notice-lilv');// 通知其父组件执行自定义事件“notice-lilv”
      },
      formInSubmit() {
        if (this.isAdd) {
          this.addSuBmit();
        } else {
          this.setSubmit();
        }
      },
      formInCancel() {
        this.$data.showAdd = false;
        this.modelFOrmReset();
      },
      // 打开资方模态框
      async openZF(row) {
        this.$data.zfClickRow = {};
        this.$data.zfClickRow = await row;
        this.$data.zfLilvModel = true;
        this.getPrivateCustomerListZFLV();  // 获取模态框-资方利率表数据
      },
      modelFOrmReset() {
        this.$data.formInModel = {};
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#conf-model-lilv {
  & .col-inline {
    & .ivu-form-item {
      display: inline-block;
    }
  }
}
</style>
