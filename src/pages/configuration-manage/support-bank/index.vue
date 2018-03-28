<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>支持银行管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+98" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form v-if="addModal" ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="银行名称" prop="bankName">
          <i-input v-model="fromData.bankName" placeholder="" ></i-input>
        </i-form-item>
        <i-form-item label="银行编码" prop="bankCode">
          <i-input v-model="fromData.bankCode" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="银行logo" prop="bannerLogo" :rules="{required: true, message: '请选择银行logo', trigger: 'blur'}">
          <input type="hidden" v-model="fromData.bannerLogo"/>
          <i-upload
              :format="['jpg','jpeg','png']"
              :on-success="uploadSuccess"
              :before-upload="uploadProgress"
              :on-error="uploadError"
              :action="$config.HTTPBASEURL+'/common/upload'"
              :show-upload-list="false">
            <div class="upload-image">
              <div v-if="!fromData.bannerLogo">
                <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
                <p>单击或拖动文件上传</p>
                <i-spin fix v-if="fileUploading">
                  <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                  <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
                </i-spin>
              </div>
              <img v-else height="95" :src="fromData.bannerLogo" alt="">
            </div>
          </i-upload>
        </i-form-item>
        <i-form-item label="是否启用" prop="status" :rules="{required: true, message: '请选择是否启用', trigger: 'blur'}">
          <i-select v-model="fromData.status">
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
      </i-form>
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
        buttonLoading: false,
        fileUploading: false,
        total: 0,
        currentPage: 1,
        uploadFileName: '',
        searchForm: {
          'projectNo': '',
          'toAccName': '',
          'transCardId': '',
          'btime': '',
          'etime': '',
          'status': '',
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          bannerLogo: ''
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
        this.getProxyPayList(1);
      },
      add() {
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$refs['fromData'].resetFields();
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/supportBank/page', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
//        let url = this.$data.isAdd ? 'cfg/banner/add' : 'cfg/banner/modify';
        let resp = await this.$http.post('/supportBank/save', {
          ...this.$data.fromData
        });
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$data.addModal = false;
          let text = this.$data.isAdd ? '添加成功' : '修改成功';
          this.$Message.success(text);
          this.getProxyPayList();
        }
      },
      // 提交
      submitFun() {
        this.$refs['fromData'].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 上传文件之前的回掉
      uploadProgress() {
        this.$data.fileUploading = true;
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.$data.fromData.bannerLogo = res.body.url;
        this.$data.fileUploading = false;
      },
      // 上传失败
      uploadError(err, file, fileList) {
        this.$Notice.error({
          title: '错误提示',
          desc: err
        });
        this.$data.fileUploading = false;
      },
      // 取消 按钮
      cancelFun() {
        this.$data.addModal = false;
      }
    },
    mounted() {
      this.getProxyPayList();
    }
  };
</script>
<style lang="scss" scoped>
  .upload-image {
    text-align: center;
    cursor: pointer;
  }
</style>
