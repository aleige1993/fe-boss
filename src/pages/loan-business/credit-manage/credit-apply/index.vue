<template>
  <div id="credit-apply">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/breadcrumb">公司授信管理</i-breadcrumb-item>
      <i-breadcrumb-item>授信申请</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <company-customer-basic-info @on-select-company="selectCompany"></company-customer-basic-info>

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
            <div class="form-top-actions">
              <i-button type="primary" @click="addOutApproveModal = !addOutApproveModal">添加现场尽调信息</i-button>
            </div>
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
      <!--审核历史意见-->
      <bs-form-block title="审核历史意见" >
        <i-table :columns="approveHistoryColumns" :data="approveHistoryData"></i-table>
      </bs-form-block>
    </i-form>
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
          <i-button @click="submitAttach" style="width: 120px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BsModal from '@/components/bs-modal';
  import CompanyCustomerBasicInfo from '../company-info/index.vue';
  export default {
    name: 'creditApply',
    mixins: [MixinData],
    data() {
      return {
        loadingAttachFile: false,
        addAttachModal: false,
        addFirstApproveModal: false,
        addOutApproveModal: false,
        attachFormData: {
          attachName: '',
          attachUrl: ''
        }
      };
    },
    methods: {
      selectCompany(corpNo, attachFiles) {
        this.$Message.success('' + corpNo);
        console.log(attachFiles);
      },
      // 上传附件
      openAddAttachModal() {
        this.$data.addAttachModal = true;
        this.$data.attachFormData = {
          attachName: '',
          attachUrl: ''
        };
      },
      uploadAttachSuccess(res) {
        this.$data.attachFormData.attachUrl = res.body.url;
      },
      submitAttach() {
        this.$data.companyAttachFiles.push(this.$data.attachFormData);
        this.$data.addAttachModal = false;
      }
    },
    components: {
      CompanyCustomerBasicInfo,
      'bs-modal': BsModal
    }
  };
</script>
<style lang="scss" scoped="">

</style>