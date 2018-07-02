<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>banner管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+98" border :loading="dataLoading" ref="selection" @on-select="selectRow"
             :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator
              show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="1000" :zIndex="200"
              @on-close="fileUploading=false">
      <i-form v-if="addModal" ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="类型" prop="bannerType" :rules="{required: true, message: '请选择类型', trigger: 'blur'}">
          <i-select v-model="fromData.bannerType">
            <i-option v-for="item in bannerTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}
            </i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="标题" prop="title" :rules="{required: true, message: '标题不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.title" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="封面" prop="bannerUrl" :rules="{required: true, message: '请选择封面', trigger: 'blur'}">
          <input type="hidden" v-model="fromData.bannerUrl"/>
          <i-upload
            :format="['jpg','jpeg','png']"
            :on-success="uploadSuccess"
            :before-upload="uploadProgress"
            :on-error="uploadError"
            :max-size="uploadMaxSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :action="$config.HTTPBASEURL+'/common/upload'"
            :show-upload-list="false">
            <div class="upload-image">
              <div v-if="!fromData.bannerUrl">
                <i-icon type="ios-cloud-upload" size="52" style="color: #3399ff"></i-icon>
                <p>单击或拖动文件上传</p>
              </div>
              <img v-else height="95" :src="fromData.bannerUrl" alt="">
              <i-spin fix v-if="fileUploading">
                <Icon type="load-c" size=18  class="demo-spin-icon-load"></Icon>
                <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
              </i-spin>
            </div>
          </i-upload>
        </i-form-item>
        <i-form-item label="链接">
          <div class="flex-item">
            <i-input v-model="fromData.linkUrl" placeholder=""></i-input>
            <i-button type="primary" @click="createLink">
              <span>自动生成</span>
            </i-button>
          </div>
        </i-form-item>
        <i-form-item label="内容" prop="content">
          <editor v-if="isAdd" @change="editorContent"></editor>
          <editor v-else="" :editor-content="fromData.content" @change="editorContent"></editor>
        </i-form-item>
        <i-form-item label="排序" prop="index" :rules="{required: true, message: '排序不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.index" placeholder="" style="width: 100%"></i-input>
        </i-form-item>
        <i-form-item label="是否激活" prop="activeStatus" :rules="{required: true, message: '请选择是否激活', trigger: 'blur'}">
          <i-select v-model="fromData.activeStatus">
            <i-option v-for="item in certTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}
            </i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="submitFun" :loading="buttonLoading||fileUploading">
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
  import Editor from '@/components/wangeditor';
  import Tools from '../../../utils/Tools';
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
        bannerTypeEnum: {},
        certTypeEnum: {},
        searchForm: {
          currentPage: 1,
          pageSize: 15
        },
        fromData: {},
        initFormData: {
          'id': '',
          'bannerNo': '',
          'title': '',
          'bannerUrl': '',
          'linkUrl': '',
          'index': '',
          'activeStatus': '',
          'bannerType': '',
          'content': ''
        }
      };
    },
    components: {
      'pt-modal': PTModal,
      Editor
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
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/cfg/banner/list', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.privateCustomerLoanList = this.$data.privateCustomerLoanList.map(item => {
          item.bannerType = item.bannerType.toString();
          return item;
        });
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      add() {
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$data.fromData = this.$data.initFormData;
        this.$data.fromData.bannerNo = Tools.generateUUID();
      },
      createLink() {
        this.$data.fromData.linkUrl = Tools.getFeH5Host() + '/#/newsdetail?id=' + this.$data.fromData.bannerNo;
      },
      editorContent(content) {
        this.$data.fromData.content = content;
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? 'cfg/banner/add' : 'cfg/banner/modify';
        let resp = await this.$http.post(url, {
          'id': this.$data.fromData.id,
          'bannerNo': this.$data.fromData.bannerNo,
          'title': this.$data.fromData.title,
          'bannerUrl': this.$data.fromData.bannerUrl,
          'linkUrl': this.$data.fromData.linkUrl,
          'index': this.$data.fromData.index,
          'activeStatus': this.$data.fromData.activeStatus,
          'bannerType': this.$data.fromData.bannerType,
          'content': this.$data.fromData.content
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
        if (this.$data.addModal) {
          this.$data.fromData.bannerUrl = res.body.url;
        }
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
      this.$data.bannerTypeEnum = [
        {
          'itemCode': '3',
          'itemName': '全部'
        },
        {
          'itemCode': '1',
          'itemName': 'banner'
        },
        {
          'itemCode': '2',
          'itemName': '头条'
        }
      ];
      this.$data.certTypeEnum = [
        {
          'itemCode': '1',
          'itemName': '是'
        },
        {
          'itemCode': '0',
          'itemName': '否'
        }
      ];
    }
  };
</script>
<style lang="scss" scoped>
  .flex-item {
    display: flex;
    .ivu-btn {
      margin-left: 5px!important;
    }
  }
  .upload-image {
    text-align: center;
    cursor: pointer;
  }
</style>
