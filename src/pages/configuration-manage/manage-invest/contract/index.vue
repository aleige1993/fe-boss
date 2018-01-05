<template>
  <!--合同模板维护-->
  <div id="invest-maintain">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>合同模板维护</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline label-position="left" ref="formSearch" :model="formSearch">
        <i-form-item prop="contractTemplateName" label="合同名称" :label-width="100">
          <i-input type="text" placeholder="合同名称"  v-model="formSearch.contractTemplateName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary" @click="search">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table border :page-size="pageSize" :loading="dataLoading" ref="contractTemplateTable" :columns="resultColumns" :data="data1" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="ShowModal" :width="600">
      <i-form v-if="ShowModal" ref="formContract" :model="formContract" label-position="right" :label-width="150">
        <i-form-item
          label="合同名称"
          :rules="{required: true, message: '合同名称不能为空', trigger: 'blur'}"
          prop="contractTemplateName">
          <i-input v-model="formContract.contractTemplateName">
          </i-input>
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
  import DataMixin from './mixin-data';
  import BSModal from '@/components/bs-modal';
  export default {
    name: 'manage-invest-maintain',
    mixins: [DataMixin],
    components: {
      'bs-modal': BSModal
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
          yundaiContractId: '', // 云贷签约平台模板ID
          contractTemplateAttach: '' // 合同附件
        }
      };
    }, // end data
    computed: {
      resultColumns() {
        if (this.type === 'modal') {
          return this.$data.columns1;
        } else {
          return [...this.$data.columns1, ...this.$data.columnsFeatureActionColumns];
        }
      }
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.formSearch.currentPage = page;
        }
        let resp = await this.$http.post('/contract/listContractTemplate', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          contractTemplateName: this.$data.formSearch.contractTemplateName
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$data.data1 = [];
        }
      },
      search() {
        this.getPrivateCustomerList();
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
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
        this.formContract = row;
      },
      // 新增的保存请求方法
      async addSetSuBmit(tit) {
        this.$data.buttonLoading = true;
        let id = this.$data.formContract.id;
        let resAdd = await this.$http.post('/contract/saveContractTemplate', {
          id,
          contractTemplateName: this.$data.formContract.contractTemplateName,
          contractTemplateAttach: this.$data.formContract.contractTemplateAttach,
          contractTemplateNo: this.$data.formContract.contractTemplateNo,
          yundaiContractId: this.$data.formContract.yundaiContractId
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.ShowModal = false;
        if (resAdd.success) {
          this.$Message.success(tit);
          this.getPrivateCustomerList();
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
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/contract/deleteContractTemplate', {
              contractTemplateNo: row.contractTemplateNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
              this.getPrivateCustomerList(jumpPage);
            }
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
