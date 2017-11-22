<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">客户档案</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer">个人客户管理</i-breadcrumb-item>
      <i-breadcrumb-item>客户添加</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-tabs :animated="false" type="card" @on-click="tabChange">
      <i-tab-pane label="主体信息">
        <i-row>
          <i-col span="24">
            <i-form label-position="right" :model="formData" ref="formAddCustomer" :label-width="120">
              <bs-form-block :title="'基本信息'">
                <i-row>
                  <i-col span="8">
                    <i-form-item :prop="'name'" class="required" label="姓名">
                      <i-input :readonly="isFromDetail" placeholder="姓名" v-model="formData.mbMemberDTO.name"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="手机号">
                      <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.mobile" placeholder="手机号"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="证件类型">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.certType">
                        <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证号">
                      <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.certNo"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证有效期">
                      <i-date-picker format="yyyy-MM-dd" :readonly="isFromDetail"  v-model="formData.mbMemberDTO.certValidDate" type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="性别">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.sex">
                        <i-option v-for="item in enumSelectData.get('SexEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="出生日期">
                      <i-date-picker :readonly="isFromDetail" v-model="formData.mbMemberDTO.birthday" style="width: 100%" type="date" placeholder="Select date"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="年龄">
                      <i-input :readonly="true" v-model="formData.mbMemberDTO.age" placeholder="根据出生日期计算"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="婚姻状况">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.maritalStatus">
                        <i-option v-for="item in enumSelectData.get('MaritalStatusEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="教育程度">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.education">
                        <i-option v-for="item in enumSelectData.get('EducationEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="职业类型">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.workType">
                        <i-option v-for="item in enumSelectData.get('WorkTypeEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="年收入">
                      <i-input :readonly="isFromDetail" v-model="formData.mbMemberDTO.annualRevenue">
                        <span slot="append">元</span>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="参加工作年限">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.workYears">
                        <i-option v-for="item in enumSelectData.get('YearsEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="是否本地人">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isNative">
                        <i-option v-for="item in enumSelectData.get('YesNoEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="本地有否房产">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.isLocalHouse">
                        <i-option v-for="item in enumSelectData.get('YesNoEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="本地居住年限">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.liveYears">
                        <i-option v-for="item in enumSelectData.get('YearsEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="居住性质">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberDTO.liveType">
                        <i-option v-for="item in enumSelectData.get('LiveTypeEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="18">
                    <i-form-item v-if="!isFromDetail" class="required" label="户籍地址">
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
                    <i-form-item v-if="!isFromDetail" class="required" label="居住地址">
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
                    <i-form-item class="required" label="身份证正面">
                      <i-input v-model="formData.mbMemberDTO.certFrontUrl"></i-input>
                      <i-upload @on-success="uploadFaceSuccess" :action="$config.HTTPBASEURL+'/common/upload'">
                        <idcard-placeholder type="face"></idcard-placeholder>
                      </i-upload>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证反面">
                      <i-input v-model="formData.mbMemberDTO.certBackUrl"></i-input>
                      <i-upload @on-success="uploadBackSuccess" action="/common/upload">
                        <idcard-placeholder type="back"></idcard-placeholder>
                      </i-upload>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="手持身份证">
                      <i-input type="text" v-model="formData.mbMemberDTO.certHandUrl"></i-input>
                      <i-upload @on-success="uploadHandSuccess" action="/common/upload">
                        <idcard-placeholder type="hand"></idcard-placeholder>
                      </i-upload>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <!--工作信息-->
              <bs-form-block :title="'工作信息'">
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="单位名称">
                      <i-input :readonly="true" v-model="formData.mbMemberWorkDTO.companyName">
                        <i-button type="primary" @click="showSelectCompany=!showSelectCompany" slot="append">选择公司 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="单位性质">
                      <i-input :readonly="true" v-model="formData.mbMemberWorkDTO.unitType" placeholder="自动带入"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="行业类别">
                      <i-input :readonly="true" v-model="formData.mbMemberWorkDTO.industryType" placeholder="自动带入"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="职务">
                      <i-select :disabled="isFromDetail" v-model="formData.mbMemberWorkDTO.duty">
                        <i-option v-for="item in enumSelectData.get('DutyEnum')" :value="item.itemCode">{{item.itemName}}</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="入职时间">
                      <i-date-picker v-model="formData.mbMemberWorkDTO.joinDate" style="width: 100%" placeholder="入职时间"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="所属部门">
                      <i-input v-model="formData.mbMemberWorkDTO.department"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="月收入">
                      <i-input v-model="formData.mbMemberWorkDTO.monthRevenue">
                        <span slot="append">元</span>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="单位电话">
                      <i-input v-model="formData.mbMemberWorkDTO.companyTel" placeholder=""></i-input>
                    </i-form-item>
                  </i-col>

                </i-row>
                <i-row>
                  <i-col span="18">
                    <i-form-item class="required" label="公司地址">
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
              <bs-form-block :title="'来源信息'">
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="业务拓展部门">
                      <i-input v-model="formData.mbMemberDTO.bizDepartmentName" :readonly="true" placeholder="选择客户经理">
                        <i-button slot="append">选择拓展部门 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="开始合作时间">
                      <i-date-picker v-model="formData.mbMemberDTO.joinStartDate" placement="top-start" placeholder="选择时间" style="width: 100%"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="客户经理">
                      <i-input v-model="formData.mbMemberDTO.custMgrNo" :readonly="true" placeholder="选择客户经理">
                        <i-button @click="showSelectEmployer=!showSelectEmployer" slot="append">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <div class="form-footer-actions">
                <i-button type="primary"><i class="iconfont icon-tijiao"></i> 保存草稿</i-button>
                <i-button type="success"><i class="iconfont icon-tijiao"></i> 保存</i-button>
              </div>
            </i-form>
          </i-col>
        </i-row>
      </i-tab-pane>
      <i-tab-pane label="配偶信息">
        <tab-spouse-info :customerId="customerId" :isFromDetail="isFromDetail"></tab-spouse-info>
      </i-tab-pane>
      <i-tab-pane label="联系人信息">
        <tab-contact-info :isFromDetail="isFromDetail"></tab-contact-info>
      </i-tab-pane>
      <i-tab-pane label="银行账户信息">
        <tab-bank-account-info :isFromDetail="isFromDetail"></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane label="征信信息">
        <tab-credit-info :isFromDetail="isFromDetail"></tab-credit-info>
      </i-tab-pane>
      <i-tab-pane label="旗下公司">
        <tab-owe-company-info :isFromDetail="isFromDetail"></tab-owe-company-info>
      </i-tab-pane>
      <i-tab-pane label="负面调查">
        <tab-negative-survey-info :isFromDetail="isFromDetail"></tab-negative-survey-info>
      </i-tab-pane>
      <i-tab-pane label="大数据信息">
        <tab-business-contact-info :isFromDetail="isFromDetail"></tab-business-contact-info>
      </i-tab-pane>
      <i-tab-pane label="诉讼情况">
        <tab-lawsuit-info :isFromDetail="isFromDetail"></tab-lawsuit-info>
      </i-tab-pane>
    </i-tabs>
    <!-- 选择企业的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择企业" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import MixinMethods from './mixin-methods';
  import TabSpouseInfo from './spouse-info/index.vue';
  import TabContactInfo from './contact-info/index.vue';
  import TabBankAccountInfo from './bank-account-info/index.vue';
  import TabCreditInfo from './credit-info/index.vue';
  import TabOweCompanyInfo from './owe-company-info/index.vue';
  import TabNegativeSurveyInfo from './negative-survey/index.vue';
  import TabBusinessContactInfo from './business-contact/index.vue';
  import TabLawsuitInfo from './lawsuit-info/index.vue';
  import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
  import BsModal from '@/components/bs-modal';
  import TableEmployerList from '@/components/table-employer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  export default {
    name: 'modifyPrivateCustomer',
    mixins: [MixinData, MixinMethods],
    data() {
      return {
        customerId: null,
        isFromDetail: false,
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
    // computed: {
    //   enumSelectData() {
    //     return this.$store.getters.enumSelectData;
    //   }
    // },
    watch: {
      'formData.user.isWed': (val) => {
        // alert(val);
      }
    },
    components: {
      'tab-spouse-info': TabSpouseInfo,
      'tab-contact-info': TabContactInfo,
      TabBankAccountInfo,
      TabCreditInfo,
      TabOweCompanyInfo,
      TabNegativeSurveyInfo,
      TabBusinessContactInfo,
      TabLawsuitInfo,
      'idcard-placeholder': IDCardPlaceholder,
      BsModal,
      TableEmployerList,
      TableCompanyCustomerList
    },
    methods: {
      tabChange(name) {
        // alert(name); // 0,1,2,3
      },
      resetAddCustomerForm() {
        this.$refs['formAddCustomer'].resetFields();
      },
      initPageData() {
        // get data
      },
      getAddressDropList(code) {
        let _code = code || '';
        let data = {
          regionCode: _code
        };
        return this.$http.post('/common/region/list', data);
      },
      selectEmployer(row, index) {
        alert(index);
      },
      selectCompanyCustomer(row, index) {
        alert(index);
      }
    },
    async mounted() {
      let pageFrom = this.$route.query.from;
      this.$data.isFromDetail = (pageFrom === 'detail');

      let resp = await this.getAddressDropList();
      this.$data.shengDropList = resp.body;
    }
  };
</script>
<style lang="scss" scoped>
</style>
