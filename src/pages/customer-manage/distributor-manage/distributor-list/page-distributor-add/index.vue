<template>
<!--新增渠道商-->
  <div id="addDistributor">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor/add">新增渠道商</i-breadcrumb-item>
    </i-breadcrumb>
    <i-form ref="formAdd" :model="formAdd" label-position="right" :label-width="120" style="padding: 30px 0;">
      <i-row>
        <!--客户名称-->
        <i-col span="12" offset="6">
          <i-form-item
            label="客户名称"
            :rules="{required: true, message: '客户名称不能为空', trigger: 'blur'}"
            prop="corpName">
            <input type="hidden" v-model="formAdd.corpNo"/>
            <i-input v-model="formAdd.corpName" :readonly="true" placeholder="选择客户">
              <i-button @click="showSelectCompany=!showSelectCompany" slot="append">选择客户 <Icon type="ios-more"></Icon></i-button>
            </i-input>
          </i-form-item>
        </i-col>
        <!--是否开通商户平台-->
        <i-col span="12" offset="6">
          <i-form-item label="是否开通商户平台" prop="isOpenMerchant">
            <i-select v-model="formAdd.isOpenMerchant">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12" offset="6">
          <br>
          <br>
          <i-form-item class="text-right">
            <i-button type="primary" @click="submitFun">提交</i-button>
            <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
          </i-form-item>
        </i-col>
      </i-row>

    </i-form>
    <!--选择客户的模态框-->
    <bs-modal :title="'选择权利人'" v-model="showSelectCompany" :width="1200">
      <table-company-list ref="companyTable" type="modal" @on-row-dbclick="selectCompanyRow"></table-company-list>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
  </div>
</template>

<script>
  import BsDispicker from '@/components/bs-dispicker'; // 地址联动
  import TableEmployerList from '@/components/table-employer-list'; // 选择客户经理
  import TableCompanyList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'addDistributor',
    components: {
      BsModal,
      BsDispicker,
      TableEmployerList,
      TableCompanyList
    },
    data() {
      return {
        currentPage: '',
        showSelectCompany: false,
        showSelectEmployer: false,
        formAdd: {
          isOpenMerchant: '',
          corpName: '',
          corpNo: ''
        }
      };
    },
    mounted() {
      this.$data.currentPage = this.$route.query.currentPage;
    },
    methods: {
      // 选择客户
      selectCompanyRow(row, index) {
        this.$data.formAdd.corpNo = row.corpNo;
        this.$data.formAdd.corpName = row.corpName;
        this.$data.showSelectCompany = false;
      },
      // 选择客户经理
      selectEmployer(row, index) {
        this.$data.formAdd.custMgrNo = row.userCode;
        this.$data.formAdd.custMgrName = row.userName;
        this.$data.showSelectEmployer = false;
      },
      // 地址联动
      selectCensusDistance(distance) {
        this.$data.formAdd.bizProvinceCode = distance.provinceCode;
        this.$data.formAdd.bizProvinceName = distance.provinceName;
        this.$data.formAdd.bizCityCode = distance.districtCode;
        this.$data.formAdd.bizCityName = distance.districtName;
        this.$data.formAdd.bizDistrictCode = distance.cityCode;
        this.$data.formAdd.bizDistrictName = distance.cityName;
      },
      // 新增
      async addSuccess() {
        this.$Message.success('新增成功');
        await bsWait(1000);
        this.$router.push({
          path: '/index/customer/distributor',
          query: {
            currentPage: 1
          }
        });
      },
      // 提交
      submitFun() {
        const formName = 'formAdd';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 取消
      cancelFun() {
        this.$router.push({
          path: '/index/customer/distributor',
          query: {
            currentPage: this.$data.currentPage
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
