<template>
<!--渠道商管理员-->
  <div id="pageDistributorAdmin">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商列表</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商操作员管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border :loading="dataLoading" ref="tableAdmin" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <!--操作员新增-->
    <bs-modal :title="'操作员新增'" :width="600" v-model="showAddModal">
      <i-form v-if="showAddModal" ref="formAdmin" :model="formAdmin" label-position="right" :label-width="120">
        <i-form-item
          label="登录账号"
          :rules="{required: true, message: '登录账号不能为空', trigger: 'blur'}"
          prop="signId">
          <i-input v-model="formAdmin.signId">
          </i-input>
        </i-form-item>
        <i-form-item
          label="操作员类型"
          :rules="{required: true, message: '请选择操作员类型', trigger: 'change'}"
          prop="adminType">
          <i-select v-model="formAdmin.adminType">
            <i-option value="1">超级管理员</i-option>
            <i-option value="2">普通用户</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  export default {
    name: '',
    mixins: [MixinData],
    components: {
      BsModal
    },
    data() {
      return {
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formAdmin: {
          signId: '',
          adminType: ''
        }
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      addModal() {
        this.$data.showAddModal = true;
        this.$data.formAdmin = {};
      },
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/merchant/pageDistributorAdmin', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          merchantNo: this.$route.query.merchantNo
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
        } else {
          this.$Notice.warning({
            title: '"渠道商操作员管理列表"没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        this.getList(page);
      },
      // 新增
      async addSuccess() {
        this.$data.buttonLoading = true;
        let resp = await this.$http.post('/commonTestAjax', {});
        this.$data.buttonLoading = false;
        this.$data.showAddModal = false;
        if (resp.success) {
          this.$Message.success('新增成功');
        }
        this.getList();
      },
      formSubmit() {
        const formName = 'formAdmin';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      handleCancel() {
        this.$data.showAddModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
