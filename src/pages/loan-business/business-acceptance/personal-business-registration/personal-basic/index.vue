<template>
  <div id="personal-basic">
    <i-form ref="formData" :model="formData" label-position="right" :label-width="160">
      <!--申请信息-->
      <bs-form-block :title="'申请信息'">
        <i-row>
          <!--产品类别-->
          <i-col span="8">
            <i-form-item label="产品类别"
                         prop="select"
                         :rules="{required: true, message: '请选择'}">
              <i-select v-model="formData.select">
                <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--产品名称-->
          <i-col span="8">
            <i-form-item label="产品名称"
                         prop="select"
                         :rules="{required: true, message: '请选择'}">
              <i-select v-model="formData.select">
                <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--车类-->
          <i-col span="8">
            <i-form-item label="车类"
                         prop="select"
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
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请金额-->
          <i-col span="8">
            <i-form-item label="申请金额" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请期限-->
          <i-col span="8">
            <i-form-item label="申请期限" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="月"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--首付或保证金意向-->
          <i-col span="8">
            <i-form-item label="首付或保证金意向" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="元"></span>
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
    </i-form>
    <personal-info></personal-info>
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

    <!--点击图片放大模态框-->
    <i-modal v-model="visibleImg" cancel-text="" ok-text="关闭">
      <img :src="showImgUpUrl" style="width: 100%">
    </i-modal>

    <!--车辆信息的新增修改模态框-->
    <bs-modal :title="isAddCar ? '新增' : '编辑'" v-model="showModalCar">
      <i-form  ref="formCar" :model="formCar" label-position="right" :label-width="100">
        <i-form-item label="权利人类型" prop="obligeeType">
          <i-select v-model="formCar.obligeeType">
            <i-option value="beijing">个人</i-option>
            <i-option value="shanghai">企业</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="权利人编号" prop="obligeeNo">
          <i-input v-model="formCar.obligeeNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="权利人名称" prop="obligeeName">
          <i-input v-model="formCar.obligeeName" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车辆型号" prop="carModel">
          <i-input v-model="formCar.carModel" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车牌号" prop="carNo">
          <i-input v-model="formCar.carNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="发动机号" prop="engineNo">
          <i-input v-model="formCar.engineNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车架号" prop="carFrameNo">
          <i-input v-model="formCar.carFrameNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车辆价值" prop="carMoney">
          <i-input v-model="formCar.carMoney" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="carSuBmit" :loading="carbuttonLoading">
            <span v-if="!carbuttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
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
      'bs-modal': BsModal
    },
    data() {
      return {
        // 车辆
        isAddCar: true,
        showModalCar: false,
        carDataLoading: false,
        carbuttonLoading: false,
        formCar: {
          obligeeType: '',
          obligeeNo: '',
          obligeeName: '',
          carModel: '',
          carNo: '',
          engineNo: '',
          carFrameNo: '',
          carMoney: ''
        },
        // 担保信息
        isAddAssure: true,
        assureDataLoading: false,
        showModalAssure: false,
        // 贷款材料
        isAddLoan: true,
        showModalLoan: false,
        loanDataLoading: false,
        showBasicList: true, // 当选择客户姓名之后就显示以下的相关信息
        isFromDetail: false,
        showSelectCustomer: false,
        visibleImg: false,
        showImgUpUrl: '',
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
    mounted() {
      this.goLocalStorage();
    },
    methods: {
      // 进页面的时候将数据存进本地存储
      async goLocalStorage() {
        await this.getCarList();
        this.localStorageFun('carData', this.carData);
      },
      // 将数据与本地存储的数据双向绑定
      localStorageFun(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
      },
      // 打开担保信息新增修改模态框
      openModalAssure() {
        this.$data.showModalAssure = true;
      },
      // 打开贷款材料清单新增修改模态框
      openModalLoan() {
        this.$data.showModalLoan = true;
      },
      // 点击放大图片
      showImg(imgURL) {
        this.$data.showImgUpUrl = imgURL;
        this.$data.visibleImg = true;
      }
    }
  };
</script>
<style lang="scss" scoped>
  #personal-basic {
    & .customer-item {
      margin-bottom: 0px;
      & .customer-label {
        width: 160px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #999;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      & .customer-content {
        position: relative;
        line-height: 32px;
        font-size: 12px;
        margin-left: 160px;
        padding: 2px 0;
        & span {
          display: inline-block;
          margin-right: 5px;
        }
        &>img {
          margin-top: 6px;
          display: inline-block;
          width: 240px;
          height: 160px;
          &.click-img {
            cursor: zoom-in;
          }
        }
      }
    }
  }
</style>
