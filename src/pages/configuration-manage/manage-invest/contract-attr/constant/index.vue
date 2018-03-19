<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>合同字段常量池</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          常量名：
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.fieldName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="user">
          常量描述：
        </i-form-item>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.fieldDesc" placeholder=""></i-input>
        </i-form-item>
        <i-form-item prop="user">
          常量类型：
        </i-form-item>
        <i-form-item prop="user">
          <i-select style="width: 120px" v-model="searchForm.fieldType">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in certTypeEnum" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+40" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="90">
        <i-form-item label="常量名：" prop="fieldName" :rules="{required: true, message: '常量名不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.fieldName" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="常量描述：" prop="fieldDesc" :rules="{required: true, message: '常量描述不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.fieldDesc" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="常量值：" prop="fieldValue" :rules="{required: true, message: '常量值不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.fieldValue" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="常量类型：">
          自定义常量
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
        certTypeEnum: {},
        uploadFileName: '',
        searchForm: {
          'fieldName': '',
          'fieldDesc': '',
          'fieldType': '',
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          'id': '',
          'fieldName': '',
          'fieldDesc': '',
          'fieldType': '2',
          'fieldValue': ''
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
        let resp = await this.$http.post('/PmsContractConstField/list', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? '/PmsContractConstField/add' : '/PmsContractConstField/modify';
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
      // 取消 按钮
      cancelFun() {
        this.$data.addModal = false;
      }
    },
    mounted() {
      this.getProxyPayList();
      this.$data.certTypeEnum = [
        {
          'itemCode': '1',
          'itemName': '系统常量'
        },
        {
          'itemCode': '2',
          'itemName': '自定义常量'
        }
      ];
    }
  };
</script>
<style lang="scss" scoped>
  .upload-image {
    text-align: center;
    cursor: pointer;
  }
</style>
