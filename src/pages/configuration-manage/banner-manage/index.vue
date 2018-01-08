<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>banner管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info" @click="addModal=!addModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <Form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="标题" prop="name" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
          <i-input v-model="banner.title" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="banner链接" :rules="{required: true, message: 'banner链接不能为空', trigger: 'blur'}" prop="mail">
          <i-input v-model="banner.linkUrl" placeholder=""></i-input>
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
        <i-form-item label="排序" prop="name">
          <i-input v-model="banner.index" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="是否激活" prop="mail">
          <i-select v-model="banner.activeStatus">
            <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitFun" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </Form>
    </pt-modal>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'bannerManage',
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        addModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        fromData: {
          'title': '',
          'bannerUrl': '',
          'linkUrl': '',
          'index': '',
          'activeStatus': ''
        }
      };
    },
    components: {
      'pt-modal': PTModal
    },
    computed: {
      resultCustomerColumns() {
        if (this.type === 'modal') {
          return this.$data.customerColumns;
        } else {
          return [...this.$data.customerColumns, ...this.$data.customerActionColumns];
        }
      }
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    methods: {
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      jumpPage(page) {
        this.getProxyPayList(page);
      },
      search() {
        this.getProxyPayList();
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/cfg/banner/list', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
//      async addBanner() {
//        console.log(this.$data.banner);
//        this.$data.dataLoading = true;
//        let resp = await this.$http.post('/cfg/banner/add', this.$data.banner);
//        this.$data.dataLoading = false;
//      }
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
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let resp = await this.$http.post('cfg/banner/add', {
          ...this.$data.fromData
        });
        this.$data.buttonLoading = false;
        this.$data.showAddModal = false;
//        if (resp.success) {
//          let text = this.$data.isAdd ? '新增成功' : '修改成功';
//          this.$Message.success(text);
//          this.$refs.tableDistributorList.getPrivateCustomerList();
//        }
      },
      // 提交
      submitFun() {
        const formName = 'banner';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      }
    },
    mounted() {
      this.getProxyPayList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
      // console.log(.get('YesNoEnum'));
    }
  };
</script>
<style lang="scss" scoped>
</style>
