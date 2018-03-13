<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/carmodelmanage">车型管理</i-breadcrumb-item>
      <i-breadcrumb-item>品牌管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="password">
          品牌名称
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.brandName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <!--<div class="form-top-actions">-->
      <!--<i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>-->
    <!--</div>-->
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+88" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="品牌名称" prop="brandName">
          <i-input v-model="fromData.brandName" placeholder="" readonly></i-input>
        </i-form-item>
        <i-form-item label="首字母" prop="initial">
          <i-input v-model="fromData.initial" placeholder="" readonly></i-input>
        </i-form-item>
        <i-form-item label="品牌LOGO" prop="bannerUrl" :rules="{required: true, message: '请选择图片', trigger: 'blur'}">
          <input type="hidden" v-model="fromData.logo"/>
          <i-upload
            :format="['jpg','jpeg','png']"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :action="$config.HTTPBASEURL+'/common/upload'"
            :show-upload-list="false">
            <div class="upload-image">
              <div v-if="!fromData.logo">
                <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
                <p>单击或拖动文件上传</p>
              </div>
              <img v-else height="95" :src="fromData.logo" alt="">
            </div>
          </i-upload>
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
        total: 0,
        currentPage: 1,
        smsTriggerPointEnum: {},
        uploadFileName: '',
        searchForm: {
          'brandName': '',
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          'brandName': '',
          'initial': '',
          'logo': '',
          'brandNo': ''
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
        let resp = await this.$http.post('/ces/brand/page', {
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
        let url = this.$data.isAdd ? '' : '/ces/brand/update';
        let resp = await this.$http.post(url, {
          ...this.$data.fromData
        });
        this.$data.buttonLoading = false;
        this.$data.addModal = false;
        if (resp.success) {
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
      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.$data.fromData.logo = res.body.url;
      },
      // 上传失败
      uploadError(err, file, fileList) {
        this.$Notice.error({
          title: '错误提示',
          desc: err
        });
      },
      // 取消 按钮
      cancelFun() {
        this.$data.addModal = false;
      }
    },
    mounted() {
      this.getProxyPayList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.smsTriggerPointEnum = enumSelectData.get('smsTriggerPointEnum');
    }
  };
</script>
<style lang="scss" scoped>
  .upload-image {
    text-align: center;
    cursor: pointer;
  }
</style>
