<template>
  <div class="" style="position: relative">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :model="formData" ref="formAddCustomer" :label-width="120">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="姓名">
                  <i-button type="text" @click="gotoPersonal" v-text="formData.mbMemberDTO.name"></i-button>
                  <i-button type="primary" @click="selectPersonalModal=!selectPersonalModal">选择姓名 <i-icon type="ios-more"></i-icon></i-button>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="注册手机号" prop="mbMemberDTO.mobile">
                  <span v-text="formData.mbMemberDTO.mobile" ></span>
                </i-form-item>
              </i-col>
            </i-row>
            <!--新增字段-->
            <i-row>
              <i-col span="8">
                <i-form-item label="社保" prop="mbMemberDTO.isSocialSecurity"><!--枚举：HaveNoEnum-->
                  <span v-text="
                  enumCode2Name(formData.mbMemberDTO.isSocialSecurity, 'HaveNoEnum') === '' ?
                  '' : enumCode2Name(formData.mbMemberDTO.isSocialSecurity, 'HaveNoEnum') + '社保'">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="公积金" prop="mbMemberDTO.isPublicReserveFunds"><!--枚举：HaveNoEnum-->
                  <span v-text="
                  enumCode2Name(formData.mbMemberDTO.isPublicReserveFunds, 'HaveNoEnum') === '' ?
                  '' : enumCode2Name(formData.mbMemberDTO.isPublicReserveFunds, 'HaveNoEnum') + '公积金'">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="信用记录" prop="mbMemberDTO.creditType"><!--枚举：CreditTypeEnum-->
                  <span v-text="enumCode2Name(formData.mbMemberDTO.creditType, 'CreditTypeEnum')"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="证件类型" prop="mbMemberDTO.certType"><!--枚举：CertTypeEnum-->
                  <span v-text="enumCode2Name(formData.mbMemberDTO.certType, 'CertTypeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码" prop="mbMemberDTO.certNo">
                  <span v-text="formData.mbMemberDTO.certNo"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件有效期" prop="mbMemberDTO.certValidDate">
                  <span v-model="formData.mbMemberDTO.certValidDate"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="性别" prop="mbMemberDTO.sex">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.sex, 'SexEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="出生日期" prop="mbMemberDTO.birthday">
                  <span v-text="formData.mbMemberDTO.birthday"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="年龄">
                  <span v-text="age"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="婚姻状况" prop="mbMemberDTO.maritalStatus">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.maritalStatus, 'MaritalStatusEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="教育程度" prop="mbMemberDTO.education"><!--EducationEnum-->
                  <span v-text="enumCode2Name(formData.mbMemberDTO.education, 'EducationEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="职业类型" prop="mbMemberDTO.workType">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.workType, 'WorkTypeEnum')"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="工资收入" prop="mbMemberDTO.monthRevenue"><!--MonthRevenueEnum-->
                  <span v-text="enumCode2Name(formData.mbMemberDTO.monthRevenue, 'MonthRevenueEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="参加工作年限" prop="mbMemberDTO.workYears">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.workYears, 'YearsEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="是否本地人" prop="mbMemberDTO.isNative"><!--YesNoEnum-->
                  <span v-text="enumCode2Name(formData.mbMemberDTO.isNative, 'YesNoEnum')"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="本地有否房产" prop="mbMemberDTO.isLocalHouse">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.isLocalHouse, 'YesNoEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="本地居住年限" prop="mbMemberDTO.liveYears">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.liveYears, 'YearsEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="住房情况" prop="mbMemberDTO.liveType">
                  <span v-text="enumCode2Name(formData.mbMemberDTO.liveType, 'LiveTypeEnum')"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="户籍地址" prop="mbMemberDTO.censusCityCode">
                  <span>
                    {{formData.mbMemberDTO.censusProvinceName}}
                    {{formData.mbMemberDTO.censusDistrictName}}
                    {{formData.mbMemberDTO.censusCityName}}
                    {{formData.mbMemberDTO.censusRoadAddr}}
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="居住地址" prop="mbMemberDTO.nowCityCode">
                  <span>
                    {{formData.mbMemberDTO.nowProvinceName}}
                    {{formData.mbMemberDTO.nowDistrictName}}
                    {{formData.mbMemberDTO.nowCityName}}
                    {{formData.mbMemberDTO.nowRoadAddr}}
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="身份证正面"
                             prop="mbMemberDTO.certFrontUrl">
                  <img style="cursor:zoom-in; margin-top: 8px;" width="149" height="95" :src="formData.mbMemberDTO.certFrontUrl" @click="showImg(formData.mbMemberDTO.certFrontUrl)">
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证反面"
                             prop="mbMemberDTO.certBackUrl">
                  <img style="cursor:zoom-in; margin-top: 8px;" width="149" height="95" :src="formData.mbMemberDTO.certBackUrl" @click="showImg(formData.mbMemberDTO.certBackUrl)">
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手持身份证"
                             prop="mbMemberDTO.certHandUrl">
                  <img style="cursor:zoom-in; margin-top: 8px;" width="149" height="95" :src="formData.mbMemberDTO.certHandUrl" @click="showImg(formData.mbMemberDTO.certHandUrl)">
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--工作信息-->
          <bs-form-block :title="'工作信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="单位名称"
                             prop="mbMemberWorkDTO.companyName">
                  <span v-text="formData.mbMemberWorkDTO.companyName"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单位性质"
                             prop="mbMemberWorkDTO.unitType">
                  <span v-text="enumCode2Name(formData.mbMemberWorkDTO.unitType, 'UnitTypeEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="行业类别"
                             prop="mbMemberWorkDTO.industryType">
                  <span v-text="enumCode2Name(formData.mbMemberWorkDTO.industryType, 'UnitTypeEnum')"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="职务">
                  <span v-text="enumCode2Name(formData.mbMemberWorkDTO.duty, 'DutyEnum')"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="入职时间">
                  <span v-text="formData.mbMemberWorkDTO.joinDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="所属部门">
                  <span v-text="formData.mbMemberWorkDTO.department"></span>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="月收入">
                  <span v-text="formData.mbMemberWorkDTO.monthRevenue"></span>
                  <span slot="append">元</span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单位电话"
                             prop="mbMemberWorkDTO.companyTel">
                  <span v-text="formData.mbMemberWorkDTO.companyTel"></span>
                </i-form-item>
                <i-form-item label="公司地址"
                             prop="mbMemberWorkDTO.cityCode">
                  <span>
                    {{formData.mbMemberWorkDTO.provinceName}}
                    {{formData.mbMemberWorkDTO.districtName}}
                    {{formData.mbMemberWorkDTO.cityName}}
                    {{formData.mbMemberWorkDTO.roadAddr}}
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--来源信息-->
          <bs-form-block :title="'来源信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="业务拓展部门">
                  <span v-text="formData.mbMemberDTO.bizDepartmentName">
                  </span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开始合作时间">
                  <span v-text="formData.mbMemberDTO.joinStartDate"></span>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理">
                  <span v-text="formData.mbMemberDTO.custMgrName" >
                  </span>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
        </i-form>
      </i-col>
    </i-row>
    <!-- 选择个人客户的弹窗 -->
    <bs-modal title="选择个人客户" :width="1200" v-model="selectPersonalModal">
      <table-personal-customer-list ref="tablePersonalCustomer" type="modal" @on-row-dbclick="selectPersonal">
      </table-personal-customer-list>
    </bs-modal>
    <!--点击图片放大模态框-->
    <i-modal v-model="visibleImg" cancel-text="" ok-text="关闭">
      <img :src="showImgUpUrl" style="width: 100%">
    </i-modal>
  </div>
</template>
<script>
import Tools from '@/utils/Tools';
import MxinData from './mixin-data';
import MxinMethods from './mixin-methods';
import BsModal from '@/components/bs-modal';
import TablePersonalCustomerList from '@/components/table-customer-list';
export default {
  name: 'formCustomerBsicInfo',
  mixins: [MxinData, MxinMethods],
  data() {
    return {
      visibleImg: false,
      showImgUpUrl: '',
      selectPersonalModal: false
    };
  },
  props: ['certNo'],
  computed: {
    age() {
      if (this.$data.formData.mbMemberDTO.birthday !== '') {
        let birthday = this.$data.formData.mbMemberDTO.birthday;
        return Tools.getAgeFromBirthday(birthday);
      }
    }
  },
  components: {
    BsModal,
    TablePersonalCustomerList
  },
  methods: {// 点击放大图片
    showImg(imgURL) {
      if (imgURL !== '') {
        this.$data.showImgUpUrl = imgURL;
        this.$data.visibleImg = true;
      }
    },
    selectPersonal(row, index) {
      this.initFormData(row.certNo);
      this.$data.selectPersonalModal = false;
    }
  },
  async mounted() {
    // 如果有id，初始化页面数据
    if (typeof this.$data.certNo !== 'undefined' && this.$data.certNo !== '') {
      this.initFormData(this.$data.certNo);
    } else {
      // 如果不是编辑，清空表单
    }
  }
};
</script>
<style lang="scss" scoped>
  .ivu-form-item{
    margin-bottom: 0 !important;
  }
</style>
