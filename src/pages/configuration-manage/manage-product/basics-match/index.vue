<template>
<!--产品匹配配置-->
  <div id="page-match">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/product">产品配置</i-breadcrumb-item>
      <i-breadcrumb-item>产品匹配配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
    </div>
    <i-table :loading="dataLoading" border ref="tableMatch" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage" :page-size="pageSize"></i-page>
    </div>
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal">
      <i-form  ref="formData" :model="formData" label-position="left" :label-width="100">
        <i-form-item
          label="产品名称"
          :rules="{required: true, message: '产品不能为空', trigger: 'blur'}"
          prop="productName">
          <input type="hidden" v-model="formData.productName"/>
          <i-input v-model="formData.productNo" :readonly="true" placeholder="选择产品">
            <i-button @click="showSelectProduct=!showSelectProduct" slot="append">选择产品 <Icon type="ios-more"></Icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="车类" prop="carType"
                     :rules="{required: true, message: '请选择', trigger: 'change'}">
          <i-select v-model="formData.carType">
            <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>Loading...</span>
          </i-button>
          <i-button type="ghost" @click="handleCancel" style="margin-left: 8px">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--选择产品的弹窗-->
    <bs-modal title="选择产品" :width="1200" v-model="showSelectProduct">
      <table-product-list :type="'modal'" @on-row-dbclick="selectProduct"></table-product-list>
    </bs-modal>
  </div>
</template>

<script>
  import GetProductModal from '@/pages/configuration-manage/manage-product/product-list'; // 选择产品
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'basics-cost',
    components: {
      BsModal,
      'table-product-list': GetProductModal
    },
    mixins: [MixinData],
    data() {
      return {
        isAdd: true,
        dataLoading: false,
        buttonLoading: false,
        showAddModal: false,
        showSelectProduct: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formData: {
          productMatchNo: '',
          productNo: '',
          productName: '',
          carType: ''
        }
      };
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 选择产品
      selectProduct(row, index) {
        this.$data.formData.productNo = row.productNo;
        this.$data.formData.productName = row.productName;
        this.$data.formData.productType = row.productType;
        this.$data.showSelectProduct = false;
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/productMatch/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.body.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        this.$data.buttonLoading = true;
        let resAdd = await this.$http.post('/pms/productMatch/save', {
          productNo: this.$data.formData.productNo,
          productName: this.$data.formData.productName,
          productType: this.$data.formData.productType
        });
        this.$data.buttonLoading = false; // 关闭按钮的loading状态
        this.$data.showAddModal = false;
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.getPrivateCustomerList();
        }
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      addModal() {
        this.isAdd = true;
        this.$data.showAddModal = true;
        this.$data.formData = {};
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            let productMatchNo = row.productMatchNo;
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('/pms/productMatch/save', {
              productMatchNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              this.getPrivateCustomerList(1);
            }
          }
        });
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formData = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        this.$data.buttonLoading = true;
        let resModify = await this.$http.post('/pms/productMatch/list', {
          productMatchNo: this.$data.formData.productMatchNo,
          productNo: this.$data.formData.productNo,
          productName: this.$data.formData.productName,
          productType: this.$data.formData.productType
        });
        this.$data.showAddModal = false;
        this.$data.buttonLoading = false;
        if (resModify.success) {
          this.$Message.success('修改成功');
          this.getPrivateCustomerList();
        }
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        const formName = 'formData';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isAdd) {
              this.addSuBmit();
            } else {
              this.setSubmit();
            }
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      handleCancel() {
        this.$data.showAddModal = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-cost {
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
