<template>
  <!--合同模板维护-->
  <div id="invest-maintain">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>合同模板维护</i-breadcrumb-item>
    </i-breadcrumb>
    <table-contract-template-list ref="tableContractList" :contractSource="'1'" @on-row-dbclick="selectContractTemplate" @on-set-row="setList">
      <div class="form-top-actions" slot="topAction">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
    </table-contract-template-list>
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="ShowModal" :width="620">
      <i-form v-if="ShowModal" ref="formContract" :model="formContract" label-position="right" :label-width="130">
        <i-form-item
          label="合同名称"
          :rules="{required: true, message: '合同名称不能为空', trigger: 'blur'}"
          prop="contractTemplateName">
          <i-input v-model="formContract.contractTemplateName">
          </i-input>
        </i-form-item>
        <i-form-item
          label="合同宿主"
          :rules="{required: true, message: '合同宿主不能为空', trigger: 'change'}"
          prop="contractSource">
          <i-select v-model="formContract.contractSource">
            <i-option v-for="item in enumSelectData.get('ContractSourceEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item
          label="合同类型"
          :rules="{required: true, message: '合同类型不能为空', trigger: 'change'}"
          prop="contractType">
          <i-select v-model="formContract.contractType">
            <i-option v-for="item in enumSelectData.get('ContractTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="云贷签约平台模板ID" prop="yundaiContractId">
          <i-input v-model="formContract.yundaiContractId" placeholder="非必填项">
          </i-input>
        </i-form-item>
        <i-form-item
          :rules="{required: true, message: '协议附件不能为空', trigger: 'blur'}"
          label="合同模板附件"
          prop="contractTemplateAttach">
          <i-upload
            :show-upload-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            type="drag"
            :action="$config.HTTPBASEURL + '/common/upload'">
            <div style="padding: 20px 0">
              <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
              <p>单击或拖动文件上传</p>
            </div>
          </i-upload>
          <p v-if="isAdd" class="show-upload-text" v-text="uploadFileName"></p>
          <p v-else class="show-upload-text" v-text="formContract.contractTemplateAttach"></p>
          <input type="hidden" v-model="formContract.contractTemplateAttach" style="width: 100%;border: 0;">
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  import GetContractTemplateModal from '@/components/table-contract-template-list'; // 选择合同模板
  export default {
    name: 'manage-invest-maintain',
    components: {
      'bs-modal': BSModal,
      'table-contract-template-list': GetContractTemplateModal
    },
    data() {
      return {
        isAdd: true,
        ShowModal: false,
        buttonLoading: false,
        dataLoading: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        uploadFileName: '',
        formSearch: {
          contractTemplateName: '',
          currentPage: 1,
          pageSize: 15
        },
        formContract: {
          contractTemplateNo: '', // 合同编号
          contractTemplateName: '', // 合同名称
          contractSource: '', // 合同宿主
          contractType: '', // 合同类型
          yundaiContractId: '', // 云贷签约平台模板ID
          contractTemplateAttach: '' // 合同附件
        }
      };
    }, // end data
    mounted() {
      // this.getPrivateCustomerList();
    },
    methods: {
      // 选择合同模板
      selectContractTemplate(row, index) {
        this.$data.formCustom.contractTemplateNo = row.contractTemplateNo;
        this.$data.formCustom.contractTemplateName = row.contractTemplateName;
        this.$data.showSelectContractTemplate = false;
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      // 新增弹窗
      addModal() {
        this.$data.isAdd = true;
        this.$data.ShowModal = true;
        this.$data.formContract = {};
        this.$data.uploadFileName = '';
      },
      setList(row) {
        this.isAdd = false;
        this.$data.ShowModal = true;
        this.$data.formContract = row;
      },
      // 新增的保存请求方法
      async addSetSuBmit(tit) {
        this.$data.buttonLoading = true;
        let id = this.$data.formContract.id;
        let resAdd = await this.$http.post('/contract/saveContractTemplate', {
          id,
          contractTemplateName: this.$data.formContract.contractTemplateName,
          contractSource: this.$data.formContract.contractSource,
          contractType: this.$data.formContract.contractType,
          contractTemplateAttach: this.$data.formContract.contractTemplateAttach,
          contractTemplateNo: this.$data.formContract.contractTemplateNo,
          yundaiContractId: this.$data.formContract.yundaiContractId
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.ShowModal = false;
        if (resAdd.success) {
          this.$Message.success(tit);
          this.$refs['tableContractList'].getPrivateCustomerList();
        }
      },
      // 提交 按钮
      formSubmit() {
        let formName = 'formContract';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 如果是新增
            let tit = this.isAdd ? '新增成功' : '修改成功';
            this.addSetSuBmit(tit);
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 取消 按钮
      formCancel() {
        this.$data.ShowModal = false;
        this.$data.formContract = {};
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.$data.uploadFileName = file.name;
        this.$data.formContract.contractTemplateAttach = res.body.url;
      },
      // 上传失败
      uploadError(err, file, fileList) {
        this.$data.uploadFileName = '';
        this.$Notice.error({
          desc: err
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #invest-maintain {
    & .show-upload-text {
      position: relative;
      padding-right: 36px;
      line-height: 20px;
      min-height: 20px;
      color: #666;
    }
  }
</style>
