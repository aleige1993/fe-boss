<template>
  <div id="page-table-demo">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/home">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>合同字段变量池</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.fieldDesc" placeholder="字段描述"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight+98" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns" :data="dataList"></i-table>
    <!--<div class="page-container">-->
      <!--<i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>-->
    <!--</div>-->
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: '',
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
          'fieldDesc': '',
          currentPage: 1,
          pageSize: 15
        }
      };
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
        let resp = await this.$http.post('/cfg/contract/listFieldPool', {
          ...this.$data.searchForm
        });
        this.$data.dataLoading = false;
        this.$data.dataList = resp.body;
        let fieldDesc = this.$data.searchForm.fieldDesc;
        if (fieldDesc && fieldDesc.length) {
          let dataList = [];
          this.$data.dataList.map(item => {
            if (item.fieldDesc.indexOf(fieldDesc) > -1) {
              dataList.push(item);
            }
          });
          this.$data.dataList = dataList;
        }
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
