<template>
  <div id="page-table-demo">
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="name">
          <i-input type="text" v-model="searchForm.name" placeholder="客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="certType">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="证件类型">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in certTypeEnum" :value="item.itemCode" :key="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="certNo">
          <i-input v-model="searchForm.certNo" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="mobile">
          <i-input v-model="searchForm.mobile" type="text" placeholder="手机号码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction"></slot>
    <i-table :height="tableFixHeight" :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="resultCustomerColumns" :data="privateCustomerList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  export default {
    name: 'privateCustomer',
    mixins: [MixinData],
    data() {
      return {
        showAddModal: false,
        dataLoading: false,
        total: 0,
        currentPage: 1,
        certTypeEnum: [],
        searchForm: {
          name: '',
          certType: '',
          certNo: '',
          mobile: '',
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
      goToAdd() {
        this.$router.push('/index/customer/privatecustomer/modify');
      },
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        if (this.type === 'modal') {
          this.$data.searchForm.status = '1';
        }
        let resp = await this.$http.post('/member/page', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.privateCustomerList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage / 1;
        this.$data.total = resp.body.totalNum / 1;
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      search() {
        this.getPrivateCustomerList(1);
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    },
    mounted() {
      this.getPrivateCustomerList();
      let enumSelectData = this.$store.getters.enumSelectData;
      this.$data.certTypeEnum = enumSelectData.get('CertTypeEnum');
      // console.log(.get('YesNoEnum'));
    }
  };
</script>
<style lang="scss" scoped>
</style>
