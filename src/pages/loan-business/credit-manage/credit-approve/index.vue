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
        <i-form label-position="right" ref="formCreditApply" :model="approveData" :label-width="140">
          <!--初审信息-->
          <bs-form-block title="初审信息">
            <i-row>
              <i-col span="24">
                <div v-if="creditStatus==='3'||creditStatus==='4'" class="form-top-actions">
                  <i-button type="primary" @click="firstApproveForm = {} ; addFirstApproveModal = !addFirstApproveModal">添加初审信息</i-button>
                </div>
                <i-table :columns="firstApproveColumns" :data="approveData.firstTrialParam.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--外审信息-->
          <bs-form-block title="现场尽调信息" v-if="creditStatus==='5' || creditStatus==='6'||creditStatus==='7' || creditStatus==='8'">
            <i-row>
              <i-col span="24">
                <div v-if="creditStatus==='5'||creditStatus==='6'" class="form-top-actions">
                  <i-button type="primary" @click="addOutApproveModal = !addOutApproveModal">添加现场尽调信息</i-button>
                </div>
                <i-table :columns="outApproveColumns" :data="approveData.creditCheckItemsList"></i-table>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--最终审核信息-->
          <bs-form-block title="授信方案" v-if="creditStatus==='5'||creditStatus==='6'">
            <i-row>
              <i-col span="8">
                <i-form-item label="授信总额度" prop="creditLimitParam.totalLimitAmt"
                  :rules="{required: true, message: '请输入授信总额度'}">
                  <i-input :readonly="creditStatus!=='5'&&creditStatus!=='6'" v-model="approveData.creditLimitParam.totalLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="额度释放方式" prop="creditLimitParam.creditLimitReleaseMode"
                             :rules="{required: true, message: '请选择额度释放方式'}">
                  <i-select :disabled="creditStatus!=='5'&&creditStatus!=='6'" v-model="approveData.creditLimitParam.creditLimitReleaseMode">
                    <i-option v-for="item in enumSelectData.get('CreditFreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                  <!--{{enumCode2Name(creditInfo.creditLimitReleaseMode, 'CreditFreedTypeEnum')}}-->
                </i-form-item>
              </i-col>
              <!--<i-col span="8">
                <i-form-item label="可用额度">
                  <i-input :readonly="creditStatus!=='5'" v-model="approveData.creditLimitParam.currentLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单笔最大额度">
                  <i-input :readonly="creditStatus!=='5'" v-model="approveData.creditLimitParam.singleLimitAmt">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>-->
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="授信起始日期" prop="creditLimitParam.startDate"
                             :rules="{required: true, message: '请选择授信起始日期'}">
                  <bs-datepicker :readonly="creditStatus!=='5'&&creditStatus!=='6'" v-model="approveData.creditLimitParam.startDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="授信到期日期" prop="creditLimitParam.endDate"
                             :rules="{required: true, message: '请选择授信到期日期'}">
                  <bs-datepicker :readonly="creditStatus!=='5'&&creditStatus!=='6'" v-model="approveData.creditLimitParam.endDate"></bs-datepicker>
                </i-form-item>
              </i-col>

            </i-row>
          </bs-form-block>
          <!--用信方案-->
          <bs-form-block title="用信方案" v-if="creditStatus==='5'||creditStatus==='6'">
            <div v-if="creditStatus==='5'||creditStatus==='6'" class="form-top-actions">
              <i-button type="primary" @click="openAddCreditPlanModal">添加用信方案</i-button>
            </div>
            <i-table :columns="creditPlanColumns" :data="approveData.creditPlanList"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见">
            <i-row>
              <i-col span="8">
                <i-form-item label="结论" :rules="{required: true, message: '结论不能为空', trigger: 'change'}">
                  <i-radio-group v-model="approveData.creditAuditParam.approveStatus">
                    <i-radio v-for="item in enumSelectData.get('ApproveStatusEnum')" :label="item.itemCode" :key="item.itemCode" style="margin-right: 20px; margin-top: -5px">{{item.itemName}}</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item
                  v-if="approveData.creditAuditParam.approveStatus === 'R'"
                  label="拒绝原因">
                  <i-select v-model="approveData.creditAuditParam.rejectCause">
                    <i-option v-for="item in enumSelectData.get('BizApproveRejectEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="24">
                <i-form-item label="意见信息" :rules="{required: true, message: '意见信息不能为空', trigger: 'blur'}">
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
      <i-tab-pane label="授信与用信方案">
        <credit-plan-list v-if="tabIndex==1" :creditLimitParam="approveData.creditLimitParam"></credit-plan-list>
      </i-tab-pane>
      <i-tab-pane label="审核历史信息">
        <!--审核历史意见-->
        <div v-if="tabIndex==2 && approveData.creditApplyParam.creditLimitApplyNo">
          <approve-history :id="approveData.creditApplyParam.creditLimitApplyNo"></approve-history>
        </div>
        <div v-else></div>
      </i-tab-pane>
    </i-tabs>
    <!--添加初审信息的弹窗-->
    <bs-modal v-model="addFirstApproveModal" :width="520" title="添加初审信息">
      <i-form :label-width="80" ref="addFirstApproveForm" :model="firstApproveForm">
        <i-form-item label="审查渠道" prop="itemName"
          :rules="{required: true, message: '请输入审查渠道'}">
          <i-input v-model="firstApproveForm.itemName"></i-input>
        </i-form-item>
        <i-form-item label="意见描述" prop="description"
                     :rules="{required: true, message: '请输入描述信息'}">
          <i-input type="textarea" :rows="4" v-model="firstApproveForm.description"></i-input>
        </i-form-item>
        <i-form-item label="查询结果" prop="fileName"
                     :rules="{required: true, message: '请上传凭证'}">
          <input type="hidden" v-model="firstApproveForm.fileName">
          <i-upload :show-upload-list="false"
              multiple type="drag" :on-success="uploadFirstApproveFileSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!firstApproveForm.fileUrl || firstApproveForm.fileUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{firstApproveForm.fileName}}</p>
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
        <i-form-item label="查询结果" prop="fileName"
                     :rules="{required: true, message: '请上传查询结果'}">
          <input type="hidden" v-model="outApproveForm.fileName">
          <i-upload :show-upload-list="false"
              multiple type="drag" :on-success="uploadOutApproveFileSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="!outApproveForm.fileUrl||outApproveForm.fileUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{outApproveForm.fileName}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitOutApprove" style="width: 120px;" type="primary" size="large">提交</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--添加用信方案-->
    <bs-modal v-model="addCreditPlamModal" :width="1200" title="添加用信方案">
      <credit-plan-form v-if="addCreditPlamModal"
                        :detail="creditPlanFormDetail"
                        :edit="creditPlanFormEdit"
                        :init-data="creditPlanFormInitData"
                        @on-submit="saveCreditPlan">
      </credit-plan-form>
    </bs-modal>
  </div>

</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import BsModal from '@/components/bs-modal';
  import ApproveHistory from '../credit-approve-history/index.vue';
  import CreditPlanForm from './credit-plan-form/index.vue';
  import CreditPlanList from './credit-plan-list/index.vue';
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
        addCreditPlamModal: false,
        // 用信方案弹窗是否是详情模式
        creditPlanFormDetail: false,
        creditPlanFormEdit: false,
        creditPlanFormInitData: {},
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
    methods: {
      openAddCreditPlanModal() {
        this.$data.creditPlanFormDetail = false;
        this.$data.creditPlanFormEdit = false;
        this.$data.addCreditPlamModal = true;
      }
    },
    computed: {
      // 根据审核状态判断提交的url地址
      submitUrl() {
        switch (this.$data.creditStatus) {
        case '3':
          return '/credit/firstTrial';
        case '4':
          return '/credit/firstTrial';
        case '5':
          return '/credit/externalAudit';
        case '6':
          return '/credit/externalAudit';
        case '7':
          return '/credit/approve';
        case '8':
          return '/credit/approve';
        }
      }
    },
    components: {
      CompanyCustomerBasicInfo,
      ApproveHistory,
      BsModal,
      CreditPlanForm,
      CreditPlanList
    },
    mounted() {
      this.$data.creditStatus = this.$route.query.status || '3';
      this.initPage();
    }
  };
</script>
<style lang="scss" scoped="">

</style>
