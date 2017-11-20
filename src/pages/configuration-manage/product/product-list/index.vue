<template>
  <div id="page-product">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item>产品管理</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">
      查询条件
    </div>
    <div class="search-form-container">
      <i-form inline label-position="left">
        <i-form-item prop="user" label="产品名称" :label-width="100">
          <i-input type="text" placeholder="客户名称"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button type="primary">
            <i-icon type="ios-search-strong"></i-icon>
            搜索
          </i-button>
        </i-form-item>
      </i-form>
    </div>
    <div class="form-top-actions">
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增产品</i-button>
      <i-button @click="lilvClick" type="ghost"><i class="iconfont icon-shenhe"></i> 利率方案配置</i-button>
      <i-button @click="feiyClick" type="ghost"><i class="iconfont icon-shenhe"></i> 费用收取配置</i-button>
      <i-button @click="loanClick" type="ghost"><i class="iconfont icon-shenhe"></i> 贷款材料配置</i-button>
      <i-button @click="RuleClick"type="ghost"><i class="iconfont icon-shenhe"></i> 准入规则配置</i-button>
      <i-button @click="FileClick" type="ghost"><i class="iconfont icon-shenhe"></i> 归档材料配置</i-button>
      <i-button v-if="isClickRow" @click="handleClearCurrentRow" type="text"><i-icon type="android-cancel" class="button-cancel"></i-icon> 取消当前选中状态</i-button>
    </div>
    <i-table highlight-row border ref="proTable" :columns="columns1" :data="data1" @on-current-change="radioFun"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total>
      </i-page>
    </div>
    <!--新增产品弹窗-->
    <pt-modal title="添加产品" v-model="showAddModal" :width="600">
      <i-form ref="formCustom" :model="formCustom" label-position="left" :label-width="100">
        <i-form-item class="required" label="产品类别" prop="protype">
          <i-input placeholder="请输入产品类别" v-model="formCustom.protype"></i-input>
        </i-form-item>
        <i-form-item class="required" label="产品名称" prop="proname">
          <i-input placeholder="请输入产品名称" v-model="formCustom.proname"></i-input>
        </i-form-item>
        <i-form-item label="状态" prop="state">
          <i-select v-model="formCustom.prostusState">
            <i-option value="启用">启用</i-option>
            <i-option value="停用">停用</i-option>
          </i-select>
        </i-form-item>
        <i-form-item label="适用流程" prop="process">
          <i-select v-model="formCustom.process">
            <i-option value="流程一">流程一</i-option>
            <i-option value="流程二">流程二</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="产品说明" prop="explain">
          <i-input v-model="formCustom.explain" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入产品说明..."></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="formSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="formReset('formCustom')">重置</i-button>
        </i-form-item>
      </i-form>
    </pt-modal>
    <!--利率方案配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']利率方案配置'" v-model="LlShowModel" :width="1200">
      <conf-model-lilv  @notice-lilv="noticeLilvFun"></conf-model-lilv>
    </pt-modal>
    <!--费用收取配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']费用收取配置'" v-model="FyShowModal" :width="1200">
      <conf-model-fy  @notice-cost="noticeCostFun"></conf-model-fy>
    </pt-modal>
    <!--贷款材料配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']贷款材料配置'" v-model="LoanShowModal" :width="1200">
      <conf-model-loan @notice-loan="noticeLoanFun"></conf-model-loan>
    </pt-modal>
    <!--准入规则配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']准入规则配置'" v-model="RuleShowModal" :width="1200">
      <conf-model-rule @notice-rule="noticeRuleFun"></conf-model-rule>
    </pt-modal>
    <!--归档材料配置弹窗-->
    <pt-modal :title="'['+clickRow.proName+']归档材料配置'" v-model="FileShowModal" :width="1200">
      <conf-model-file @notice-file="noticeFileFun"></conf-model-file>
    </pt-modal>
  </div>
</template>

<script>
  import PTModal from '@/components/bs-modal';
  import ConfModelLilv from './configure-model-lilv'; //  利率方案配置
  import ConfModelFy from './configure-model-cost'; //  费用收取配置
  import ConfModelLoan from './configure-model-loan'; //  贷款材料配置
  import ConfModelRule from './configure-model-rule'; //  准入规则配置
  import ConfModelFile from './configure-model-file'; //  准入规则配置
  export default {
    name: 'prolist',
    components: {
      'pt-modal': PTModal,
      'conf-model-lilv': ConfModelLilv,
      'conf-model-fy': ConfModelFy,
      'conf-model-loan': ConfModelLoan,
      'conf-model-rule': ConfModelRule,
      'conf-model-file': ConfModelFile
    },
    data() {
      return {
        isAdd: true,
        showAddModal: false,
        isClickRow: false,        // 是否已经选择了某一行
        LlShowModel: false,           // 利率方案配置弹窗
        FyShowModal: false,           // 费用收取配置弹窗
        LoanShowModal: false,         // 贷款材料配置弹窗
        RuleShowModal: false,         // 准入规则配置弹窗
        FileShowModal: false,         // 归档材料配置弹窗
        listIndex: Number,
        clickRow: {},
        // 列表“新增按钮”的表单
        formCustom: {
          protype: '',
          proname: '',
          prostusState: '',
          process: '',
          explain: ''
        },
        columns1: [
          {
            title: '产品编号',
            width: 100,
            align: 'center',
            key: 'proNumber'
          },
          {
            title: '产品名称',
            key: 'proName'
          },
          {
            title: '产品类型',
            key: 'proType'
          },
          {
            title: '产品状态',
            key: 'proState'
          },
          {
            title: '创建时间',
            key: 'creationTime'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          },
          {
            title: '创建人',
            key: 'Founder'
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
      let response = await this.$http.post('/product', {});
      try {
        Vm.$data.data1 = response.list;
      } catch (err) {
      }
    },
    methods: {
      // 打开费用配置弹窗
      feiyClick() {
        if (this.clickRowedFun()) {
          this.$data.FyShowModal = true;
        }
      },
      // 打开贷款材料配置弹窗
      loanClick() {
        if (this.clickRowedFun()) {
          this.$data.LoanShowModal = true;
        }
      },
      // 打开准入规则配置弹窗
      RuleClick() {
        if (this.clickRowedFun()) {
          this.$data.RuleShowModal = true;
        }
      },
      // 打开归档材料配置弹窗
      FileClick() {
        if (this.clickRowedFun()) {
          this.$data.FileShowModal = true;
        }
      },
      // 利率配置弹窗传参
      noticeLilvFun() {
        this.$data.LlShowModel = false;
      },
      // 费用配置弹窗传参
      noticeCostFun() {
        this.$data.FyShowModal = false;
      },
      // 贷款材料配置弹窗传参
      noticeLoanFun() {
        this.$data.LoanShowModal = false;
      },
      // 准入规则配置弹窗传参
      noticeRuleFun() {
        this.$data.RuleShowModal = false;
      },
      // 归档材料配置弹窗传参
      noticeFileFun() {
        this.$data.FileShowModal = false;
      },
      addModal() {
        this.$data.showAddModal = true;
      },
      remove(index) {
        this.data1.splice(index, 1);
      },
      setList(row) {
        this.isAdd = false;
        this.$data.showAddModal = true;
        this.formCustom.proname = row.proName;
        this.formCustom.protype = row.proType;
        this.formCustom.prostusState = row.proState;
      },
      formSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            proNumber: '003',
            proName: this.$data.formCustom.proname,
            proType: this.$data.formCustom.protype,
            proState: this.$data.formCustom.prostusState,
            creationTime: 'yyyy-MM-dd HH:mm:ss',
            updateTime: this.getNowFormatDate()
          });
        } else {
          this.$data.data1[this.listIndex].proName = this.$data.formCustom.proname;
          this.$data.data1[this.listIndex].proType = this.$data.formCustom.protype;
          this.$data.data1[this.listIndex].proState = this.$data.formCustom.prostusState;
        }
        this.$data.showAddModal = false;
        this.formReset('formCustom');
      },
      formReset(name) {
        this.$refs[name].resetFields(); // 重置表单
      },
      // 单选每一行时出触发
      radioFun(currentRow, oldCurrentRow) {
        this.$data.clickRow = currentRow;
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          this.$data.isClickRow = false;
        }
        this.$data.isClickRow = true;
      },
      // 取消选中行的选中状态
      handleClearCurrentRow() {
        this.$refs.proTable.clearCurrentRow();
        this.$data.isClickRow = false;
        this.$data.clickRow = {};
      },
      // 点击配置按钮时
      clickRowedFun() {
        if (JSON.stringify(this.$data.clickRow) === '{}') {
          alert('请先选择需要配置的产品');
          return false;
        }
        return true;
      },
      // 打开利率配置弹窗
      lilvClick() {
        if (this.clickRowedFun()) {
          this.$data.LlShowModel = true;
        }
      },
      // 获取当前时间
      getNowFormatDate() {
        let date = new Date();
        let seperator1 = '-';
        let seperator2 = ':';
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
        return currentdate;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-product {
    & .form-top-actions {
      font-size: 0;
      & button {
        margin-right: 10px;
      }
    }
    & .pt-modal-shadow .bs-form-block .block-body {
      border: 0;
    }
    & .button-cancel {
    }
  }
</style>
