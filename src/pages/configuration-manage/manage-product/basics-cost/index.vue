<template>
<!--费用类型配置-->
  <div id="page-cost">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>费用类型配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="40" size="small" show-elevator show-total @on-change="jumpPage"></i-page>
    </div>
    <pt-modal title="新增" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="费用类型名称" prop="protype">
          <i-input placeholder="请输入费用类型名称" v-model="formCustom.costName"></i-input>
        </i-form-item>
        <i-form-item label="收支方向" prop="state">
          <i-select v-model="formCustom.costDirection">
            <i-option value="收入">收入</i-option>
            <i-option value="支出">支出</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'basics-cost',
    components: {
      'pt-modal': PTModal
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        listIndex: Number,
        showAddModal: false,
        currentPage: 1,
        total: 0,
        formCustom: {
          costName: '',
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
        let resp = await this.$http.get('/productCost', {});
        this.$data.dataLoading = false;
        this.$data.data1 = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      jumpPage() {
        this.getPrivateCustomerList();
      },
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        this.$data.data1.splice(index, 1);
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom.costName = row.costName;
        this.formCustom.costDirection = row.costDirection;
      },
      formSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            loanId: '003',
            costName: this.$data.formCustom.costName,
            costDirection: this.$data.formCustom.costDirection
          });
          this.$data.showAddModal = false;
        } else {
          this.$data.data1[this.listIndex].costName = this.$data.formCustom.costName;
          this.$data.data1[this.listIndex].costDirection = this.$data.formCustom.costDirection;
          this.$data.showAddModal = false;
        }
        this.formReset();
      },
      handleCancel() {
        this.$data.showAddModal = false;
      },
      formReset() {
        this.formCustom.costName = '';
        this.formCustom.costDirection = '';
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-cost {
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
