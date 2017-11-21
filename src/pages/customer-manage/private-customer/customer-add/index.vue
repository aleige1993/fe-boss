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
                      <i-input :readonly="isFromDetail" placeholder="姓名" v-model="formData.name"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="手机号">
                      <i-input :readonly="isFromDetail" placeholder="手机号"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="证件类型">
                      <i-select :disabled="isFromDetail">
                        <i-option :value="1">身份证</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证号">
                      <i-input :readonly="isFromDetail"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证有效期">
                      <i-date-picker :readonly="isFromDetail" type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="性别">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="beijing">男</i-option>
                        <i-option value="shanghai">女</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="出生日期">
                      <i-date-picker :readonly="isFromDetail" style="width: 100%" type="date" placeholder="Select date"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="年龄">
                      <i-input :readonly="true" placeholder="根据出生日期计算"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="婚姻状况">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="beijing">男</i-option>
                        <i-option value="shanghai">女</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="教育程度">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="beijing">男</i-option>
                        <i-option value="shanghai">女</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="职业类型">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="beijing">政府机关</i-option>
                        <i-option value="shanghai">自由职业者</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="年收入">
                      <i-input :readonly="isFromDetail" v-model="formData.select">
                        <span slot="append">元</span>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="参加工作年限">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="beijing">1</i-option>
                        <i-option value="shanghai">2</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="是否本地人">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="Y">是</i-option>
                        <i-option value="N">否</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="本地有否房产">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="Y">是</i-option>
                        <i-option value="N">否</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="本地居住年限">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="beijing">1</i-option>
                        <i-option value="shanghai">2</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="居住性质">
                      <i-select :disabled="isFromDetail" v-model="formData.select">
                        <i-option value="Y">是</i-option>
                        <i-option value="N">否</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="18">
                    <i-form-item v-if="!isFromDetail" class="required" label="户籍地址">
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-input placeholder="街道信息" style="width: 320px;"></i-input>
                    </i-form-item>
                    <i-form-item v-else label="户籍地址">
                      重庆市云阳县
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="18">
                    <i-form-item v-if="!isFromDetail" class="required" label="居住地址">
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-input placeholder="街道信息" style="width: 320px;"></i-input>
                    </i-form-item>
                    <i-form-item v-else label="居住地址">
                      重庆市云阳县
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证正面">
                      <i-upload action="//jsonplaceholder.typicode.com/posts/">
                        <idcard-placeholder type="face"></idcard-placeholder>
                      </i-upload>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="身份证反面">
                      <i-upload action="//jsonplaceholder.typicode.com/posts/">
                        <idcard-placeholder type="back"></idcard-placeholder>
                      </i-upload>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="手持身份证">
                      <i-upload action="//jsonplaceholder.typicode.com/posts/">
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
                      <i-input :readonly="true">
                        <i-button type="primary" slot="append">选择客户 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="单位性质">
                      <i-input :readonly="true" placeholder="自动带入"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="行业类别">
                      <i-input :readonly="true" placeholder="自动带入"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="职务">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="入职时间">
                      <i-date-picker style="width: 100%" placeholder="入职时间"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="所属部门">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="月收入">
                      <i-input>
                        <span slot="append">元</span>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="单位电话">
                      <i-input placeholder="自动带入"></i-input>
                    </i-form-item>
                  </i-col>

                </i-row>
                <i-row>
                  <i-col span="18">
                    <i-form-item class="required" label="公司地址">
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
                      </i-select>
                      <i-select style="width: 150px">
                        <i-option>重庆市</i-option>
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
                      <i-select>
                        <i-option>万州分公司</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="开始合作时间">
                      <i-date-picker placeholder="选择时间" style="width: 100%"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="客户经理">
                      <i-input placeholder="选择时间">
                        <i-button slot="append">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <div class="form-footer-actions">
                <i-button type="primary"><i class="iconfont icon-tijiao"></i> 保存草稿</i-button>
                <i-button type="success"><i class="iconfont icon-tijiao"></i> 提交</i-button>
                <i-button @click="resetAddCustomerForm">重置</i-button>
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

  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import TabSpouseInfo from './spouse-info/index.vue';
  import TabContactInfo from './contact-info/index.vue';
  import TabBankAccountInfo from './bank-account-info/index.vue';
  import TabCreditInfo from './credit-info/index.vue';
  import TabOweCompanyInfo from './owe-company-info/index.vue';
  import TabNegativeSurveyInfo from './negative-survey/index.vue';
  import TabBusinessContactInfo from './business-contact/index.vue';
  import TabLawsuitInfo from './lawsuit-info/index.vue';
  import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
  export default {
    name: 'modifyPrivateCustomer',
    mixins: [MixinData],
    data() {
      return {
        customerId: null,
        isFromDetail: false,
        formData: {
          name: '',
          select: '',
          user: {
            gender: '',
            isWed: 1,
            userContacts: [{
              name: '张三',
              relationShip: '兄妹',
              phone: '1584214511'
            }]
          }
        }
      };
    },
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
      'idcard-placeholder': IDCardPlaceholder
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
      }
    },
    mounted() {
      let pageFrom = this.$route.query.from;
      this.$data.isFromDetail = (pageFrom === 'detail');
    }
  };
</script>
<style lang="scss" scoped>
</style>
