<template>
  <div id="formCompanyCustomerBasic">
    <i-row>
      <i-col span="24">
        <i-form ref="formCompanyCustomerBasicInfo" label-position="right" :model="formData" :label-width="140">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item prop="baseDTO.corpName" label="公司名称"
                             :rules="{required: true, message: '请输入公司名称'}">
                  <i-input :readonly="isFromDetail" placeholder="" v-model="formData.baseDTO.corpName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司性质" prop="baseDTO.corpType"
                  :rules="{required: true, message: '请输入公司性质', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.baseDTO.corpType" placeholder="公司性质">
                    <i-option v-for="item in enumSelectData.get('UnitTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item prop="baseDTO.creditCode" label="统一社会信用代码">
                  <i-input :readonly="isFromDetail" @on-blur="verifyCreditCode" v-model="formData.baseDTO.creditCode" placeholder="失去焦点自动查重"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="注册资金" prop="baseDTO.regCapital">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.regCapital" placeholder="输入字符串（如100万）">
                    <span slot="append">万元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="成立日期" prop="baseDTO.regDate">
                  <bs-datepicker :readonly="isFromDetail" v-model="formData.baseDTO.regDate" type="date" placeholder="Select date" style="width: 100%"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="营业期限" prop="baseDTO.bizExpDate">
                  <bs-datepicker :readonly="isFromDetail" v-model="formData.baseDTO.bizExpDate" type="date" placeholder="Select date" style="width: 100%"></bs-datepicker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="行业类型" prop="baseDTO.industryType"
                             :rules="{required: true, message: '请输入行业类型'}">
                  <i-select :disabled="isFromDetail" v-model="formData.baseDTO.industryType">
                    <i-option v-for="item in enumSelectData.get('IndustryTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="实际控制人" prop="baseDTO.actualControllers">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.actualControllers" placeholder=""></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="实际控制人联系电话" prop="baseDTO.actualControllersTel">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.actualControllersTel" placeholder=""></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="公司电话" prop="baseDTO.telephone">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.telephone" placeholder=""></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司传真" prop="baseDTO.fax">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.fax" placeholder=""></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司网址（如有）">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.website" placeholder=""></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <!--<i-row>
              <i-col span="8">
                <i-form-item label="是否合作渠道商" prop="baseDTO.isMerchant">
                  <i-select :disabled="isFromDetail" v-model="formData.baseDTO.isMerchant">
                    <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode/1">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>-->
            <i-row>
              <i-col span="18">
                <i-form-item v-if="isFromDetail" label="注册地址">
                  {{formData.baseDTO.regProvinceName}}
                  {{formData.baseDTO.regDistrictName}}
                  {{formData.baseDTO.regCityName}}
                </i-form-item>
                <i-form-item v-else label="注册地址" prop="baseDTO.regCityCode">
                  <input type="hidden" v-model="formData.baseDTO.regCityCode"/>
                  <bs-dispicker :currProvince="''+formData.baseDTO.regProvinceName"
                                :currDistrict="''+formData.baseDTO.regDistrictName"
                                :currCity="''+formData.baseDTO.regCityName"
                                :readonly="isFromDetail"
                                @on-change="selectRegDistance">
                  </bs-dispicker>
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.regRoadAddr" placeholder="街道信息" style="width: 220px;"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item v-if="isFromDetail" label="营业地址">
                  {{formData.baseDTO.bizProvinceName}}
                  {{formData.baseDTO.bizDistrictName}}
                  {{formData.baseDTO.bizCityName}}
                </i-form-item>
                <i-form-item v-else label="营业地址" prop="baseDTO.bizCityCode">
                  <input type="hidden" v-model="formData.baseDTO.bizCityCode"/>
                  <bs-dispicker :currProvince="formData.baseDTO.bizProvinceName"
                                :currDistrict="formData.baseDTO.bizDistrictName"
                                :currCity="formData.baseDTO.bizCityName"
                                :readonly="isFromDetail"
                                @on-change="selectBizDistance">
                  </bs-dispicker>
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.bizRoadAddr" placeholder="街道信息" style="width: 220px;"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="公司简介/营业范围">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.about" type="textarea" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--法定代表人姓名-->
          <bs-form-block v-if="type==='page'" :title="'法定代表人信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="法定代表人姓名" prop="baseDTO.legalPerson">
                  <i-input v-model="formData.baseDTO.legalPerson" :readonly="true">
                    <i-button v-if="!isFromDetail" type="primary" @click="selectRulerModal=!selectRulerModal" slot="append">选择代表人 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="性别"  prop="baseDTO.legalPersonSex">
                  <i-select :disabled="isFromDetail" v-model="formData.baseDTO.legalPersonSex">
                    <i-option v-for="item in enumSelectData.get('SexEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手机号码" prop="baseDTO.legalPersonMobile">
                  <i-input v-model="formData.baseDTO.legalPersonMobile" :readonly="true" placeholder="自动带入"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="证件类型" prop="baseDTO.legalPersonCerttype">
                  <i-select :disabled="isFromDetail" v-model="formData.baseDTO.legalPersonCerttype">
                    <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码" prop="baseDTO.legalPersonCertno">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.legalPersonCertno"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="持股比例" prop="baseDTO.legalPersonStock">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.legalPersonStock">
                    <span slot="append">%</span>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--主联系人-->
          <bs-form-block v-if="type==='page'" :title="'主联系人信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="联系人人姓名" prop="baseDTO.mainLinkmanName">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.mainLinkmanName"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="性别" prop="baseDTO.mainLinkmanSex">
                  <i-select :disabled="isFromDetail" v-model="formData.baseDTO.mainLinkmanSex">
                    <i-option v-for="item in enumSelectData.get('SexEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="联系电话" prop="baseDTO.mainLinkmanPhone">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.mainLinkmanPhone" placeholder="自动带入"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="职务" prop="baseDTO.mainLinkmanDuty">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.mainLinkmanDuty"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证号" prop="baseDTO.mainLinkmanCertno">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.mainLinkmanCertno"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="邮箱" prop="baseDTO.mainLinkmanEmail">
                  <i-input :readonly="isFromDetail" v-model="formData.baseDTO.mainLinkmanEmail"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--来源信息-->
          <bs-form-block v-if="type==='page'" :title="'来源信息'" >
            <i-row>
              <i-col span="8">
                <i-form-item label="业务拓展部门" prop="baseDTO.bizDepartmentName">
                  <input type="hidden" v-model="formData.baseDTO.bizDepartmentCode"/>
                  <i-input v-model="formData.baseDTO.bizDepartmentName" :readonly="true" placeholder="选择拓展部门">
                    <i-button v-if="!isFromDetail" @click="selectDepartmentModal=!selectDepartmentModal" slot="append">选择拓展部门 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item :readonly="!isFromDetail" label="开始合作时间" prop="baseDTO.joinStartDate">
                  <bs-datepicker :readonly="isFromDetail" placement="top-start" v-model="formData.baseDTO.joinStartDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理" prop="baseDTO.custMgrName">
                  <input type="hidden" v-model="formData.baseDTO.custMgrNo"/>
                  <i-input v-model="formData.baseDTO.custMgrName" :readonly="true" placeholder="选择客户经理">
                    <i-button v-if="!isFromDetail" @click="showSelectEmployer=!showSelectEmployer" slot="append">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--附件信息-->
          <bs-form-block v-if="type==='page'" :title="'附件信息'">
            <div class="form-top-actions">
              <i-button type="primary" v-if="!isFromDetail" @click="openAddAttachModal">添加附件</i-button>
            </div>
            <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="formData.attachDTOs"></i-table>
          </bs-form-block>
          <i-row v-if="type=='modal'" style="text-align:center">
            <i-button @click="submitCompanyCustomerBasic" :loading="initFormLoading" type="success">
              <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
              <span v-else> 处理中</span>
            </i-button>
          </i-row>
          <div v-if="type==='page'&&!isFromDetail" class="form-footer-actions">
            <i-button @click="saveCompanyCustomerBasic" :loading="initFormLoading" type="primary">
              <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 保存草稿</span>
              <span v-else> 处理中</span>
            </i-button>
            <i-button @click="submitCompanyCustomerBasic" :loading="initFormLoading" type="success">
              <span v-if="!initFormLoading"><i class="iconfont icon-tijiao"></i> 提交</span>
              <span v-else> 处理中</span>
            </i-button>
          </div>
        </i-form>
      </i-col>
    </i-row>
    <bs-modal v-model="addAttachModal" title="上传附件">
      <i-form ref="formCompanyCustomerAttach" :model="attachFormData" :label-width="80">
        <i-form-item label="文件名" prop="attachName"
                     :rules="{required: true, message: '请输入文件名'}">
          <i-input v-model="attachFormData.attachName"></i-input>
        </i-form-item>
        <i-form-item label="文件" prop="attachUrl"
                     :rules="{required: true, message: '请上传文件'}">
          <input type="hidden" v-model="attachFormData.attachUrl"/>
          <Upload multiple type="drag" :multiple="false" :show-upload-list="false"
            :on-success="uploadAttachSuccess"
            :action="$config.HTTPBASEURL+'/common/upload'">
            <div style="padding: 20px 0" v-if="attachFormData.attachUrl===''">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
            <p v-else>{{attachFormData.attachUrl}}</p>
          </Upload>
        </i-form-item>
        <i-form-item label="">
          <i-button @click="submitAttach" style="width: 80px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
    <!-- 选择业务拓展部门的弹窗 -->
    <bs-modal :width="880" v-model="selectDepartmentModal" title="选择业务拓展部门">
      <tree-grid v-if="selectDepartmentModal" @on-row-dblclick="selectDep" :columns="depColumns" :data="depData"></tree-grid>
    </bs-modal>
    <!--选择法人模态框-->
    <bs-modal title="选择法人代表" v-model="selectRulerModal" :width="1200">
      <table-customer-list ref="addCustomerSpouseModalTable" type="modal" @on-row-dbclick="selectRulerRow"></table-customer-list>
    </bs-modal>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>
<script>
import MixinData from './mixin-data';
import MixinMethods from './mixin-methods';
import BSModal from '@/components/bs-modal';
import BsDispicker from '@/components/bs-dispicker';
import TableEmployerList from '@/components/table-employer-list';
import TreeGrid from '@/components/bs-tree-grid';
import TableCustomerList from '@/components/table-customer-list';
export default {
  name: 'formCompanyCustomerBasic',
  mixins: [MixinData, MixinMethods],
  data() {
    return {
      addAttachModal: false,
      showSelectEmployer: false,
      selectDepartmentModal: false,
      initFormLoading: false,
      loadingAttachFile: false,
      selectRulerModal: false,
      checkoutCertNoTimer: null,
      attachFormData: {
        attachName: '',
        attachUrl: ''
      }
    };
  },
  computed: {
    corpNo() {
      if (this.$route.query.id) {
        return this.$route.query.id;
      } else {
        return null;
      }
    },
    isFromDetail() {
      return this.$route.query.from === 'detail';
    }
  },
  props: {
    type: {
      default: 'page',
      required: false,
      type: String
    }
  },
  components: {
    'bs-modal': BSModal,
    BsDispicker,
    TableEmployerList,
    TreeGrid,
    TableCustomerList
  },
  methods: {
    resetFormByStatus() {
      let _id = this.$route.query.id;
      if (_id) {
        // 如果是编辑或者详情初始化表单
        this.initFormData(_id);
      } else {
        // 如果是添加，重置所有数据
        this.$refs['formCompanyCustomerBasicInfo'].resetFields();
      }
    }
  },
  watch: {
    '$route': {
      handler(newVal, oldVal) {
        this.resetFormByStatus();
      },
      deep: true
    }
  },
  mounted() {
    this.getDepList();
    if (this.type !== 'page') {
      this.$data.formData = $.extend({}, this.$data.formDataInit);
    } else {
      this.resetFormByStatus();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
