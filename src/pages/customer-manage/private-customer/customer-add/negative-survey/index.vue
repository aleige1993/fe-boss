<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0" v-if="!isFromDetail">
      <i-button type="primary" @click="openAddNegativeModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :height="tableFixHeight+98" :loading="dataLoading" :columns="negativeSurveyColumns" :data="negativeSurveyDatas"></i-table>
    <!--添加联系人模态框-->
    <bs-modal v-model="addModal" :title="'添加负面调查'">
      <i-form ref="addPrivateCustomerNegativeForm" :model="formData" label-position="left" :label-width="120">
        <i-form-item label="调查时间" prop="examineDate">
          <bs-datepicker v-model="formData.examineDate" placeholder="" style="width: 100%"></bs-datepicker>
        </i-form-item>
        <i-form-item label="说明" prop="examineReason">
          <i-input v-model="formData.examineReason" type="textarea" :rows="4" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitForm" type="primary" :loading="submitLoading" size="large" style="width: 120px;">
            <span v-if="submitLoading">请求中...</span>
            <span v-else>提交</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinComputed from '../mixin-tab-computed';
  export default {
    name: '',
    mixins: [MixinData, MixinComputed],
    data() {
      return {
        addModal: false,
        dataLoading: false,
        submitLoading: false,
        formData: {
          'memberNo': '',
          'examineReason': '',
          'examineDate': ''
        }
      };
    },
    props: ['isFromDetail'],
    components: {
      'bs-modal': PTModal
    },
    methods: {
      openAddNegativeModal() {
        this.$data.addModal = true;
        this.$refs['addPrivateCustomerNegativeForm'].resetFields();
      },
      async getList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/member/negative/examine/list', {
          memberNo: this.memberNo
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.negativeSurveyDatas = resp.body;
        }
      },
      async submitForm() {
        this.$data.formData.memberNo = this.memberNo;
        this.$data.submitLoading = true;
        let resp = await this.$http.post('/member/negative/examine/insert', this.$data.formData);
        this.$data.submitLoading = false;
        if (resp.success) {
          this.$data.addModal = false;
          this.getList();
        }
      }
    },
    mounted() {
      this.getList();
    }
  };
</script>
<style lang="scss">

</style>
