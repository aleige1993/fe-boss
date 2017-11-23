<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0" v-if="!isFromDetail">
      <i-button type="primary" @click="addBankModal=!addBankModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="false" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <bs-modal :title="'添加公司信息'" v-model="addBankModal">
      <i-form ref="formValidate" label-position="left" :label-width="120">
        <i-form-item label="公司名称" prop="name">
          <i-input placeholder="">
            <i-button @click="slectOweCompanyModal=!slectOweCompanyModal" slot="append">选择公司 <i-icon type="ios-more"></i-icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="统一社会使用代码" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="关系" prop="mail">
          <i-select id="u5568_input" placeholder="">
            <i-option value="1">全资</i-option>
            <i-option value="2">控股</i-option>
            <i-option value="3">全资</i-option>
            <i-option value="4">持股</i-option>
            <i-option value="5">核心经营人</i-option>
            <i-option value="6">实际控制人</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="联系人" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="联系人电话" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="注册时间" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="注册资金" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="经营地址" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button type="primary" size="large" style="width: 80px;">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="slectOweCompanyModal">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompany">
        <div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCompanyCustomerModal=!addCompanyCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
      </table-company-customer-list>
    </bs-modal>
    <bs-modal title="新增企业客户" :width="1280" v-model="addCompanyCustomerModal">
      <company-customer-basic-info type="modal"></company-customer-basic-info>
    </bs-modal>
  </div>
</template>
<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import CompanyCustomerBasicInfo from '@/components/form-company-customer-basic/index.vue';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  export default {
    name: '',
    mixins: [MixinData],
    data() {
      return {
        addBankModal: false,
        slectOweCompanyModal: false,
        addCompanyCustomerModal: false
      };
    },
    props: ['isFromDetail'],
    components: {
      'bs-modal': BsModal,
      TableCompanyCustomerList,
      'company-customer-basic-info': CompanyCustomerBasicInfo
    },
    methods: {
      selectCompany(row, index) {
        Alertify.alert('您选择的企业id：' + index);
      }
    }
  };
</script>
<style lang="scss">

</style>
