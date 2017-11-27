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
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal title="新增" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="准入规则名称" prop="proname">
          <i-input v-model="formCustom.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入准入规则名称..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
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
        isAdd: true,
        showAddModal: false,
        listIndex: Number,
        total: 0,
        currentPage: 1,
        formCustom: {
          textarea: ''
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
        let resp = await this.$http.get('/pms/cfgApproveRule/list?currentPage=' + this.$data.currentPage + '&pageSize=15');
        this.$data.dataLoading = false;
        console.log(resp);
        this.$data.data1 = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        Alertify.confirm('确定要删除吗？', (confirm) => {
          if (confirm) {
            this.data1.splice(index, 1);
            // Alertify.alert('确定');
          } else {}
        });
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom.textarea = row.ruleName;
      },
      formSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            ruleId: '003',
            ruleName: this.$data.formCustom.textarea
          });
          this.$data.showAddModal = false;
        } else {
          let textData = this.$data.formCustom.textarea;
          this.$data.data1[this.listIndex].ruleName = textData;
          this.$data.showAddModal = false;
        }
        this.$data.formCustom.textarea = '';
      },
      handleCancel() {
        this.$data.showAddModal = false;
        this.$data.formCustom.textarea = '';
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
