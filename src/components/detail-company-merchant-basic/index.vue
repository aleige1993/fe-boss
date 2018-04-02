<template>
  <div id="detailCompanyCustomerBasic">
    <i-row>
      <i-col span="24">
        <i-form ref="detailCompanyCustomerBasicInfo" label-position="right" :model="formData" :label-width="140">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="公司名称">
                  <i-button type="text" @click="gotoPersonal" v-text="formData.baseDTO.corpName"></i-button>
                  <i-button type="success" @click="gotoPersonal">查看客户详情</i-button>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司性质" prop="baseDTO.corpType">
                  <span v-text="enumCode2Name('' + formData.baseDTO.corpType, 'UnitTypeEnum')"></span>
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
                  <span v-text="enumCode2Name(formData.baseDTO.industryType, 'IndustryTypeEnum')"></span>
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
                  <span v-text="enumCode2Name(formData.baseDTO.isMerchant, 'YesNoEnum')"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="注册地址" prop="baseDTO.regRoadAddr">
                  <span>
                    {{formData.baseDTO.regProvinceName}}
                    {{formData.baseDTO.regCityName}}
                    {{formData.baseDTO.regDistrictName}}
                  </span>
                  <span v-text="formData.baseDTO.regRoadAddr" style="width: 220px;"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="营业地址" prop="baseDTO.bizRoadAddr">
                  <span>
                    {{formData.baseDTO.bizProvinceName}}
                    {{formData.baseDTO.bizCityName}}
                    {{formData.baseDTO.bizDistrictName}}
                  </span>
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
                  <span v-text="enumCode2Name(formData.baseDTO.legalPersonSex, 'SexEnum')"></span>
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
                  <span v-text="enumCode2Name(formData.baseDTO.legalPersonCerttype, 'CertTypeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码" prop="baseDTO.legalPersonCertno">
                  <span v-text="formData.baseDTO.legalPersonCertno"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="持股比例" prop="baseDTO.legalPersonStock">
                  <span v-text="formData.baseDTO.legalPersonStock">
                    <span v-if="formData.baseDTO.legalPersonStock !== ''">%</span>
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
                  <span v-text="enumCode2Name(formData.baseDTO.mainLinkmanSex, 'SexEnum')"></span>
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
                  <span v-text="enumCode2Name(formData.baseDTO.mainLinkmanDuty, 'DutyEnum')"></span>
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
                  <span placement="top-start" v-text="formData.baseDTO.joinStartDate"></span>
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
            <div class="scrollBarStyle" style="width: 100%; overflow-x: auto">
              <i-table :loading="loadingAttachFile" :columns="companyAttachFileColumns" :data="formData.attachDTOs"></i-table>
            </div>
          </bs-form-block>
        </i-form>
      </i-col>
    </i-row>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>
<script>
import MixinData from './mixin-data';
import MixinMethods from './mixin-methods';
import BSModal from '@/components/bs-modal';
import Tools from '../../utils/Tools';
export default {
  name: 'detailCompanyCustomerBasic',
  mixins: [MixinData, MixinMethods],
  data() {
    return {
      initFormLoading: false,
      loadingAttachFile: false,
      attachFormData: {
        attachName: '',
        attachUrl: ''
      }
    };
  },
  props: ['corpNo'],
  computed: {
  },
  components: {
    'bs-modal': BSModal
  },
  methods: {
    gotoPersonal() {
      Tools.openWin(`#/index/customer/companycustomer/modify?noaction=true&id=${this.corpNo}&name=${this.$data.formData.baseDTO.corpName}&from=detail`);
    }
  },
  watch: {
  },
  mounted() {
    this.initFormData(this.corpNo);
  }
};
</script>
<style lang="scss" scoped>
</style>
