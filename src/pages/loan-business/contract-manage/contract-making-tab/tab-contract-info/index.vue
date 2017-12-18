<template>
<div id="tab-contract-info">
  <bs-form-block :title="'签约申请信息'">
    <i-form inline>
      <i-row>
        <i-col span="12">
          <i-form-item label="签约申请编号">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="签约申请时间">
            <span v-text="contractInfo.startDate"></span>
            <span v-if="(contractInfo.startDate!=='')&&contractInfo.endDate!==''">-</span>
            <span v-text="contractInfo.endDate"></span>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="签约申请地点">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12" v-if="contractInfo.lat!==''">
          <i-form-item label="签约申请地点经度">
            <span v-text="contractInfo.lat"></span>
          </i-form-item>
        </i-col>
        <i-col span="12" v-if="contractInfo.lon!==''">
          <i-form-item label="签约申请地点纬度">
            <span v-text="contractInfo.lon"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--放款账户信息-->
  <bs-form-block :title="'放款账户信息'">
    <i-form inline>
      <i-row>
        <i-col span="12">
          <i-form-item label="放款账户名">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="放款开户行">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="放款账号">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--还款账户信息-->
  <bs-form-block :title="'还款账户信息'">
    <i-form inline>
      <i-row>
        <i-col span="12">
          <i-form-item label="还款账户名">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="还款开户行">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="还款账号">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--海乐行账户信息-->
  <bs-form-block :title="'账户名'">
    <i-form inline>
      <i-row>
        <i-col span="12">
          <i-form-item label="账户名">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
        <i-col span="12">
          <i-form-item label="开户行">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
      <i-row>
        <i-col span="12">
          <i-form-item label="账号">
            <span v-text="loanNo"></span>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
  </bs-form-block>
  <!--资金方信息-->
  <bs-form-block :title="'资金方信息'">
    <i-table border :loading="loanCapitalListLoading" ref="proTable" :columns="loanCapitalColumns" :data="loanCapitalData"></i-table>
  </bs-form-block>
  <!--租金还款计划表-->
  <bs-form-block :title="'租金还款计划表'">
    <div class="form-top-actions" style="padding-top:0;">
      <i-button @click="rentGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
    </div>
    <i-table border :loading="rentPlanCapitalListLoading" ref="rentTable" :columns="rentPlanCapitalColumns" :data="rentPlanCapitalData">
    </i-table>
  </bs-form-block>
  <!--资金方还款计划表-->
  <bs-form-block :title="'资金方还款计划表'">
    <div class="form-top-actions" style="padding-top:0;">
      <i-button @click="capitalGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成还款计划</i-button>
    </div>
    <i-table border :loading="capitalPlanCapitalListLoading" ref="capitalTable" :columns="capitalPlanCapitalColumns" :data="capitalPlanCapitalData">
    </i-table>
  </bs-form-block>
  <!--合同信息-->
  <bs-form-block :title="'合同信息'">
    <i-form inline ref="contractInfoForm" :model="contractInfoForm" :label-width="100">
      <i-row>
        <i-col span="4">
          <i-form-item
            :rules="{required: true, message: '请选择合同开始日期', trigger: 'change'}"
            prop="startDate"
            label="合同开始日期">
            <bs-datepicker v-model="contractInfoForm.startDate"></bs-datepicker>
          </i-form-item>
        </i-col>
        <i-col span="4">
          <i-form-item
            :rules="{required: true, message: '请选择合同结束日期', trigger: 'change'}"
            prop="endDate"
            label="合同结束日期">
            <bs-datepicker v-model="contractInfoForm.endDate"></bs-datepicker>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>
    <div class="form-top-actions" style="padding-top:0;">
      <i-button @click="contractGenerating" type="info"><i class="iconfont icon-xinzeng"></i> 生成合同</i-button>
    </div>
    <i-table border :loading="contractInfoListLoading" ref="contractInfoTable" :columns="contractInfoColumns" :data="contractInfoData">
    </i-table>
  </bs-form-block>
</div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tabContractInfo',
    mixins: [MixinData],
    data() {
      return {
        loanCapitalListLoading: false, // 资金方信息loading
        rentPlanCapitalListLoading: false, // 租金还款计划表loading
        capitalPlanCapitalListLoading: false, // 资金方还款计划表loading
        contractInfoListLoading: false, // 合同信息列表loading
        loanNo: '',
        // 合同信息
        contractInfo: {
          'startDate': '',
          'endDate': '',
          'lat': '',
          'lon': ''
        },
        // 合同信息表
        contractInfoForm: {
          startDate: '',
          endDate: ''
        }
      };
    },
    mounted() {
    },
    methods: {
      // 租金还款生成还款计划
      rentGenerating() {},
      // 资金方还款生成还款计划
      capitalGenerating() {},
      // 生成合同
      contractGenerating() {
        console.log(5465465465);
        const formName = 'contractInfoForm';
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(111111111);
          } else {
            this.$Message.error('"<span style="color: red">*</span>"必填项不能为空');
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
