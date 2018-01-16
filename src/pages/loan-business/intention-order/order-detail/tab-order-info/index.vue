<template>
  <section style="position: relative; min-height: 200px;">
    <i-form :label-width="120" label-position="right">
      <i-row>
        <i-col span="8">
          <i-form-item label="订单编号">{{orderInfo.orderNo}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="订单时间">{{orderInfo.applyTime}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="会员编号">{{orderInfo.memberNo}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="会员姓名">{{orderInfo.realName}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="身份证号">{{orderInfo.certNo}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="注册手机号">{{orderInfo.regMobile}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="车辆品牌">{{orderInfo.brandName}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="车辆系列">{{orderInfo.seriesName}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="车辆型号">{{orderInfo.modelName}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="车类">
            <span v-if="orderInfo.productType === '1'">新车</span>
            <span v-if="orderInfo.productType === '2'">二手车</span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="厂家指导价">{{orderInfo.guideAmt}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="车辆价格">{{orderInfo.finalAmt}} 元</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="渠道商编号">{{orderInfo.dealer}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="渠道商名称">{{orderInfo.dealerArea}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="地区">{{orderInfo.dealerArea}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="申请产品">{{orderInfo.productName}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="申请期数">{{orderInfo.period}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="首付比例%">{{orderInfo.downPayProportion}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="首付意向金额（元）">{{orderInfo.downPayAmt}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="分期金额（元）">{{orderInfo.quotaAmt}} 元</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="车辆用途">{{orderInfo.applyPurpose}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="提交地点">{{orderInfo.applyAddr}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="提交地点经度">{{orderInfo.longitude}}</i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="提交地点纬度">{{orderInfo.latitude}}</i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="8">
          <i-form-item label="来源终端">
            <span v-if="orderInfo.channelNo === '1'">Android</span>
            <span v-else-if="orderInfo.channelNo === '2'">IOS</span>
            <span v-if="orderInfo.channelNo === '3'">微信</span>
            <span v-else>其他</span>
          </i-form-item>
        </i-col>
        <i-col span="8">
          <i-form-item label="订单状态">{{enumCode2Name(orderInfo.orderStatus, 'MbOrderStatusEnum')}}</i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <i-spin fix v-if="dataLoading"></i-spin>
  </section>
</template>

<script>
  export default {
    name: 'tabOrderInfo',
    data() {
      return {
        dataLoading: false,
        orderInfo: {
          'regMobile': '',
          'certType': '',
          'certNo': '',
          'realName': '',
          'orderNo': '',
          'memberNo': 0,
          'phoneNo': '',
          'brandNo': 0,
          'modelName': '',
          'seriesName': '',
          'dealer': 0,
          'dealerArea': 0,
          'guideAmt': '',
          'finalAmt': '',
          'period': 0,
          'downPayAmt': '',
          'downPayProportion': 0,
          'quotaAmt': 0,
          'productNo': 0,
          'productName': '',
          'applyTime': '',
          'applyAddr': '',
          'applyPurpose': '',
          'monthAmt': '',
          'longitude': '',
          'latitude': '',
          'orderStatus': '',
          'productType': '',
          'secondHandOrderType': '',
          'licenseCity': '',
          'licenseTime': '',
          'vehicleColour': '',
          'mile': 0,
          'channelNo': ''
        }
      };
    },
    methods: {
      async getIntentionOrderDetail() {
        this.$data.dataLoading = true;
        let orderNo = this.$route.params.orderId;
        let resp = await this.$http.post('/loan/biz/orderDetail', { orderNo });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.orderInfo = resp.body;
        }
      }
    },
    mounted() {
      this.getIntentionOrderDetail();
    }
  };
</script>

<style scoped>

</style>
