<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0">
      <i-button type="primary" @click="addBankModal=!addBankModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="false" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal :title="'添加公司信息'" v-model="addBankModal">
      <i-form ref="formValidate" label-position="left" :label-width="120">
        <i-form-item label="公司名称" prop="name">
          <i-input placeholder="">
            <i-button slot="append">选择公司 <i-icon type="ios-more"></i-icon></i-button>
          </i-input>
        </i-form-item>
        <i-form-item label="统一社会使用代码" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="关系" prop="mail">
          <i-select id="u5568_input" placeholder="">
            <i-option value="1">全资</i-option>
            <i-option value="2">控股</i-option>
            <i-option value="3">全资</i-option>
            <i-option value="4">持股</i-option>
            <i-option value="5">核心经营人</i-option>
            <i-option value="6">实际控制人</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="联系人" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="联系人电话" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="注册时间" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="注册资金" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="经营地址" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button type="primary" size="large" style="width: 80px;">提交</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  export default {
    name: '',
    mixins: [MixinData],
    data() {
      return {
        addBankModal: false
      };
    },
    components: {
      'pt-modal': PTModal
    }
  };
</script>
<style lang="scss">

</style>
