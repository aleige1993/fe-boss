<template>
  <!--资方合同模板配置-->
  <div id="contract-configuration">
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="ContractTable" :columns="columns1" :data="data1"></i-table>
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
          <i-input v-model="dataForm.contractTemplateName" :disabled="true" placeholder="选择合同模板">
            <i-button @click="showSelectContractTemplate=!showSelectContractTemplate" slot="append">选择合同模板 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <!--合同类型-->
        <i-form-item prop="contractType" label="合同类型">
          <Select v-model="dataForm.contractType">
            <i-option v-for="item in enumSelectData.get('ContractTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </Select>
        </i-form-item>
        <!--签订方式-->
        <i-form-item prop="signType" label="签订方式">
          <Select v-model="dataForm.signType">
            <i-option v-for="item in enumSelectData.get('SignTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </Select>
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
      <table-contracttemplate-list v-if="showSelectContractTemplate" type="modal" @on-row-dbclick="selectContractTemplate"></table-contracttemplate-list>
    </bs-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import GetContractTemplateModal from '@/pages/configuration-manage/manage-invest/contract'; // 选择合同模板
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
        ShowModal: false,
        buttonLoading: false,
        btnLoading: false,
        dataLoading: false,
        showSelectContractTemplate: false, // 合同模板模态框
        dataForm: {
          productName: '',
          capitalName: '',
          contractType: '', // 合同类型
          contractTemplateNo: '',
          contractTemplateName: '',
          signType: ''
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
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/pms/capital/listContractTemplateCfg', {
          productNo: this.getRowData.productNo,
          capitalNo: this.getRowData.capitalNo
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
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
          contractType: this.$data.dataForm.contractType,
          signType: this.$data.dataForm.signType,
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
