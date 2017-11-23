<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0" v-if="!isFromDetail">
      <i-button type="primary" @click="addModal=!addModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="false" :columns="negativeSurveyColumns" :data="negativeSurveyDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal v-model="addModal" :title="'添加负面调查'">
      <i-form ref="formValidate" label-position="left" :label-width="120">
        <i-form-item label="调查时间" prop="name">
          <i-date-picker placeholder="" style="width: 100%"></i-date-picker>
        </i-form-item>
        <i-form-item label="说明" prop="mail">
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
    name: '',
    mixins: [MixinData],
    data() {
      return {
        addModal: false
      };
    },
    props: ['isFromDetail'],
    components: {
      'pt-modal': PTModal
    }
  };
</script>
<style lang="scss">

</style>
