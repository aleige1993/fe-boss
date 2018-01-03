<template>
<!--额度管理-->
  <div id="pageDistributorQuota">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>新增授信额度信息</i-breadcrumb-item>
    </i-breadcrumb>
    <i-row>
      <i-col span="24">
        <i-form ref="formQuota" :model="formQuota" label-position="right" :label-width="120" style="padding: 30px 0;">
          <!--客户名称-->
          <i-row>
            <i-col span="8">
              <i-form-item label="客户名称" prop="corpName">
                <span v-text="formQuota.corpName"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <!--客户经理-->
            <i-col span="8">
              <i-form-item label="客户经理" prop="custMgrName">
                <span v-text="formQuota.custMgrName"></span>
              </i-form-item>
            </i-col>
          </i-row>
          <br>
          <br>
          <i-row>
            <i-col span="8">
            <!--授信总额度-->
              <i-form-item
                :rules="{required: true, message: '授信总额度不能为空', trigger: 'blur'}"
                label="授信总额度"
                prop="creditTotalLimit">
                <i-input v-model="formQuota.creditTotalLimit" placeholder="">
                  <span slot="append">元</span>
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <!--可用额度-->
            <i-col span="8">
              <i-form-item
                label="可用额度"
                prop="creditTotalLimit">
                <i-input v-model="formQuota.creditTotalLimit" :readonly="true" placeholder="">
                  <span slot="append">元</span>
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <!--单笔最大额度-->
            <i-col span="8">
              <i-form-item
                :rules="{required: true, message: '单笔最大额度不能为空', trigger: 'blur'}"
                label="单笔最大额度"
                prop="singleUsableLimit">
                <i-input v-model="formQuota.singleUsableLimit" placeholder="">
                  <!--<span slot="append">元</span>-->
                </i-input>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <!--授信起始日期-->
            <i-col span="8">
              <i-form-item
                :rules="{required: true, message: '授信起始日期不能为空', trigger: 'blur'}"
                label="授信起始日期"
                prop="creditStartDate">
                <input type="hidden" v-model="formQuota.creditStartDate">
                <bs-datepicker v-model="formQuota.creditStartDate"></bs-datepicker>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <!--授信到期日期-->
            <i-col span="8">
              <i-form-item
                :rules="{required: true, message: '授信到期日期不能为空', trigger: 'blur'}"
                label="授信到期日期"
                prop="creditStartDate">
                <input type="hidden" v-model="formQuota.creditEndDate">
                <bs-datepicker v-model="formQuota.creditEndDate"></bs-datepicker>
              </i-form-item>
            </i-col>
          </i-row>
          <i-row>
            <!--额度释放方式-->
            <i-col span="8">
              <i-form-item
                :rules="{required: true, message: '请选择额度释放方式', trigger: 'change'}"
                label="额度释放方式"
                prop="creditReleaseType"><!--CreditReleaseTypeEnum-->
                <i-select v-model="formQuota.creditReleaseType">
                  <i-option v-for="item in enumSelectData.get('CreditReleaseTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
              </i-form-item>
            </i-col>
          </i-row>
          <div class="form-footer-actions">
            <i-form-item>
              <i-button type="primary" @click="submitFun" :loading="btnLoading">
                <span v-if="!btnLoading">提交审核</span>
                <span v-else>正在提交审核...</span>
              </i-button>
              <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
            </i-form-item>
          </div>
        </i-form>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  // import TableEmployerList from '@/components/table-employer-list'; // 选择客户经理
  // import TableCompanyList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'pageDistributorQuota',
    components: {
      BsModal
    },
    data() {
      return {
        currentPage: '',
        btnLoading: false,
        formQuota: {
          merchantNo: '',
          corpName: '',
          custMgrName: '',
          custMgrNo: '',
          creditTotalLimit: '', // 授信总额度 同 可用额度（自动带入授信总额度）
          singleUsableLimit: '',
          creditStartDate: '', // 授信起始日期
          creditEndDate: '', // 授信起始日期
          creditReleaseType: '' // 额度释放方式
        }
      };
    },
    computed: {
    },
    mounted() {
      this.$data.currentPage = this.$route.query.currentPage;
      this.$data.formQuota.corpName = this.$route.query.corpName;
      this.$data.formQuota.custMgrName = this.$route.query.custMgrName;
      this.$data.formQuota.merchantNo = this.$route.query.merchantNo;
    },
    methods: {
      // 审核提交
      async submiting() {
        this.$data.btnLoading = true;
        // 渠道商授信申请信息新增
        let resp = await this.$http.post('merchant/credit/add', {
          merchantNo: this.$data.formQuota.merchantNo,
          creditTotalLimit: this.$data.formQuota.creditTotalLimit,
          singleUsableLimit: this.$data.formQuota.singleUsableLimit,
          creditStartDate: this.$data.formQuota.creditStartDate,
          creditEndDate: this.$data.formQuota.creditEndDate,
          creditReleaseType: this.$data.formQuota.creditReleaseType
        });
        this.$data.btnLoading = false;
        if (resp.success) {
          this.$Message.success('已提交审核');
          await bsWait(1000);
          this.$router.push({
            path: '/index/customer/distributor',
            query: {
              currentPage: 1
            }
          });
        }
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
