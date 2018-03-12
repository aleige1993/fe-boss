<template>
  <div id="table-contract-seting">
    <slot name="topAction" v-if="!isModal"></slot>
    <i-table :height="this.$store.getters.viewHeight+48" border :loading="dataLoading" ref="selection" @on-select="selectRow" :columns="resultCustomerColumns"
             :data="privateCustomerLoanList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="pageSize" :current="currentPage" @on-change="jumpPage" size="small" show-elevator
              show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tableContractSeting',
    mixins: [MixinData],
    data() {
      return {
        dataLoading: false,
        isModal: false,
        total: 0,
        currentPage: 1,
        pageSize: 15,
        fromData: {
          fieldType: ''
        },
        contractTemplateNo: this.$route.query.id || this.templateNo, // 合同编码
        contractTemplateName: this.$route.query.name || this.templateName, // 合同名称
        settingTypeEnum: [], // 属性类型枚举
        sourceEntityEnum: [], // 属性取值来源实体
        sourceAttrEnum: [] // 属性取值来源字段
      };
    },
    computed: {
      resultCustomerColumns() {
        if (this.type === 'modal') {
          this.$data.isModal = true;
          return this.$data.customerColumns;
        } else {
          this.$data.isModal = false;
          return [...this.$data.customerColumns, ...this.$data.customerActionColumns];
        }
      }
    },
    props: {
      type: {
        type: String,
        default: 'page',
        required: false
      },
      templateNo: {
        type: String,
        default: '',
        required: false
      },
      templateName: {
        type: String,
        default: '',
        required: false
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
      add() {
        this.$refs['fromData'].resetFields();
        this.$data.isAdd = true;
        this.$data.addModal = true;
        this.$data.fromData.contractTemplateNo = this.$data.contractTemplateNo;
        this.$data.fromData.contractTemplateName = this.$data.contractTemplateName;
      },
      async getProxyPayList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.post('/cfg/contract/list', {
          templateNo: this.$data.contractTemplateNo,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        // console.log(JSON.stringify(resp));
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.privateCustomerLoanList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.privateCustomerLoanList = [];
        }
      }
    },
    mounted() {
      this.getProxyPayList();
    }
  };
</script>
<style lang="scss" scoped>
</style>
