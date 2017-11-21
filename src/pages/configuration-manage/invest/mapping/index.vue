<template>
<!--资方映射配置-->
  <div id="invest-mapping">
    <i-breadcrumb separator="&gt;">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf">配置管理</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/conf/invest">资方管理</i-breadcrumb-item>
      <i-breadcrumb-item>资方映射配置</i-breadcrumb-item>
    </i-breadcrumb>
    <div class="form-block-title">查询条件</div>
    <div class="search-form-container">
      <i-form inline label-position="left">
        <i-form-item prop="user" label="资方名称" :label-width="80">
          <i-input type="text" placeholder="资方名称"></i-input>
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
      <i-button @click="addModal" type="info"><i class="iconfont icon-xinzeng"></i> 新增</i-button>
    </div>
    <i-table highlight-row border ref="proTable" :columns="columns1" :data="data1"></i-table>
    <div class="page-container">
      <i-page :current="1" :total="40" size="small" show-elevator show-total>
      </i-page>
    </div>
    <bs-modal :title="'资方映射配置'" v-model="ShowModel" :width="600">
      <i-form ref="formMapping" :model="formMapping" label-position="right" :label-width="100">
        <i-form-item class="required" label="产品" prop="pro">
          <i-select v-model="formMapping.proName">
            <i-option value="欢乐颂">欢乐颂</i-option>
            <i-option value="任分期">任分期</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="资方" prop="investName">
          <i-select v-model="formMapping.investName">
            <i-option value="海尔云贷">海尔云贷</i-option>
            <i-option value="海乐行融资租赁">海乐行融资租赁</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="资方产品编号" prop="investProNumber">
          <i-input v-model="formMapping.investProNumber"></i-input>
        </i-form-item>
        <i-form-item label="渠道编号" prop="channelNumber">
          <i-input v-model="formMapping.channelNumber"></i-input>
        </i-form-item>
        <i-form-item label="客户经理编号" prop="managerNumber">
          <i-input v-model="formMapping.managerNumber"></i-input>
        </i-form-item>
        <i-form-item class="required" label="贴息方式" prop="subsidy ">
          <i-select v-model="formMapping.subsidy ">
            <i-option value="全贴">全贴</i-option>
            <i-option value="不贴">不贴</i-option>
          </i-select>
        </i-form-item>
        <i-form-item class="required" label="贷款金额范围" prop="range">
          <i-input v-model="formMapping.rangeStart" style="width: 40%"></i-input>
          <span>~</span>
          <i-input v-model="formMapping.rangeEnd" style="width: 40%"></i-input>
        </i-form-item>
        <i-form-item class="text-right">
          <i-button type="primary" @click="addformSubmit">提交</i-button>
          <i-button type="ghost" style="margin-left: 8px" @click="addformCancel">取消</i-button>
        </i-form-item>
      </i-form>
    </bs-modal>
    <bs-modal :title="'关联合同模板'" v-model="ContractModel" :width="600">
      <i-table highlight-row border ref="ContractTable" :columns="columns2" :data="data2" @on-selection-change="selectRow"></i-table>
      <br>
      <br>
      <div class="text-right">
        <i-button type="primary" @click="ContractformSubmit">提交</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click="ContractformCancel">取消</i-button>
      </div>
    </bs-modal>
  </div>
</template>

<script>
  import BSModal from '@/components/bs-modal';
  export default {
    name: '',
    components: {
      'bs-modal': BSModal
    },
    data() {
      return {
        isAdd: true,
        ShowModel: false,         // 新增和修改弹窗
        ContractModel: false,      // 关联合同模板弹窗
        listIndex: Number,
        formMapping: {
          proName: '',
          investName: '',
          investProNumber: '',
          channelNumber: '',
          managerNumber: '',
          subsidy: '',
          rangeStart: '',
          rangeEnd: ''
        },
        ContractformData: {},     // 关联合同模板已选的数据
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
            title: '资方名称',
            key: 'investName'
          },
          {
            title: '资方产品编号',
            key: 'investProNumber'
          },
          {
            title: '渠道编号',
            key: 'channelNumber'
          },
          {
            title: '客户经理编号',
            key: 'managerNumber'
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
                    }
                  }
                }, '合同模板'),
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
        data1: [],
        // 关联合同模板
        columns2: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '模板ID',
            key: 'templateId'
          },
          {
            title: '合同名称',
            key: 'templateName'
          }
        ],
        data2: [
          {
            templateId: '01',
            templateName: '合同名称01'
          }
        ]
      };
    },
    async mounted() {
      const Vm = this;
      let response = await this.$http.post('/mapping', {});
      try {
        Vm.$data.data1 = response.list;
      } catch (err) {
      }
    },
    methods: {
      // 新增按钮的弹窗
      addModal() {
        this.$data.ShowModel = true;
        const formName01 = 'formMapping';
        this.$refs[formName01].resetFields(); // 重置表单
      },
      // 新增里的 修改按钮
      setList(row) {
        this.isAdd = false;
        this.$data.ShowModel = true;
        this.formMapping.proName = row.proName;
        this.formMapping.investName = row.investName;
        this.formMapping.investProNumber = row.investProNumber;
        this.formMapping.channelNumber = row.channelNumber;
        this.formMapping.managerNumber = row.managerNumber;
      },
      // 新增里的 提交按钮
      addformSubmit() {
        if (this.isAdd) {
          this.$data.data1.unshift({
            proNumber: '003',
            proName: this.$data.formMapping.proName,
            investName: this.$data.formMapping.investName,
            investProNumber: this.$data.formMapping.investProNumber,
            channelNumber: this.$data.formMapping.channelNumber,
            managerNumber: this.$data.formMapping.managerNumber
          });
        } else {
          this.$data.data1[this.listIndex].proName = this.$data.formMapping.proName;
          this.$data.data1[this.listIndex].investName = this.$data.formMapping.investName;
          this.$data.data1[this.listIndex].investProNumber = this.$data.formMapping.investProNumber;
          this.$data.data1[this.listIndex].channelNumber = this.$data.formMapping.channelNumber;
          this.$data.data1[this.listIndex].managerNumber = this.$data.formMapping.managerNumber;
        }
        this.$data.ShowModel = false;
      },
      // 新增里的 取消按钮
      addformCancel() {
        this.$data.ShowModel = false;
      },
      selectRow(selection) {      // selection 已选项数据
        this.$data.ContractformData = selection;
        alert(JSON.stringify(selection));
      },
      ContractformSubmit() {
        console.log(this.$data.ContractformData);
      },
      ContractformCancel() {
        this.$data.ContractModel = false;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
