<template>
  <!--资方合同模板配置-->
  <div id="contract-configuration">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="ContractTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <br>
    <br>
    <!--/////////////////////////////////////////////////////////////////////////////////////-->
    <bs-modal :title="'新增'" v-model="ShowModal" :width="600">
      <i-form ref="dataForm" :model="dataForm" label-position="right" :label-width="120">
        <!--产品名称-->
        <i-form-item prop="productName" label="产品名称">
          <i-input type="text" placeholder="" v-model="dataForm.productName" readonly></i-input>
        </i-form-item>
        <!--资方名称-->
        <i-form-item prop="capitalName" label="资方名称">
          <i-input type="text" placeholder="" v-model="dataForm.capitalName" readonly></i-input>
        </i-form-item>
        <!--合同模板-->
        <i-form-item
          label="合同模板"
          prop="contractTemplateName">
          <input type="hidden" v-model="dataForm.contractTemplateName"/>
          <i-input v-model="dataForm.contractTemplateName" :readonly="true" placeholder="选择合同模板">
            <i-button @click="showSelectContractTemplate=!showSelectContractTemplate" slot="append">选择合同模板 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="btnLoading">
            <span v-if="!btnLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <!--<i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>-->
        </i-form-item>
      </i-form>
    </bs-modal>

    <!--选择合同模板的弹窗-->
    <bs-modal title="选择合同模板" :width="1200" v-model="showSelectContractTemplate">
      <!--传入合同属主contractSource。（1为资金方，2为产品）-->
      <table-contracttemplate-list :type="'modal'"  :contractSource="'1'" v-if="showSelectContractTemplate" @on-row-dbclick="selectContractTemplate"></table-contracttemplate-list>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import GetContractTemplateModal from '@/components/table-contract-template-list'; // 选择合同模板
  export default {
    name: 'contractConfiguration',
    mixins: [MixinData],
    props: {
      getRowData: Object
    },
    components: {
      'bs-modal': BSModal,
      'table-contracttemplate-list': GetContractTemplateModal
    },
    data() {
      return {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        ShowModal: false,
        buttonLoading: false,
        btnLoading: false,
        dataLoading: false,
        showSelectContractTemplate: false, // 合同模板模态框
        dataForm: {
          productName: '',
          capitalName: '',
          contractTemplateNo: '',
          contractTemplateName: ''
        }
      };
    },
    mounted() {
      this.$data.dataForm.productName = this.getRowData.productName;
      this.$data.dataForm.capitalName = this.getRowData.capitalName;
      this.getPrivateCustomerList();
    },
    methods: {
      // 查询列表数据
      async getPrivateCustomerList(page) {
        page && (this.$data.currentPage = page);
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/pms/capital/listContractTemplateCfg', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          productNo: this.getRowData.productNo,
          capitalNo: this.getRowData.capitalNo
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body.resultList;
          this.$data.total = resp.body.totalNum / 1;
          this.$data.currentPage = resp.body.currentPage / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 打开弹窗
      addModal() {
        this.$data.ShowModal = true;
        this.$data.dataForm = {};
        this.$data.dataForm.productName = this.getRowData.productName;
        this.$data.dataForm.capitalName = this.getRowData.capitalName;
      },
      // 新增的保存请求方法
      async addSuBmit() {
        let resAdd = await this.$http.post('/pms/capital/saveContractTemplateCfg', {
          contractTemplateName: this.$data.dataForm.contractTemplateName,
          contractTemplateNo: this.$data.dataForm.contractTemplateNo,
          capitalNo: this.getRowData.capitalNo,
          capitalName: this.getRowData.capitalName,
          productNo: this.getRowData.productNo,
          productName: this.getRowData.productName
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.ShowModal = false;
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            // let productNo = row.productNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/capital/deleteContractTemplateCfg', {
              contractTemplateNo: row.contractTemplateNo,
              capitalNo: this.getRowData.capitalNo,
              productNo: this.getRowData.productNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      formSubmit() {
        this.addSuBmit();
      },
      // 选择合同模板
      selectContractTemplate(row, index) {
        this.$data.dataForm.contractTemplateNo = row.contractTemplateNo;
        this.$data.dataForm.contractTemplateName = row.contractTemplateName;
        this.$data.showSelectContractTemplate = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
