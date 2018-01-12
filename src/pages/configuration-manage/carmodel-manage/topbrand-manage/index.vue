<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/carmodelmanage">车型管理</i-breadcrumb-item>
      <i-breadcrumb-item>推荐品牌管理</i-breadcrumb-item>
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
          <i-button @click="searchList" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="add"><i class="iconfont icon-xinzeng"></i> 新增推荐</i-button>
    </div>
    <slot name="topAction"></slot>
    <i-table border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <pt-modal :title="isAdd ? '添加' : '修改'" v-model="addModal" :width="600" :zIndex="200">
      <i-form ref="fromData" :model="fromData" label-position="left" :label-width="80">
        <i-form-item label="品牌名称" prop="brandNo" :rules="{required: true, message: '请选择品牌名称'}">
          <i-select
            v-if="isAdd"
            v-model="fromData.brandNo"
            filterable
            remote
            :remote-method="remoteSearch"
            :loading="search.loading">
            <i-option v-for="item in search.returnlist" :key="item.brandNo" :value="item.brandNo">{{item.brandName}}</i-option>
          </i-select>
          <i-input v-else v-model="fromData.brandName" placeholder="" readonly></i-input>
        </i-form-item>
        <i-form-item label="排序" prop="recommOrder" :rules="{required: true, message: '排序不能为空', trigger: 'blur'}">
          <i-input v-model="fromData.recommOrder" placeholder=""></i-input>
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
        uploadFileName: '',
        searchForm: {
          'brandName': '',
          'recommStatus': '0',
          currentPage: 1,
          pageSize: 15
        },
        fromData: {
          'brandName': '',
          'brandNo': '',
          'recommOrder': ''
        },
        // 模糊搜索品牌
        search: {
          loading: false,
          loadList: [],
          returnlist: []
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
      searchList() {
        this.getProxyPayList();
      },
      add() {
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$data.fromData = {};
      },
      remoteSearch(query) {
        if (query !== '') {
          this.search.loading = true;
          let _this = this;
          setTimeout(() => {
            _this.search.loading = false;
//            const list = _this.search.loadList.map(item => {
//              return {
//                brandNo: item.brandNo,
//                brandName: item.brandName
//              };
//            });
//            console.log(list);
            _this.search.returnlist = _this.search.loadList.filter(item => item.brandName.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.search.returnlist = [];
        }
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/recomm/brand/page', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.privateCustomerLoanList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      async getBrandList() {
        let resp = await this.$http.post('/ces/getMasterBrand', {
          brandName: ''
        });
        let list = resp.body.resultList.map(item => {
          item.groupList.map(sitem => {
            this.search.loadList.push(sitem);
          });
        });
//        console.log(JSON.stringify(this.search.loadList));
      },
      async submitSuccess() {
        this.$data.buttonLoading = true;
        let url = this.$data.isAdd ? '/recomm/brand/add' : '/recomm/brand/status';
        let brandNo = this.$data.fromData.brandNo;
        let recommNo = this.$data.fromData.recommNo;
        let recommOrder = this.$data.fromData.recommOrder;
        let data = {};
        if (this.$data.isAdd) {
          data.recommBrands = [{
            brandNo: brandNo,
            recommOrder: recommOrder
          }];
        } else {
          data = {
            recommBrandNo: recommNo,
            order: recommOrder
          };
        }
        console.log(url);
        console.log(data);
        let resp = await this.$http.post(url, data);
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
      this.getBrandList();
    }
  };
</script>
<style lang="scss" scoped>
</style>
