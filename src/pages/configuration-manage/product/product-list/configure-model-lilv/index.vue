<template>
  <div id="conf-model-lilv">
    <i-form ref="formRate" :model="formRate" label-position="right" :label-width="120">
      <i-row :gutter="16">
        <!--个人单笔额度-->
        <i-col span="12">
          <i-form-item class="required" label="个人单笔额度" prop="protype">
            <i-input placeholder="请输入个人单笔额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--个人单户额度-->
        <i-col span="12">
          <i-form-item class="required" label="个人单户额度" prop="protype">
            <i-input placeholder="请输入个人单户额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单笔额度-->
        <i-col span="12">
          <i-form-item class="required" label="企业单笔额度" prop="protype">
            <i-input placeholder="请输入企业单笔额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--企业单户额度-->
        <i-col span="12">
          <i-form-item class="required" label="企业单户额度" prop="protype">
            <i-input placeholder="请输入企业单户额度" v-model="formRate.protype">
              <span slot="append">元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--还款方式-->
        <i-col span="12">
          <i-form-item class="required" label="还款方式" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="等额本金">等额本金</i-option>
              <i-option value="等额本息">等额本息</i-option>
              <i-option value="等本等息">等本等息</i-option>
              <i-option value="按期收息，期末收本">按期收息，期末收本</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--还款周期-->
        <i-col span="12">
          <i-form-item class="required" label="还款方式" prop="protype">
            <i-row>
              <i-col span="9" style="padding: 0 5px 0 0">
                <i-select v-model="formRate.Repayment" placeholder="请选择">
                  <i-option value="按日">按日</i-option>
                  <i-option value="按月">按月</i-option>
                  <i-option value="按季">按季</i-option>
                  <i-option value="按半年">按半年</i-option>
                  <i-option value="按年">按年</i-option>
                  <i-option value="auto">自定义</i-option>
                </i-select>
              </i-col>
              <i-col span="15" style="padding: 0">
                <i-input placeholder="请输入还款周期" v-model="formRate.protype" :disabled="formRate.Repayment!=='auto'">
                  <span slot="append">天</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--模型设定-->
        <i-col span="12">
          <i-form-item class="required" label="模型设定" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="不算偷不算尾">不算偷不算尾</i-option>
              <i-option value="算头不算尾">算头不算尾</i-option>
              <i-option value="算头又算尾">算头又算尾</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--月息方式-->
        <i-col span="12">
          <i-form-item class="required" label="月息方式" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="按实际天数计算">按实际天数计算</i-option>
              <i-option value="按固定30天计算">按固定30天计算</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--年模型-->
        <i-col span="12">
          <i-form-item label="年模型" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="按360天计算">按360天计算</i-option>
              <i-option value="按365天计算">按365天计算</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--还款日规则-->
        <i-col span="12">
          <i-form-item class="required" label="还款日规则" prop="protype">
            <i-row>
              <i-col span="9"  style="padding: 0 5px 0 0">
                <i-select v-model="formRate.rules" placeholder="请选择">
                  <i-option value="对日还款">对日还款</i-option>
                  <i-option value="auto">指定日还款</i-option>
                </i-select>
              </i-col>
              <i-col span="15"  style="padding: 0">
                <i-input placeholder="请输入还款日" v-model="formRate.protype" :disabled="formRate.rules!=='auto'">
                  <span slot="append">日</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--逾期计算方式-->
        <i-col span="12">
          <i-form-item class="required" label="逾期计算方式" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="按合同金额收取">按合同金额收取</i-option>
              <i-option value="等额本息">按应还未还金额收取</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--逾期利率-->
        <i-col span="12">
          <i-form-item class="required" label="逾期利率" prop="protype">
            <i-input placeholder="请输入逾期利率" v-model="formRate.protype">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--逾期管理费-->
        <i-col span="12">
          <i-form-item class="required" label="逾期管理费" prop="protype">
            <i-input placeholder="请输入逾期管理费" v-model="formRate.protype">
              <span slot="append">元/天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--逾期宽限天数-->
        <i-col span="12">
          <i-form-item class="required" label="逾期宽限天数" prop="protype">
            <i-input placeholder="请输入逾期宽限天数" v-model="formRate.protype">
              <span slot="append">天</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--罚息计算方式-->
        <i-col span="12">
          <i-form-item class="required" label="罚息计算方式" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="按合同金额收取">按合同金额收取</i-option>
              <i-option value="等额本息">按应还未还金额收取</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--罚息利率-->
        <i-col span="12">
          <i-form-item class="required" label="罚息利率" prop="protype">
            <i-input placeholder="请输入罚息利率" v-model="formRate.protype">
              <span slot="append">%/元</span>
            </i-input>
          </i-form-item>
        </i-col>
        <!--是否允许提前还款-->
        <i-col span="12">
          <i-form-item class="required" label="是否允许提前还款" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="yes">是</i-option>
              <i-option value="no">否</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--提前还款违约金比例-->
        <i-col span="12">
          <i-form-item label="提前还款违约金比例" prop="protype">
            <i-row>
              <i-col span="9"  style="padding: 0 5px 0 0">
                <i-select v-model="formRate.rules" placeholder="请选择">
                  <i-option value="按合同金额收取">按合同金额收取</i-option>
                  <i-option value="等额本息">按应还未还金额收取</i-option>
                </i-select>
              </i-col>
              <i-col span="15"  style="padding: 0">
                <i-input placeholder="请输入提前还款违约金比例" v-model="formRate.protype">
                  <span slot="append">%</span>
                </i-input>
              </i-col>
            </i-row>
          </i-form-item>
        </i-col>
        <!--提前还款利息-->
        <i-col span="24">
          <i-form-item class="required" label="个人单户额度" prop="protype">
            <span>不足</span>
            <i-input placeholder="" v-model="formRate.protype" style="width: 80px"></i-input>
            <span>天，按实际发生天数收，否则整月收！最低收</span>
            <i-input placeholder="" v-model="formRate.protype" style="width: 80px"></i-input>
            <span>天利息。</span>
          </i-form-item>
        </i-col>
        <!--保证金释放方式-->
        <i-col span="12">
          <i-form-item class="required" label="保证金释放方式" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="yes">按还本金额释放</i-option>
              <i-option value="no">按贷款结清</i-option>
            </i-select>
          </i-form-item>
        </i-col>
        <!--授信释放方式-->
        <i-col span="12">
          <i-form-item class="required" label="授信释放方式" prop="protype">
            <i-select v-model="formRate.select" placeholder="请选择">
              <i-option value="yes">按还本金额释放</i-option>
              <i-option value="no">按贷款结清</i-option>
            </i-select>
          </i-form-item>
        </i-col>
      </i-row>
      <div class="form-top-actions">
        <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
      </div>
      <i-table highlight-row border ref="proTable" :columns="columns1" :data="data1"></i-table>
      <br>
      <br>
      <i-form-item class="text-right">
        <i-button type="primary" @click="formSubmit">提交</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="formReset">重置</i-button>
      </i-form-item>
    </i-form>
    <pt-modal title="新增" v-model="showAdd" :width="520">
      <i-form ref="formInModel" :model="formInModel" label-position="left" :label-width="100">
        <i-form-item class="required" label="期限" prop="protype">
          <i-input placeholder="请输入期限" v-model="formInModel.protype">
          </i-input>
        </i-form-item>
        <i-form-item class="required" label="利率标准" prop="protype">
          <i-input placeholder="请输入利率标准" v-model="formInModel.protype">
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
    name: '',
    components: {
      'pt-modal': PTModal
    },
    data() {
      return {
        showAdd: false,   // 增删的模态框
        formRate: {       // 当前的模态框的数据表单
          protype: '',
          Repayment: '',
          rules: ''
        },
        formInModel: {    // 增删的模态框的数据表单
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
      addModal() {},
      formSubmit() {},
      formReset() {},
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom.proname = row.proName;
        this.formCustom.protype = row.proType;
        this.formCustom.prostusState = row.proState;
      },
      remove(index) {
        this.data1.splice(index, 1);
      },
      formInSubmit() {},
      formInCancel() {
        this.$data.showAdd = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
