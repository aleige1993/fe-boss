<template>
  <div id="">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :label-width="140">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="公司名称">
                  <i-button type="text" @click="gotoCompany" v-text="formData.baseDTO.corpName"></i-button>
                  <i-button v-if="!corpNo||corpNo==''" type="primary" @click="selectCompanyModal=!selectCompanyModal">选择公司 <i-icon type="ios-more"></i-icon></i-button>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司性质">
                  <span>{{enumCode2Name(formData.baseDTO.corpType, 'UnitTypeEnum')}}</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="统一社会信用代码">
                  <span v-text="formData.baseDTO.creditCode"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="注册资金">
                  <span v-text="formData.baseDTO.regCapital"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="成立日期">
                  <span v-text="formData.baseDTO.regDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="营业期限">
                  <span v-text="formData.baseDTO.bizExpDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="行业类型">
                  <span v-text="formData.baseDTO.industryType"></span>
                  {{enumCode2Name(formData.baseDTO.industryType, 'IndustryTypeEnum')}}
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="实际控制人">
                  <span v-text="formData.baseDTO.actualControllers" ></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="实际控制人联系电话">
                  <span v-text="formData.baseDTO.actualControllersTel" ></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="公司电话">
                  <span v-text="formData.baseDTO.telephone" ></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司传真">
                  <span v-text="formData.baseDTO.fax" ></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公司网址（如有）">
                  <span v-text="formData.baseDTO.website" ></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="是否合作渠道商" prop="baseDTO.isMerchant">
                  {{enumCode2Name(formData.baseDTO.isMerchant, 'YesNoEnum')}}
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="注册地址">
                  {{formData.baseDTO.regProvinceName}}
                  {{formData.baseDTO.regDistrictName}}
                  {{formData.baseDTO.regCityName}}
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="营业地址">
                  {{formData.baseDTO.bizProvinceName}}
                  {{formData.baseDTO.bizDistrictName}}
                  {{formData.baseDTO.bizCityName}}
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
                <i-form-item label="法定代表人姓名">
                  <span v-text="formData.baseDTO.legalPerson"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="性别">
                  <span v-text="enumCode2Name(formData.baseDTO.legalPersonSex, 'SexEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手机号码">
                  <span v-text="formData.baseDTO.legalPersonMobile"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="证件类型">
                  <span v-text="formData.baseDTO.legalPersonCerttype"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码">
                  <span v-text="formData.baseDTO.legalPersonCertno"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="持股比例">
                  <span v-text="formData.baseDTO.legalPersonStock"></span><span slot="append">%</span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--主联系人-->
          <bs-form-block :title="'主联系人信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="联系人人姓名">
                  <span v-text="formData.baseDTO.mainLinkmanName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="性别">
                  <span v-text="enumCode2Name(formData.baseDTO.mainLinkmanSex, 'SexEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="联系电话">
                  <span v-text="formData.baseDTO.mainLinkmanPhone"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="职务">
                  <span v-text="formData.baseDTO.mainLinkmanDuty"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证号">
                  <span v-text="formData.baseDTO.mainLinkmanCertno"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="邮箱">
                  <span v-text="formData.baseDTO.mainLinkmanEmail"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--来源信息-->
          <bs-form-block :title="'来源信息'" >
            <i-row>
              <i-col span="8">
                <i-form-item label="业务拓展部门">
                  <span v-text="formData.baseDTO.bizDepartmentName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开始合作时间">
                  <span  v-text="formData.baseDTO.joinStartDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理">
                  <span v-text="formData.baseDTO.custMgrName"></span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>

        </i-form>
      </i-col>
    </i-row>

    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="selectCompanyModal">
      <table-company-customer-list ref="tableCompanyCustomer" type="modal" @on-row-dbclick="selectCompany">
        <!--<div class="form-top-actions" slot="topAction">
          <i-button type="info" @click="addCompanyCustomerModal=!addCompanyCustomerModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        </div>-->
      </table-company-customer-list>
    </bs-modal>
  </div>
</template>
<script>
import MixinData from './mixin-data';
import BsModal from '@/components/bs-modal';
import MixinMethods from './mixin-methods';
import TableCompanyCustomerList from '@/components/table-company-customer-list';
export default {
  name: 'creditCompanyInfo',
  mixins: [MixinData, MixinMethods],
  data() {
    return {
      selectCompanyModal: false,
      initFormLoading: false
    };
  },
  props: ['corpNo'],
  components: {
    'bs-modal': BsModal,
    TableCompanyCustomerList
  },
  methods: {
    selectCompany(row, index) {
      this.initFormData(row.corpNo);
      this.$data.selectCompanyModal = false;
    }
  },
  watch: {
    'corpNo'(newVal) {
      if (newVal && newVal !== '') {
        this.initFormData(newVal);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .ivu-form-item{
    margin-bottom: 0 !important;
  }
</style>
