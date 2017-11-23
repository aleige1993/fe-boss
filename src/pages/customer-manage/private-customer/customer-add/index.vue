<template>
  <div id="" style="position:relative">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">个人客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>客户添加</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs :animated="false" type="card" @on-click="tabChange">
      <i-tab-pane label="主体信息">

            <tab-basic-info></tab-basic-info>

      </i-tab-pane>
      <i-tab-pane label="配偶信息">
        <tab-spouse-info :customerId="customerId" :isFromDetail="isFromDetail"></tab-spouse-info>
      </i-tab-pane>
      <i-tab-pane label="联系人信息">
        <tab-contact-info :isFromDetail="isFromDetail"></tab-contact-info>
      </i-tab-pane>
      <i-tab-pane label="银行账户信息">
        <tab-bank-account-info :isFromDetail="isFromDetail"></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane label="征信信息">
        <tab-credit-info :isFromDetail="isFromDetail"></tab-credit-info>
      </i-tab-pane>
      <i-tab-pane label="旗下公司">
        <tab-owe-company-info :isFromDetail="isFromDetail"></tab-owe-company-info>
      </i-tab-pane>
      <i-tab-pane label="负面调查">
        <tab-negative-survey-info :isFromDetail="isFromDetail"></tab-negative-survey-info>
      </i-tab-pane>
      <i-tab-pane label="大数据信息">
        <tab-business-contact-info :isFromDetail="isFromDetail"></tab-business-contact-info>
      </i-tab-pane>
      <i-tab-pane label="诉讼情况">
        <tab-lawsuit-info :isFromDetail="isFromDetail"></tab-lawsuit-info>
      </i-tab-pane>
    </i-tabs>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>
<script>
  /* global Alertify */
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import TabBasicInfo from '@/components/form-private-customer-basic';
  import TabSpouseInfo from './spouse-info/index.vue';
  import TabContactInfo from './contact-info/index.vue';
  import TabBankAccountInfo from './bank-account-info/index.vue';
  import TabCreditInfo from './credit-info/index.vue';
  import TabOweCompanyInfo from './owe-company-info/index.vue';
  import TabNegativeSurveyInfo from './negative-survey/index.vue';
  import TabBusinessContactInfo from './business-contact/index.vue';
  import TabLawsuitInfo from './lawsuit-info/index.vue';
  import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
  import BsModal from '@/components/bs-modal';
  import TableEmployerList from '@/components/table-employer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  export default {
    name: 'modifyPrivateCustomer',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        customerId: null,
        isFromDetail: false,
        showSelectCompany: false,
        showSelectEmployer: false,
        initFormLoading: false,
        // 地址下拉
        shengDropList: [],
        censusDistrictDropList: [],
        censusCityDropList: [],
        nowDistrictDropList: [],
        nowCityDropList: [],
        companyDistictDropList: [],
        companyCityDropList: []
      };
    },
    computed: {
      id() {
        return this.$route.query.id;
      }
    },
    watch: {
      'formData.user.isWed': (val) => {
        // alert(val);
      }
    },
    components: {
      TabBasicInfo,
      'tab-spouse-info': TabSpouseInfo,
      'tab-contact-info': TabContactInfo,
      TabBankAccountInfo,
      TabCreditInfo,
      TabOweCompanyInfo,
      TabNegativeSurveyInfo,
      TabBusinessContactInfo,
      TabLawsuitInfo,
      'idcard-placeholder': IDCardPlaceholder,
      BsModal,
      TableEmployerList,
      TableCompanyCustomerList
    },
    methods: {
      tabChange(name) {
        // alert(name); // 0,1,2,3
      },
      resetAddCustomerForm() {
        this.$refs['formAddCustomer'].resetFields();
      },
      async initPageData() {
        this.$data.initFormLoading = true;
        let resp = await this.$http.post('/member/find', {
          memberNo: this.id
        });
        this.$data.initFormLoading = false;
        this.$data.formData = resp.body;
      },
      getAddressDropList(code) {
        let _code = code || '';
        let data = {
          regionCode: _code
        };
        return this.$http.post('/common/region/list', data);
      },
      selectEmployer(row, index) {
        alert(index);
      },
      selectCompanyCustomer(row, index) {
        alert(index);
      }
    },
    async mounted() {
      Alertify.confirm('确定要删除吗？', (confirm) => {
        if (confirm) {
          Alertify.alert('确定');
        } else {
          Alertify.alert('取消');
        }
      });
      let pageFrom = this.$route.query.from;
      this.$data.isFromDetail = (pageFrom === 'detail');

      let resp = await this.getAddressDropList();
      this.$data.shengDropList = resp.body;
      // 如果有id，初始化页面数据
      if (this.id) {
        this.initPageData();
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
