<template>
  <div id="conf-model-lilv">
    <i-form ref="formRate" :model="formRate" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--个人单笔额度-->
        <i-col span="8">
          <i-form-item
            label="个人单笔额度" prop="protype"
            :rules="{required: true, message: '个人单笔额度不能为空', trigger: 'blur'}">
            <i-input placeholder="个人单笔额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--个人单户额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '个人单户额度不能为空', trigger: 'blur'}"
            label="个人单户额度" prop="protype">
            <i-input placeholder="个人单户额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单笔额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '企业单笔额度不能为空', trigger: 'blur'}"
            label="企业单笔额度"
            prop="protype">
            <i-input placeholder="企业单笔额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单户额度-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '企业单户额度不能为空', trigger: 'blur'}"
            label="企业单户额度"
            prop="protype">
            <i-input placeholder="企业单户额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--还款方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '还款方式不能为空', trigger: 'change'}"
            label="还款方式"
            prop="RepaymentTypeEnum">
            <i-select v-model="formRate.RepaymentTypeEnum" placeholder="请选择">
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
            :rules="{required: true, message: '还款周期不能为空', trigger: 'change'}"
            label="还款周期"
            prop="RepaymentPeriodEnum">
            <i-row>
              <i-col span="9" style="padding: 0 5px 0 0">
                <i-select v-model="formRate.RepaymentPeriodEnum" placeholder="请选择">
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
                <i-input placeholder="还款周期" v-model="formRate.protype" :disabled="formRate.RepaymentPeriodEnum!=='6'">
                  <span slot="append">天</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--模型设定-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '模型设定不能为空', trigger: 'change'}"
            label="模型设定"
            prop="ModelTypeEnum">
            <i-select v-model="formRate.ModelTypeEnum" placeholder="请选择">
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
            :rules="{required: true, message: '月息方式不能为空', trigger: 'change'}"
            label="月息方式"
            prop="InterestTypeEnum">
            <i-select v-model="formRate.InterestTypeEnum" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('InterestTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--年模型-->
        <i-col span="8">
          <i-form-item label="年模型" prop="YearModelEnum">
            <i-select v-model="formRate.YearModelEnum" placeholder="请选择">
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
            :rules="{required: true, message: '还款日规则不能为空', trigger: 'change'}"
            label="还款日规则"
            prop="RepaymentRuleEnum">
            <i-row>
              <i-col span="12"  style="padding: 0 5px 0 0">
                <i-select v-model="formRate.RepaymentRuleEnum" placeholder="请选择">
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
                <i-input placeholder="还款日" v-model="formRate.protype" :disabled="formRate.RepaymentRuleEnum!=='2'">
                  <span slot="append">日</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--逾期计算方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '逾期计算方式不能为空', trigger: 'change'}"
            label="逾期计算方式"
            prop="OverdueTypeEnum">
            <i-select v-model="formRate.OverdueTypeEnum" placeholder="请选择">
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
            prop="protype">
            <i-input placeholder="逾期利率" v-model="formRate.protype">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <i-col span="24"></i-col><!--iview莫名其妙给我占了两格，此处暂时这样处理-->
        <!--逾期管理费-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '逾期管理费不能为空', trigger: 'blur'}"
            label="逾期管理费"
            prop="protype">
            <i-input placeholder="逾期管理费" v-model="formRate.protype">
              <span slot="append">元/天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--逾期宽限天数-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '逾期宽限天数不能为空', trigger: 'blur'}"
            label="逾期宽限天数"
            prop="protype">
            <i-input placeholder="逾期宽限天数" v-model="formRate.protype">
              <span slot="append">天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--罚息计算方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '罚息计算方式不能为空', trigger: 'change'}"
            label="罚息计算方式"
            prop="PenaltyTypeEnum">
            <i-select v-model="formRate.PenaltyTypeEnum" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('OverdueTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--罚息利率-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '罚息利率不能为空', trigger: 'blur'}"
            label="罚息利率"
            prop="protype">
            <i-input placeholder="罚息利率" v-model="formRate.protype">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--是否允许提前还款-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '是否允许提前还款不能为空', trigger: 'change'}"
            label="是否允许提前还款"
            prop="YesNoEnum">
            <i-select v-model="formRate.YesNoEnum" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('YesNoEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--提前还款违约金比例-->
        <i-col span="8" v-if="formRate.YesNoEnum === '1'">
          <!--v-if="formRate.YesNoEnum === '1'"-->
          <i-form-item
            label="提前还款违约金比例"
            prop="protype">
            <i-row>
              <i-col span="13"  style="padding: 0 5px 0 0">
                <i-select v-model="formRate.rules" placeholder="请选择">
                  <i-option value="按合同金额收取">按合同金额收取</i-option>
                  <i-option value="等额本息">按应还未还金额收取</i-option>
                </i-select>
              </i-col>
              <i-col span="11"  style="padding: 0">
                <i-input placeholder="提前还款违约金比例" v-model="formRate.protype">
                  <span slot="append">%</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--个人单户额度-->
        <i-col span="16">
          <i-form-item
            :rules="{required: true, message: '个人单户额度不能为空', trigger: 'blur'}"
            label="个人单户额度"
            prop="protype">
            <span>不足</span>
            <i-input placeholder="" v-model="formRate.protype" style="width: 80px"></i-input>
            <span>天，按实际发生天数收，否则整月收！最低收</span>
            <i-input placeholder="" v-model="formRate.protype" style="width: 80px"></i-input>
            <span>天利息。</span>
          </i-form-item>
        </i-col>
        <!--保证金释放方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '保证金释放方式不能为空', trigger: 'change'}"
            label="保证金释放方式"
            prop="protype">
            <i-select v-model="formRate.FreedTypeEnum" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('FreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--授信释放方式-->
        <i-col span="8">
          <i-form-item
            :rules="{required: true, message: '授信释放方式不能为空', trigger: 'change'}"
            label="授信释放方式"
            prop="CreditTypeEnum">
            <i-select v-model="formRate.CreditTypeEnum" placeholder="请选择">
              <i-option v-for="item in enumSelectData.get('FreedTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <div class="form-top-actions">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
      <i-table border ref="proTable" :columns="columns1" :data="data1"></i-table>
      <br>
      <br>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formSubmit">提交</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
      </i-form-item>
    </i-form>
    <pt-modal title="新增" v-model="showAdd" :width="520">
      <i-form ref="formInModel" :model="formInModel" label-position="left" :label-width="100">
        <i-form-item class="required" label="车类" prop="protype">
          <i-select v-model="formInModel.car" placeholder="请选择">
            <i-option value="轿车">轿车</i-option>
            <i-option value="轻卡">轻卡</i-option>
            <i-option value="微卡">微卡</i-option>
            <i-option value="SUV">SUV</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="期限" prop="protype">
          <i-input placeholder="期限" v-model="formInModel.month">
          </i-input>
        </i-form-item>
        <i-form-item class="required" label="利率标准" prop="protype">
          <i-input placeholder="利率标准" v-model="formInModel.rate">
            <span slot="append">%</span>
          </i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formInSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formInCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  export default {
    name: 'conf-model-lilv',
    components: {
      'pt-modal': PTModal
    },
    data() {
      return {
        isAdd: true,
        listIndex: Number,
        showAdd: false, // 增删的模态框
        formRate: { // 当前的模态框的数据表单
          protype: '',  // 产品类型
          ModelTypeEnum: '',  // 模型设定
          YearModelEnum: '',  // 年模型
          RepaymentTypeEnum: '',  // 还款方式
          OverdueTypeEnum: '',  // 逾期计算方式
          PenaltyTypeEnum: '',  // 罚息计算方式
          InterestTypeEnum: '', // 月息方式
          FreedTypeEnum: '',  // 保证金释放方式
          CreditTypeEnum: '',  // 授信释放方式
          RepaymentPeriodEnum: '', // 还款周期
          YesNoEnum: '',
          RepaymentRuleEnum: '' // 还款日规则
        },
        formInModel: {  // 增删的模态框的数据表单
          term: '',
          standard: ''
        },
        columns1: [
          {
            title: '车类',
            width: 200,
            key: 'car'
          },
          {
            title: '贷款期限(月)',
            key: 'month'
          },
          {
            title: '贷款利率(%)',
            key: 'rate'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.listIndex = params.index;
                      this.setList(params.row);
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: []
      };
    },
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/productLilv', {});
      try {
        Vm.$data.data1 = response.list;
      } catch (err) {
      }
    },
    methods: {
      addModal() {
        this.$data.isAdd = true;
        this.$data.showAdd = true;   // 增删的模态框
        this.modelFOrmReset();
      },
      formSubmit() {},
      // 告知父组件关闭利率配置窗口
      formCancel() {
        this.$emit('notice-lilv');// 通知其父组件执行自定义事件“notice-lilv”
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAdd = true;
        this.formInModel.car = row.car;
        this.formInModel.month = row.month;
        this.formInModel.rate = row.rate;
      },
      remove(index) {
        this.data1.splice(index, 1);
      },
      formInSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            car: this.$data.formInModel.car,
            month: this.$data.formInModel.month,
            rate: this.$data.formInModel.rate
          });
        } else {
          this.$data.data1[this.listIndex].car = this.$data.formInModel.car;
          this.$data.data1[this.listIndex].month = this.$data.formInModel.month;
          this.$data.data1[this.listIndex].rate = this.$data.formInModel.rate;
        }
        this.$data.showAdd = false;
      },
      formInCancel() {
        this.modelFOrmReset();
        this.$data.showAdd = false;
        this.modelFOrmReset();
      },
      modelFOrmReset() {
        let formName = 'formInModel';
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
