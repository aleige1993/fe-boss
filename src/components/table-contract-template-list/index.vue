<template>
<!--合同模板列表模态框-->
  <div id="table-contractTemplate-list">
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
    <slot name="topAction" v-if="!isModal"></slot>
    <i-table border :page-size="pageSize" :loading="dataLoading" ref="contractTemplateTable" :columns="resultColumns" :data="data1" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page :current="currentPage" :page-size="pageSize" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
  </div>
</template>

<script>
  import DataMixin from './mixin-data';
  export default {
    name: '',
    mixins: [DataMixin],
    props: {
      contractSource: {
        type: String, // 合同属主contractSource。（1为资金方，2为产品）
        default: '1',
        required: false
      },
      type: {
        type: String,
        default: 'page',
        required: false
      }
    },
    data() {
      return {
        isModal: false,
        dataLoading: false,
        currentPage: 1,
        total: 0,
        pageSize: 15,
        formSearch: {
          contractTemplateName: '',
          pageSize: 15,
          currentPage: 1
        }
      };
    },
    computed: {
      resultColumns() {
        if (this.type === 'modal') {
          this.$data.isModal = true;
          return this.$data.columns1;
        } else {
          this.$data.isModal = false;
          return [...this.$data.columns1, ...this.$data.columnsFeatureActionColumns];
        }
      }
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/contract/listContractTemplate', {
          currentPage: page || this.$data.currentPage,
          pageSize: this.$data.pageSize,
          contractTemplateName: this.$data.formSearch.contractTemplateName
          // contractSource: this.contractSource // 1:资金方，2:产品
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      search() {
        this.getPrivateCustomerList(1);
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
