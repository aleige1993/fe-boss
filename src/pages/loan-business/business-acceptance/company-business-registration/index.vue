<template>
  <div id="personal-business-registration">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item>公司业务登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane :label="'基本信息'">
        <i-form label-position="right" :label-width="160">
          <!--申请信息-->
          <bs-form-block :title="'申请信息'">
            <i-row>
              <!--产品类别-->
              <i-col span="8">
                <i-form-item label="产品类别" prop="select"
                             :rules="{required: true, message: '请选择'}">
                  <i-select v-model="formData.select">
                    <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--产品名称-->
              <i-col span="8">
                <i-form-item label="产品名称" prop="select"
                             :rules="{required: true, message: '请选择'}">
                  <i-select v-model="formData.select">
                    <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--车类-->
              <i-col span="8">
                <i-form-item label="车类" prop="select"
                             :rules="{required: true, message: '请选择'}">
                  <i-select v-model="formData.select">
                    <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--车辆价格-->
              <i-col span="8">
                <i-form-item label="车辆价格" prop="carMoney">
                  <i-input v-model="formData.carMoney" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--申请金额-->
              <i-col span="8">
                <i-form-item label="申请金额" prop="carMoney">
                  <i-input v-model="formData.carMoney" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--申请期限-->
              <i-col span="8">
                <i-form-item label="申请期限" prop="carMoney">
                  <i-input v-model="formData.carMoney" placeholder="">
                    <span slot="append">月</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--首付或保证金意向-->
              <i-col span="8">
                <i-form-item label="首付或保证金意向" prop="carMoney">
                  <i-input v-model="formData.carMoney" placeholder="">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <!--车辆用途-->
              <i-col span="8">
                <i-form-item label="车辆用途" prop="select">
                  <i-select v-model="formData.select">
                    <i-option value="beijing">自用</i-option>
                    <i-option value="shanghai">商用</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <!--申请时间-->
              <i-col span="8">
                <i-form-item label="申请时间" prop="date">
                  <i-date-picker format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
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
          <company-info></company-info>
          <!--车辆信息-->
          <bs-form-block :title="'车辆信息'">
            <div class="form-top-actions">
              <i-button @click="showModalCar=!showModalCar" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
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
          <div class="form-footer-actions">
            <i-button @click="saveDraft" :loading="initFormLoading" type="primary">
              <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 保存草稿</span>
              <span v-else> loading...</span>
            </i-button>
            <i-button @click="saveSubimt" :loading="initFormLoading" type="success">
              <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
              <span v-else> loading...</span>
            </i-button>
          </div>
        </i-form>
      </i-tab-pane>
      <i-tab-pane :label="'审批信息'">
        <div>12321321</div>
      </i-tab-pane>
    </i-tabs>

    <!--车辆信息的新增修改模态框-->
    <bs-modal :title="isAddCar ? '新增' : '编辑'" v-model="showModalCar">
      <modal-form-car @on-updated="updatedCarInfo"></modal-form-car>
    </bs-modal>
  </div>
</template>

<script>
  import companyInfo from '@/components/detail-company-customer-basic/index.vue';
  import BsModal from '@/components/bs-modal';
  import carMixinData from './car-mixin-data';
  import carMixinMethods from './car-mixin-methods';
  import assureMixinData from './assure-mixin-data';
  import assureMixinMethods from './assure-mixin-methods';
  import loanMixinData from './loan-mixin-data';
  import loanMixinMethods from './loan-mixin-methods';
  import modalFormCar from './modal-form-car/index.vue';
  export default {
    name: 'companyBusinessRegistration',
    mixins: [carMixinData, carMixinMethods, assureMixinData, assureMixinMethods, loanMixinData, loanMixinMethods],
    data() {
      return {
        tabIndex: 0,
        isAddCar: true,
        showModalCar: false,

        formData: {
          name: '',
          memberNo: '',
          select: '',
          lon: '',
          lat: '',
          applicationPlace: '',
          carMoney: ''
        }
      };
    },
    components: {
      companyInfo,
      BsModal,
      modalFormCar
    },
    methods: {
      updatedCarInfo(data, actionType) {
        Alertify.alert(actionType);
        console.log(data);
      }
    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
</style>
