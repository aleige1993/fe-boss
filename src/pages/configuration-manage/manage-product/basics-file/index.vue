<template>
<!--归档材料配置-->
  <div id="page-file">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>归档材料配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table border :loading="dataLoading" ref="selection" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form  ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item label="归档材料名称" prop="finishedDocName" :rules="{required: true, message: '归档材料名称不能为空', trigger: 'blur'}">
          <i-input v-model="formCustom.finishedDocName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入归档材料名称..."></i-input>
        </i-form-item>
        <i-form-item label="客户类型" prop="custType" :rules="{required: true, message: '请选择客户类型', trigger: 'change'}">
          <i-select v-model="formCustom.custType" placeholder="请选择客户类型">
            <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
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
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'basics-file',
    components: {
      'pt-modal': PTModal
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        showAddModal: false,
        dataLoading: false,
        buttonLoading: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formCustom: {
          finishedDocName: '',
          custType: ''
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
        let resp = await this.$http.get('/pms/cfgFinishedDoc/list', {
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
        let resAdd = await this.$http.post('/pms/cfgFinishedDoc/save', {
          finishedDocName: this.$data.formCustom.finishedDocName,
          custType: this.$data.formCustom.custType
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        if (resAdd.success) {
          this.$Message.success('新增归档材料成功');
          this.getPrivateCustomerList();
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.formCustom = {};
        this.$data.formCustom.finishedDocName = '';
        this.$data.showAddModal = true;
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        let resModify = await this.$http.post('/pms/cfgFinishedDoc/modify', {
          finishedDocCode: this.$data.formCustom.finishedDocCode,
          finishedDocName: this.$data.formCustom.finishedDocName,
          custType: this.$data.formCustom.custType
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false;
        if (resModify.success) {
          this.$Message.success('修改归档材料成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let finishedDocCode = row.finishedDocCode;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/cfgFinishedDoc/remove', {
              finishedDocCode
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除归档材料成功');
              this.getPrivateCustomerList(this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total));
            }
          }
        });
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        this.$refs['formCustom'].validate((valid) => {
          if (valid) {
            this.$data.buttonLoading = true;
            // 如果是新增
            if (this.isAdd) {
              this.addSuBmit();
            } else {
              this.setSubmit();
            }
          }
        });
      },
      handleCancel() {
        this.$data.showAddModal = false;
        this.$data.formCustom = {};
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-file {
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
