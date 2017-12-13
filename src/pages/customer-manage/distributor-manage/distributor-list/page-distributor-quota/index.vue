<template>
<!--额度管理-->
  <div id="pageDistributorQuota">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>新增授信额度信息</i-breadcrumb-item>
    </i-breadcrumb>
    <i-form ref="formQuota" :model="formQuota" label-position="right" :label-width="120" style="padding: 30px 0;">
      <i-row>
        <!--客户名称-->
        <i-col span="12" offset="6">
          <i-form-item
            label="客户名称"
            :rules="{required: true, message: '客户名称不能为空', trigger: 'blur'}"
            prop="corpName">
            <input type="hidden" v-model="formQuota.corpNo"/>
            <i-input v-model="formQuota.corpName" :readonly="true" placeholder="选择客户">
              <i-button @click="showSelectCompany=!showSelectCompany" slot="append">选择客户 <Icon type="ios-more"></Icon></i-button>
            </i-input>
          </i-form-item>
        </i-col>
        <!--客户经理-->
        <i-col span="12" offset="6">
          <i-form-item
            label="客户经理"
            :rules="{required: true, message: '客户经理不能为空', trigger: 'blur'}"
            prop="custMgrName">
            <input type="hidden" v-model="formQuota.custMgrName"/>
            <i-input v-model="formQuota.custMgrName" :readonly="true" placeholder="选择客户经理">
              <i-button @click="showSelectEmployer=!showSelectEmployer" slot="append">客户经理 <Icon type="ios-more"></Icon></i-button>
            </i-input>
          </i-form-item>
        </i-col>
        <!--授信总额度-->
        <i-col span="12" offset="6">
          <br>
          <br>
          <i-form-item label="授信总额度" prop="aminId">
            <i-input v-model="formQuota.CreditMoney" placeholder="">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--可用额度-->
        <i-col span="12" offset="6">
          <i-form-item label="可用额度" prop="currentUsableLimit">
            <i-input v-model="formQuota.currentUsableLimit" placeholder="">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--单笔最大额度-->
        <i-col span="12" offset="6">
          <i-form-item label="单笔最大额度" prop="currentUsableLimit">
            <i-input v-model="formQuota.currentUsableLimit" placeholder="">
              <!--<span slot="append">元</span>-->
            </i-input>
          </i-form-item>
        </i-col>
        <!--授信起始日期-->
        <i-col span="12" offset="6">
          <i-form-item label="授信起始日期" prop="startDate">
            <bs-datepicker v-model="formQuota.startDate"></bs-datepicker>
          </i-form-item>
        </i-col>
        <!--授信到期日期-->
        <i-col span="12" offset="6">
          <i-form-item label="授信到期日期" prop="startDate">
            <bs-datepicker v-model="formQuota.endDate"></bs-datepicker>
          </i-form-item>
        </i-col>
        <!--额度释放方式-->
        <i-col span="12" offset="6">
          <i-form-item label="额度释放方式" prop="CreditOpenModel">
            <i-select v-model="formQuota.CreditOpenModel">
              <i-option value="1">额度释放方式01</i-option>
              <i-option value="2">额度释放方式02</i-option>
              <i-option value="3">额度释放方式03</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <i-col span="12" offset="6">
          <br>
          <br>
          <i-form-item class="text-right">
            <i-button type="primary" @click="submitFun">提交审核</i-button>
            <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
          </i-form-item>
        </i-col>
      </i-row>

    </i-form>
    <!--选择客户的模态框-->
    <bs-modal :title="'选择客户'" v-model="showSelectCompany" :width="1200">
      <table-company-list ref="companyTable" type="modal" @on-row-dbclick="selectCompanyRow"></table-company-list>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
  </div>
</template>

<script>
  import TableEmployerList from '@/components/table-employer-list'; // 选择客户经理
  import TableCompanyList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'pageDistributorQuota',
    components: {
      BsModal,
      TableEmployerList,
      TableCompanyList
    },
    data() {
      return {
        currentPage: '',
        showSelectCompany: false,
        showSelectEmployer: false,
        formQuota: {
          corpName: '',
          custMgrName: '',
          custMgrNo: '',
          CreditMoney: '', // 授信总额度
          currentUsableLimit: '', // 可用额度（自动带入授信总额度）
          startDate: '', // 授信起始日期
          endDate: '', // 授信起始日期
          CreditOpenModel: '' // 额度释放方式
        }
      };
    },
    mounted() {
      this.$data.currentPage = this.$route.query.currentPage;
    },
    methods: {
      // 选择客户（公司）
      selectCompanyRow(row, index) {
        this.$data.formQuota.corpNo = row.corpNo;
        this.$data.formQuota.corpName = row.corpName;
        this.$data.showSelectCompany = false;
      },
      // 选择客户经理
      selectEmployer(row, index) {
        this.$data.formQuota.custMgrNo = row.userCode;
        this.$data.formQuota.custMgrName = row.userName;
        this.$data.showSelectEmployer = false;
      },
      // 审核提交
      async submiting() {
        this.$Message.success('已提交审核');
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
        const formName = 'formQuota';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submiting();
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
