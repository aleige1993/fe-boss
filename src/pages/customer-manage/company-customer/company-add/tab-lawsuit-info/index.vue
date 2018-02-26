<template>
  <div id="add-customer-owe-company">
    <div class="form-top-actions" style="padding-top: 0" v-if="!isFromDetail">
      <i-button type="primary" @click="openAddLawsuit"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :loading="loadingData" :columns="cusomerLawsuitColumns" :data="cusomerLawsuitDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal :title="'添加公司信息'" v-model="addModal">
      <i-form ref="formAdd" :model="formData" label-position="left" :label-width="120">
        <i-form-item label="立案时间" prop="lawCaseDate"
                     :rules="{required: true, message: '请选择立案时间'}">
          <bs-datepicker v-model="formData.lawCaseDate" placeholder="" style="width: 100%"></bs-datepicker>
        </i-form-item>
        <i-form-item label="立案原因" prop="lawCaseCause"
                     :rules="{required: true, message: '请输入立案原因'}">
          <i-input v-model="formData.lawCaseCause" type="textarea" :rows="4" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="案件金额" prop="lawCaseAmt"
                     :rules="{required: true, message: '请输入案件金额'}">
          <i-input v-model="formData.lawCaseAmt" placeholder="">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <i-form-item label="案件角色" prop="lawCaseRole"
                     :rules="{required: true, message: '请输入案件角色'}">
          <i-input v-model="formData.lawCaseRole" placeholder=""></i-input>
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
          'corpNo': '',
          'corpName': '',
          'lawCaseNo': '',
          'lawCaseDate': '',
          'lawCaseCause': '',
          'lawCaseAmt': '',
          'lawCaseRole': ''
        }
      };
    },
    props: ['customer'],
    components: {
      'pt-modal': PTModal
    },
    methods: {
      async getList() {
        this.$data.loadingData = true;
        let resp = await this.$http.post('/corp/listCorpLawcase', {
          corpNo: this.corpNo,
          currentPage: 1,
          pageSize: 9999
        });
        this.$data.loadingData = false;
        this.$data.cusomerLawsuitDatas = resp.body.resultList;
      },
      openAddLawsuit() {
        this.$refs['formAdd'].resetFields();
        this.$data.addModal = true;
      },
      submitForm() {
        this.$refs['formAdd'].validate(async (valid) => {
          if (valid) {
            this.$data.formData.corpNo = this.corpNo;
            this.$data.formData.corpName = this.corpName;
            this.$data.submitLoading = true;
            let resp = await this.$http.post('/corp/saveCorpLawcase', this.$data.formData);
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
