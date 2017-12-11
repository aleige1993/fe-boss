<template>
  <div id="personal-basic">
    <i-form ref="formData" :model="formData" label-position="right" :label-width="160">
      <!--申请信息-->
      <bs-form-block :title="'申请信息'">
        <i-row>
          <!--产品名称-->
          <i-col span="8">
            <i-form-item
              label="产品名称"
              :rules="{required: true, message: '产品不能为空', trigger: 'blur'}"
              prop="productName">
              <input type="hidden" v-model="formData.productName"/>
              <i-input v-model="formData.productNo" :readonly="true" placeholder="选择产品">
                <i-button @click="showSelectProduct=!showSelectProduct" slot="append">选择产品 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
          <!--产品类别-->
          <i-col span="8">
            <i-form-item label="产品类别">
              <span v-text="enumCode2Name(formData.productType, 'ProductTypeEnum')"></span>
            </i-form-item>
          </i-col>
          <!--车类-->
          <i-col span="8">
            <i-form-item label="车类"
                         prop="carType"
                         :rules="{required: true, message: '请选择',trigger: 'change'}">
              <i-select v-model="formData.carType">
                <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--车辆价格-->
          <i-col span="8">
            <i-form-item label="车辆价格" prop="carBuyAmt">
              <i-input v-model="formData.carBuyAmt" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请金额-->
          <i-col span="8">
            <i-form-item label="申请金额" prop="applyAmt">
              <i-input v-model="formData.applyAmt" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请期限-->
          <i-col span="8">
            <i-form-item label="申请期限" prop="applyPeriods">
              <i-input v-model="formData.applyPeriods" placeholder="">
                <span slot="月"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--首付或保证金意向-->
          <i-col span="8">
            <i-form-item label="首付或保证金意向" prop="depositOrDownPayment">
              <i-input v-model="formData.depositOrDownPayment" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--车辆用途-->
          <i-col span="8">
            <i-form-item label="车辆用途" prop="carUse">
              <i-select v-model="formData.carUse">
                <i-option value="1">自用</i-option>
                <i-option value="2">商用</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--申请时间-->
          <i-col span="8">
            <i-form-item label="申请时间" prop="applyTime">
              <i-date-picker format="yyyy-MM-dd" type="date" placeholder="申请时间" style="width: 100%"></i-date-picker>
            </i-form-item>
          </i-col>
          <!--经度-->
          <i-col span="8">
            <i-form-item label="经度" prop="lon">
              <i-input v-model="formData.lon" placeholder="" :readonly="formData.lon === ''">
              </i-input>
            </i-form-item>
          </i-col>
          <!--纬度-->
          <i-col span="8">
            <i-form-item label="纬度" prop="lat">
              <i-input v-model="formData.lat" placeholder="" :readonly="formData.lat === ''">
              </i-input>
            </i-form-item>
          </i-col>
          <!--提交申请地点-->
          <i-col span="8">
            <i-form-item label="提交申请地点" prop="applicationPlace">
              <i-input v-model="formData.applicationPlace" placeholder="" :readonly="formData.applicationPlace === ''">
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
      </bs-form-block>
    </i-form>
    <!--客户信息组件-->
    <personal-info :memberNo="memberNo" @getMember="getMember"></personal-info>
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

    <!--选择产品的弹窗-->
    <bs-modal title="选择产品" :width="1200" v-model="showSelectProduct">
      <table-product-list @on-row-dbclick="selectProduct"></table-product-list>
    </bs-modal>

    <!--点击图片放大模态框-->
    <i-modal v-model="visibleImg" cancel-text="" ok-text="关闭">
      <img :src="showImgUpUrl" style="width: 100%">
    </i-modal>
    <!--车辆信息的新增修改模态框-->
    <bs-modal :title="isAddCar ? '新增' : '编辑'" v-model="showModalCar">
      <i-form  ref="formCar" :model="formCar" label-position="right" :label-width="100">
        <i-form-item label="权利人类型" prop="custType">
          <i-select v-model="formCar.custType">
            <i-option value="1">个人</i-option>
            <i-option value="2">企业</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="权利人编号" prop="carOwnerNo">
          <i-input v-model="formCar.carOwnerNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="权利人名称" prop="carOwnerName">
          <i-input v-model="formCar.carOwnerName" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车辆型号" prop="carModel">
          <i-input v-model="formCar.carModel" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车牌号" prop="carPlateNo">
          <i-input v-model="formCar.carPlateNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="发动机号" prop="carEngineNo">
          <i-input v-model="formCar.carEngineNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车架号" prop="carFrameNo">
          <i-input v-model="formCar.carFrameNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车辆价值" prop="carEvaluatePrice">
          <i-input v-model="formCar.carEvaluatePrice" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="carSuBmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--担保信息的新增修改模态框-->
    <bs-modal :title="isAddAssure ? '新增' : '编辑'" v-model="showModalAssure">
      <i-form ref="formCar" :model="formAssure" label-position="right" :label-width="100">
        <i-form-item label="担保人类型" prop="guaPersonType">
          <i-select v-model="formAssure.guaPersonType">
            <i-option value="1">个人</i-option>
            <i-option value="2">企业</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="担保人编号" prop="guaPersonNo">
          <i-input v-model="formAssure.guaPersonNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="保证人" prop="guaPersonName">
          <i-input v-model="formAssure.guaPersonName" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="担保方式" prop="guaType">
          <i-select v-model="formAssure.guaType">
            <i-option value="1">连带责任保证</i-option>
            <i-option value="2">一般保证</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="与债务人关系" prop="relation">
          <i-select v-model="formAssure.relation">
            <i-option value="1">亲属</i-option>
            <i-option value="2">父母</i-option>
            <i-option value="3">子女</i-option>
            <i-option value="4">朋友</i-option>
            <i-option value="5">同事</i-option>
            <i-option value="6">同学</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="assureSuBmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--贷款材料的新增修改模态框-->
    <bs-modal :title="isAddLoan ? '新增' : '编辑'" v-model="showModalLoan">
      <i-form ref="formCar" :model="formLoan" label-position="right" :label-width="100">
        <i-form-item label="贷款材料名称" prop="loanDocName">
          <i-input v-model="formLoan.loanDocName" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="备注" prop="remark">
          <i-input type="textarea" :rows="2" v-model="formLoan.remark"></i-input>
        </i-form-item>
        <i-form-item
          label="文件名"
          prop="attachPath">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
          <p v-if="isAddLoan" class="show-upload-text" v-text="uploadFileName"></p>
          <p v-else class="show-upload-text" v-text="formLoan.attachPath"></p>
          <input type="hidden" v-model="formLoan.attachPath" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="LoanSuBmit">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import GetProductModal from '@/components/table-product-list'; // 选择产品
  import personalInfo from '@/components/detail-personal-customer-basic/index.vue';
  import BsModal from '@/components/bs-modal';
  import carMixinData from './car-mixin-data';
  import carMixinMethods from './car-mixin-methods';
  import assureMixinData from './assure-mixin-data';
  import assureMixinMethods from './assure-mixin-methods';
  import loanMixinData from './loan-mixin-data';
  import loanMixinMethods from './loan-mixin-methods';
  export default {
    name: 'personalBasic',
    mixins: [carMixinData, carMixinMethods, assureMixinData, assureMixinMethods, loanMixinData, loanMixinMethods],
    components: {
      personalInfo,
      'table-product-list': GetProductModal,
      'bs-modal': BsModal
    },
    data() {
      return {
        memberNo: '',
        member: {},
        uploadFileName: '',
        showSelectProduct: false,
        personalBasicInfo: {},
        // 车辆
        isAddCar: true,
        showModalCar: false,
        carDataLoading: false,
        formCar: {
          custType: '', // 权利人类型
          carOwnerNo: '',
          carOwnerName: '',
          carModel: '',
          carPlateNo: '',
          carEngineNo: '', // 发动机号
          carFrameNo: '',
          carEvaluatePrice: ''
        },
        // 担保信息
        isAddAssure: true,
        assureDataLoading: false,
        showModalAssure: false,
        formAssure: {
          guaPersonType: '', // 担保人类型
          guaPersonNo: '', // 担保人编号
          guaPersonName: '', // 保证人
          guaType: '', // 担保方式
          relation: '' // 与债务人关系
        },
        // 贷款材料
        isAddLoan: true,
        showModalLoan: false,
        loanDataLoading: false,
        formLoan: {
          loanDocName: '', // 贷款材料名称
          remark: '', // 备注
          attachPath: '' // 附件地址
        },
        showBasicList: true, // 当选择客户姓名之后就显示以下的相关信息
        isFromDetail: false,
        showSelectCustomer: false,
        visibleImg: false,
        showImgUpUrl: '',
        formData: {
          name: '',
          memberNo: '',
          productType: '', // 产品类别
          productName: '', // 产品名称
          productNo: '', // 产品编号
          carType: '', // 车类
          carBuyAmt: '', // 车辆购车价格
          applyAmt: '', // 申请金额
          applyPeriods: '', // 申请期数
          depositOrDownPayment: '', // 首付或保证金意向
          carUse: '', // 贷款用途
          applyTime: '', // 申请时间
          lon: '',
          lat: '',
          applicationPlace: '',
          carEvaluatePrice: ''
        }
      };
    },
    mounted() {
      /*this.getCarList();
      this.getAssureList();
      this.getLoanList();*/
    },
    methods: {
      // 接收姓名组件的客户信息
      getMember(CertData) {
        console.log(CertData);
        this.$data.member = CertData;
      },
      // 选择产品
      selectProduct(row, index) {
        this.$data.formData.productNo = row.productNo;
        this.$data.formData.productName = row.productName;
        this.$data.formData.productType = row.productType;
        this.$data.showSelectProduct = false;
      },
      verification() {
        let formName = 'formData';
        let resReturn = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.$data.member);
            if (typeof this.$data.member.mbMemberDTO === 'undefined' || this.$data.member.mbMemberDTO.memberNo === '') {
              this.$Message.error('“基本信息”的“姓名”不能为空', 2);
              return;
            }
            this.$data.personalBasicInfo = {
              ...this.$data.member, // 客户信息（选择姓名得出）
              ...this.$data.formData, // 申请信息
              ...{ 'loanCarVOS': this.$data.carData }, // 车辆信息列表
              ...{ 'loanGuaranteeVOS': this.$data.assureData }, // 担保人信息列表
              ...{ 'loanDocDetailVOS': this.$data.loanData } // 贷款材料列表
            };
            this.$emit('personalData', this.$data.personalBasicInfo);
            resReturn = true;
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
            resReturn = false;
          }
        });
        return resReturn;
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
