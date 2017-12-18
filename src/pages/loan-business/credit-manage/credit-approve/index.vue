<template>
  <div id="credit-do-approve">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>授信审批</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane label="申请信息">
        <company-customer-basic-info :readonly="true" :corpNo="approveData.creditApplyParam.corpNo"></company-customer-basic-info>
        <i-form label-position="right" :label-width="140">
          <!--附件信息-->
          <bs-form-block :title="'附件信息'">
            <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="companyAttachFiles"></i-table>
          </bs-form-block>

          <!--初审信息-->
          <bs-form-block title="1初审信息" >
            <i-row>
              <i-col span="8">
                <i-form-item label="网审情况">
                  <i-input :readonly="creditStatus!=='3'" v-model="approveData.firstTrialParam.netApprove"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="电核情况">
                  <i-input :readonly="creditStatus!=='3'" v-model="approveData.firstTrialParam.telephoneApprove"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <div v-if="creditStatus==='3'" class="form-top-actions">
                  <i-button type="primary" @click="firstApproveForm = {} ; addFirstApproveModal = !addFirstApproveModal">添加初审信息</i-button>
                </div>
                <i-table :columns="firstApproveColumns" :data="approveData.firstTrialParam.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--外审信息-->
          <bs-form-block title="2外审信息" v-if="creditStatus==='4' || creditStatus==='5'">
            <i-row>
              <i-col span="24">
                <div v-if="creditStatus==='4'" class="form-top-actions">
                  <i-button type="primary" @click="addOutApproveModal = !addOutApproveModal">添加现场尽调信息</i-button>
                </div>
                <i-table :columns="outApproveColumns" :data="approveData.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--最终审核信息-->
          <bs-form-block title="3授信信息" v-if="creditStatus==='5'">
            <i-row>
              <i-col span="8">
                <i-form-item label="授信总额度">
                  <i-input :readonly="creditStatus!=='5'" v-model="approveData.creditPlanParam.totalLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="可用额度">
                  <i-input :readonly="creditStatus!=='5'" v-model="approveData.creditPlanParam.currentLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单笔最大额度">
                  <i-input :readonly="creditStatus!=='5'" v-model="approveData.creditPlanParam.singleLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="授信起始日期">
                  <bs-datepicker :readonly="creditStatus!=='5'" v-model="approveData.creditPlanParam.startDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="授信到期日期">
                  <bs-datepicker :readonly="creditStatus!=='5'" v-model="approveData.creditPlanParam.endDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="额度释放方式">
                  <i-select :disabled="creditStatus!=='5'" v-model="approveData.creditPlanParam.creditLimitReleaseMode">
                    <i-option v-for="item in enumSelectData.get('CreditFreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                  <!--{{enumCode2Name(creditInfo.creditLimitReleaseMode, 'CreditFreedTypeEnum')}}-->
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" >
            <i-row>
              <i-col span="8">
                <i-form-item label="结论">
                  <i-radio-group v-model="approveData.creditAuditParam.approveStatus">
                    <i-radio label="A">通过</i-radio>
                    <i-radio label="R">拒绝</i-radio>
                    <i-radio label="B">退回</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-form-item label="意见信息">
                  <i-input type="textarea" v-model="approveData.creditAuditParam.opinion" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <div class="form-footer-actions">
            <i-button :loading="submitApplyLoading" @click="submitCreditApply" type="success">
              <span v-if="!submitApplyLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
              <span v-else> 处理中</span>
            </i-button>
          </div>
        </i-form>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <!--审核历史意见-->
        <div v-if="tabIndex==1 && approveData.creditApplyParam.creditLimitNo">
          <approve-history :id="approveData.creditApplyParam.creditLimitNo"></approve-history>
        </div>
        <div v-else></div>
      </i-tab-pane>
    </i-tabs>
    <!--添加初审信息的弹窗-->
    <bs-modal v-model="addFirstApproveModal" :width="520" title="添加初审信息">
      <i-form :label-width="80" ref="addFirstApproveForm" :model="firstApproveForm">
        <i-form-item label="第三方网站名称" prop="itemName"
          :rules="{required: true, message: '请输入第三方网站名称'}">
          <i-input v-model="firstApproveForm.itemName"></i-input>
        </i-form-item>
        <i-form-item label="查询描述" prop="description"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="firstApproveForm.description"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="fileUrl"
                     :rules="{required: true, message: '请上传凭证'}">
          <input type="hidden" :value="firstApproveForm.fileUrl">
          <i-upload :show-upload-list="false"
              multiple type="drag" :on-success="uploadFirstApproveFileSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!firstApproveForm.fileUrl || firstApproveForm.fileUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{firstApproveForm.fileUrl}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitFirstApprove" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--添加外审信息的弹窗-->
    <bs-modal v-model="addOutApproveModal" :width="520" title="添加外审尽调信息">
      <i-form :label-width="80" ref="addOutApproveForm" :model="outApproveForm">
        <i-form-item label="尽调材料" prop="itemName"
                     :rules="{required: true, message: '请输入尽调材料'}">
          <i-input v-model="outApproveForm.itemName"></i-input>
        </i-form-item>
        <i-form-item label="描述" prop="description"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="outApproveForm.description"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="fileUrl"
                     :rules="{required: true, message: '请上传查询结果'}">
          <input type="hidden" :value="outApproveForm.fileUrl">
          <i-upload :show-upload-list="false"
              multiple type="drag" :on-success="uploadOutApproveFileSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!outApproveForm.fileUrl||outApproveForm.fileUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{outApproveForm.fileUrl}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitOutApprove" style="width: 120px;" type="primary" size="large">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>

</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import BsModal from '@/components/bs-modal';
  import CompanyCustomerBasicInfo from '@/components/detail-company-customer-basic/index.vue';
  export default {
    name: 'creditApprove',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        tabIndex: 0,
        creditStatus: null,
        addFirstApproveModal: false,
        addOutApproveModal: false,
        firstApproveForm: {
          'itemName': '',
          'fileName': '',
          'description': '',
          'fileUrl': ''
        },
        outApproveForm: {
          'itemName': '',
          'fileName': '',
          'description': '',
          'fileUrl': ''
        }
      };
    },
    computed: {
      // 根据审核状态判断提交的url地址
      submitUrl() {
        switch (this.$data.creditStatus) {
        case '3':
          return '/credit/firstTrial';
        case '4':
          return '/credit/externalAudit';
        case '5':
          return '/credit/approve';
        }
      }
    },
    components: {
      CompanyCustomerBasicInfo,
      BsModal
    },
    mounted() {
      this.$data.creditStatus = this.$route.query.status;
      this.initPage();
    }
  };
</script>
<style lang="scss" scoped="">

</style>