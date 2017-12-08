<template>
  <div id="personal-basic">
    <i-form ref="formData" :model="formData" label-position="right" :label-width="160">
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
          <!--申请时间-->
          <i-col span="8">
            <i-form-item label="申请时间" prop="date">
              <i-date-picker format="yyyy-MM-dd" type="date" placeholder="Select date" style="width: 100%"></i-date-picker>
            </i-form-item>
          </i-col>
          <!--经度-->
          <i-col span="8">
            <i-form-item label="经度" prop="lon">
              <i-input v-model="formData.lon" placeholder="" :readonly="formData.lon === ''">
              </i-input>
            </i-form-item>
          </i-col>
          <!--纬度-->
          <i-col span="8">
            <i-form-item label="纬度" prop="lat">
              <i-input v-model="formData.lat" placeholder="" :readonly="formData.lat === ''">
              </i-input>
            </i-form-item>
          </i-col>
          <!--提交申请地点-->
          <i-col span="8">
            <i-form-item label="提交申请地点" prop="applicationPlace">
              <i-input v-model="formData.applicationPlace" placeholder="" :readonly="formData.applicationPlace === ''">
              </i-input>
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
        <i-row v-show="showBasicList">
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
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">是否有房产</div>
            <div class="customer-content">
              <span v-text="formCustomer.isHouseProperty"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">本地居住年限</div>
            <div class="customer-content">
              <span v-text="formCustomer.localLiveLife"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">住房情况</div>
            <div class="customer-content">
              <span v-text="formCustomer.housingStatus"></span>
            </div>
          </i-col>
          <i-col span="24" class-name="customer-item">
            <div class="customer-label">户籍地址</div>
            <div class="customer-content">
              <span v-text="formCustomer.permanentAddress"></span>
            </div>
          </i-col>
          <i-col span="24" class-name="customer-item">
            <div class="customer-label">居住地址</div>
            <div class="customer-content">
              <span v-text="formCustomer.residentialAddress"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">身份证正面</div>
            <div class="customer-content">
              <img :src="formCustomer.idUpUrl" @click="showImg(formCustomer.idUpUrl)" class="click-img">
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">身份证反面</div>
            <div class="customer-content">
              <img :src="formCustomer.idBackUrl" @click="showImg(formCustomer.idBackUrl)" class="click-img">
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">手持身份证</div>
            <div class="customer-content">
              <img :src="formCustomer.holdIdUrl" @click="showImg(formCustomer.holdIdUrl)" class="click-img">
            </div>
          </i-col>
        </i-row>
      </bs-form-block>
      <!--工作信息-->
      <bs-form-block :title="'工作信息'">
        <i-row v-show="showBasicList">
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">单位名称</div>
            <div class="customer-content">
              <span v-text="formCustomer.unitName"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">单位性质</div>
            <div class="customer-content">
              <span v-text="formCustomer.unitProperties"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">行业类别</div>
            <div class="customer-content">
              <span v-text="formCustomer.industryCategory"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">职务</div>
            <div class="customer-content">
              <span v-text="formCustomer.post"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">入职时间</div>
            <div class="customer-content">
              <span v-text="formCustomer.entryTime"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">所属部门</div>
            <div class="customer-content">
              <span v-text="formCustomer.theDepartment"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">月收入</div>
            <div class="customer-content">
              <span v-text="formCustomer.monthlyIncome"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">单位电话</div>
            <div class="customer-content">
              <span v-text="formCustomer.unitTell"></span>
            </div>
          </i-col>
          <i-col span="24" class-name="customer-item">
            <div class="customer-label">公司地址</div>
            <div class="customer-content">
              <span v-text="formCustomer.companyAddress"></span>
            </div>
          </i-col>
        </i-row>
      </bs-form-block>
      <!--来源信息-->
      <bs-form-block :title="'来源信息'">
        <i-row v-show="showBasicList">
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">业务拓展部门</div>
            <div class="customer-content">
              <span v-text="formCustomer.businessDepartment"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">合作开始日期</div>
            <div class="customer-content">
              <span v-text="formCustomer.cooperationBeginningStart"></span>
            </div>
          </i-col>
          <i-col span="8" class-name="customer-item">
            <div class="customer-label">客户经理</div>
            <div class="customer-content">
              <span v-text="formCustomer.customerManager"></span>
            </div>
          </i-col>
        </i-row>
      </bs-form-block>
    </i-form>
    <!--车辆信息-->
    <bs-form-block :title="'车辆信息'">
      <div class="form-top-actions">
        <i-button @click="openModalCar" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table :loading="carDataLoading" border ref="selection" :columns="carColumns" :data="carData"></i-table>
    </bs-form-block>
    <!--担保信息-->
    <bs-form-block :title="'担保信息'">
      <div class="form-top-actions">
        <i-button @click="openModalAssure" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table :loading="assureDataLoading" border ref="selection" :columns="assureColumns" :data="assureData"></i-table>
    </bs-form-block>
    <!--贷款材料清单-->
    <bs-form-block :title="'贷款材料清单'">
      <div class="form-top-actions">
        <i-button @click="openModalLoan" type="info"><i class="iconfont icon-xinzeng"></i>&nbsp;新增</i-button>
      </div>
      <i-table :loading="loanDataLoading" border ref="selection" :columns="loanColumns" :data="loanData"></i-table>
    </bs-form-block>

    <!--点击图片放大模态框-->
    <i-modal v-model="visibleImg" cancel-text="" ok-text="关闭">
      <img :src="showImgUpUrl" style="width: 100%">
    </i-modal>
    <!-- 选择客户信息的弹窗 -->
    <bs-modal title="选择客户信息" :width="1200" v-model="showSelectCustomer">
      <table-customer-list v-if="showSelectCustomer" type="modal" @on-row-dbclick="selectshowSelectCustomer"></table-customer-list>
    </bs-modal>

    <!--车辆信息的新增修改模态框-->
    <bs-modal :title="isAddCar ? '新增' : '编辑'" v-model="showModalCar">
      <i-form  ref="formCar" :model="formCar" label-position="right" :label-width="100">
        <i-form-item label="权利人类型" prop="obligeeType">
          <i-select v-model="formCar.obligeeType">
            <i-option value="beijing">个人</i-option>
            <i-option value="shanghai">企业</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="权利人编号" prop="obligeeNo">
          <i-input v-model="formCar.obligeeNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="权利人名称" prop="obligeeName">
          <i-input v-model="formCar.obligeeName" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车辆型号" prop="carModel">
          <i-input v-model="formCar.carModel" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车牌号" prop="carNo">
          <i-input v-model="formCar.carNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="发动机号" prop="engineNo">
          <i-input v-model="formCar.engineNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车架号" prop="carFrameNo">
          <i-input v-model="formCar.carFrameNo" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item label="车辆价值" prop="carMoney">
          <i-input v-model="formCar.carMoney" placeholder="">
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="carSuBmit" :loading="carbuttonLoading">
            <span v-if="!carbuttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
  </div>
</template>

<script>
  import TableCustomerList from '@/components/table-customer-list'; // 选择客户信息
  import BsModal from '@/components/bs-modal';
  import carMixinData from './car-mixin-data';
  import carMixinMethods from './car-mixin-methods';
  import assureMixinData from './assure-mixin-data';
  import assureMixinMethods from './assure-mixin-methods';
  import loanMixinData from './loan-mixin-data';
  import loanMixinMethods from './loan-mixin-methods';
  export default {
    name: 'personalBasic',
    mixins: [carMixinData, carMixinMethods, assureMixinData, assureMixinMethods, loanMixinData, loanMixinMethods],
    components: {
      TableCustomerList,
      'bs-modal': BsModal
    },
    data() {
      return {
        // 车辆
        isAddCar: true,
        showModalCar: false,
        carDataLoading: false,
        carbuttonLoading: false,
        formCar: {
          obligeeType: '',
          obligeeNo: '',
          obligeeName: '',
          carModel: '',
          carNo: '',
          engineNo: '',
          carFrameNo: '',
          carMoney: ''
        },
        // 担保信息
        isAddAssure: true,
        assureDataLoading: false,
        showModalAssure: false,
        // 贷款材料
        isAddLoan: true,
        showModalLoan: false,
        loanDataLoading: false,
        showBasicList: true, // 当选择客户姓名之后就显示以下的相关信息
        isFromDetail: false,
        showSelectCustomer: false,
        visibleImg: false,
        showImgUpUrl: '',
        formData: {
          name: '',
          memberNo: '',
          select: '',
          lon: '',
          lat: '',
          applicationPlace: '',
          carMoney: ''
        },
        formCustomer: {
          idName: '身份证', // 是证件类型
          idCode: '500381123456781234', // 证件号码
          idDateEnd: '2022年10月1日',  // 证件有效期至
          registeredMpbile: '18612345678', // 注册手机号
          isSocialSecurity: '有社保', // 社保
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
          isHouseProperty: '是', // 是否有房产
          localLiveLife: '4年', // 本地居住年限
          housingStatus: '自有全款', // 住房情况
          permanentAddress: '重庆市江津区德感街道', // 户籍地址
          residentialAddress: '重庆市重庆城区九龙坡区石桥铺街道', // 居住地址
          idUpUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512626182662&di=691d800f676d19feea6518cc7648884c&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130530%2FImg377522814.jpg', // 身份证正面
          idBackUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512627570416&di=b9fa08d08ca757afadf82d89ab4f90bd&imgtype=0&src=http%3A%2F%2Fyingkou.yongyindai.com%2FUF%2FUploads%2FProduct%2F20151120092243558.jpg', // 身份证反面
          holdIdUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512627914860&di=9592adcee36361ca4ba88b297bae75bc&imgtype=0&src=http%3A%2F%2Fwww.mbajyz.com%2F_uploads%2Fimage%2F2015-09-23%2F2.jpg', // 手持身份证
          unitName: '海尔云贷', // 单位名称
          unitProperties: '国有企业', // 单位性质
          industryCategory: 'IT/电子商务', // 行业类别
          post: '高层领导', // 职务
          entryTime: '2017-11-01', // 入职时间
          theDepartment: 'IT部', // 所属部门
          monthlyIncome: '12000', // 月收入
          unitTell: '02312345678', // 单位电话
          companyAddress: '重庆市渝中区化龙桥企业天地2号楼8楼', // 公司地址
          businessDepartment: '重庆万州分公司', // 拓展业务部门
          cooperationBeginningStart: '2017-12-04', // 合作开始日期
          customerManager: '李总' // 客户经理
        }
      };
    },
    mounted() {
      this.goLocalStorage();
    },
    methods: {
      // 进页面的时候将数据存进本地存储
      async goLocalStorage() {
        await this.getCarList();
        this.localStorageFun('carData', this.carData);
      },
      // 将数据与本地存储的数据双向绑定
      localStorageFun(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
      },
      // 打开担保信息新增修改模态框
      openModalAssure() {
        this.$data.showModalAssure = true;
      },
      // 打开贷款材料清单新增修改模态框
      openModalLoan() {
        this.$data.showModalLoan = true;
      },
      // 点击放大图片
      showImg(imgURL) {
        this.$data.showImgUpUrl = imgURL;
        this.$data.visibleImg = true;
      },
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
      margin-bottom: 0px;
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
        &>img {
          margin-top: 6px;
          display: inline-block;
          width: 240px;
          height: 160px;
          &.click-img {
            cursor: zoom-in;
          }
        }
      }
    }
  }
</style>
