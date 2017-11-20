<template>
  <div>
    <i-tabs :animated="false">
      <i-tab-pane label="联系人信息">
        <div class="form-top-actions" style="padding-top: 0">
          <i-button v-if="!isFromDetail" type="primary" @click="addContactModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
        <i-table :columns="contactColumns" :data="contactDatas"></i-table>
      </i-tab-pane>
      <i-tab-pane label="电话本联系人">
        <div class="search-form-container">
          <i-form inline>
            <i-form-item prop="user">
              <i-input type="text" style="width: 240px" placeholder="联系人电话"></i-input>
            </i-form-item>
            <i-form-item>
              <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :loading="loadingContactBook" :columns="contactBookColumns" :data="contactBookDatas"></i-table>
        <div class="page-container">
          <Page :total="80" size="small"  show-total></Page>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼入记录">
        <div class="search-form-container">
          <i-form inline>
            <i-form-item prop="user">
              <i-input type="text" style="width: 240px" placeholder="联系人电话"></i-input>
            </i-form-item>
            <i-form-item>
              <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :columns="callInColumns" :data="callInDatas"></i-table>
        <div class="page-container">
          <Page :total="80" size="small"  show-total></Page>
        </div>
      </i-tab-pane>
      <i-tab-pane label="呼出记录">
        <div class="search-form-container">
          <i-form inline>
            <i-form-item prop="user">
              <i-input type="text" style="width: 240px" placeholder="联系人电话"></i-input>
            </i-form-item>
            <i-form-item>
              <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table :columns="callInColumns" :data="callInDatas"></i-table>
        <div class="page-container">
          <Page :total="80" size="small"  show-total></Page>
        </div>
      </i-tab-pane>
    </i-tabs>
    <!-- <div class="form-footer-actions">
      <i-button type="primary"><i class="iconfont icon-tijiao"></i> 保存草稿</i-button>
      <i-button type="success"><i class="iconfont icon-tijiao"></i> 提交</i-button>
    </div> -->
    <!--添加联系人模态框-->
    <pt-modal :title="addContactModalTitle" v-model="showAddModal">
      <i-form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="姓名" prop="name">
          <i-input placeholder="请输入姓名"></i-input>
        </i-form-item>
        <i-form-item label="手机号码" prop="mail">
          <i-input placeholder="请输入邮箱"></i-input>
        </i-form-item>
        <i-form-item label="联系人关系" prop="mail">
          <i-select id="u5568_input" placeholder="选择关系">
            <i-option value="亲属">亲属</i-option>
            <i-option value="朋友">朋友</i-option>
            <i-option value="同事">同事</i-option>
            <i-option value="父母">父母</i-option>
            <i-option value="子女">子女</i-option>
            <i-option value="同学">同学</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="联系人类型" prop="name">
          <i-select id="u5568_input" placeholder="选择联系人类型">
            <i-option value="亲属">紧急联系人</i-option>
            <i-option value="朋友">工作证明人</i-option>
            <i-option value="同事">家庭联系人</i-option>
          </i-select>
        </i-form-item>
        <!-- <i-form-item label="">
          <i-button type="primary" size="large" style="width: 80px;">提交</i-button>
        </i-form-item> -->
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: 'TabPrivateCustomerAddContactInfo',
    mixins: [MixinData],
    data() {
      return {
        'addContactModalTitle': '添加联系人',
        showAddModal: false,
        loadingContactBook: true
      };
    },
    props: ['isFromDetail'],
    methods: {
      addContactModal() {
        this.$data.showAddModal = true;
      },
      show() {
        alert(1);
      }
    },
    components: {
      'pt-modal': PTModal
    }
  };
</script>
<style lang="scss">

</style>
