<template>
  <div id="conf-model-lilv">
    <i-form ref="ProductPackageForm" :model="ProductPackageForm" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--个人单笔额度-->
        <i-col span="8">
          <i-form-item
            label="个人单笔额度" prop="personalSingleCarLimit"
            :rules="{required: true, message: '个人单笔额度不能为空', trigger: 'blur'}">
            <i-input placeholder="个人单笔额度" v-model="ProductPackageForm.personalSingleCarLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--个人单户额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '个人单户额度不能为空', trigger: 'blur'}"
            label="个人单户额度" prop="personalSingleDoorLimit">
            <i-input placeholder="个人单户额度" v-model="ProductPackageForm.personalSingleDoorLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单笔额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '企业单笔额度不能为空', trigger: 'blur'}"
            label="企业单笔额度"
            prop="companySingleCarLimit">
            <i-input placeholder="企业单笔额度" v-model="ProductPackageForm.companySingleCarLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单户额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '企业单户额度不能为空', trigger: 'blur'}"
            label="企业单户额度"
            prop="companySingleDoorLimit">
            <i-input placeholder="企业单户额度" v-model="ProductPackageForm.companySingleDoorLimit">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--还款方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '还款方式不能为空', trigger: 'change'}"
            label="还款方式"
            prop="loanMode">
            <i-select v-model="ProductPackageForm.loanMode" placeholder="请选择">
              <!--{
                'groupKey': 'RepaymentTypeEnum',
                'items': [
                  {
                    'itemCode': '1',
                    'itemName': '等额本金'
                  },
                  {
                    'itemCode': '2',
                    'itemName': '等额本息'
                  },
                  {
                    'itemCode': '3',
                    'itemName': '等本等息'
                  },
                  {
                    'itemCode': '4',
                    'itemName': '按期收息，期末收本'
                  }
                ]
              }-->
              <i-option v-for="item in enumSelectData.get('RepaymentTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--还款周期-->
        <i-col span="8">
          <i-form-item
            label="还款周期"
            prop="loanCycleMode">
            <i-row>
              <i-col span="9" style="padding: 0 5px 0 0">
                <i-select v-model="ProductPackageForm.loanCycleMode" placeholder="请选择">
                  <!--
                  {
                    'groupKey': 'RepaymentPeriodEnum',
                    'items': [
                      {
                        'itemCode': '1',
                        'itemName': '按日'
                      },
                      {
                        'itemCode': '2',
                        'itemName': '按月'
                      },
                      {
                        'itemCode': '3',
                        'itemName': '按季'
                      },
                      {
                        'itemCode': '4',
                        'itemName': '按半年'
                      },
                      {
                        'itemCode': '5',
                        'itemName': '按年'
                      },
                      {
                        'itemCode': '6',
                        'itemName': '自定义'
                      }
                    ]
                  }
                  -->
                  <i-option v-for="item in enumSelectData.get('RepaymentPeriodEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
              </i-col>
              <i-col span="15" style="padding: 0">
                <i-input placeholder="还款周期" v-model="ProductPackageForm.loanCycle" :disabled="ProductPackageForm.loanCycleMode!=='6'">
                  <span slot="append">天</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--模型设定-->
        <i-col span="8">
          <i-form-item
            label="模型设定"
            prop="modelSet">
            <i-select v-model="ProductPackageForm.modelSet" placeholder="请选择">
              <!--
              {
                'groupKey': 'ModelTypeEnum',
                'items': [
                  {
                    'itemCode': '1',
                    'itemName': '算头不算尾'
                  },
                  {
                    'itemCode': '2',
                    'itemName': '算头又算尾'
                  },
                  {
                    'itemCode': '3',
                    'itemName': '不算头不算尾'
                  }
                ]
              }
              -->
              <i-option v-for="item in enumSelectData.get('ModelTypeEnum')":key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--月息方式-->
        <i-col span="8">
          <i-form-item
            label="月息方式"
            prop="monthAccrualMode">
            <i-select v-model="ProductPackageForm.monthAccrualMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('InterestTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--年模型-->
        <i-col span="8">
          <i-form-item label="年模型" prop="yearModel">
            <i-select v-model="ProductPackageForm.yearModel" placeholder="请选择">
              <!--{
                'groupKey': 'YearModelEnum',
                'items': [
                  {
                    'itemCode': '1',
                    'itemName': '按360天计算'
                  },
                  {
                    'itemCode': '2',
                    'itemName': '按365天计算'
                  }
                ]
              }-->
              <i-option v-for="item in enumSelectData.get('YearModelEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--还款日规则-->
        <i-col span="8">
          <i-form-item
            label="还款日规则"
            prop="loanDayMode">
            <i-row>
              <i-col span="12"  style="padding: 0 5px 0 0">
                <i-select v-model="ProductPackageForm.loanDayMode" placeholder="请选择">
                  <!--
                  {
                    'groupKey': 'RepaymentRuleEnum',
                    'items': [
                      {
                        'itemCode': '1',
                        'itemName': '对日还款'
                      },
                      {
                        'itemCode': '2',
                        'itemName': '指定日还款'
                      }
                    ]
                  }
                  -->
                  <i-option v-for="item in enumSelectData.get('RepaymentRuleEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
              </i-col>
              <i-col span="12"  style="padding: 0">
                <i-input placeholder="还款日" v-model="ProductPackageForm.loanDay" :disabled="ProductPackageForm.loanDayMode!=='2'">
                  <span slot="append">日</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--逾期计算方式-->
        <i-col span="8">
          <i-form-item
            label="逾期计算方式"
            prop="overdueCountMode">
            <i-select v-model="ProductPackageForm.overdueCountMode" placeholder="请选择">
              <!--
              {
                'groupKey': 'OverdueTypeEnum',
                'items': [
                  {
                    'itemCode': '1',
                    'itemName': '按合同金额收取'
                  },
                  {
                    'itemCode': '2',
                    'itemName': '按应还未还金额收取'
                  }
                ]
              }
              -->
              <i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--逾期利率-->
        <i-col span="8">
          <i-form-item
            label="逾期利率"
            prop="dayOverduePenaltyRatio">
            <i-input placeholder="逾期利率" v-model="ProductPackageForm.dayOverduePenaltyRatio">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="24"></i-col><!--iview莫名其妙给我占了两格，此处暂时这样处理-->
        <!--逾期管理费-->
        <i-col span="8">
          <i-form-item
            label="逾期管理费"
            prop="dayOverdueManageFee">
            <i-input placeholder="逾期管理费" v-model="ProductPackageForm.dayOverdueManageFee">
              <span slot="append">元/天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--逾期宽限天数-->
        <i-col span="8">
          <i-form-item
            label="逾期宽限天数"
            prop="overdueExtendDays">
            <i-input placeholder="逾期宽限天数" v-model="ProductPackageForm.overdueExtendDays">
              <span slot="append">天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--罚息计算方式-->
        <i-col span="8">
          <i-form-item
            label="罚息计算方式"
            prop="penaltyCountMode">
            <i-select v-model="ProductPackageForm.penaltyCountMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--罚息利率-->
        <i-col span="8">
          <i-form-item
            label="罚息利率"
            prop="penaltyDayRatio">
            <i-input placeholder="罚息利率" v-model="ProductPackageForm.penaltyDayRatio">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--是否允许提前还款-->
        <i-col span="8">
          <i-form-item
            label="是否允许提前还款"
            prop="isUpRepay">
            <i-select v-model="ProductPackageForm.isUpRepay" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--提前还款违约金比例-->
        <i-col span="8" v-if="ProductPackageForm.isUpRepay === '1'">
          <i-form-item
            label="提前还款违约金比例"
            prop="protype">
            <i-row>
              <i-col span="13"  style="padding: 0 5px 0 0">
                <i-select v-model="ProductPackageForm.upRepayPenaltyCountMode" placeholder="请选择">
                  <i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
                </i-select>
              </i-col>
              <i-col span="11"  style="padding: 0">
                <i-input placeholder="提前还款违约金比例" v-model="ProductPackageForm.upRepayPenaltyRatio">
                  <span slot="append">%</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--提前还款利息-->
        <i-col span="16" class-name="col-inline">
          <i-form-item
            :rules="{required: true, message: '提前还款利息天数不能为空', trigger: 'blur'}"
            label="提前还款利息"
            prop="upRepayCountDays">
            <span>不足</span>
            <i-input placeholder="" v-model="ProductPackageForm.upRepayCountDays" style="width: 80px"></i-input>
            <span>天，按实际发生天数收，否则整月收！最低收</span>
          </i-form-item>
          <i-form-item
            :rules="{required: true, message: '提前还款利息天数不能为空', trigger: 'blur'}"
            label=""
            style="margin-left: -120px;"
            prop="upRepayMinCountDays">
            <i-input placeholder="" v-model="ProductPackageForm.upRepayMinCountDays" style="width: 80px"></i-input>
            <span>天利息。</span>
          </i-form-item>
        </i-col>
        <!--保证金释放方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '保证金释放方式不能为空', trigger: 'change'}"
            label="保证金释放方式"
            prop="depositReleaseMode">
            <i-select v-model="ProductPackageForm.depositReleaseMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('FreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--授信释放方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '授信释放方式不能为空', trigger: 'change'}"
            label="授信释放方式"
            prop="creditLimitReleaseMode">
            <i-select v-model="ProductPackageForm.creditLimitReleaseMode" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('CreditFreedTypeEnum')" :key="item.itemCode" :value="item.itemCode"></i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--是否海乐行垫付-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '是否海乐行垫付不能为空', trigger: 'change'}"
            label="是否海乐行垫付"
            prop="isAdvance">
            <i-select v-model="ProductPackageForm.isAdvance" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <div class="form-top-actions">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
      <i-table border ref="lilvTable" :columns="columns1" :data="data1" :loading="dataLoading"></i-table>
      <br>
      <br>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formSubmit" :loading="btnLoading">
          <span v-if="!btnLoading">提交</span>
          <span v-else>loading...</span>
        </i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
      </i-form-item>
    </i-form>
    <pt-modal :title="isAdd ? '新增' : '修改'" v-model="showAdd" :width="520">
      <i-form ref="formInModel" :model="formInModel" label-position="left" :label-width="100">
        <i-form-item label="车类" prop="bizType">
          <i-select v-model="formInModel.bizType" placeholder="请选择">
            <i-option v-for="item in enumSelectData.get('BizTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="期限" prop="loanPeriods">
          <i-input placeholder="期限" v-model="formInModel.loanPeriods">
            <span slot="append">月</span>
          </i-input>
        </i-form-item>
        <i-form-item label="名义利率" prop="loanNominalRate">
          <i-input placeholder="名义利率" v-model="formInModel.loanNominalRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item label="实际利率" prop="loanRealRate">
          <i-input placeholder="实际利率" v-model="formInModel.loanRealRate">
            <span slot="append">%/年</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formInSubmit" :loading="buttonLoading">
            <span v-if="!buttonLoading">提交</span>
            <span v-else>loading...</span>
          </i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formInCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
    <pt-modal :title="'资方利率'" v-model="zfLilvModel" :width="1200">
      <zf-lilv-Model v-if="zfLilvModel" :zf-msg="zfClickRow"></zf-lilv-Model>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import zfLilvModel from './zf-lilv-Model';
  import MixinData from './mixin-data';
  export default {
    name: 'conf-model-lilv',
    mixins: [MixinData],
    components: {
      'pt-modal': PTModal,
      'zf-lilv-Model': zfLilvModel
    },
    props: {
      childMsg: Object
    },
    data() {
      return {
        isAdd: true,
        dataLoading: false, // 表格的loading
        btnLoading: false, // 外部提交按钮的loading
        buttonLoading: false, // 新增提交按钮的loading
        showAdd: false, // 增删的模态框
        zfLilvModel: false, // 增删的模态框
        zfClickRow: {}, // 点击模态框里tabel的一行时
        ProductPackageForm: { // 当前的模态框的数据表单
          packageNo: '', // 套餐编号
          personalSingleCarLimit: '', // 个人单笔额度
          personalSingleDoorLimit: '',  // 个人单户额度
          companySingleCarLimit: '',  // 企业单笔额度
          companySingleDoorLimit: '', // 企业单户额度
          loanMode: '', // 还款方式
          loanCycleMode: '',  // 还款周期
          loanCycle: '',  // 还款周期天数
          modelSet: '', // 模型设定
          monthAccrualMode: '', // 月息方式
          yearModel: '',  // 年模型
          loanDayMode: '',  // 还款日规则
          loanDay: '',  // 还款日
          overdueCountMode: '', // 逾期计算方式
          dayOverduePenaltyRatio: '', // 逾期利率
          dayOverdueManageFee: '',  // 逾期管理费
          overdueExtendDays: '',  // 逾期宽限天数
          penaltyCountMode: '', // 罚息计算方式
          penaltyDayRatio: '',  // 罚息利率
          isUpRepay: '',  // 是否允许提前还款
          upRepayPenaltyCountMode: '',  // 提前还款违约金计算方式
          upRepayPenaltyRatio: '',  // 提前还款违约金比例
          upRepayCountDays: '', // 提前还款利息不足天数
          upRepayMinCountDays: '',  // 提前还款利息最低天数
          depositReleaseMode: '', // 保证金释放方式
          creditLimitReleaseMode: '', // 授信释放方式
          isAdvance: '' // 是否海乐行垫付
        },
        formInModel: {  // 增删的模态框的数据表单
          bizType: '',  // 车类
          loanPeriods: '',  // 贷款期限
          loanNominalRate: '',  // 贷款名义利率
          loanRealRate: ''  // 贷款实际利率
        }

      };
    },
    mounted() {
      this.getFormList();  // 获取表单数据
      this.getPrivateCustomerList();  // 获取模态框列表数据
    },
    methods: {
      // 获取表单数据
      async getFormList() {
        let productNo = this.childMsg.productNo;
        let resp = await this.$http.get('/pms/productPackage/list', {
          productNo: productNo
        });
        if (resp.body !== 0) {
          this.$data.ProductPackageForm = resp.body[0];
        } else {
        }
      },
      // 获取模态框列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let productNo = this.childMsg.productNo;
        let resp = await this.$http.get('/pms/productRate/list', {
          productNo: productNo
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList !== 0) {
          let formData = resp.body.resultList;
          this.$data.data1 = formData;
        } else {
          this.$Notice.warning({
            title: '列表没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      // 新增的保存请求方法
      async addSuBmit() {
        this.$data.buttonLoading = true;
        let productNo = this.childMsg.productNo;
        let resAdd = await this.$http.post('/pms/productRate/save', {
          productNo: productNo, // 产品编号
          packageNo: this.$data.ProductPackageForm.packageNo, // 套餐编号
          bizType: this.formInModel.bizType, // 车类
          loanPeriods: this.formInModel.loanPeriods, // 贷款期限
          loanNominalRate: this.formInModel.loanNominalRate, // 贷款名义利率
          loanRealRate: this.formInModel.loanRealRate // 贷款实际利率
        });
        this.$data.buttonLoading = false;
        this.$data.showAdd = false;
        this.getPrivateCustomerList();  // 获取模态框列表数据
        if (resAdd.success) {
          this.$Message.success('新增成功');
          this.$data.showAdd = false;
          this.getPrivateCustomerList();
        }
      },
      addModal() {
        this.isAdd = true;
        this.$data.formInModel = {};
        this.$data.showAdd = true;
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAdd = true;
        this.formInModel = row;
      },
      // 修改情况下的提交数据
      async setSubmit() {
        this.$data.buttonLoading = true;
        let resModify = await this.$http.post('/pms/productRate/modify', {
          productNo: this.childMsg.productNo, // 产品编号
          packageNo: this.$data.ProductPackageForm.packageNo, // 套餐编号
          bizType: this.formInModel.bizType, // 车类
          loanPeriods: this.formInModel.loanPeriods, // 贷款期限
          loanNominalRate: this.formInModel.loanNominalRate, // 贷款名义利率
          loanRealRate: this.formInModel.loanRealRate // 贷款实际利率
        });
        this.$data.buttonLoading = false;
        this.$data.showAdd = false;
        if (resModify.success) {
          this.$data.showAddModal = false;
          this.$Message.success('修改成功');
          this.getPrivateCustomerList();
        }
      },
      // 删除数据的请求
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.post('/pms/productRate/remove', {
              packageRateNo: row.packageRateNo // 套餐编号
            });
            if (respDel.success) {
              loadingMsg();
              this.$Message.success('删除成功');
              this.getPrivateCustomerList();
            }
          }
        });
      },
      // 提交表单
      async formDataAdd() {
        this.$data.btnLoading = true;
        let DataObj = {
          productNo: this.childMsg.productNo,
          productName: this.childMsg.productName,
          ...this.$data.ProductPackageForm
        };
        let resAdd = await this.$http.post('/pms/productPackage/save', DataObj);
        if (resAdd.success) {
          this.$data.btnLoading = false;
          this.$Message.success('套餐信息配置成功');
          this.getFormList();  // 获取表单数据
        }
      },
      // 新增模态框的保存按钮点击事件
      formSubmit() {
        let formName = 'ProductPackageForm';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formDataAdd();
          } else {
            this.$Message.error('<span style="color: red">*</span>项不能为空');
          }
        });
      },
      // 告知父组件关闭利率配置窗口
      formCancel() {
        this.$emit('notice-lilv');// 通知其父组件执行自定义事件“notice-lilv”
      },
      formInSubmit() {
        if (this.isAdd) {
          this.addSuBmit();
        } else {
          this.setSubmit();
        }
      },
      formInCancel() {
        this.$data.showAdd = false;
        this.modelFOrmReset();
      },
      // 打开资方模态框
      openZF(row) {
        this.$data.zfClickRow = {};
        this.$data.zfClickRow = row;
        this.$data.zfLilvModel = true;
      },
      modelFOrmReset() {
        this.$data.formInModel = {};
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#conf-model-lilv {
  & .col-inline {
    & .ivu-form-item {
      display: inline-block;
    }
  }
}
</style>
