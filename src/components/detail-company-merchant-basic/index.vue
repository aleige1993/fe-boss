<template>
  <div id="detailCompanyCustomerBasic">
    <i-row>
      <i-col span="24">
        <i-form ref="detailCompanyCustomerBasicInfo" label-position="right" :model="formData" :label-width="140">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item prop="baseDTO.corpName" label="公司名称">
                  <span v-text="formData.baseDTO.corpName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司性质" prop="baseDTO.corpType">
                  <span v-text="formData.baseDTO.corpType">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item prop="baseDTO.creditCode" label="统一社会信用代码">
                  <span v-text="formData.baseDTO.creditCode"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="注册资金" prop="baseDTO.regCapital">
                  <span v-text="formData.baseDTO.regCapital">
                    <span slot="append">万元</span>
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="成立日期" prop="baseDTO.regDate">
                  <span v-text="formData.baseDTO.regDate" style="width: 100%"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="营业期限" prop="baseDTO.bizExpDate">
                  <span v-text="formData.baseDTO.bizExpDate" style="width: 100%"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="行业类型" prop="baseDTO.industryType">
                  <span v-text="formData.baseDTO.industryType">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="实际控制人" prop="baseDTO.actualControllers">
                  <span v-text="formData.baseDTO.actualControllers"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="实际控制人联系电话" prop="baseDTO.actualControllersTel">
                  <span v-text="formData.baseDTO.actualControllersTel"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="公司电话" prop="baseDTO.telephone">
                  <span v-text="formData.baseDTO.telephone"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司传真" prop="baseDTO.fax">
                  <span v-text="formData.baseDTO.fax"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司网址（如有）">
                  <span v-text="formData.baseDTO.website"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="是否合作渠道商" prop="baseDTO.isMerchant">
                  <span v-text="formData.baseDTO.isMerchant">
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="注册地址" prop="baseDTO.regCityCode">
                  <input type="hidden" v-model="formData.baseDTO.regCityCode"/>
                  <bs-dispicker :currProvince="''+formData.baseDTO.regProvinceName"
                                :currDistrict="''+formData.baseDTO.regDistrictName"
                                :currCity="''+formData.baseDTO.regCityName"

                                @on-change="selectRegDistance"></bs-dispicker>
                  <span v-text="formData.baseDTO.regRoadAddr" style="width: 220px;"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="营业地址" prop="baseDTO.bizCityCode">
                  <input type="hidden" v-model="formData.baseDTO.bizCityCode"/>
                  <bs-dispicker :currProvince="formData.baseDTO.bizProvinceName"
                                :currDistrict="formData.baseDTO.bizDistrictName"
                                :currCity="formData.baseDTO.bizCityName"

                                @on-change="selectBizDistance"></bs-dispicker>
                  <span v-text="formData.baseDTO.bizRoadAddr" style="width: 220px;"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="公司简介/营业范围">
                  <span v-text="formData.baseDTO.about"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--法定代表人姓名-->
          <bs-form-block :title="'法定代表人信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="法定代表人姓名" prop="baseDTO.legalPerson">
                  <span v-text="formData.baseDTO.legalPerson" >
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="性别"  prop="baseDTO.legalPersonSex">
                  <span v-text="formData.baseDTO.legalPersonSex" ></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手机号码" prop="baseDTO.legalPersonMobile">
                  <span v-text="formData.baseDTO.legalPersonMobile"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="证件类型" prop="baseDTO.legalPersonCerttype">
                  <span v-text="formData.baseDTO.legalPersonCerttype">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码" prop="baseDTO.legalPersonCertno">
                  <span v-text="formData.baseDTO.legalPersonCertno"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="持股比例" prop="baseDTO.legalPersonStock">
                  <span v-text="formData.baseDTO.legalPersonStock !== ''&&formData.baseDTO.legalPersonStock + '%'">
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--主联系人-->
          <bs-form-block :title="'主联系人信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="联系人人姓名" prop="baseDTO.mainLinkmanName">
                  <span v-text="formData.baseDTO.mainLinkmanName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="性别" prop="baseDTO.mainLinkmanSex">
                  <span v-text="formData.baseDTO.mainLinkmanSex">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="联系电话" prop="baseDTO.mainLinkmanPhone">
                  <span v-text="formData.baseDTO.mainLinkmanPhone"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="职务" prop="baseDTO.mainLinkmanDuty">
                  <span v-text="formData.baseDTO.mainLinkmanDuty"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证号" prop="baseDTO.mainLinkmanCertno">
                  <span v-text="formData.baseDTO.mainLinkmanCertno"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="邮箱" prop="baseDTO.mainLinkmanEmail">
                  <span v-text="formData.baseDTO.mainLinkmanEmail"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--来源信息-->
          <bs-form-block :title="'来源信息'" >
            <i-row>
              <i-col span="8">
                <i-form-item label="业务拓展部门" prop="baseDTO.bizDepartmentName">
                  <span v-text="formData.baseDTO.bizDepartmentName" >
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开始合作时间" prop="baseDTO.joinStartDate">
                  <span placement="top-start" v-model="formData.baseDTO.joinStartDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理" prop="baseDTO.custMgrName">
                  <span v-text="formData.baseDTO.custMgrName" >
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--附件信息-->
          <bs-form-block :title="'附件信息'">
            <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="formData.attachDTOs"></i-table>
          </bs-form-block>
        </i-form>
      </i-col>
    </i-row>
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
      <table-customer-list ref="addCustomerSpouseModalTable" type="modal" @on-row-dbclick="selectRulerRow">
        <div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCustomerModal=!addCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>
      </table-customer-list>
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
  name: 'detailCompanyCustomerBasic',
  mixins: [MixinData, MixinMethods],
  data() {
    return {
      addAttachModal: false,
      showSelectEmployer: false,
      selectDepartmentModal: false,
      initFormLoading: false,
      loadingAttachFile: false,
      selectRulerModal: false,
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
        this.$data.formData = $.extend({}, this.$data.formDataInit);
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
