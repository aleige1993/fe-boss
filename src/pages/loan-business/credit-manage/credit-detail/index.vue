<template>
  <div id="credit-detail">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>授信详情</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs type="card" :animated="false">
      <i-tab-pane label="申请信息">
        <company-customer-basic-info :corpNo="creditInfo.companyNo"></company-customer-basic-info>
        <i-form label-position="right" :label-width="140">
          <!--附件信息-->
          <bs-form-block :title="'附件信息'">
            <div class="form-top-actions">
              <i-button type="primary" @click="openAddAttachModal">添加附件</i-button>
            </div>
            <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="companyAttachFiles"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" >
            <i-row>
              <i-col span="8">
                <i-form-item label="结论">
                  <i-select>
                    <i-option value="1">通过</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-form-item label="意见信息">
                  <i-input type="textarea" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--初审信息-->
          <bs-form-block title="1初审信息" >
            <i-row>
              <i-col span="8">
                <i-form-item label="网审情况">
                  <i-input type="textarea"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="电核情况">
                  <i-input type="textarea"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <div class="form-top-actions">
                  <i-button type="primary" @click="addFirstApproveModal = !addFirstApproveModal">添加初审信息</i-button>
                </div>
                <i-table :columns="firstApproveColumns" :data="firstApproveData"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--外审信息-->
          <bs-form-block title="2外审信息" >
            <i-row>
              <i-col span="24">
                <i-table :columns="outApproveColumns" :data="outApproveData"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--最终审核信息-->
          <bs-form-block title="3授信信息" >
            <i-row>
              <i-col span="8">
                <i-form-item label="授信总额度">
                  <i-input type="text">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="可用额度">
                  <i-input type="text">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单笔最大额度">
                  <i-input type="text">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="授信起始日期">
                  <bs-datepicker></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="授信到期日期">
                  <bs-datepicker></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="额度释放方式">
                  <i-select>
                    <i-option v-for="item in enumSelectData.get('CreditFreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <!--审核历史意见-->
        <bs-form-block title="审核历史意见" >
          <i-table :columns="approveHistoryColumns" :data="approveHistoryData"></i-table>
        </bs-form-block>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import CompanyCustomerBasicInfo from '../company-info/index.vue';
  export default {
    name: 'creditDetail',
    mixins: [MixinData],
    data() {
      return {
        pageLoading: false
      };
    },
    methods: {
      async getCreditInfo() {
        let resp = await this.$http.post('/credit/find', { creditApplyNo: this.$route.query.id });
        if (resp.success) {
          this.$data.creditInfo = resp.body;
        }
      }
    },
    components: {
      CompanyCustomerBasicInfo,
      'bs-modal': BsModal
    },
    mounted() {
      this.getCreditInfo();
    }
  };
</script>
<style lang="scss" scoped="">

</style>