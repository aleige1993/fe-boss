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
            <i-form label-position="right" :model="formData" ref="formAddCustomer" :label-width="140">
              <bs-form-block :title="'基本信息'">
                <i-row>
                  <i-col span="8">
                    <i-form-item :prop="'name'" class="required" label="公司名称">
                      <i-input placeholder="" v-model="formData.name"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="公司性质">
                      <i-select placeholder="手机号">
                        <i-option selected="" value="国有企业">国有企业
                        </i-option><i-option value="国有控股企业">国有控股企业
                        </i-option><i-option value="外资企业">外资企业
                        </i-option><i-option value="合资企业">合资企业
                        </i-option><i-option value="私营企业">私营企业
                        </i-option><i-option value="事业单位">事业单位
                        </i-option><i-option value="国家行政机关">国家行政机关
                        </i-option><i-option value="政府">政府
                        </i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item :prop="'name'" class="required" label="统一社会信用代码">
                      <i-input placeholder="失去焦点自动查重" v-model="formData.name"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="注册资金">
                      <i-input placeholder="输入字符串（如100万）"></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="成立日期">
                      <i-date-picker type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="营业期限">
                      <i-date-picker type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="行业类型">
                      <i-select v-model="formData.select">
                        <i-option value="beijing">IT物联网</i-option>
                        <i-option value="shanghai">成人用品店</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="实际控制人">
                      <i-input  placeholder=""></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="实际控制人联系电话">
                      <i-input  placeholder=""></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="公司电话">
                      <i-input  placeholder=""></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="公司传真">
                      <i-input  placeholder=""></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="公司网址（如有）">
                      <i-input placeholder=""></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="是否合作渠道商">
                      <i-select>
                        <i-option>是</i-option>
                        <i-option>否</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="18">
                    <i-form-item class="required" label="注册地址">
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
                <i-row>
                  <i-col span="18">
                    <i-form-item class="required" label="营业地址">
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
                <i-row>
                  <i-col span="18">
                    <i-form-item class="required" label="公司简介/营业范围">
                      <i-input type="textarea" rows="4"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <!--法定代表人姓名-->
              <bs-form-block :title="'法定代表人信息'">
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="法定代表人姓名">
                      <i-input :readonly="true">
                        <i-button type="primary" slot="append">选择代表人 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="性别">
                      <i-input :readonly="true">男</i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="手机号码">
                      <i-input :readonly="true" placeholder="自动带入"></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="证件类型">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="证件号码">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="持股比例">
                      <i-input>
                        <span slot="append">%</span>
                      </i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <!--主联系人-->
              <bs-form-block :title="'主联系人信息'">
                <i-row>
                  <i-col span="8">
                    <i-form-item class="required" label="联系人人姓名">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="性别">
                      <i-select>
                        <i-option>男</i-option>
                      </i-select>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="联系电话">
                      <i-input placeholder="自动带入"></i-input>
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
                    <i-form-item class="required" label="身份证号">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                  <i-col span="8">
                    <i-form-item class="required" label="邮箱">
                      <i-input></i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <!--来源信息-->
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
                        <i-button slot="append" :readonly="true">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                      </i-input>
                    </i-form-item>
                  </i-col>
                </i-row>
              </bs-form-block>
              <!--附件信息-->
              <bs-form-block :title="'附件信息'">
                <div class="form-top-actions">
                  <i-button type="primary" @click="addAttachModal=!addAttachModal">添加附件</i-button>
                </div>
                <i-table :columns="companyAttachFileColumns" :data="companyAttachFiles"></i-table>
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
      <i-tab-pane label="股东信息">
        <tab-shareholder-info></tab-shareholder-info>
      </i-tab-pane>
      <i-tab-pane label="银行账户信息">
        <tab-bank-account-info></tab-bank-account-info>
      </i-tab-pane>
      <i-tab-pane label="关联企业">
        <tab-relation-company></tab-relation-company>
      </i-tab-pane>
      <i-tab-pane label="大数据信息">
        <tab-business-contact></tab-business-contact>
      </i-tab-pane>
      <i-tab-pane label="诉讼情况">
        <tab-lawsuit-info></tab-lawsuit-info>
      </i-tab-pane>
    </i-tabs>
    <bs-modal v-model="addAttachModal" title="上传附件">
      <i-form :model="formData" :label-width="80">
        <i-form-item label="文件名">
          <i-input></i-input>
        </i-form-item>
        <i-form-item label="文件">
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击选择文件或者拖放文件到这里</p>
            </div>
          </Upload>
        </i-form-item>
        <i-form-item label="">
          <i-button style="width: 80px;" type="primary" size="large">保存</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>
<script>
  import MixinData from './mixin-data';
  import BSModal from '@/components/bs-modal';
  import TabShareholderInfo from './tab-shareholder-info/index.vue';
  import TabBankAccountInfo from './tab-bank-account-info/index.vue';
  import TabRelationCompany from './tab-relation-company/index.vue';
  import TabBusinessContact from './tab-business-contact/index.vue';
  import TabLawsuitInfo from './tab-lawsuit-info/index.vue';
  import IDCardPlaceholder from '@/components/bs-idcard-placeholder';
  export default {
    name: 'modifyCompanyCustomer',
    mixins: [MixinData],
    data() {
      return {
        customerId: null,
        addAttachModal: false,
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
      'bs-modal': BSModal,
      'tab-shareholder-info': TabShareholderInfo,
      'idcard-placeholder': IDCardPlaceholder,
      'tab-bank-account-info': TabBankAccountInfo,
      TabRelationCompany,
      TabBusinessContact,
      TabLawsuitInfo
    },
    methods: {
      tabChange(name) {
        // alert(name); // 0,1,2,3
      },
      resetAddCustomerForm() {
        this.$refs['formAddCustomer'].resetFields();
      }
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
</style>
