<template>
  <div id="personal-basic">
    <i-form ref="formData" :model="formData" label-position="right" :label-width="160" style="padding-bottom: 200px">
      <!--申请信息-->
      <bs-form-block :title="'申请信息'">
        <i-row>
          <!--产品类别-->
          <i-col span="8">
            <i-form-item label="产品类别"
                         prop="select"
                         :rules="{required: true, message: '请选择'}">
              <i-select v-model="formData.select">
                <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--产品名称-->
          <i-col span="8">
            <i-form-item label="产品名称"
                         prop="select"
                         :rules="{required: true, message: '请选择'}">
              <i-select v-model="formData.select">
                <i-option v-for="item in enumSelectData.get('ProductTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--车类-->
          <i-col span="8">
            <i-form-item label="车类"
                         prop="select"
                         :rules="{required: true, message: '请选择'}">
              <i-select v-model="formData.select">
                <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <!--车辆价格-->
          <i-col span="8">
            <i-form-item label="车辆价格" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请金额-->
          <i-col span="8">
            <i-form-item label="申请金额" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--申请期限-->
          <i-col span="8">
            <i-form-item label="申请期限" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="月"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--首付或保证金意向-->
          <i-col span="8">
            <i-form-item label="首付或保证金意向" prop="carMoney">
              <i-input v-model="formData.carMoney" placeholder="">
                <span slot="元"></span>
              </i-input>
            </i-form-item>
          </i-col>
          <!--车辆用途-->
          <i-col span="8">
            <i-form-item label="车辆用途" prop="select">
              <i-select v-model="formData.select">
                <i-option value="beijing">自用</i-option>
                <i-option value="shanghai">商用</i-option>
              </i-select>
            </i-form-item>
          </i-col>
          <i-col span="8">
            <i-form-item label="申请时间" prop="date">
              <i-date-picker format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
            </i-form-item>
          </i-col>

        </i-row>
      </bs-form-block>
      <!--客户信息-->
      <bs-form-block :title="'客户信息'">
        <i-row>
          <i-col span="8">
            <!--姓名-->
            <i-form-item
              label="姓名"
              prop="name">
              <input type="hidden" v-model="formData.name"/>
              <i-input v-model="formData.name" :disabled="true" placeholder="选择姓名">
                <i-button @click="showSelectCustomer=!showSelectCustomer" slot="append" style="height: 30px;">选择姓名 <Icon type="ios-more"></Icon></i-button>
              </i-input>
            </i-form-item>
          </i-col>
        </i-row>
        <i-row>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">证件号码</div>
            <div class="customer-content">
              <span v-text="formCustomer.idName"></span><span v-text="formCustomer.idCode"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">证件有效期至</div>
            <div class="customer-content">
              <span v-text="formCustomer.idDateEnd"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">注册手机号</div>
            <div class="customer-content">
              <span v-text="formCustomer.registeredMpbile"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">社保</div>
            <div class="customer-content">
              <span v-text="formCustomer.isSocialSecurity"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">公积金</div>
            <div class="customer-content">
              <span v-text="formCustomer.isAccumulationFund"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">信用记录</div>
            <div class="customer-content">
              <span v-text="formCustomer.creditRecord"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">性别</div>
            <div class="customer-content">
              <span v-text="formCustomer.sex"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">出生日期</div>
            <div class="customer-content">
              <span v-text="formCustomer.birthday"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">年龄</div>
            <div class="customer-content">
              <span v-text="formCustomer.age"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">婚姻状况</div>
            <div class="customer-content">
              <span v-text="formCustomer.maritalStatuse"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">教育程度</div>
            <div class="customer-content">
              <span v-text="formCustomer.educate"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">职业类型</div>
            <div class="customer-content">
              <span v-text="formCustomer.careerType"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">工资收入</div>
            <div class="customer-content">
              <span v-text="formCustomer.income"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">参加工作年限</div>
            <div class="customer-content">
              <span v-text="formCustomer.workLife"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">是否本地人</div>
            <div class="customer-content">
              <span v-text="formCustomer.isNative"></span>
            </div>
          </i-col>
        </i-row>
      </bs-form-block>
    </i-form>
    <!-- 选择企业的弹窗 -->
    <!--<bs-modal title="选择企业" :width="1200" v-model="showSelectCompany">
      <table-company-customer-list type="modal" @on-row-dbclick="selectCompanyCustomer"></table-company-customer-list>
    </bs-modal>-->
    <!-- 选择客户信息的弹窗 -->
    <bs-modal title="选择客户信息" :width="1200" v-model="showSelectCustomer">
      <table-customer-list v-if="showSelectCustomer" type="modal" @on-row-dbclick="selectshowSelectCustomer"></table-customer-list>
    </bs-modal>
  </div>
</template>

<script>
  import TableCustomerList from '@/components/table-customer-list'; // 选择客户信息
  import BsModal from '@/components/bs-modal';
  export default {
    name: 'personalBasic',
    data() {
      return {
        tabIndex: 0,
        initFormLoading: false,
        isFromDetail: false,
        showSelectCustomer: false,
        formData: {
          name: '',
          memberNo: '',
          select: '',
          carMoney: ''
        },
        formCustomer: {
          idName: '身份证', // 是证件类型
          idCode: '500381123456781234', // 证件号码
          idDateEnd: '2022年10月1日',  // 证件有效期至
          registeredMpbile: '18612345678', // 注册手机号
          isAccumulationFund: '有公积金', // 公积金
          creditRecord: '信用良好', // 信用记录
          sex: '性别', // 性别
          birthday: '19910101', // 出身日期
          age: '26', // 年龄
          maritalStatuse: '已婚', // 婚姻状况
          educate: '博士及以上', // 教育程度
          careerType: '个体户或企业主', // 职业类型
          income: '12000', // 工资收入
          workLife: '5年', // 参加工作年限
          isNative: '是', // 是否本地人
          isSocialSecurity: '有社保' // 社保
        }
      };
    },
    watch: {
      'formData.user.isWed': (val) => {
        // alert(val);
      }
    },
    components: {
      TableCustomerList,
      'bs-modal': BsModal
    },
    mounted() {
    },
    methods: {
      // 选择客户信息
      selectshowSelectCustomer(row, index) {
        /*{
          certNo: 7482753808099513 // 证件号码
          certType: "1" // 身份证
          memberNo: 383609955686547400 // 客户编号
          mobile: 6697802081543511 // 手机号码
          name: "Daniel Smith" // 姓名
          sex: "2" // 性别
          status: "1" // 状态
        }*/
        this.$data.formData.memberNo = row.memberNo;
        this.$data.formData.name = row.name;
        this.$data.showSelectCustomer = false;
      }
    }
  };
</script>
<style lang="scss" scoped>
  #personal-basic {
    & .customer-item {
      margin-bottom: 14px;
      & .customer-label {
        width: 160px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #999;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
      }
      & .customer-content {
        position: relative;
        line-height: 32px;
        font-size: 12px;
        margin-left: 160px;
        padding: 2px 0;
        & span {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
</style>
