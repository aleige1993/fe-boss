<template>
  <div id="personal-basic" style="position: relative">
    <!--客户信息组件-->
    <personal-info :readonly="readonly" v-if="customerType == '1'" :memberNo="memberNo" @getMember="getMember"></personal-info>
    <company-customer-info :readonly="readonly" v-if="customerType == '2'" :corpNo="memberNo" @on-select-company="selectCompany"></company-customer-info>
    <i-form ref="formData" :model="formData" label-position="right" :label-width="160">
      <!--申请信息-->
      <bs-form-block :title="'申请信息'">
        <i-row>
          <!--产品名称-->
          <i-col span="8">
            <i-form-item
              label="产品名称"
              :rules="{required: true, message: '产品不能为空'}"
              prop="productNo">
              <input type="hidden" v-model="formData.productNo"/>
              <i-input v-model="formData.productName" :readonly="true" placeholder="选择产品">
                <i-button v-if="loanAction=='apply'" @click="showSelectProduct=!showSelectProduct" slot="append">选择产品 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
          <!--产品类别-->
          <i-col span="8">
            <i-form-item label="产品类别">
              <i-input :readonly="true" :value="enumCode2Name(formData.productType, 'ProductTypeEnum')"></i-input>
            </i-form-item>
          </i-col>
          <!--车类-->
          <i-col span="8">
            <i-form-item label="车类"
                         prop="carType"
                         :rules="{required: true, message: '请选择', trigger: 'change'}">
              <i-select v-model="formData.carType" :disabled="loanAction!='apply'">
                <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="客户性质"
                         prop="custKind"
                         :rules="{required: true, message: '请选择'}">
              <i-select v-model="formData.custKind" :disabled="readonly">
                <i-option v-for="item in enumSelectData.get('CustomTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--车辆价格-->
          <i-col span="8">
            <i-form-item label="车辆价格" prop="carBuyAmt">
              <i-input v-model="formData.carBuyAmt" :readonly="readonly" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请金额-->
          <i-col span="8">
            <i-form-item label="申请金额" prop="applyAmt"
                         :rules="{required: true, message: '请输入申请金额'}">
              <i-input v-model="formData.applyAmt" :readonly="readonly" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--申请时间-->
          <i-col span="8">
            <i-form-item label="申请时间" prop="applyTime">
              <bs-datepicker :readonly="readonly" v-model="formData.applyTime" format="yyyy-MM-dd" type="date" placeholder="申请时间" style="width: 100%"></bs-datepicker>
            </i-form-item>
          </i-col>
          <!--申请期限-->
          <i-col span="8">
            <i-form-item label="申请期限" prop="applyPeriods"
                         :rules="{required: true, message: '请输入申请期限'}">
              <i-input v-model="formData.applyPeriods" :readonly="readonly" placeholder="">
                <span slot="append">月</span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--首付或保证金意向-->
          <i-col span="8">
            <i-form-item label="首付或保证金意向" prop="depositOrDownPayment">
              <i-input v-model="formData.depositOrDownPayment" :readonly="readonly" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--车辆用途-->
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="车辆用途" prop="carUse">
              <i-select v-model="formData.carUse" :disabled="readonly">
                <!--车辆用途 CarUseTypeEnum 1-自用2-指定第三方自用3-商用-->
                <i-option v-for="item in enumSelectData.get('CarUseTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="贷款实际用途" prop="loanUse"
                         :rules="{required: true, message: '请输入贷款实际用途'}">
              <i-input :readonly="readonly" v-model="formData.loanUse"></i-input>
            </i-form-item>
          </i-col>
          <i-col span="8" v-if="formData.loandType!=='1'">
            <i-form-item label="经销商" prop="merchantAbbr">
              <input type="hidden" v-model="formData.merchantAbbr"/>
              <i-input v-model="formData.merchantAbbr" :readonly="true" placeholder="选择经销商">
                <i-button v-if="!readonly" @click="distributorClick" slot="append">选择经销商 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="8" v-else>
            <i-form-item label="经销商"
                         prop="merchantAbbr"
                         :rules="{required: true, message: '请选择经销商'}">
              <input type="hidden" v-model="formData.merchantAbbr"/>
              <i-input v-model="formData.merchantAbbr" :readonly="true" placeholder="选择经销商">
                <i-button v-if="!readonly" @click="distributorClick" slot="append">选择经销商 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--提交申请地点-->
          <i-col span="8">
            <i-form-item label="提交申请地点" prop="applicationPlace">
              <i-input v-model="formData.applyAddress" placeholder="" :readonly="true">
              </i-input>
            </i-form-item>
          </i-col>
          <!--经度-->
          <i-col span="8">
            <i-form-item label="经度" prop="lon">
              <i-input v-model="formData.longitude" placeholder="" :readonly="true">
              </i-input>
            </i-form-item>
          </i-col>
          <!--纬度-->
          <i-col span="8">
            <i-form-item label="纬度" prop="lat">
              <i-input v-model="formData.latitude" placeholder="" :readonly="true">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--选择渠道商-->
          <i-col span="8">
            <i-form-item label="渠道商" prop="channelName">
              <input type="hidden" v-model="formData.channelName"/>
              <i-input v-model="formData.channelName" :readonly="true" placeholder="选择渠道商">
                <i-button v-if="!readonly" @click="merchantClick" slot="append">选择渠道商 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
          <!--渠道商编号-->
          <i-col span="8">
            <i-form-item label="渠道商编号" prop="channelNo">
              <i-input v-model="formData.channelNo" placeholder="" :readonly="true"></i-input>
            </i-form-item>
          </i-col>
          <!--客户等级-->
          <i-col span="8">
            <i-form-item label="客户等级" prop="custLevel">
              <i-select :disabled="readonly" v-model="formData.custLevel"  @on-change="custLevelSelectChange">
                <i-option value="A">A</i-option>
                <i-option value="B">B</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item
              label="用款形式"
              :rules="{required: true, message: '请选择用款形式', trigger: 'change'}"
              prop="loandType">
              <i-select :disabled="readonly" v-model="formData.loandType">
                <i-option value="1">贷款买车</i-option>
                <i-option value="2">有车贷款</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row v-if="formData.provinceName">
          <i-col>
            <i-form-item label="投放城市">
              <span>
                {{formData.provinceName}}
                {{formData.cityName}}
              </span>
            </i-form-item>
          </i-col>
        </i-row>
      </bs-form-block>
    </i-form>
    <bs-form-block :title="'贷款准入规则'">
      <i-table :columns="accessRuleCol" :data="loanApproveRuleDTOS"></i-table>
    </bs-form-block>
    <!--车辆信息-->
    <bs-form-block :title="'车辆信息'">
      <div class="form-top-actions" v-if="!readonly">
        <i-button @click="openModalCar" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
    </bs-form-block>
    <!--担保信息-->
    <bs-form-block :title="'担保信息'">
      <div class="form-top-actions" v-if="!readonly">
        <i-button @click="openModalAssure" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table :loading="assureDataLoading" border ref="selection" :columns="assureColumns" :data="assureData"></i-table>
    </bs-form-block>
    <!--贷款材料清单-->
    <bs-form-block :title="'贷款材料清单'">
      <div class="form-top-actions" v-if="!readonly">
        <i-button @click="addLoanFIleGroup" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <!--<i-table :loading="loanDataLoading" border ref="selection" :columns="loanColumns" :data="loanData"></i-table>-->
      <loan-file-list v-for="(item, index) in loanData" :key="index" :readonly="readonly"
                      :group-index="index" v-model="loanData[index]"
                      @on-group-remove="deleteloanFileGroup">
      </loan-file-list>
    </bs-form-block>
    <!--审核意见-->
    <i-form v-if="!readonly && formData.loanChannel !== '3' && loanAction === 'apply'" ref="formApplyOpinion" :model="formData" label-position="right" :label-width="160">
      <bs-form-block title="审核意见" >
        <i-row>
          <i-col span="18">
            <i-form-item label="结论" prop="result" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
              <i-radio-group v-model="formData.result">
                <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
              </i-radio-group>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item
              v-if="formData.result === 'R'"
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
          <i-col span="18">
            <i-form-item label="意见信息" prop="opinion" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
              <i-input type="textarea" v-model="formData.opinion" :rows="4"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </bs-form-block>
    </i-form>
    <!--选择产品的弹窗-->
    <bs-modal title="选择产品" :width="1200" v-model="showSelectProduct">
      <table-product-list v-if="showSelectProduct" :type="'modal'" @on-row-dbclick="selectProduct"></table-product-list>
    </bs-modal>
    <!--车辆信息的新增修改模态框-->
    <bs-modal :title="isAddCar ? '新增' : '编辑'" v-model="showModalCar" :width="1200">
      <i-form ref="formCar" :model="formCar" label-position="right" :label-width="140">
        <i-row>
          <i-col span="8">
            <i-form-item
              label="担保类型"
              :rules="{required: true, message: '担保类型不能为空'}"
              prop="guaranteeType">
              <i-select v-model="formCar.guaranteeType">
                <i-option v-for="item in enumSelectData.get('PawnTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item
              label="权利人类型"
              :rules="{required: true, message: '权利人类型不能为空'}"
              prop="custType">
              <i-select v-model="formCar.custType">
                <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--权利人-->
          <i-col span="8" v-if="formCar.custType=='1' || formCar.custType=='2'">
            <i-form-item
              label="权利人"
              :rules="{required: true, message: '权利人不能为空'}"
              prop="carOwnerNo">
              <input type="hidden" v-model="formCar.carOwnerNo"/>
              <i-input v-if="formCar.custType=='1'" v-model="formCar.carOwnerName" :readonly="true" placeholder="选择权利人">
                <i-button @click="showSelectObligee=!showSelectObligee" slot="append">选择权利人 <Icon type="ios-more"></Icon></i-button>
              </i-input>
              <i-input v-if="formCar.custType=='2'" v-model="formCar.carOwnerName" :readonly="true" placeholder="选择企业权利人">
                <i-button @click="showSelectCompanyOwner=!showSelectCompanyOwner" slot="append">选择企业权利人 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8">
            <i-form-item label="车牌号" prop="carPlateNo">
              <i-input v-model="formCar.carPlateNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="是否临时车牌" prop="isTmpPlate">
              <i-select v-model="formCar.isTmpPlate">
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
              prop="carModel">
              <!--:rules="{required: true, message: '车辆品牌不能为空'}"
              -->
              <input type="hidden" v-model="formCar.carModel">
              <bs-carpicker :currBrand="formCar.carBrandName"
                            :currSeries="formCar.carTypeName"
                            :currModel="formCar.carModel"
                            @on-change="selectLoanCar">
              </bs-carpicker>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--车辆颜色-->
          <i-col span="8">
            <i-form-item label="车辆颜色" prop="carColor">
              <i-select v-model="formCar.carColor">
                <i-option v-for="item in enumSelectData.get('CarColorEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--排量-->
          <i-col span="8">
            <i-form-item label="排量" prop="carOutputVolume">
              <i-input v-model="formCar.carOutputVolume" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--排放标准-->
          <i-col span="8">
            <i-form-item label="排放标准" prop="carOutputStand">
              <i-input v-model="formCar.carOutputStand" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--生产厂商-->
          <i-col span="8">
            <i-form-item label="生产厂商" prop="carVendor">
              <i-input v-model="formCar.carVendor" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--发动机号-->
          <i-col span="8">
            <i-form-item label="发动机号" prop="carEngineNo">
              <i-input v-model="formCar.carEngineNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--车架号-->
          <i-col span="8">
            <i-form-item label="车架号" prop="carFrameNo">
              <i-input v-model="formCar.carFrameNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--出厂日期-->
          <i-col span="8">
            <i-form-item label="出厂日期" prop="carBirthday">
              <bs-datepicker v-model="formCar.carBirthday" placeholder="出厂日期"></bs-datepicker>
            </i-form-item>
          </i-col>
          <!--上牌城市-->
          <i-col span="8">
            <i-form-item label="上牌城市" prop="carOnCity">
              <i-input v-model="formCar.carOnCity" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--上牌时间-->
          <i-col span="8">
            <i-form-item label="上牌时间" prop="carOnDate">
              <bs-datepicker v-model="formCar.carOnDate" placeholder="申请时间"></bs-datepicker>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--过户次数-->
          <i-col span="8">
            <i-form-item label="过户次数" prop="carTransferCount">
              <i-input v-model="formCar.carTransferCount" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--抵押次数-->
          <i-col span="8">
            <i-form-item label="抵押次数" prop="carGuaCount">
              <i-input v-model="formCar.carGuaCount" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--行驶里程-->
          <i-col span="8">
            <i-form-item label="行驶里程" prop="carMileage">
              <i-input v-model="formCar.carMileage" placeholder="">
                <span slot="append">KM</span>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--合格证号-->
          <i-col span="8">
            <i-form-item label="合格证号" prop="carCertNo">
              <i-input v-model="formCar.carCertNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--车辆状况-->
          <i-col span="8">
            <i-form-item
              label="车辆状况"
              prop="carStatus">
              <i-select v-model="formCar.carStatus">
                <i-option v-for="item in enumSelectData.get('CarConditionEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--有无事故-->
          <i-col span="8">
            <i-form-item label="有无事故" prop="carIsFault">
              <i-select v-model="formCar.carIsFault">
                <i-option v-for="item in enumSelectData.get('HaveNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--机动车登记证书号-->
          <i-col span="8">
            <i-form-item label="机动车登记证书号" prop="carRegNo">
              <i-input v-model="formCar.carRegNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--是否挂靠-->
          <i-col span="8">
            <i-form-item label="是否挂靠" prop="carIsAnchored">
              <i-select v-model="formCar.carIsAnchored">
                <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--发票开具单位-->
          <i-col span="8">
            <i-form-item label="发票开具单位" prop="billCorpName">
              <i-input v-model="formCar.billCorpName" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--发票号-->
          <i-col span="8">
            <i-form-item label="发票编号" prop="billNo">
              <i-input v-model="formCar.billNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--发票价格-->
          <i-col span="8">
            <i-form-item label="发票价格" prop="billAmt">
              <i-input v-model="formCar.billAmt" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--厂商指导价-->
          <i-col span="8">
            <i-form-item label="厂商指导价" prop="carGuidePrice">
              <i-input v-model="formCar.carGuidePrice" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--车辆购买价格-->
          <i-col span="8">
            <i-form-item label="车辆购买价格" prop="carBuyPrice">
              <i-input v-model="formCar.carBuyPrice" placeholder="">

                <span slot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--车辆价值-->
          <i-col span="8">
            <i-form-item label="车辆价值" prop="carEvaluatePrice">
              <i-input v-model="formCar.carEvaluatePrice" placeholder="">
                <span slot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <!--车辆评估-->
        <!--<i-row v-if="formData.carType == '2' && loanAction !== 'apply'">-->
        <i-row v-if="formData.carType == '2'">
          <i-col span="24">
            <!--此处暂时不做添加按钮，2018.02.05的需求更改。但添加修改的交互方法未删-->
            <!--<div class="form-top-actions">
              <i-button type="primary" @click="showAddCarEvalModal">添加车辆评估信息</i-button>
            </div>-->
            <br>
            <br>
            <i-table :columns="carEvalColumns" :data="formCar.loanCarEvalDTOList"></i-table>
          </i-col>
        </i-row>
        <br>
        <br>
        <i-form-item class="text-right">
          <i-button type="primary" @click="carSuBmit">提交</i-button>
        </i-form-item>
      </i-form>

    </bs-modal>
    <!--担保信息的新增修改模态框-->
    <bs-modal :title="isAddAssure ? '新增' : '编辑'" v-model="showModalAssure" :width="800">
      <i-form v-if="showModalAssure" ref="formAssure" :model="formAssure" label-position="right" :label-width="120">
        <i-row>
          <i-col span="12">
            <i-form-item label="担保人类型" prop="guaPersonType"
                         :rules="{required: true, message: '请选择担保人类型'}">
              <i-select v-model="formAssure.guaPersonType">
                <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item :label="formAssure.guaPersonType==''? '':'保证人'" prop="guaPersonName"
              :rules="{required: true, message: '请选择担保人'}">
              <input type="hidden" v-model="formAssure.guaPersonCertNo" placeholder=""/>
              <input type="hidden" v-model="formAssure.guaPersonNo" placeholder=""/>
              <input type="hidden" v-model="formAssure.guaPersonName"/>
              <i-input v-if="formAssure.guaPersonType=='1'" v-model="formAssure.guaPersonName" :readonly="true" placeholder="选择保证人">
                <i-button @click="showSelectGua=!showSelectGua" slot="append">选择保证人 <Icon type="ios-more"></Icon></i-button>
              </i-input>
              <i-input v-if="formAssure.guaPersonType=='2'" v-model="formAssure.guaPersonName" :readonly="true" placeholder="选择企业保证人">
                <i-button @click="showSelectCompanyGua=!showSelectCompanyGua" slot="append">选择企业保证人 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--<i-col span="12">
            <i-form-item label="证件类型" prop="guaPersonType">
              <i-select :disabled="true" v-model="formAssure.guaPersonCertType">
                <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>-->
          <i-col span="12">
            <i-form-item label="联系电话" prop="guaPersonMobile">
              <i-input :readonly="true" v-model="formAssure.guaPersonMobile"></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="证件号码" prop="guaPersonName">
              <i-input :readonly="true" v-model="formAssure.guaPersonCertNo" placeholder=""></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="担保方式" prop="guaType">
              <i-select v-model="formAssure.guaType">
                <i-option v-for="item in enumSelectData.get('GuaranteeTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="与债务人关系" prop="relation">
              <i-select v-model="formAssure.relation">
                <i-option v-for="item in enumSelectData.get('RelativeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="12">
            <i-form-item label="联系地址" prop="guaPersonAddr">
              <i-input :readonly="true" v-model="formAssure.guaPersonAddr"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-form-item label="备注" prop="remark">
          <i-input type="textarea" :rows="2" v-model="formAssure.remark"></i-input>
        </i-form-item>

        <i-form-item class="text-right">
          <i-button type="primary" @click="assureSuBmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--贷款材料的新增修改模态框-->
    <bs-modal :title="isAddLoan ? '新增' : '编辑'" v-model="showModalLoan">
      <i-form v-if="showModalLoan" ref="formLoan" :model="formLoan" label-position="right" :label-width="100">
        <i-form-item label="贷款材料名称" prop="loanDocName">
          <i-input v-model="formLoan.loanDocName" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="备注" prop="remark">
          <i-input type="textarea" :rows="4" v-model="formLoan.remark"></i-input>
        </i-form-item>
        <i-form-item
          label="文件名"
          prop="attachPath">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadLoanFileSuccess"
            :on-error="uploadError"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0" v-if="!formLoan.attachPath || formLoan.attachPath === ''">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
            <p v-else class="show-upload-text" v-text="formLoan.attachPath"></p>
          </i-upload>
          <!--<p v-if="isAddLoan" class="show-upload-text" v-text="uploadFileName"></p>
          <p v-else class="show-upload-text" v-text="formLoan.attachPath"></p>-->
          <input type="hidden" v-model="formLoan.attachPath" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="LoanSuBmit">提交</i-button>
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
    <!--选择担保人的模态框-->
    <bs-modal :title="'选择权利人'" v-model="showSelectGua" :width="1200">
      <table-customer-list v-if="showSelectGua" ref="obligeeTable" type="modal" @on-row-dbclick="selectGuaRow"></table-customer-list>
    </bs-modal>
    <!--选择企业担保人的模态框-->
    <bs-modal :title="'选择企业权利人'" v-model="showSelectCompanyGua" :width="1200">
      <table-company-customer-list v-if="showSelectCompanyGua" ref="obligeeTable" type="modal" @on-row-dbclick="selectCompanyGuaRow"></table-company-customer-list>
    </bs-modal>
    <!--选择渠道商-->
    <bs-modal :title="isDistributor?'选择经销商':'选择渠道商'" v-model="showSelectDistributor" :width="1200">
      <table-distributor-list v-if="showSelectDistributor" ref="distributorTable" type="modal" @on-row-dbclick="selectDistributor"></table-distributor-list>
    </bs-modal>
    <!--车辆评估信息新增和编辑-->
    <bs-modal :title="isAddCarEval ? '添加车辆评估' : '修改车辆评估'" v-model="showCarEvalFormModal" :width="500">
      <i-form v-if="showCarEvalFormModal" ref="formCarEval" :model="formCarEval" label-position="right" :label-width="120">
        <i-row>
          <i-col span="24">
            <i-form-item label="第三方评估商名称" prop="evalProviderName"
                         :rules="{required: true, message: '请选择第三方评估商名称'}">
              <i-input v-model="formCarEval.evalProviderName"></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item label="抵押估价" prop="guarantyAmt"
                         :rules="{required: true, message: '请选择抵押估价'}">
              <i-input v-model="formCarEval.guarantyAmt">
                <span alot="append">元</span>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item label="质押估价" prop="pledgeAmt"
                         :rules="{required: true, message: '请输入质押估价'}">
              <i-input v-model="formCarEval.pledgeAmt"><span alot="append">元</span></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item label="车商收购价" prop="merchantBuyAmt"
                         :rules="{required: true, message: '请输入车商收购价'}">
              <i-input v-model="formCarEval.merchantBuyAmt"><span alot="append">元</span></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item label="个人交易价" prop="individualSaleAmt"
                         :rules="{required: true, message: '请输入个人交易价'}">
              <i-input v-model="formCarEval.individualSaleAmt"><span alot="append">元</span></i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item label="评估方式" prop="evalType"
                         :rules="{required: true, message: '请选择第三方评估商名称'}">
              <i-select v-model="formCarEval.evalType">
                <i-option value="1">手工</i-option>
                <i-option value="2">自动</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="24">
            <i-form-item>
              <i-button @click="submitCarEval" type="primary">提交</i-button>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </bs-modal>
    <!--上传/查看车辆图片-->
    <bs-modal :title="readonly?'查看车辆图片':'上传/查看车辆图片'" v-model="seeCarPictureModal" :width="1200" @on-close="emptyCarRowPic">
      <car-picture-list v-if="seeCarPictureModal" :data="loanCarPicVOListModalData" @on-data-remove="carDataRomove"  @on-data-add="carDataAdd" :isDetails="readonly"></car-picture-list>
      <div class="form-top-actions text-center">
        <i-button type="primary" @click="seeCarPictureModal = false" style="width: 120px;">确定</i-button>
      </div>
    </bs-modal>
    <i-spin fix v-if="initApplyInfoLoading"></i-spin>
  </div>
</template>

<script>
  import LoanFileList from '../loan-file-list/index.vue';
  import CarPictureList from '../car-picture-list/index.vue';
  import TableCustomerList from '@/components/table-customer-list'; // 选择客户列表
  import TableCompanyCustomerList from '@/components/table-company-customer-list'; // 选择客户列表
  import GetProductModal from '@/pages/configuration-manage/manage-product/product-list'; // 选择产品
  import personalInfo from '@/components/detail-personal-customer-basic/index.vue';
  import companyCustomerInfo from '@/components/detail-company-customer-basic/index.vue';
  import TableDistributorList from '@/components/table-distributor-list/index.vue';
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import carMixinData from './car-mixin-data';
  import carMixinMethods from './car-mixin-methods';
  import assureMixinData from './assure-mixin-data';
  import assureMixinMethods from './assure-mixin-methods';
  import loanMixinData from './loan-mixin-data';
  import loanMixinMethods from './loan-mixin-methods';
  import BsCarpicker from '@/components/bs-carpicker';
  export default {
    name: 'loanAcceptBasicInfo',
    mixins: [MixinData, MixinMethods, carMixinData, carMixinMethods, assureMixinData, assureMixinMethods, loanMixinData, loanMixinMethods],
    data() {
      return {
        carInfoDataIndex: 0, // 车辆信息表的单机的当前索引
        loanCarPicVOListModalData: [],
        carListRowData: {}, // 点击“查看/上传车辆图片”按钮时当前行的车辆数据
        isDistributor: false, // 选择渠道商弹窗是否显示为“选择经销商”
        seeCarPictureModal: false // 上传/查看车辆图片弹窗
      };
    },
    components: {
      TableCustomerList,
      TableCompanyCustomerList,
      personalInfo,
      companyCustomerInfo,
      'table-product-list': GetProductModal,
      'bs-modal': BsModal,
      'bs-carpicker': BsCarpicker,
      LoanFileList,
      CarPictureList,
      TableDistributorList
    },
    props: {
      customerType: String,
      applyBasicInfo: {
        type: Object,
        required: false,
        default: null
      },
      readonly: {
        type: Boolean,
        default: false,
        required: false
      },
      loanAction: {
        type: String,
        required: false,
        default: 'apply' // 'preApprove'; 'firstStageApprove'; 'secondStageApprove'; 'detail'
      }
    },
    mounted() {
      this.initPage();
    },
    methods: {
      // 更改了用户等级后，需要重新加载用信方案(重新调用接口-queryApproveProductCredit)
      custLevelSelectChange(val) {
        this.$emit('on-approve-info', val);
      },
      // 模态框关闭后清楚组件内车辆图片数据
      emptyCarRowPic() {
        this.$data.loanCarPicVOListModalData = [];
      },
      // 删除车辆图片
      carDataRomove(index) {
        let ind = this.carListRowData._index;
        this.$data.carData[ind].loanCarPicVOList.splice(index, 1);
      },
      // 添加车辆图片
      carDataAdd(dataList) {
        let ind = this.carListRowData._index;
        if (!this.$data.carData[ind].loanCarPicVOList) {
          this.$data.carData[ind].loanCarPicVOList = [];
        }
        this.$data.carData[ind].loanCarPicVOList && this.$data.carData[ind].loanCarPicVOList.push({
          'loanCarNo': this.$data.carListRowData.loanCarNo,
          'loanNo': this.$data.carListRowData.loanNo,
          'carPicName': dataList.carPicName,
          'carPicUrl': dataList.carPicUrl
        });
      },
      // 点击的时“选择经销商”按钮
      distributorClick() {
        this.$data.showSelectDistributor = true;
        this.$data.isDistributor = true;
      },
      // 点击的时“选择渠道商”按钮
      merchantClick() {
        this.$data.showSelectDistributor = true;
        this.$data.isDistributor = false;
      }
    },
    watch: {
      'formCar.custType'(newVal, oldVal) {
        if (oldVal !== '') {
          this.$data.formCar.carOwnerName = '';
          this.$data.formCar.carOwnerNo = '';
        }
      },
      'customerType'() {
        this.initPage();
      }
    }
  };
</script>
<style lang="scss" scoped>

</style>
