<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商列表</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      客户信息
    </div>
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="corpName">
          <i-input style="width: 240px;" type="text" placeholder="公司名称" v-model="formSearch.corpName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="searchSubmit" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button type="info" @click="openAddDistributorModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      <i-button type="info" @click="openCarModal"><i class="iconfont icon-xinzeng"></i> 车型管理</i-button>
      <i-button type="info" @click="openQuotaModal"><i class="iconfont icon-xinzeng"></i> 额度管理</i-button>
      <i-button type="info" @click="openOperatorModal"><i class="iconfont icon-xinzeng"></i> 操作员管理</i-button>
      <i-button v-if="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
    </div>
    <i-table :loading="dataLoading" highlight-row border ref="selection" :columns="distributorColumns" :data="distributorList" @on-current-change="radioFun"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import BsModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: '',
    mixins: [MixinData],
    data() {
      return {
        formSearch: {
          corpName: ''
        },
        dataLoading: false,
        clickRow: {},
        isClickRow: false,        // 是否已经选择了某一行
        total: 0,
        currentPage: 1,
        pageSize: 15
      };
    },
    mounted() {
      // 从新增页面跳转回来，加载之前的指定页码
      if (this.$route.query.currentPage) {
        this.$data.currentPage = this.$route.query.currentPage;
      }
    },
    components: {
      BsModal
    },
    methods: {
      // 单选每一行时出触发
      radioFun(currentRow, oldCurrentRow) {
        this.$data.clickRow = currentRow;
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$data.isClickRow = false;
        }
        this.$data.isClickRow = true;
      },
      // 取消选中行的选中状态
      handleClearCurrentRow() {
        this.$refs.proTable.clearCurrentRow();
        this.$data.isClickRow = false;
        this.$data.clickRow = {};
      },
      openAddDistributorModal() {
        this.$router.push({
          path: '/index/customer/distributor/add',
          query: {
            currentPage: this.$data.currentPage
          }
        });
      },
      // 判断是否选中的其中一行
      clickRowedFun() {
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$Notice.error({
            title: '请先选择渠道商',
            duration: 2
          });
          return false;
        }
        return true;
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
       /* let resp = await this.$http.get('/pms/product/list', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          productName: this.$data.formSearch.productName
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }*/
      },
      // 模糊查询
      searchSubmit() {
        this.getPrivateCustomerList(1);
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 打开车型管理
      openCarModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/car',
            query: {
              currentPage: this.$data.currentPage,
              ...this.$data.clickRow
            }
          });
        }
      },
      // 打开额度管理
      openQuotaModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/quota',
            query: {
              currentPage: this.$data.currentPage,
              merchantNo: this.$data.clickRow.merchantNo,
              corpName: this.$data.clickRow.corpName,
              custMgrName: this.$data.clickRow.custMgrName
            }
          });
        }
      },
      // 打开操作员管理
      openOperatorModal() {
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>
