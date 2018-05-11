<template>
  <i-form :label-width="120" label-position="right" style="position: relative">
    <bs-form-block title="基本信息">
      <span slot="title">基本信息
        <span v-if="verifyInfo.idcardAuthStatus === '0'" class="text-danger">【未认证】</span>
        <span v-else class="text-primary">【已认证】</span>
      </span>
      <i-row>
        <i-col span="8">
          <i-form-item label="姓名">{{verifyInfo.memberIntentionOrderDTO.realName}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="身份证号">{{verifyInfo.memberIntentionOrderDTO.certNo}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="认证时间">{{verifyInfo.memberIntentionOrderDTO.idcardAuthTime}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="身份证正面">
            <bs-big-img :thumb="verifyInfo.memberIntentionOrderDTO.idCardFaceUrl"
                        :thumbWidth="149" :thumbHeight="95"
                        :full="verifyInfo.memberIntentionOrderDTO.idCardFaceUrl" :full-width="945">
            </bs-big-img>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="身份证反面">
            <bs-big-img :thumb="verifyInfo.memberIntentionOrderDTO.idCardBackUrl"
                        :thumbWidth="149" :thumbHeight="95"
                        :full="verifyInfo.memberIntentionOrderDTO.idCardBackUrl" :full-width="945">
            </bs-big-img>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="手持身份证">
            <bs-big-img :thumb="verifyInfo.memberIntentionOrderDTO.idCardHandUrl"
                        :thumbWidth="149" :thumbHeight="95"
                        :full="verifyInfo.memberIntentionOrderDTO.idCardHandUrl" :full-width="945">
            </bs-big-img>
          </i-form-item>
        </i-col>
      </i-row>
    </bs-form-block>
    <bs-form-block title="银行卡信息" v-if="verifyInfo.memberCardDTOList">
      <span slot="title">银行卡信息
        <span v-if="verifyInfo.bankcardBindStatus === '0'" class="text-danger">【未核身】</span>
        <span v-else class="text-primary">【已核身】</span>
      </span>
      <i-table :loading="dataLoading" :columns="bankAccountColumns" :data="verifyInfo.memberCardDTOList"></i-table>
    </bs-form-block>
    <bs-form-block title="征信授权信息">
      <span slot="title">征信授权信息
        <span v-if="verifyInfo.creditAuthStatus === '1'" class="text-primary">【已授权】</span>
        <span v-else  class="text-danger">【未授权】</span>
      </span>
      <i-row v-if="verifyInfo.memberCreditDTO">
        <i-col span="8">
          <i-form-item label="授权时间">{{verifyInfo.memberCreditDTO.comfirmTime}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="授权地点经度">{{verifyInfo.memberCreditDTO.longitude}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="授权地点维度">{{verifyInfo.memberCreditDTO.latitude}}</i-form-item>
        </i-col>
      </i-row>
      <i-row v-if="verifyInfo.memberCreditDTO">
        <i-col span="24">
          <i-form-item label="授权地点">{{verifyInfo.memberCreditDTO.comfirmAddr}}</i-form-item>
        </i-col>
      </i-row>
    </bs-form-block>
    <i-spin fix v-if="dataLoading" size="large"></i-spin>
  </i-form>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tabVerifyInfo',
    mixins: [MixinData],
    methods: {
      async getIntentionOrderVerify() {
        // this.$data.dataLoading = true;
        let orderNo = this.$route.params.orderId;
        let resp = await this.$http.post('/loan/biz/verifyInfo', { orderNo });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.verifyInfo = resp.body;
        }
      }
    },
    mounted() {
      this.getIntentionOrderVerify();
    }
  };
</script>

<style scoped>

</style>
