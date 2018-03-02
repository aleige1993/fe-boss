<template>
  <div id="distributor-list">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商列表</i-breadcrumb-item>
    </i-breadcrumb>
    <!--渠道商列表公共组件-->
    <table-distributor-list :type="'page'" ref="tableDistributorList" @on-radio-fun="radioFun" @on-cancel-clickRow="isClickRow = false" @on-set-row="setRow" @on-row-dbclick="selectRow">
      <div class="form-top-actions" slot="topAction">
        <i-button type="info" @click="openAddDistributorModal"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
        <i-button type="ghost" @click="openCarModal"><i class="iconfont icon-shenhe"></i> 车型管理</i-button>
        <i-button type="ghost" @click="openQuotaModal"><i class="iconfont icon-shenhe"></i> 额度管理</i-button>
        <i-button type="ghost" @click="openOperatorModal"><i class="iconfont icon-shenhe"></i> 操作员管理</i-button>
        <i-button v-show="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
      </div>
    </table-distributor-list>
    <!--新增修改模态框-->
    <bs-modal :title="isAdd ? '新增' : '修改'" v-model="showAddModal" :width="1000" @on-close="cancelFun">
      <i-form v-if="showAddModal" ref="formAdd" :model="formAdd" label-position="right" :label-width="120" style="padding: 30px 0;">
        <i-row :gutter="16">
          <i-col span="12">
            <i-form-item
              label="渠道商类型"
              :rules="{required: true, message: '请选择渠道商类型', trigger: 'change'}"
              prop="channelType">
              <i-select v-model="formAdd.channelType">
                <i-option v-for="item in enumSelectData.get('MerchantChannelTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="12" v-if="formAdd.channelType==='1'">
            <i-form-item
              label="经销商类型"
              prop="merchantType"
              :rules="{required: true, message: '请选择经销商类型', trigger: 'change'}">
              <i-select v-model="formAdd.merchantType" :disabled="formAdd.channelType==='2'||formAdd.channelType==='3'">
                <i-option v-for="item in enumSelectData.get('MerchantTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="16">
          <i-col span="24" v-if="formAdd.channelType==='1'||formAdd.channelType==='3'">
            <i-row>
              <i-col span="12">
                <i-form-item
                  label="客户类型"
                  prop="customerType">
                  <span v-text="enumCode2Name('2', 'CustTypeEnum')"></span>
                </i-form-item>
              </i-col>

              <i-col span="12">
                <i-form-item
                  label="客户名称"
                  :rules="{required: true, message: '客户名称不能为空', trigger: 'change'}"
                  prop="corpName">
                  <input type="hidden" v-model="formAdd.corpName"/>
                  <i-input v-model="formAdd.corpName" :readonly="true" placeholder="选择公司客户">
                    <i-button @click="showSelectCompanyOwner=!showSelectCompanyOwner" slot="append">选择公司客户 <Icon type="ios-more"></Icon></i-button>
                  </i-input>
                  <p class="formAddClass" v-if="formAdd.creditCode===''">“社会征信统一代码”不存在，不能提交！</p>
                  <p class="formAddClass" v-if="formAdd.legalPerson===''">“法定代表人”不存在，不能提交！</p>
                  <p class="formAddClass" v-if="formAdd.telephone===''">“公司电话”不存在，不能提交！</p>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
        </i-row>
        <i-row :gutter="16">
          <i-col v-if="formAdd.channelType==='2'">
            <i-row>
              <i-col span="12">
                <i-form-item
                  label="客户类型"
                  prop="customerType"
                  :rules="{required: true, message: '请选择客户类型', trigger: 'change'}">
                  <i-select v-model="formAdd.customerType">
                    <i-option v-for="item in enumSelectData.get('CustTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                  </i-select>
                </i-form-item>
              </i-col>
              <i-col span="12" v-if="formAdd.customerType==='1'||formAdd.customerType==='2'">
                <i-form-item
                  label="客户名称"
                  :rules="{required: true, message: '客户名称不能为空', trigger: 'change'}"
                  prop="corpName">
                  <input type="hidden" v-model="formAdd.corpName"/>
                  <div v-show="formAdd.customerType==='1'">
                    <i-input v-model="formAdd.corpName" :readonly="true" placeholder="选择个人客户">
                      <i-button @click="showSelectObligee=!showSelectObligee" slot="append">选择个人客户 <Icon type="ios-more"></Icon></i-button>
                    </i-input>
                  </div>
                  <div v-show="formAdd.customerType==='2'">
                    <i-input v-model="formAdd.corpName" :readonly="true" placeholder="选择公司客户">
                      <i-button @click="showSelectCompanyOwner=!showSelectCompanyOwner" slot="append">选择公司客户 <Icon type="ios-more"></Icon></i-button>
                    </i-input>
                    <p class="formAddClass" v-if="formAdd.creditCode===''">“社会征信统一代码”不存在，不能提交！</p>
                    <p class="formAddClass" v-if="formAdd.legalPerson===''">“法定代表人”不存在，不能提交！</p>
                    <p class="formAddClass" v-if="formAdd.telephone===''">“公司电话”不存在，不能提交！</p>
                  </div>
                </i-form-item>
              </i-col>
            </i-row>
          </i-col>
        </i-row>
        <i-row :gutter="16">
          <i-col span="12">
            <i-form-item
              label="上级渠道商"
              :rules="{required: true, message: '请选择上级渠道商', trigger: 'change'}"
              prop="pcorpName">
              <i-input v-model="formAdd.pcorpName" :readonly="true" placeholder="选择上级渠道商">
                <i-button @click="showSelectMerchant=!showSelectMerchant" slot="append">选择上级渠道商 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              label="是否允许补件"
              :rules="{required: true, message: '请选择是否允许补件', trigger: 'change'}"
              prop="isEnablePlatform">
              <i-select v-model="formAdd.isEnablePlatform">
                <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="16">
          <i-col span="12">
            <i-form-item
              label="渠道商简称"
              prop="merchantAbbr"
              :rules="{required: true, message: '请选择渠道商简称', trigger: 'blur'}">
              <i-input v-model="formAdd.merchantAbbr" placeholder=""></i-input>
            </i-form-item>
          </i-col>
          <i-col span="12">
            <i-form-item
              label="是否在app中显示"
              :rules="{required: true, message: '请选择是否在app中显示', trigger: 'change'}"
              prop="isDisplayInApp">
              <i-select v-model="formAdd.isDisplayInApp">
                <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row :gutter="16">
          <i-col span="24">
            <bs-form-block :title="'渠道商服务地区'">
              <div class="form-top-actions">
                <i-button @click="areaAddModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
              </div>
              <i-table border ref="areaTable" :columns="areaColumns" :data="formAdd.merchantAreaInfo"></i-table>
            </bs-form-block>
          </i-col>
          <br>
          <br>
          <i-col span="24">
            <i-form-item class="text-right">
              <i-button type="primary"
                        @click="submitFun"
                        :disabled="
                        (formAdd.channelType==='1'||formAdd.channelType==='3')&&
                        (formAdd.creditCode==='')||(formAdd.legalPerson==='')||(formAdd.telephone==='')"
                        :loading="buttonLoading">
                <span v-if="!buttonLoading">提交</span>
                <span v-else>loading...</span>
              </i-button>
              <i-button type="ghost" @click="cancelFun" style="margin-left: 8px">取消</i-button>
            </i-form-item>
          </i-col>
        </i-row>
      </i-form>
    </bs-modal>

    <bs-modal :title="'新增'" v-model="showAreaAddModal" :width="800">
      <i-form v-if="showAreaAddModal" ref="areaForm" :model="areaForm" label-position="right" :label-width="120" style="padding-bottom:0;">
        <i-form-item
          label="渠道商服务地区"
          class="required"
          prop="provinceCode">
          <input type="hidden" v-model="areaForm.provinceCode">
          <bs-dispicker :currProvince="areaForm.provinceCode"
                        :currDistrict="areaForm.districtCode"
                        :currCity="areaForm.cityCode"
                        @on-change="selectNowDistance">
          </bs-dispicker>
          <!--<bs-dispicker-two :filterCQ="true"
                            :currProvinceCode="areaForm.provinceCode"
                            :currDistrictCode="areaForm.districtCode"
                            @on-change="selectNowDistance"></bs-dispicker-two>-->
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="areaFormAddSuBmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="areaFormCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <!--选择客户个人的模态框-->
    <bs-modal :title="'选择个人'" v-model="showSelectObligee" :width="1200">
      <table-customer-list v-if="showSelectObligee" ref="ObligeeTable" type="modal" @on-row-dbclick="selectObligeeRow"></table-customer-list>
    </bs-modal>
    <!--选择客户公司的模态框-->
    <bs-modal :title="'选择公司'" v-model="showSelectCompanyOwner" :width="1200">
      <table-company-customer-list v-if="showSelectCompanyOwner" ref="companyTable" type="modal" @on-row-dbclick="selectCompanyRow"></table-company-customer-list>
    </bs-modal>
    <!-- 选择上级渠道商 -->
    <bs-modal :width="880" v-model="showSelectMerchant" title="选择上级渠道商">
      <tree-merchant v-if="showSelectMerchant" @on-row-dblclick="selectMerchant" :columns="treeMerchantColumns" :data="treeMerchantData"></tree-merchant>
    </bs-modal>
  </div>
</template>
<script>
  import TreeMerchant from '@/components/bs-tree-grid'; // 选择上级渠道商
  import BsDispicker from '@/components/bs-dispicker';
  import TableCompanyCustomerList from '@/components/table-company-customer-list'; // 选择客户公司
  import TableCustomerList from '@/components/table-customer-list'; // 选择客户个人
  import tableDistributorList from '@/components/table-distributor-list';
  import BsModal from '@/components/bs-modal';
  import BsDispickerTwo from '@/components/bs-dispicker-two';
  export default {
    name: 'distributorList',
    components: {
      BsModal,
      TreeMerchant,
      BsDispicker,
      BsDispickerTwo,
      tableDistributorList,
      TableCustomerList,
      TableCompanyCustomerList
    },
    data() {
      return {
        showAddModal: false,
        buttonLoading: false,
        showSelectMerchant: false,
        showAreaAddModal: false,
        areaForm: {
          'provinceName': '',
          'provinceCode': '',
          'districtName': '',
          'districtCode': '',
          'cityCode': '',
          'cityName': ''
        },
        treeMerchantData: [],
        treeMerchantColumns: [
          {
            headerText: '',
            headerAlign: 'center',
            dataAlign: 'center',
            width: '20'
          },
          {
            headerText: '上级渠道商（双击选择）',
            dataField: 'corpName',
            headerAlign: 'center',
            handler: ''
          }
        ],
        formSearch: {
          corpName: ''
        },
        showSelectObligee: false,
        showSelectCompanyOwner: false,
        formAdd: {
          'merchantNo': '',
          'isEnablePlatform': '',
          'custMgrNo': '',
          'custMgrName': '',
          'pid': '',
          'channelType': '',
          'customerType': '',
          'pcorpName': '',
          'corpNo': '',
          'corpName': '',
          'suCreditCode': '',
          'legalPerson': '',
          'regDate': '',
          'provinceName': '',
          'provinceCode': '',
          'cityName': '',
          'cityCode': '',
          'districtName': '',
          'districtCode': '',
          'merchantAbbr': '',
          'applyNo': '',
          'regCapital': '',
          'telephone': '',
          'creditTotalLimit': '',
          'currentUsableLimit': '',
          'singleUsableLimit': '',
          'creditStartDate': '',
          'creditEndDate': '',
          'creditReleaseType': '',
          'merchantStatus': '',
          'merchantType': '',
          'isDisplayInApp': '',
          'merchantLogo': '',
          'merchantAreaInfo': []
        },
        isAdd: false,
        dataLoading: false,
        clickRow: {},
        isClickRow: false,        // 是否已经选择了某一行
        total: 0,
        currentPage: 1,
        pageSize: 15,
        areaColumns: [
          {
            title: '省/直辖市',
            width: 200,
            key: 'provinceName'
          },
          {
            title: '市',
            key: 'cityName'
          },
          {
            title: '区/县',
            key: 'districtName'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.areaRemove($.extend({}, params.row));
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    watch: {
      'formAdd.customerType'(newVal, oldVal) {
        if ((oldVal !== '') && (typeof oldVal !== 'undefined')) {
          this.$data.formAdd.corpName = '';
          this.$data.formAdd.corpNo = '';
        }
      },
      'formAdd.channelType'(newVal, oldVal) {
        if (newVal === '2') {
          this.$data.formAdd.merchantType = '';
          this.$data.formAdd.corpName = '';
          this.$data.formAdd.corpNo = '';
        }
        if (newVal === '3') {
          this.$data.formAdd.merchantType = '';
        }
      }
    },
    mounted() {
      this.getMerchantPidData();
    },
    methods: {
      // 城市联动
      selectNowDistance(city) {
        this.$data.areaForm.provinceCode = city.provinceCode;
        this.$data.areaForm.provinceName = city.provinceName;
        this.$data.areaForm.districtCode = city.districtCode;
        this.$data.areaForm.districtName = city.districtName;
        this.$data.areaForm.cityCode = city.cityCode;
        this.$data.areaForm.cityName = city.cityName;
      },
      // 新增服务地区
      areaAddModal() {
        this.$data.showAreaAddModal = true;
        this.$data.areaForm = {};
      },
      // 删除服务地区数据的请求
      areaRemove(row) {
        Alertify.confirm('确定要删除吗？', (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            this.$data.formAdd.merchantAreaInfo.splice(row._index, 1);
            loadingMsg();
            this.$Message.success('删除成功');
          }
        });
      },
      areaFormCancel() {
        this.$data.showAreaAddModal = false;
      },
      // 服务地区的添加（到本地）请选择渠道商服务地区
      async areaFormAddSuBmit() {
        if ((this.$data.areaForm.provinceName === '') || (typeof this.$data.areaForm.provinceName === 'undefined')) {
          this.$Message.error('请选择渠道商服务地区！');
          return;
        }
        let isExist = this.$data.formAdd.merchantAreaInfo.some((item, index, filterCityAry) => {
          return (item.provinceName === this.$data.areaForm.provinceName) &&
            (item.districtName === this.$data.areaForm.districtName) &&
            (item.cityName === this.$data.areaForm.cityName);
        });
        if (isExist) {
          this.$Message.error('地区已存在！');
          return;
        }
        this.$data.formAdd.merchantAreaInfo.unshift({
          ...this.$data.areaForm
        });
        this.$data.showAreaAddModal = false;
        this.$Message.success('新增成功');
      },
      // 选择个人客户
      selectObligeeRow(row, index) {
        // console.log(row);
        this.$data.formAdd.corpNo = row.memberNo;
        this.$data.formAdd.corpName = row.name;
        this.$data.showSelectObligee = false;
      },
      // 选择公司客户
      selectCompanyRow(row, index) {
        this.$data.formAdd.corpNo = row.corpNo;
        this.$data.formAdd.corpName = row.corpName;
        this.$data.formAdd.creditCode = row.creditCode;
        this.$data.formAdd.legalPerson = row.legalPerson;
        this.$data.formAdd.telephone = row.telephone;
        this.$data.showSelectCompanyOwner = false;
      },
      // 新增
      async submitSuccess() {
        if (this.$data.formAdd.merchantAreaInfo.length === 0) {
          this.$Notice.error({
            title: '错误提示',
            desc: '请添加渠道商服务地区！',
            duration: 2
          });
          return;
        }
        this.$data.buttonLoading = true;
        if (this.$data.formAdd.channelType === '1' || this.$data.formAdd.channelType === '3') {
          this.$data.formAdd.customerType = '2';
        }
        let resp = await this.$http.post('merchant/saveMerchant', {
          ...this.$data.formAdd
        });
        this.$data.buttonLoading = false;
        this.$data.showAddModal = false;
        if (resp.success) {
          let text = this.$data.isAdd ? '新增成功' : '修改成功';
          this.$Message.success(text);
          this.$refs.tableDistributorList.getPrivateCustomerList();
          // 更新节点树
          this.getMerchantPidData();
        }
      },
      // 修改
      setRow(row) {
        // console.log(row.merchantAreaInfo);
        this.$data.isAdd = false;
        this.$data.showAddModal = true;
        this.$data.formAdd = row;
      },
      // 提交
      submitFun() {
        const formName = 'formAdd';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitSuccess();
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      },
      // 取消
      cancelFun() {
        this.$data.formAdd = {};
        this.$data.showAddModal = false;
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        this.$data.formAdd.logoUrl = res.body.url;
      },
      // 上传失败
      uploadError(err, file, fileList) {
        this.$Notice.error({
          title: '错误提示', desc: err
        });
      },
      // 子组件通知 单选了每一行
      radioFun(currentRow) {
        this.$data.clickRow = currentRow;
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$data.isClickRow = false;
        }
        this.$data.isClickRow = true;
      },
      // 取消选中行的选中状态
      handleClearCurrentRow() {
        this.$refs.tableDistributorList.handleClearCurrentRow();
        this.$data.isClickRow = false;
        this.$data.clickRow = {};
      },
      selectMerchant(id, index, treeData) {
        this.$data.formAdd.pcorpName = treeData.corpName;
        this.$data.formAdd.Pid = treeData.id;
        this.$data.showSelectMerchant = false;
      },
      // 获取上级渠道商树形结构数据
      async getMerchantPidData() {
        let resp = await this.$http.get('/merchant/tree');
        if (resp.success) {
          this.$data.treeMerchantData = resp.body;
        }
      },
      openAddDistributorModal() {
        this.$data.isAdd = true;
        this.$data.showAddModal = true;
      },
      // 判断是否选中的其中一行
      clickRowedFun() {
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$Notice.error({
            title: '错误提示',
            desc: '请先选择渠道商',
            duration: 2
          });
          return false;
        }
        return true;
      },
      // 打开车型管理
      openCarModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/car',
            query: {
              currentPage: this.$data.currentPage,
              from: this.$data.clickRow.from,
              merchantNo: this.$data.clickRow.merchantNo
            }
          });
        }
      },
      // 打开额度管理
      openQuotaModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/quota',
            query: {
              currentPage: this.$data.currentPage,
              merchantStatus: this.$data.clickRow.merchantStatus,
              merchantNo: this.$data.clickRow.merchantNo,
              corpName: this.$data.clickRow.corpName,
              custMgrName: this.$data.clickRow.custMgrName
            }
          });
        }
      },
      // 打开操作员管理
      openOperatorModal() {
        if (this.clickRowedFun()) {
          this.$router.push({
            path: '/index/customer/distributor/admin',
            query: {
              currentPage: this.$data.currentPage,
              merchantNo: this.$data.clickRow.merchantNo
            }
          });
        }
      },
      // 双击时的回调 （此页面用不到此功能）
      selectRow(row, index) {}
    }
  };
</script>
<style lang="scss" scoped="">
  #distributor-list {
    & .formAddClass {
      color: red;
      line-height: 16px;
      font-size:12px;
    }
  }

</style>
