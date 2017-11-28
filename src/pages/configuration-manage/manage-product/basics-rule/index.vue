<template>
<!--准入规则配置-->
  <div id="page-rule">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>准入规则配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total @on-change="jumpPage"></i-page>
    </div>
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="准入规则名称" prop="approveRuleName">
          <i-input v-model="formCustom.approveRuleName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入准入规则名称..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" @click="handleCancel()" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'basics-rule',
    components: {
      'pt-modal': PTModal
    },
    mixins: [MixinData],
    data() {
      return {
        dataLoading: false,
        buttonLoading: false,
        isAdd: true,
        showAddModal: false,
        listIndex: Number,
        total: 0,
        pageSize: 15,
        currentPage: 1,
        formCustom: {
          approveRuleName: ''
        }
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/cfgApproveRule/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/cfgApproveRule/save', {
          approveRuleName: this.$data.formCustom.approveRuleName,
          productNo: '123754',
          productName: '测试001'
        });
        if (resAdd.success) {
          this.$data.buttonLoading = false; // 关闭按钮的loading状态
          this.$Message.success('添加准入规则成功');
          this.$data.showAddModal = false;
          this.$data.buttonLoading = false;
          this.getPrivateCustomerList();
        }
      },
      // 跳转页面
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.formCustom.approveRuleName = '';
        this.$data.showAddModal = true;
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let resModify = await this.$http.post('/pms/cfgApproveRule/modify', {
          approveRuleName: this.$data.formCustom.approveRuleName,
          approveRuleCode: this.$data.formCustom.approveRuleCode,
          productNo: '123456789',
          productName: '模拟测试名称'
        });
        if (resModify.success) {
          this.$data.showAddModal = false;
          this.$data.buttonLoading = false;
          this.$Message.success('修改准入规则成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let approveRuleCode = row.approveRuleCode;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/cfgApproveRule/remove', {
              approveRuleCode: approveRuleCode
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除准入规则成功');
              this.getPrivateCustomerList(1);
            }
          }
        });
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        this.$data.buttonLoading = true;
        // 如果是新增
        if (this.isAdd) {
          this.addSuBmit();
        } else {
          this.setSubmit();
        }
      },
      handleCancel() {
        this.$data.showAddModal = false;
        this.$data.formCustom.approveRuleName = '';
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-rule {
    & .bs-form-block .block-body {
      border: 0;
    }
    & .form-top-actions {
      font-size: 0;
      padding-left: 10px;
      & button {
        margin-right: 10px;
      }
    }
  }
</style>
