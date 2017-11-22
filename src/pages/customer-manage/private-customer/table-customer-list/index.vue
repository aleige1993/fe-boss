<template>
  <div id="page-table-demo">
    <div class="search-form-container">
      <i-form inline>
        <i-form-item prop="user">
          <i-input type="text" v-model="searchForm.name" placeholder="客户姓名"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-select style="width: 120px;" v-model="searchForm.certType" placeholder="证件类型">
            <i-option v-for="item in certTypeEnum" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.certNo" type="text" placeholder="证件号码"></i-input>
        </i-form-item>
        <i-form-item prop="password">
          <i-input v-model="searchForm.mobile" type="text" placeholder="手机号码"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="search" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <i-table :loading="dataLoading" @on-row-dblclick="selectRow" border ref="selection" :columns="columns4" :data="privateCustomerList"></i-table>
    <div class="page-container">
      <i-page :total="total" :page-size="15" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
    </div>
    <!-- <pt-modal title="添加客户" v-model="showAddModal" :width="600" :zIndex="200">
      <Form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="姓名" prop="name">
          <i-input placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="用户密码" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="姓名" prop="name">
          <i-input placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="邮箱" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px">重置</i-button>
        </i-form-item>
      </Form>
    </pt-modal> -->
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import PTModal from '@/components/bs-modal';
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
    methods: {
      goToAdd() {
        this.$router.push('/index/customer/modify');
      },
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.searchForm.currentPage = page;
        }
        let resp = await this.$http.post('/member/page', this.$data.searchForm);
        this.$data.dataLoading = false;
        this.$data.privateCustomerList = resp.body.resultList;
        this.$data.currentPage = resp.body.currentPage;
        this.$data.total = resp.body.totalNum;
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      search() {
        this.getPrivateCustomerList();
      },
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    },
    components: {
      'pt-modal': PTModal
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
