<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0" v-if="!isFromDetail">
      <i-button type="primary" @click="addModal=!addModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :height="this.$store.getters.viewHeight+98" :loading="loadingData" :columns="cusomerLawsuitColumns" :data="cusomerLawsuitDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal :title="'添加公司信息'" v-model="addModal">
      <i-form ref="formAdd" :model="formData" label-position="left" :label-width="120">
        <i-form-item label="立案时间" prop="makeDate"
                     :rules="{required: true, message: '请选择立案时间'}">
          <bs-datepicker v-model="formData.makeDate" placeholder="" style="width: 100%"></bs-datepicker>
        </i-form-item>
        <i-form-item label="立案原因" prop="makeReason"
                     :rules="{required: true, message: '请输入立案原因'}">
          <i-input v-model="formData.makeReason" type="textarea" :rows="4" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="案件金额" prop="makeAmt"
                     :rules="{required: true, message: '请输入案件金额'}">
          <i-input v-model="formData.makeAmt" placeholder="">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <i-form-item label="案件角色" prop="caseRole"
                     :rules="{required: true, message: '请输入案件角色'}">
          <i-input v-model="formData.caseRole" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitForm" :loading="submitLoading" type="primary" size="large" style="width: 120px;">
            <span v-if="!submitLoading">提交</span>
            <span v-else>处理中...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinComputed from '../mixin-tab-computed';
  export default {
    name: 'TabPrivateCustomerAddLawsuitInfo',
    mixins: [MixinData, MixinComputed],
    data() {
      return {
        addModal: false,
        loadingData: false,
        submitLoading: false,
        formData: {
          'memberNo': '',
          'makeReason': '',
          'caseRole': '',
          'makeAmt': '',
          'makeDate': ''
        }
      };
    },
    props: ['isFromDetail'],
    components: {
      'pt-modal': PTModal
    },
    methods: {
      async getList() {
        this.$data.loadingData = true;
        let resp = await this.$http.post('/member/case/manage/list', {
          memberNo: this.memberNo
        });
        this.$data.loadingData = false;
        this.$data.cusomerLawsuitDatas = resp.body;
      },
      submitForm() {
        this.$refs['formAdd'].validate(async (valid) => {
          if (valid) {
            this.$data.formData.memberNo = this.memberNo;
            this.$data.submitLoading = true;
            let resp = await this.$http.post('/member/case/manage/insert', this.$data.formData);
            this.$data.submitLoading = false;
            if (resp.success) {
              this.$data.addModal = false;
              this.getList();
            }
          }
        });
      }
    },
    mounted() {
      this.getList();
    }
  };
</script>
<style lang="scss">

</style>
