<template>
  <div class="" style="position: relative">
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :model="formData" ref="formAddCustomer" :label-width="120">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item :prop="'mbMemberDTO.name'" label="姓名"
                  :rules="{required: true, message: '姓名不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" placeholder="姓名" v-model="formData.mbMemberDTO.name"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手机号" prop="mbMemberDTO.mobile"
                  :rules="{required: true, message: '手机号不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.mobile" placeholder="手机号"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="证件类型" prop="mbMemberDTO.certType"
                  :rules="{required: true, message: '请选择证件类型', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.certType">
                    <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件号码" prop="mbMemberDTO.certNo"
                  :rules="{required: true, message: '证件号码不能为空', trigger: 'blur'}">
                  <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.certNo"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="证件有效期" prop="mbMemberDTO.certValidDate"
                  :rules="{required: true, message: '证件有效期不嫩为空', trigger: 'blur'}">
                  <!-- <i-date-picker format="yyyy-MM-dd" :readonly="isFromDetail"
                  @on-change="certValidDateChange" :value="formData.mbMemberDTO.certValidDate"
                  type="date" placeholder="Select date" style="width: 100%"></i-date-picker> -->
                  <bs-datepicker v-model="formData.mbMemberDTO.certValidDate" :readonly="false"></bs-datepicker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="性别" prop="mbMemberDTO.sex"
                  :rules="{required: true, message: '请选择性别', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.sex">
                    <i-option v-for="item in enumSelectData.get('SexEnum')"  :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="出生日期" prop="mbMemberDTO.birthday"
                  :rules="{required: true, message: '请选择出生日期', trigger: 'change'}">
                  <bs-datepicker :readonly="isFromDetail" v-model="formData.mbMemberDTO.birthday"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="年龄">
                  <i-input :readonly="true" v-model="age" placeholder="根据出生日期计算"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="婚姻状况" prop="mbMemberDTO.maritalStatus"
                  :rules="{required: true, message: '请选择婚况', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.maritalStatus">
                    <i-option v-for="item in enumSelectData.get('MaritalStatusEnum')"  :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="教育程度" prop="mbMemberDTO.education"
                  :rules="{required: true, message: '请选择教育程度', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.education">
                    <i-option v-for="item in enumSelectData.get('EducationEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="职业类型" prop="mbMemberDTO.workType"
                  :rules="{required: true, message: '请选择职业类型', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.workType">
                    <i-option v-for="item in enumSelectData.get('WorkTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="年收入" prop="mbMemberDTO.annualRevenue"
                  :rules="{required: true, message: '年收入不能为空', trigger: 'change'}">
                  <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.annualRevenue">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="参加工作年限" prop="mbMemberDTO.workYears"
                  :rules="{required: true, message: '请选择工作年限', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.workYears">
                    <i-option v-for="item in enumSelectData.get('YearsEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="是否本地人" prop="mbMemberDTO.isNative"
                  :rules="{required: true, message: '请选择是否本地人', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isNative">
                    <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="本地有否房产" prop="mbMemberDTO.isLocalHouse"
                  :rules="{required: true, message: '请选择是否本地有房产', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isLocalHouse">
                    <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="本地居住年限" prop="mbMemberDTO.liveYears"
                  :rules="{required: true, message: '请选择居住年限', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.liveYears">
                    <i-option v-for="item in enumSelectData.get('YearsEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="居住性质" prop="mbMemberDTO.liveType"
                  :rules="{required: true, message: '请选择居住性质', trigger: 'change'}">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.liveType">
                    <i-option v-for="item in enumSelectData.get('LiveTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item v-if="!isFromDetail" label="户籍地址">
                  <i-select :label-in-value="true" @on-change="censusProvinceChange" style="width: 150px" v-model="formData.mbMemberDTO.censusProvinceCode">
                    <i-option v-for="item in shengDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>

                  <i-select :label-in-value="true" @on-change="censusDistrictChange" style="width: 150px"  v-model="formData.mbMemberDTO.censusDistrictCode">
                    <i-option v-for="item in censusDistrictDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-select @on-change="censusCityChange" :label-in-value="true" style="width: 150px" v-model="formData.mbMemberDTO.censusCityCode">
                    <i-option v-for="item in censusCityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-input placeholder="街道信息" v-model="formData.mbMemberDTO.censusRoadAddr" style="width: 320px;"></i-input>
                </i-form-item>
                <i-form-item v-else label="户籍地址">
                  重庆市云阳县
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item v-if="!isFromDetail" label="居住地址">
                  <i-select :label-in-value="true" @on-change="nowProvinceChange" style="width: 150px" v-model="formData.mbMemberDTO.nowProvinceCode">
                    <i-option v-for="item in shengDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-select :label-in-value="true" @on-change="nowDistrictChange" style="width: 150px"  v-model="formData.mbMemberDTO.nowDistrictCode">
                    <i-option v-for="item in nowDistrictDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-select @on-change="nowCityChange" :label-in-value="true" style="width: 150px" v-model="formData.mbMemberDTO.nowCityCode">
                    <i-option v-for="item in nowCityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-input placeholder="街道信息" v-model="formData.mbMemberDTO.nowRoadAddr" style="width: 320px;"></i-input>
                </i-form-item>
                <i-form-item v-else label="居住地址">
                  重庆市云阳县
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="身份证正面">
                  <input type="hidden" v-model="formData.mbMemberDTO.certFrontUrl"/>
                  <img v-if="formData.mbMemberDTO.certFrontUrl!==''"  width="149" height="95" :src="formData.mbMemberDTO.certFrontUrl" alt="">
                  <i-upload v-else @on-success="uploadFaceSuccess" :action="$config.HTTPBASEURL+'/common/upload'">
                    <idcard-placeholder type="face"></idcard-placeholder>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证反面">
                  <input type="hidden" v-model="formData.mbMemberDTO.certBackUrl"/>
                  <img v-if="formData.mbMemberDTO.certBackUrl!==''" width="149" height="95" :src="formData.mbMemberDTO.certBackUrl" alt="">
                  <i-upload v-else @on-success="uploadBackSuccess" action="/common/upload">
                    <idcard-placeholder type="back"></idcard-placeholder>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手持身份证">
                  <input type="hidden" v-model="formData.mbMemberDTO.certHandUrl"></input>
                  <img v-if="formData.mbMemberDTO.certHandUrl!==''" width="149" height="95" :src="formData.mbMemberDTO.certHandUrl" alt="">
                  <i-upload v-else @on-success="uploadHandSuccess" action="/common/upload">
                    <idcard-placeholder type="hand"></idcard-placeholder>
                  </i-upload>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--工作信息-->
          <bs-form-block v-if="type==='page'" :title="'工作信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="单位名称">
                  <i-input :readonly="true" v-model="formData.mbMemberWorkDTO.companyName">
                    <i-button v-if="!isFromDetail" type="primary" @click="showSelectCompany=!showSelectCompany" slot="append">选择公司 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单位性质">
                  <i-input :readonly="true" v-model="formData.mbMemberWorkDTO.unitType" placeholder="自动带入"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="行业类别">
                  <i-input :readonly="true" v-model="formData.mbMemberWorkDTO.industryType" placeholder="自动带入"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="职务">
                  <i-select :disabled="isFromDetail" v-model="formData.mbMemberWorkDTO.duty">
                    <i-option v-for="item in enumSelectData.get('DutyEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="入职时间">
                  <bs-datepicker :readonly="isFromDetail" v-model="formData.mbMemberWorkDTO.joinDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="所属部门">
                  <i-input v-model="formData.mbMemberWorkDTO.department"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="月收入">
                  <i-input v-model="formData.mbMemberWorkDTO.monthRevenue">
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="单位电话">
                  <i-input v-model="formData.mbMemberWorkDTO.companyTel" placeholder=""></i-input>
                </i-form-item>
              </i-col>

            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="公司地址">
                  <i-select :label-in-value="true" v-model="formData.mbMemberWorkDTO.provinceCode"  @on-change="companyProvinceChange" style="width: 150px">
                    <i-option v-for="item in shengDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-select :label-in-value="true" v-model="formData.mbMemberWorkDTO.districtCode" @on-change="companyDistrictChange" style="width: 150px">
                    <i-option v-for="item in companyDistictDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-select :label-in-value="true" @on-change="companyCityChange" v-model="formData.mbMemberWorkDTO.cityCode" style="width: 150px">
                    <i-option v-for="item in companyCityDropList" :value="item.regionCode" :key="item.regionCode">{{item.regionName}}</i-option>
                  </i-select>
                  <i-input placeholder="街道信息" style="width: 220px;"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <bs-form-block v-if="type==='page'" :title="'来源信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="业务拓展部门">
                  <i-input v-model="formData.mbMemberDTO.bizDepartmentName" :readonly="true" placeholder="选择客户经理">
                    <i-button v-if="!isFromDetail" slot="append">选择拓展部门 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="开始合作时间">
                  <bs-datepicker :readonly="isFromDetail" placement="top-start" v-model="formData.mbMemberDTO.joinStartDate"></bs-datepicker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理">
                  <i-input v-model="formData.mbMemberDTO.custMgrNo" :readonly="true" placeholder="选择客户经理">
                    <i-button v-if="!isFromDetail" @click="showSelectEmployer=!showSelectEmployer" slot="append">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <i-row>
            <i-col span="24" v-if="type==='modal'" style="text-align: center">
              <i-button type="success" @click="submitBasicInfo"><i class="iconfont icon-tijiao"></i> 保存</i-button>
            </i-col>
          </i-row>
          <div class="form-footer-actions" v-if="!isFromDetail&&type!=='modal'">
            <i-button type="primary" @click="saveBasicInfo"><i class="iconfont icon-tijiao"></i> 保存草稿</i-button>
            <i-button type="success" @click="submitBasicInfo"><i class="iconfont icon-tijiao"></i> 保存</i-button>
          </div>
        </i-form>
      </i-col>
    </i-row>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>
<script>
import MxinData from './mixin-data';
import MxinMethods from './mixin-methods';
import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
import TableEmployerList from '@/components/table-employer-list';
import TableCompanyCustomerList from '@/components/table-company-customer-list';
import BsModal from '@/components/bs-modal';
import Tools from '@/utils/Tools';
export default {
  name: 'formCustomerBsicInfo',
  mixins: [MxinData, MxinMethods],
  data() {
    return {
      submitLoading: false,
      isFromDetail: false,
      initFormLoading: false,
      showSelectCompany: false,
      showSelectEmployer: false,
      // 地址下拉
      shengDropList: [],
      censusDistrictDropList: [],
      censusCityDropList: [],
      nowDistrictDropList: [],
      nowCityDropList: [],
      companyDistictDropList: [],
      companyCityDropList: []
    };
  },
  props: {
    type: {
      default: 'page',
      required: false,
      type: String
    }
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    age() {
      let birthday = this.$data.formData.mbMemberDTO.birthday;
      return Tools.getAgeFromBirthday(birthday);
    }
  },
  components: {
    'idcard-placeholder': IDCardPlaceholder,
    TableEmployerList,
    TableCompanyCustomerList,
    BsModal
  },
  methods: {
    selectEmployer(row, index) {
      alert(index);
    },
    selectCompanyCustomer(row, index) {
      alert(index);
    },
    async initPageData() {
      this.$data.initFormLoading = true;
      let resp = await this.$http.post('/member/find', {
        memberNo: this.id
      });
      this.$data.initFormLoading = false;
      this.$data.formData = resp.body;
      this.$emit('on-submit-success', resp.body);
    },
    getAddressDropList(code) {
      let _code = code || '';
      let data = {
        regionCode: _code
      };
      return this.$http.post('/common/region/list', data);
    }
  },
  async mounted() {
    let pageFrom = this.$route.query.from;
    this.$data.isFromDetail = (pageFrom === 'detail');
    let resp = await this.getAddressDropList();
    this.$data.shengDropList = resp.body;
    // 如果有id，初始化页面数据
    if (this.id) {
      this.initPageData();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
