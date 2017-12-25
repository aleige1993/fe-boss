<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>业务审批</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false" style="padding-bottom: 46px;">
      <i-tab-pane :label="'基本信息'">
        <i-form ref="formData" :model="formData" label-position="right" :label-width="160">
          <!--申请信息-->
          <bs-form-block :title="'申请信息'">
            <i-row>
              <!--产品名称-->
              <i-col span="8">
                <i-form-item label="产品名称">
                  <input type="hidden" v-model="formData.productNo"/>
                  <i-input v-model="formData.productName" :readonly="true"></i-input>
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
                <i-form-item label="车类">
                  <i-select :disabled="true" v-model="formData.carType">
                    <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="客户性质">
                  <i-select :disabled="true" v-model="formData.custKind">
                    <i-option :value="'1'">新增客户</i-option>
                    <i-option :value="'2'">结清再贷</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--车辆价格-->
              <i-col span="8">
                <i-form-item label="车辆价格">
                  <i-input :readonly="true" v-model="formData.carBuyAmt" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--申请金额-->
              <i-col span="8">
                <i-form-item label="申请金额">
                  <i-input :readonly="true" v-model="formData.applyAmt" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <!--申请时间-->
              <i-col span="8">
                <i-form-item label="申请时间" prop="applyTime">
                  <i-input v-model="formData.applyTime" :readonly="true" placeholder="申请时间" style="width: 100%"></i-input>
                </i-form-item>
              </i-col>
              <!--申请期限-->
              <i-col span="8">
                <i-form-item label="申请期限" prop="applyPeriods">
                  <i-input :readonly="true" v-model="formData.applyPeriods" placeholder="">
                    <span slot="append">月</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--首付或保证金意向-->
              <i-col span="8">
                <i-form-item label="首付或保证金意向" prop="depositOrDownPayment">
                  <i-input :readonly="true" v-model="formData.depositOrDownPayment" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--车辆用途-->
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="车辆用途" prop="carUse">
                  <i-option v-for="item in enumSelectData.get('CarUseTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
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
              <!--提交申请地点-->
              <i-col span="8">
                <i-form-item label="提交申请地点" prop="applicationPlace">
                  <i-input v-model="formData.apply_address" placeholder="" :readonly="true">
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--客户信息组件-->
          <personal-info v-if="customerType == '1'" :readonly="true" :memberNo="memberNo"></personal-info>
          <company-customer-info v-if="customerType == '2'" :readonly="true" :corpNo="corpNo"></company-customer-info>
          <!--车辆信息-->
          <bs-form-block :title="'车辆信息'">
            <div class="form-top-actions">
              <i-button @click="openModalCar" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
            </div>
            <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
          </bs-form-block>
          <!--担保信息-->
          <bs-form-block :title="'担保信息'">
            <div class="form-top-actions">
              <i-button @click="openModalAssure" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
            </div>
            <i-table :loading="assureDataLoading" border ref="selection" :columns="assureColumns" :data="assureData"></i-table>
          </bs-form-block>
          <!--贷款材料清单-->
          <bs-form-block :title="'贷款材料清单'">
            <div class="form-top-actions">
              <i-button @click="openModalLoan" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
            </div>
            <i-table :loading="loanDataLoading" border ref="selection" :columns="loanColumns" :data="loanData"></i-table>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'">
        <approve-info v-if="tabIndex == 1"></approve-info>
      </i-tab-pane>
      <i-tab-pane label="人行征信报告">
        <iframe v-if="tabIndex == 2" src="http://www.baidu.com" width="100%" :height="iframeHeight" frameborder="0"></iframe>
      </i-tab-pane>
      <i-tab-pane label="芝麻信用报告">
        <iframe v-if="tabIndex == 3" src="http://www.songchedai.com" width="100%" :height="iframeHeight" frameborder="0"></iframe>
      </i-tab-pane>
      <i-tab-pane label="大数据信息">
        <tab-big-data v-if="tabIndex == 4"></tab-big-data>
      </i-tab-pane>
      <i-tab-pane :label="'审核历史意见'">
        <approve-history v-if="tabIndex == 5"></approve-history>
      </i-tab-pane>
    </i-tabs>
    <div class="form-footer-actions">
      <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
        <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
        <span v-else> loading...</span>
      </i-button>
    </div>

    <!--车辆信息的新增修改模态框-->
    <bs-modal :title="isAddCar ? '新增' : '编辑'" v-model="showModalCar" :width="1200">
      <i-form v-if="showModalCar" ref="formCar" :model="formCar" label-position="right" :label-width="120">
        <i-row>
          <i-col span="8">
            <i-form-item
                label="担保类型"
                :rules="{required: true, message: '担保类型不能为空', trigger: 'change'}"
                prop="guaranteeType">
              <i-select v-model="formCar.guaranteeType">
                <i-option value="1">抵押</i-option>
                <i-option value="2">质押</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item
                label="权利人类型"
                :rules="{required: true, message: '权利人类型不能为空', trigger: 'change'}"
                prop="custType">
              <i-select v-model="formCar.custType">
                <i-option value="1">个人</i-option>
                <i-option value="2">企业</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--权利人-->
          <i-col span="8">
            <i-form-item
                label="权利人"
                :rules="{required: true, message: '权利人不能为空', trigger: 'blur'}"
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
                :rules="{required: true, message: '车辆品牌不能为空'}"
                prop="carBrandCode">
              <input type="hidden" v-model="formCar.carModel">
              <bs-carpicker @on-change="selectLoanCar"></bs-carpicker>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <!--车辆颜色-->
          <i-col span="8">
            <i-form-item label="车辆颜色">
              <i-select v-model="formCar.carColor">
                <i-option value="1">米色</i-option>
                <i-option value="2">金色</i-option>
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
              <i-input v-model="formCar.carBirthday" placeholder="">
              </i-input>
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
              <bs-datepicker v-model="formCar.carOnDate" type="text" placeholder="申请时间"></bs-datepicker>
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
                <i-option value="1">优</i-option>
                <i-option value="2">良</i-option>
                <i-option value="3">中</i-option>
                <i-option value="4">差</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--有无事故-->
          <i-col span="8">
            <i-form-item label="有无事故" prop="carIsFault">
              <i-select v-model="formCar.carIsFault">
                <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
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
          <!--是否公牌-->
          <i-col span="8">
            <i-form-item label="是否挂靠" prop="carIsPubPlate">
              <i-select v-model="formCar.carIsPubPlate">
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
            <i-form-item label="发票开具单位" prop="billNo">
              <i-input v-model="formCar.billNo" placeholder="">
              </i-input>
            </i-form-item>
          </i-col>
          <!--发票价格-->
          <i-col span="8">
            <i-form-item label="发票价格" prop="billAmt">
              <i-input v-model="formCar.billAmt" placeholder="">
              </i-input>
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
        <i-form-item class="text-right">
          <i-button type="primary" @click="carSuBmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--担保信息的新增修改模态框-->
    <bs-modal :title="isAddAssure ? '新增' : '编辑'" v-model="showModalAssure" :width="800">
      <i-form ref="formAssure" :model="formAssure" label-position="right" :label-width="100">
        <i-row>
          <i-col span="12">
            <i-form-item label="担保人类型" prop="guaPersonType">
              <i-select v-model="formAssure.guaPersonType">
                <i-option value="1">个人</i-option>
                <i-option value="2">企业</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item label="保证人" prop="guaPersonName">
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
          <i-col span="12">
            <i-form-item label="担保方式" prop="guaType">
              <i-select v-model="formAssure.guaType">
                <i-option value="1">连带责任保证</i-option>
                <i-option value="2">一般保证</i-option>
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
      <i-form ref="formLoan" :model="formLoan" label-position="right" :label-width="100">
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
            <div style="padding: 20px 0" v-else class="show-upload-text" v-text="formLoan.attachPath"></div>
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
      <table-customer-list ref="obligeeTable" type="modal" @on-row-dbclick="selectObligeeRow"></table-customer-list>
    </bs-modal>
    <!--选择企业权利人的模态框-->
    <bs-modal :title="'选择企业权利人'" v-model="showSelectCompanyOwner" :width="1200">
      <table-company-customer-list ref="obligeeTable" type="modal" @on-row-dbclick="selectCompanyOwnerRow"></table-company-customer-list>
    </bs-modal>
    <!--选择担保人的模态框-->
    <bs-modal :title="'选择权利人'" v-model="showSelectGua" :width="1200">
      <table-customer-list ref="obligeeTable" type="modal" @on-row-dbclick="selectGuaRow"></table-customer-list>
    </bs-modal>
    <!--选择企业担保人的模态框-->
    <bs-modal :title="'选择企业权利人'" v-model="showSelectCompanyGua" :width="1200">
      <table-company-customer-list ref="obligeeTable" type="modal" @on-row-dbclick="selectCompanyGuaRow"></table-company-customer-list>
    </bs-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import PrivateCustomerList from '@/components/table-customer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsCarPicker from '@/components/bs-carpicker/index.vue';
  import personalInfo from '@/components/detail-personal-customer-basic/index.vue';
  import companyCustomerInfo from '@/components/detail-company-customer-basic/index.vue';
  import TabApproveInfo from './tab-approve-info/index.vue';
  import TabApproveHistory from './tab-approve-history/index.vue';
  import TabBigData from './tab-big-data/index.vue';
  import carMixinData from './car-mixin-data';
  import carMixinMethods from './car-mixin-methods';
  import assureMixinData from './assure-mixin-data';
  import assureMixinMethods from './assure-mixin-methods';
  import loanMixinData from './loan-mixin-data';
  import loanMixinMethods from './loan-mixin-methods';
  export default {
    name: '',
    mixins: [MixinData, carMixinData, carMixinMethods, assureMixinData, assureMixinMethods, loanMixinData, loanMixinMethods],
    data() {
      return {
        iframeHeight: 460,
        tabIndex: 1,
        initFormLoading: false,
        memberNo: '1',
        corpNo: '1'
      };
    },
    props: {
      customerType: {
        type: String,
        default: '1',
        required: false
      }
    },
    components: {
      personalInfo,
      companyCustomerInfo,
      TableCompanyCustomerList,
      BsModal,
      'bs-carpicker': BsCarPicker,
      'table-customer-list': PrivateCustomerList,
      'approve-info': TabApproveInfo,
      'approve-history': TabApproveHistory,
      'tab-big-data': TabBigData
    },
    methods: {
      // 选择权利人
      selectObligeeRow(row, index) {
        // console.log(row);
        this.$data.formCar.carOwnerName = row.name;
        this.$data.formCar.carOwnerNo = row.memberNo;
        this.$data.showSelectObligee = false;
      },
      selectCompanyOwnerRow(row, index) {
        this.$data.formCar.carOwnerName = row.corpName;
        this.$data.formCar.carOwnerNo = row.corpNo;
        this.$data.showSelectCompanyOwner = false;
      },
      // 选择担保人
      selectGuaRow(row, index) {
        // console.log(row);
        this.$data.formAssure.guaPersonCertNo = row.certNo;
        this.$data.formAssure.guaPersonNo = row.memberNo;
        this.$data.formAssure.guaPersonName = row.name;
        this.$data.showSelectGua = false;
      },
      selectCompanyGuaRow(row, index) {
        this.$data.formAssure.guaPersonCertNo = row.creditCode;
        this.$data.formAssure.guaPersonNo = row.corpNo;
        this.$data.formAssure.guaPersonName = row.corpName;
        this.$data.showSelectCompanyGua = false;
      }
    },
    mounted() {
      this.$data.iframeHeight = $(window).height() - 280;
    }
  };
</script>
<style lang="scss" scoped="">

</style>
