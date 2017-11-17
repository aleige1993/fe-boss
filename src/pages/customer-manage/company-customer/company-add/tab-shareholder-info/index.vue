<template>
  <div>
    <div class="form-top-actions" style="padding-top: 0">
      <i-button type="primary" @click="addBankModal=!addBankModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="false" :columns="bankAccountColumns" :data="bankAccountDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="添加股东信息" v-model="addBankModal">
      <i-form ref="formValidate" label-position="left" :label-width="80">
        <i-form-item label="股东姓名" prop="name">
          <i-input placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="股东类别" prop="mail">
          <i-select id="u5568_input" placeholder="">
            <i-option value="亲属">公司</i-option>
            <i-option value="朋友">个人</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="出资额" prop="mail">
          <i-input placeholder="">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <i-form-item label="出资方式" prop="mail">
          <i-select id="u5568_input" placeholder="">
            <i-option value="亲属">现金</i-option>
            <i-option value="朋友">技术入股</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="持股比例" prop="mail">
          <i-input placeholder="">
            <span slot="append">%</span>
          </i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input type="textarea" :rows="4" placeholder=""></i-input>
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
    name: 'TabPrivateCustomerAddBankAccountInfo',
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
