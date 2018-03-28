<template>
<!--贷款材料配置-->
  <div id="page-loan">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>贷款材料配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table :height="tableFixHeight+98" :loading="dataLoading" border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :loading="buttonLoading" :page-size="pageSize"></i-page>
    </div>
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="贷款材料名称" prop="loanDocName">
          <i-input v-model="formCustom.loanDocName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入贷款材料名称..."></i-input>
        </i-form-item>
        <i-form-item label="客户类型" prop="approveRuleName">
          <i-select v-model="formCustom.custType" placeholder="请选择客户类型">
            <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" @click="formCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'basics-loan',
    mixins: [MixinData],
    components: {
      'pt-modal': PTModal
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formCustom: {
          loanDocName: '',
          custType: ''
        }
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/cfgLoanDoc/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/cfgLoanDoc/save', {
          loanDocName: this.$data.formCustom.loanDocName,
          custType: this.$data.formCustom.custType
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        if (resAdd.success) {
          this.$data.showAddModal = false;
          this.$Message.success('添加贷款材料成功');
          this.getPrivateCustomerList();
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.formCustom.loanDocName = '';
        this.$data.showAddModal = true;
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let loanDocCode = row.loanDocCode;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/cfgLoanDoc/remove', {
              loanDocCode
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除贷款材料成功');
              this.getPrivateCustomerList(1);
            }
          }
        });
      },
      // 修改按钮
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = row;
      },
      // 修改情况下的提交数据
      async modifySubmit() {
        let resModify = await this.$http.post('/pms/cfgLoanDoc/modify', {
          loanDocName: this.$data.formCustom.loanDocName,
          loanDocCode: this.$data.formCustom.loanDocCode,
          custType: this.$data.formCustom.custType
        });
        this.$data.buttonLoading = false;
        this.$data.showAddModal = false;
        if (resModify.success) {
          this.$Message.success('修改贷款材料成功');
          this.getPrivateCustomerList();
        }
      },
      //
      async formSubmit() {
        this.$data.buttonLoading = true;
        // 如果是新增
        if (this.isAdd) {
          this.addSuBmit();
        } else {
          this.modifySubmit();
        }
      },
      formCancel() {
        this.showAddModal = false;
        this.$data.formCustom.loanDocName = '';
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-loan {
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
