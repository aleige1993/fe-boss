<template>
  <div>
    <i-tabs :animated="false">
      <i-tab-pane label="联系人信息">
        <div class="form-top-actions" style="padding-top: 0">
          <i-button v-if="!isFromDetail" type="primary" @click="addContactModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
        <i-table :loading="loadingContactBook" :columns="contactColumns" :data="contactDatas"></i-table>
      </i-tab-pane>
      <i-tab-pane label="电话本联系人">
        <div class="search-form-container">
          <i-form inline>
            <i-form-item prop="user">
              <i-input type="text" v-model="contactBookSearchForm.contactsPhone" style="width: 240px" placeholder="联系人电话"></i-input>
            </i-form-item>
            <i-form-item>
              <i-button type="primary" @click="searchContactBooks"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :loading="loadingContactBook" :columns="contactBookColumns" :data="contactBookDatas"></i-table>
        <div class="page-container">
          <i-page @on-change="contactBooksPageChange" :total="contactBookTotal" :page-size="15" size="small"  show-total></i-page>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼入记录">
        <div class="search-form-container">
          <i-form inline>
            <i-form-item prop="user">
              <i-input v-model="callInListSearchForm.contactsPhone" type="text" style="width: 240px" placeholder="联系人电话"></i-input>
            </i-form-item>
            <i-form-item>
              <i-button @click="callInSearch" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :loading="loadingContactBook" :columns="callInColumns" :total="callInTotal" :data="callInDatas"></i-table>
        <div class="page-container">
          <Page @on-change="callInPageChange" :total="callInTotal" size="small"  show-total></Page>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼出记录">
        <div class="search-form-container">
          <i-form inline>
            <i-form-item prop="user">
              <i-input v-model="callOutListSearchForm.contactsPhone" type="text" style="width: 240px" placeholder="联系人电话"></i-input>
            </i-form-item>
            <i-form-item>
              <i-button @click="callOutSearch" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :loading="loadingContactBook" :columns="callInColumns" :total="callOutTotal" :data="callInDatas"></i-table>
        <div class="page-container">
          <Page @on-change="callOutPageChange" :total="callOutTotal" size="small"  show-total></Page>
        </div>
      </i-tab-pane>
    </i-tabs>
    <!--添加联系人模态框-->
    <pt-modal :title="addContactModalTitle" v-model="showAddModal">
      <i-form ref="formAddContact" label-position="left" :label-width="80">
        <i-form-item label="姓名" prop="name">
          <i-input v-model="addForm.contactsName" placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="手机号码" prop="mail">
          <i-input v-model="addForm.contactsMobile" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="联系人关系" prop="mail">
          <i-select v-model="addForm.relative" id="u5568_input" placeholder="选择关系">
            <i-option v-for="item in enumSelectData.get('RelativeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="联系人类型" prop="name">
          <i-select v-model="addForm.contactType" id="u5568_input" placeholder="选择联系人类型">
            <i-option v-for="item in enumSelectData.get('ContactTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
         <i-form-item label="">
           <i-button v-if="addForm.id" @click="saveContact" :loading="submitLoading" type="primary" size="large" style="width: 80px;">
             <span v-if="submitLoading">请求中...</span>
             <span v-else>保存</span>
           </i-button>
            <i-button v-else @click="submitContact" :loading="submitLoading" type="primary" size="large" style="width: 120px;">
              <span v-if="submitLoading">请求中...</span>
              <span v-else>保存</span>
            </i-button>
         </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-method';
  export default {
    name: 'TabPrivateCustomerAddContactInfo',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        'addContactModalTitle': '添加联系人',
        showAddModal: false,
        loadingContactBook: false,
        submitLoading: false,
        contactBookTotal: 0,
        callInTotal: 0,
        callOutTotal: 0,
        addForm: {
          'id': null,
          'memberNo': '',
          'contactType': '',
          'contactsName': '',
          'relative': '',
          'contactsMobile': ''
        },
        contactBookSearchForm: {
          contactsPhone: '',
          currentPage: 1
        },
        callInListSearchForm: {
          contactsPhone: '',
          currentPage: 1
        },
        callOutListSearchForm: {
          contactsPhone: '',
          currentPage: 1
        }
      };
    },
    props: ['isFromDetail', 'customer'],
    computed: {
      memberNo() {
        if (this.$route.query.id) {
          return this.$route.query.id;
        } else {
          return this.customer.mbMemberDTO.memberNo;
        }
      }
    },
    methods: {
      addContactModal() {
        this.$data.addForm = {
          'id': null,
          'memberNo': '',
          'contactType': '',
          'contactsName': '',
          'relative': '',
          'contactsMobile': ''
        };
        this.$data.showAddModal = true;
      },
      show() {
        alert(1);
      },
      submitContact() {
        this.$refs['formAddContact'].validate(async (valid) => {
          if (valid) {
            this.$data.submitLoading = true;
            this.$data.addForm.memberNo = this.memberNo;
            let resp = await this.$http.post('/member/ohter/contacts/insert', this.$data.addForm);
            this.$data.submitLoading = false;
            if (resp.success) {
              this.$data.showAddModal = false;
              this.getContactList();
            }
          }
        });
      },
      async saveContact() {
        this.$refs['formAddContact'].validate(async (valid) => {
          if (valid) {
            this.$data.submitLoading = true;
            this.$data.addForm.memberNo = this.memberNo;
            let resp = await this.$http.post('/member/ohter/contacts/update', this.$data.addForm);
            this.$data.submitLoading = false;
            if (resp.success) {
              this.$data.showAddModal = false;
              this.getContactList();
            }
          }
        });
      },
      searchContactBooks() {
        this.getContactBooks();
      },
      contactBooksPageChange(page) {
        this.$data.contactBookSearchForm.currentPage = page;
        this.getContactBooks(page);
      },
      callInSearch() {
        this.getCallInList();
      },
      callOutSearch() {
        this.getCallOutList();
      },
      callInPageChange(page) {
        this.$data.callInListSearchForm.currentPage = page;
        this.getCallInList(page);
      },
      callOutPageChange(page) {
        this.$data.callOutListSearchForm.currentPage = page;
        this.getCallOutList(page);
      }
    },
    components: {
      'pt-modal': PTModal
    },
    mounted() {
      this.getContactList();
      this.getContactBooks();
      this.getCallInList();
      this.getCallOutList();
    }
  };
</script>
<style lang="scss">

</style>
