<template>
<!--额度管理-->
  <div id="pageDistributorQuota">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>授信额度信息</i-breadcrumb-item>
    </i-breadcrumb>
    <div id="tableDistributorQuota">
      <div class="form-top-actions">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增授信额度信息</i-button>
      </div>
      <i-table :loading="dataLoading" border ref="tableData" :columns="distributorColumns" :data="distributorList"></i-table>
      <div class="page-container">
        <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
      </div>
    </div>
    <bs-modal :title="isAdd?'新增授信额度信息':'修改授信额度信息'" v-model="showAddModal" :width="520">
      <i-form ref="formQuota" :model="formQuota" label-position="right" :label-width="120" style="padding: 30px 0;">
        <!--客户名称-->
        <i-form-item label="客户名称" prop="corpName">
          <span v-text="formQuota.corpName"></span>
        </i-form-item>
        <!--客户经理-->
        <i-form-item label="客户经理" prop="custMgrName">
          <span v-text="formQuota.custMgrName"></span>
        </i-form-item>
        <br>
        <br>
        <!--授信总额度-->
        <i-form-item
          :rules="{required: true, message: '授信总额度不能为空', trigger: 'blur'}"
          label="授信总额度"
          prop="creditTotalLimit">
          <i-input v-model="formQuota.creditTotalLimit" placeholder="">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <!--可用额度-->
        <i-form-item
          label="可用额度"
          prop="creditTotalLimit">
          <i-input v-model="formQuota.creditTotalLimit" :readonly="true" placeholder="">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <!--单笔最大额度-->
        <i-form-item
          :rules="{required: true, message: '单笔最大额度不能为空', trigger: 'blur'}"
          label="单笔最大额度"
          prop="singleUsableLimit">
          <i-input v-model="formQuota.singleUsableLimit" placeholder="">
            <!--<span slot="append">元</span>-->
          </i-input>
        </i-form-item>
        <!--授信起始日期-->
        <i-form-item
          :rules="{required: true, message: '授信起始日期不能为空', trigger: 'blur'}"
          label="授信起始日期"
          prop="creditStartDate">
          <input type="hidden" v-model="formQuota.creditStartDate">
          <bs-datepicker :isNowStart="true" v-model="formQuota.creditStartDate"></bs-datepicker>
        </i-form-item>
        <!--授信到期日期-->
        <i-form-item
          :rules="{required: true, message: '授信到期日期不能为空', trigger: 'blur'}"
          label="授信到期日期"
          prop="creditStartDate">
          <input type="hidden" v-model="formQuota.creditEndDate">
          <bs-datepicker :isNowStart="true" v-model="formQuota.creditEndDate"></bs-datepicker>
        </i-form-item>
        <!--额度释放方式-->
        <i-form-item
          :rules="{required: true, message: '请选择额度释放方式', trigger: 'change'}"
          label="额度释放方式"
          prop="creditReleaseType"><!--CreditReleaseTypeEnum-->
          <i-select v-model="formQuota.creditReleaseType">
            <i-option v-for="item in enumSelectData.get('CreditReleaseTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="saveDraft" :loading="draftLoading" style="margin-right: 10px">
            <span v-if="!draftLoading">保存草稿</span>
            <span v-else>正在保存草稿...</span>
          </i-button>
          <i-button type="primary" @click="submitFun" :loading="btnLoading">
            <span v-if="!btnLoading">提交审核</span>
            <span v-else>正在提交审核...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  // import TableEmployerList from '@/components/table-employer-list'; // 选择客户经理
  // import TableCompanyList from '@/components/table-company-customer-list'; // 选择客户列表
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'pageDistributorQuota',
    mixins: [MixinData],
    components: {
      BsModal
    },
    data() {
      return {
        isAdd: true,
        total: 0,
        currentPage: 1,
        pageSize: 15,
        dataLoading: false,
        draftLoading: false,
        showAddModal: false,
        ParentCurrentPage: '',
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
    async mounted() {
      await this.routeDateFun();
      this.getList();
    },
    methods: {
      routeDateFun() {
        this.$data.ParentCurrentPage = this.$route.query.currentPage / 1;
        this.$data.formQuota.corpName = this.$route.query.corpName;
        this.$data.formQuota.custMgrName = this.$route.query.custMgrName;
        this.$data.formQuota.merchantNo = this.$route.query.merchantNo;
        this.$data.formQuota.merchantStatus = this.$route.query.merchantStatus;
      },
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('merchant/credit/list', {
          merchantNo: this.$route.query.merchantNo,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.distributorList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.distributorList = [];
        }
      },
      jumpPage(page) {
        this.getList(page);
      },
      // 打开modal
      async addModal() {
        let reps = await this.$http.post('merchant/credit/isAllowAdd', {
          merchantNo: this.$data.formQuota.merchantNo
        });
        if (!reps.success) {
          /* this.$Message.warning({
            content: reps.reMsg,
            duration: 3
          });*/
          return;
        }
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
        this.$data.formQuota = {};
        this.routeDateFun();
      },
      // 修改modal
      setList(row) {
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formQuota = row;
        this.$data.formQuota.creditTotalLimit = row.creditTotalLimit + '';
        this.$data.formQuota.singleUsableLimit = row.singleUsableLimit + '';
      },
      // 新增审核提交
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
        this.$data.showAddModal = false;
        if (resp.success) {
          this.$Message.success('已提交额度信息');
          await bsWait(1000);
          this.getList();
        }
      },
      // 修改审核提交
      async setSubmit() {
        this.$data.btnLoading = true;
        let resp = await this.$http.post('merchant/credit/update', {
          merchantNo: this.$data.formQuota.merchantNo,
          applyNo: this.$data.formQuota.applyNo,
          creditTotalLimit: this.$data.formQuota.creditTotalLimit,
          singleUsableLimit: this.$data.formQuota.singleUsableLimit,
          creditStartDate: this.$data.formQuota.creditStartDate,
          creditEndDate: this.$data.formQuota.creditEndDate,
          creditReleaseType: this.$data.formQuota.creditReleaseType
        });
        this.$data.btnLoading = false;
        this.$data.showAddModal = false;
        if (resp.success) {
          this.$Message.success('已修改额度信息');
          await bsWait(1000);
          this.getList();
        }
      },
      // 保存草稿
      async saveDraft() {
        if (!this.TestCreditTotal()) {
          this.$Message.error('“授信总额度”不能小于“单笔最大额度”！');
          return;
        }
        if (!this.$DateTest.testDateFun(this.$data.formQuota.creditStartDate, this.$data.formQuota.creditEndDate)) {
          this.$Message.error('“授信起始日期”不能大于“授信到期日期”');
          return;
        }
        this.$data.draftLoading = true;
        let resp = await this.$http.post('merchant/credit/tempSave', {
          merchantNo: this.$data.formQuota.merchantNo,
          applyNo: this.$data.formQuota.applyNo,
          creditTotalLimit: this.$data.formQuota.creditTotalLimit,
          singleUsableLimit: this.$data.formQuota.singleUsableLimit,
          creditStartDate: this.$data.formQuota.creditStartDate,
          creditEndDate: this.$data.formQuota.creditEndDate,
          creditReleaseType: this.$data.formQuota.creditReleaseType
        });
        this.$data.draftLoading = false;
        this.$data.showAddModal = false;
        if (resp.success) {
          this.$Message.success('已保存草稿');
          await bsWait(1000);
          this.getList();
        }
      },
      // 提交
      submitFun() {
        this.$refs['formQuota'].validate((valid) => {
          if (valid) {
            if (!this.TestCreditTotal()) {
              this.$Message.error('“授信总额度”不能小于“单笔最大额度”！');
              return;
            }
            if (!this.$DateTest.testDateFun(this.$data.formQuota.creditStartDate, this.$data.formQuota.creditEndDate)) {
              this.$Message.error('“授信起始日期”不能大于“授信到期日期”');
              return;
            }
            if (this.$data.isAdd) {
              this.submiting();
            } else {
              this.setSubmit();
            }
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 新增授信额度信息里验证授信总额度不能小于最大额度
      TestCreditTotal() {
        if (
          (this.$data.formQuota.creditTotalLimit && this.$data.formQuota.singleUsableLimit) &&
          ((this.$data.formQuota.creditTotalLimit !== '') && (this.$data.formQuota.singleUsableLimit !== '')) &&
          (this.$data.formQuota.singleUsableLimit / 1) > (this.$data.formQuota.creditTotalLimit / 1)
        ) {
          return false;
        }
        return true;
      },
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('merchant/credit/delete', {
              merchantNo: row.merchantNo,
              applyNo: row.applyNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
              this.getList(jumpPage);
            }
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
