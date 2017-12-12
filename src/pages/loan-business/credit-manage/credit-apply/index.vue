<template>
  <div id="credit-apply">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>{{id ? '授信信息修改' : '授信申请'}}</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>

    <i-tabs v-model="tabIndex" type="card" :animated="false">
      <i-tab-pane label="申请信息">
        <company-customer-basic-info :corpNo="applyData.creditApplyParam.corpNo" @on-select-company="selectCompany"></company-customer-basic-info>
        <i-form v-if="applyData.creditApplyParam.corpNo !==''" label-position="right" :label-width="140">
          <!--附件信息-->
          <bs-form-block :title="'附件信息'">
            <div class="form-top-actions">
              <i-button type="primary" @click="openAddAttachModal">添加附件</i-button>
            </div>
            <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="applyData.creditApplyAttachParamList"></i-table>
          </bs-form-block>
          <!--审核意见-->
          <bs-form-block title="审核意见" >
            <i-row>
              <i-col span="8">
                <i-form-item label="结论">
                  <i-radio-group v-model="applyData.creditAuditParam.approveStatus">
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
                  <i-input v-model="applyData.creditAuditParam.opinion" type="textarea" :rows="4"></i-input>
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
        <div v-if="tabIndex==1">
          <approve-history :id="applyData.creditApplyParam.creditApplyNo"></approve-history>
        </div>
      </i-tab-pane>
    </i-tabs>

    <!--上传附件的弹窗-->
    <bs-modal v-model="addAttachModal" :width="520" title="上传公司客户附件">
      <Form :label-width="80">
        <FormItem label="文件名">
          <i-input v-model="attachFormData.attachName"></i-input>
        </FormItem>
        <FormItem label="文件">
          <i-upload
              multiple type="drag" :on-success="uploadAttachSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="attachFormData.attachUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{attachFormData.attachUrl}}</p>
          </i-upload>
        </FormItem>
        <i-form-item label="">
          <i-button @click="submitAttach" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </Form>
    </bs-modal>
    <!--添加初审信息的弹窗-->
    <bs-modal v-model="addFirstApproveModal" :width="520" title="添加初审信息">
      <i-form :label-width="80">
        <i-form-item label="第三方网站名称">
          <i-input v-model="attachFormData.attachName"></i-input>
        </i-form-item>
        <i-form-item label="查询描述">
          <i-input type="textarea" :rows="4" v-model="attachFormData.attachName"></i-input>
        </i-form-item>
        <i-form-item label="查询结果">
          <i-upload
              multiple type="drag" :on-success="uploadAttachSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="attachFormData.attachUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{attachFormData.attachUrl}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitAttach" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--添加外审信息的弹窗-->
    <bs-modal v-model="addOutApproveModal" :width="520" title="添加外审尽调信息">
      <i-form :label-width="80">
        <i-form-item label="尽调材料">
          <i-input v-model="attachFormData.attachName"></i-input>
        </i-form-item>
        <i-form-item label="描述">
          <i-input type="textarea" :rows="4" v-model="attachFormData.attachName"></i-input>
        </i-form-item>
        <i-form-item label="查询结果">
          <i-upload
              multiple type="drag" :on-success="uploadAttachSuccess"
              :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="attachFormData.attachUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{attachFormData.attachUrl}}</p>
          </i-upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitAttach" style="width: 120px;" type="primary" size="large">提交</i-button>
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
  import ApproveHistory from '../credit-approve-history/index.vue';
  export default {
    name: 'creditApply',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        tabIndex: 0,
        initPageLoading: false,
        loadingAttachFile: false,
        submitApplyLoading: false,
        initFormLoading: false,
        addAttachModal: false,
        addFirstApproveModal: false,
        addOutApproveModal: false,
        attachFormData: {
          attachName: '',
          attachUrl: ''
        }
      };
    },
    computed: {
      id() {
        return this.$route.query.id || null;
      }
    },
    methods: {

    },
    mounted() {
      this.initPage();
    },
    components: {
      CompanyCustomerBasicInfo,
      'bs-modal': BsModal,
      ApproveHistory
    }
  };
</script>
<style lang="scss" scoped="">

</style>