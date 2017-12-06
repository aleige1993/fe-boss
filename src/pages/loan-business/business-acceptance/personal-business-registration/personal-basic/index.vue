<template>
  <div id="personal-basic">
    <i-form label-position="right" :label-width="120" style="padding-bottom: 200px">
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
          <i-col span="8">
            <i-form-item label="申请时间" prop="date">
              <i-date-picker format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
            </i-form-item>
          </i-col>

        </i-row>
      </bs-form-block>

    </i-form>

    <!-- 选择企业的弹窗 -->
    <!--<bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>-->
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
    <!-- 选择业务拓展部门的弹窗 -->
    <bs-modal :width="880" v-model="selectDepartmentModal" title="选择业务拓展部门">
      <tree-grid v-if="selectDepartmentModal" @on-row-dblclick="selectDep" :columns="depColumns" :data="depData"></tree-grid>
    </bs-modal>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>

<script>
  import BsModal from '@/components/bs-modal';
  import MxinData from './mixin-data';
  import MxinMethods from './mixin-methods';
  import TableEmployerList from '@/components/table-employer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  import Tools from '@/utils/Tools';
  import TreeGrid from '@/components/bs-tree-grid';
  import BsDispicker from '@/components/bs-dispicker';
  export default {
    name: 'personalBasic',
    mixins: [MxinData, MxinMethods],
    data() {
      return {
        tabIndex: 0,
        initFormLoading: false,
        isFromDetail: false,
        formData: {
          select: '',
          carMoney: ''
        }
      };
    },
    watch: {
      'formData.user.isWed': (val) => {
        // alert(val);
      }
    },
    components: {
      'bs-modal': BsModal,
      TableEmployerList,
      TableCompanyCustomerList,
      BsDispicker,
      TreeGrid
    },
    mounted() {
      this.getDepList();
    }
  };
</script>
<style lang="scss" scoped>
</style>
