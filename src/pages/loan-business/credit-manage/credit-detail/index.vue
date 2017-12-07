<template>
  <div id="credit-detail">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>授信详情</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane label="申请信息">
        <company-customer-basic-info :corpNo="creditInfo.companyNo"></company-customer-basic-info>
        <i-form label-position="right" :label-width="140">
          <!--附件信息-->
          <bs-form-block :title="'附件信息'">
            <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="creditInfo.creditApplyAttachList"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <!--<bs-form-block title="审核意见" >
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
          </bs-form-block>-->
          <!--初审信息-->
          <bs-form-block title="1初审信息" >
            <i-row>
              <i-col span="8">
                <i-form-item label="网审情况">
                  <span>{{creditInfo.firstTrialDTO.netApprove}}</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="电核情况">
                  <span>{{creditInfo.firstTrialDTO.telephoneApprove}}</span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-table :columns="firstApproveColumns" :data="creditInfo.firstTrialDTO.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--外审信息-->
          <bs-form-block title="2外审信息" >
            <i-row>
              <i-col span="24">
                <i-table :columns="outApproveColumns" :data="creditInfo.externalAuditDTOList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--最终审核信息-->
          <bs-form-block title="3授信信息" >
            <i-row>
              <i-col span="8">
                <i-form-item label="授信总额度">
                  {{creditInfo.countLimit}} 元
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="可用额度">
                  {{creditInfo.surplusCountLimit}} 元
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单笔最大额度">
                  {{creditInfo.singleLimit}} 元
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="授信起始日期">
                  {{creditInfo.startDate}}
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="授信到期日期">
                  {{creditInfo.endDate}}
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="额度释放方式">
                  {{enumCode2Name(creditInfo.creditLimitReleaseMode, 'CreditFreedTypeEnum')}}
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <!--审核历史意见-->
        <div v-if="tabIndex==1 && creditInfo.creditApplyNo">
          <approve-history :id="creditInfo.creditApplyNo"></approve-history>
        </div>
      </i-tab-pane>
    </i-tabs>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import CompanyCustomerBasicInfo from '@/components/detail-company-customer-basic/index.vue';
  import ApproveHistory from '../credit-approve-history/index.vue';
  export default {
    name: 'creditDetail',
    mixins: [MixinData],
    data() {
      return {
        tabIndex: 0,
        pageLoading: false,
        loadingAttachFile: false
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
      'bs-modal': BsModal,
      ApproveHistory
    },
    mounted() {
      this.getCreditInfo();
    }
  };
</script>
<style lang="scss" scoped="">

</style>