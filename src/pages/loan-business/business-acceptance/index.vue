<template>
  <div id="">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/components/i-breadcrumb">贷前管理</i-breadcrumb-item>
      <i-breadcrumb-item>进件登记</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-top-actions"></div>
    <i-row>
      <i-col span="24">
        <i-form label-position="right" :label-width="120">
          <bs-form-block :title="'基本信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="产品类别">
                  <i-select v-model="formData.select"
                            :rules="{required: true, message: '请选择产品类别'}">
                    <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="产品名称"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-select v-model="formData.select">
                    <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="车类"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-select v-model="formData.select">
                    <i-select v-model="formData.select">
                      <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                    </i-select>
                  </i-select>
                </i-form-item>
              </i-col>
              
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="客户性质"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-select v-model="formData.select">
                    <i-option value="beijing">一手车</i-option>
                    <i-option value="shanghai">二手车</i-option>
                    <i-option value="shenzhen">三手车</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="业务拓展部门"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <input type="hidden" v-model="formData.name"/>
                  <i-input v-model="formData.name" :readonly="true" placeholder="选择客户经理">
                    <i-button @click="selectDepartmentModal=!selectDepartmentModal" v-if="!isFromDetail" slot="append">选择拓展部门 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <input type="hidden" v-model="formData.name"/>
                  <i-input v-model="formData.name" :readonly="true" placeholder="选择客户经理">
                    <i-button v-if="!isFromDetail" @click="showSelectEmployer=!showSelectEmployer" slot="append">选择客户经理 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="客户类型"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-select v-model="formData.select">
                    <i-option value="beijing">一手车</i-option>
                    <i-option value="shanghai">二手车</i-option>
                    <i-option value="shenzhen">三手车</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户名称"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <input type="hidden" v-model="formData.name"/>
                  <i-input v-model="formData.name" :readonly="true" placeholder="选择客户经理">
                    <i-button @click="selectDepartmentModal=!selectDepartmentModal" v-if="!isFromDetail" slot="append">选择拓展部门 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="贷款方式"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-select v-model="formData.select">
                    <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="经纪人编号"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-input type="text"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="经纪人姓名"
                             :rules="{required: true, message: '请选择产品类别'}">
                  <i-input type="text"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--车辆信息-->
          <bs-form-block :title="'车辆信息'">
            <i-row>
              <i-col span="8">
                <i-form-item label="渠道商">
                  <i-select v-model="formData.select">
                    <i-option value="beijing">一手车</i-option>
                    <i-option value="shanghai">二手车</i-option>
                    <i-option value="shenzhen">三手车</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理工号">
                  <i-input placeholder="自动带入" :readonly="true"></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="客户经理姓名">
                  <i-input placeholder="自动带入" :readonly="true"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="车辆品牌">
                  <i-select filterable>
                    <i-option value="1">宝马</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="车系">
                  <i-select filterable>
                    <i-option value="1">宝马</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="型号">
                  <i-select filterable>
                    <i-option value="1">宝马</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="车辆颜色">
                  <i-select filterable>
                    <i-option value="1">宝马</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="排量">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="排放标准">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="生产厂商">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="发动机号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="车架号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <!--二手车信息-->
            <bs-form-child-title :title="'二手车信息'"></bs-form-child-title>
            <i-row>
              <i-col span="8">
                <i-form-item label="上牌城市">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="上牌时间">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="行驶里程(KM)">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="转手次数">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="车辆状况">
                  <i-select>
                    <i-option  value="1">良好</i-option>
                    <i-option  value="1">一般般</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="有误事故">
                  <i-select>
                    <i-option value="1">有</i-option>
                    <i-option value="1">无</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="特殊说明">
                  <i-input type="textarea" :rows="4"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <!--车辆保险信息-->
            <bs-form-child-title :title="'车辆保险信息'"></bs-form-child-title>
            <i-row>
              <i-col span="8">
                <i-form-item label="保险单号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="保险到期日">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="保险公司">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
            </i-row>
          </bs-form-block>
          <!--客户信息-->
          <bs-form-block title="客户信息">
            <i-row>
              <i-col span="8">
                <i-form-item label="姓名">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证号">
                  <i-input></i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证有效期">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="性别">
                  <i-radio-group v-model="formData.user.gender">
                    <i-radio label="1" :value="1">男</i-radio>
                    <i-radio label="0">女</i-radio>
                    <i-radio label="保密"></i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="出生日期">
                  <i-date-picker type="date" placeholder="Select date" style="width: 200px"></i-date-picker>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="年龄">
                  <i-input :readonly="true"></i-input>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item  label="婚姻状况">
                  <i-select v-model="formData.user.isWed">
                    <i-option :value="1">已婚</i-option>
                    <i-option :value="2">未婚</i-option>
                    <i-option :value="3">离异</i-option>
                    <i-option :value="4">丧偶</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="教育程度">
                  <i-select>
                    <i-option :value="1">博士及以上</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="职业类型">
                  <i-select>
                    <i-option :value="1">IT</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="年收入">
                  <i-input>
                    <span slot="append">元</span>
                  </i-input>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="参加工作年薪">
                  <i-select>
                    <i-option v-for="item in enumSelectData.get('YearModelEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="是否本地人">
                  <i-radio-group>
                    <i-radio label="1" :value="1">是</i-radio>
                    <i-radio label="0">否</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="8">
                <i-form-item label="本地有否房产">
                  <i-radio-group>
                    <i-radio label="1" :value="1">是</i-radio>
                    <i-radio label="0">否</i-radio>
                  </i-radio-group>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="本地居住年限">
                  <i-select>
                    <i-option>1年</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="居住性质">
                  <i-select>
                    <i-option>购房</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
            </i-row>
            <i-row>
              <i-col span="18">
                <i-form-item label="户籍地址">
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
                <i-form-item label="居住地址">
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
              <i-col span="8">
                <i-form-item label="身份证正面">
                  <i-upload action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="身份证反面">
                  <i-upload action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </i-upload>
                </i-form-item>
              </i-col>
              <i-col span="8">
                <i-form-item label="手持身份证">
                  <i-upload action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>Click or drag files here to upload</p>
                    </div>
                  </i-upload>
                </i-form-item>
              </i-col>
            </i-row>
            <!--配偶信息-->
            <div v-show="formData.user.isWed===1">
              <bs-form-child-title :title="'配偶信息'"></bs-form-child-title>
              <i-row>
                <i-col span="8">
                  <i-form-item label="配偶姓名">
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="证件类型">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="证件号码">
                    <i-input></i-input>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="8">
                  <i-form-item label="教育程度">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="职业类型">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="参与类型">
                    <i-select>
                      <i-option>身份证</i-option>
                    </i-select>
                  </i-form-item>
                </i-col>
              </i-row>
              <i-row>
                <i-col span="18">
                  <i-form-item label="户籍地址">
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
                <i-col span="8">
                  <i-form-item label="身份证正面">
                    <i-upload action="//jsonplaceholder.typicode.com/posts/">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </i-upload>
                  </i-form-item>
                </i-col>
                <i-col span="8">
                  <i-form-item label="身份证反面">
                    <i-upload action="//jsonplaceholder.typicode.com/posts/">
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                      </div>
                    </i-upload>
                  </i-form-item>
                </i-col>
              </i-row>
            </div>
            <!--联系方式-->
            <bs-form-child-title :title="'联系方式'"></bs-form-child-title>
            <i-table style="margin: 0 20px" :columns="contactTableColume"  :data="formData.user.userContacts"></i-table>
            <!--工作单位信息-->
            <bs-form-child-title :title="'工作单位信息'"></bs-form-child-title>
          </bs-form-block>
          <div class="form-footer-actions">
            <i-button type="primary"><i class="iconfont icon-tijiao"></i> 提交</i-button>
            <i-button type="success"><i class="iconfont icon-jujue"></i> 重置</i-button>
            <i-button><i class="iconfont icon-dayin"></i> 打印</i-button>
          </div>
        </i-form>
      </i-col>
    </i-row>
    <!-- 选择企业的弹窗 -->
    <!--<bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>-->
    <!-- 选择客户经理的弹窗 -->
    <bs-modal title="选择客户经理" :width="1200" v-model="showSelectEmployer">
      <table-employer-list @on-row-dbclick="selectEmployer"></table-employer-list>
    </bs-modal>
    <!-- 选择业务拓展部门的弹窗 -->
    <bs-modal :width="880" v-model="selectDepartmentModal" title="选择业务拓展部门">
      <tree-grid v-if="selectDepartmentModal" @on-row-dblclick="selectDep" :columns="depColumns" :data="depData"></tree-grid>
    </bs-modal>
    <i-spin size="large" fix v-if="initFormLoading"></i-spin>
  </div>
</template>

<script>
  import BsModal from '@/components/bs-modal';
  import MxinData from './mixin-data';
  import MxinMethods from './mixin-methods';
  /*import IDCardPlaceholder from '@/components/bs-idcard-placeholder';*/
  import TableEmployerList from '@/components/table-employer-list';
  import TableCompanyCustomerList from '@/components/table-company-customer-list';
  import Tools from '@/utils/Tools';
  import TreeGrid from '@/components/bs-tree-grid';
  import BsDispicker from '@/components/bs-dispicker';
  export default {
    name: '',
    mixins: [MxinData, MxinMethods],
    data() {
      return {
        initFormLoading: false,
        isFromDetail: false
      };
    },
    watch: {
      'formData.user.isWed': (val) => {
        // alert(val);
      }
    },
    components: {
      'bs-modal': BsModal,
      TableEmployerList,
      TableCompanyCustomerList,
      BsDispicker,
      TreeGrid
    },
    mounted() {
      this.getDepList();
    }
  };
</script>
<style lang="scss" scoped>
</style>
