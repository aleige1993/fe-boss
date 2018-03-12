<template>
  <div>
    <div class="form-top-actions" v-if="!isFromDetail" style="padding-top: 0">
      <i-button type="primary" @click="openAddModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table :height="this.$store.getters.viewHeight+98" :loading="loadingData" :columns="shareHolerColumns" :data="shareHolerDatas"></i-table>
    <!--添加联系人模态框-->
    <pt-modal title="添加股东信息" v-model="addShareholerModal">
      <i-form ref="formShareHoler" :model="formData" label-position="left" :label-width="80">
        <i-form-item label="股东姓名" prop="partnerName"
                     :rules="{required: true, message: '请输入股东姓名'}">
          <i-input placeholder="" v-model="formData.partnerName"></i-input>
        </i-form-item>
        <i-form-item label="股东类别" prop="partnerType"
                     :rules="{required: true, message: '请选择股东类别'}">
          <i-select v-model="formData.partnerType" id="u5568_input" placeholder="">
            <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="出资额" prop="investAmt"
                     :rules="{required: true, message: '请输入出资额'}">
          <i-input v-model="formData.investAmt" placeholder="">
            <span slot="append">元</span>
          </i-input>
        </i-form-item>
        <i-form-item label="出资方式" prop="investType"
                     :rules="{required: true, message: '请选择出资方式'}">
          <i-select v-model="formData.investType" id="u5568_input" placeholder="">
            <i-option value="1">现金</i-option>
            <i-option value="2">技术入股</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="持股比例" prop="investPercent"
                     :rules="{required: true, message: '请输入持股比例'}">
          <i-input v-model="formData.investPercent" placeholder="">
            <span slot="append">%</span>
          </i-input>
        </i-form-item>
        <i-form-item label="备注" prop="mail">
          <i-input v-model="formData.remark" type="textarea" :rows="4" placeholder=""></i-input>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="saveShareholer" :loading="addLoading" type="primary" size="large" style="width: 120px;">
            <span v-if="addLoading">处理中...</span>
            <span v-else>提交</span>
          </i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>
<script>
  import PTModal from '@/components/bs-modal';
  import MixinData from './mixin-data';
  import MixinTabComputed from '../mixin-tab-computed';
  export default {
    name: 'TabCompanyCustomerShareholderInfo',
    mixins: [MixinData, MixinTabComputed],
    data() {
      return {
        addShareholerModal: false,
        loadingData: false,
        addLoading: false,
        formData: {
          'corpNo': '',
          'corpName': '',
          'partnerNo': '',
          'partnerName': '',
          'partnerType': '',
          'investAmt': '',
          'investType': '',
          'investPercent': '',
          'remark': ''
        }
      };
    },
    props: ['customer'],
    components: {
      'pt-modal': PTModal
    },
    methods: {
      async getShareHolderList() {
        this.$data.loadingData = true;
        let resp = await this.$http.post('/corp/listCorpPartner', {
          corpNo: this.corpNo,
          currentPage: 1,
          pageSize: 9999
        });
        this.$data.loadingData = false;
        if (resp.success) {
          this.$data.shareHolerDatas = resp.body.resultList;
        }
      },
      openAddModal() {
        this.$data.formData = {};
        this.$data.addShareholerModal = true;
      },
      saveShareholer() {
        this.$refs['formShareHoler'].validate(async valid => {
          if (valid) {
            this.$data.addLoading = true;
            this.$data.formData.corpNo = this.corpNo;
            this.$data.formData.corpName = this.corpName;
            let resp = await this.$http.post('/corp/savePartner', this.$data.formData);
            this.$data.addLoading = false;
            if (resp.success) {
              this.$data.addShareholerModal = false;
              this.$Message.success('提交成功');
              this.$data.addShareholerModal = false;
              this.getShareHolderList();
            }
          }
        });
      }
    },
    mounted() {
      this.getShareHolderList();
    }
  };
</script>
<style lang="scss">

</style>
