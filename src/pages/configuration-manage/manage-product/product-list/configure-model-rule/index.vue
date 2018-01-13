<template>
  <div id="configure-model-rule">
    <i-table :loading="dataLoading" border ref="proTable" :columns="columns1" :data="data1" @on-selection-change="selectRow"></i-table>
    <br>
    <br>
    <div class="text-right">
      <i-button type="primary" @click="formSubmit">确认</i-button>
      <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'configureModelRule',
    approveRuleCode: [],
    props: {
      childMsg: Object
    },
    data() {
      return {
        dataLoading: false,
        columns1: [
          {
            title: '选择',
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '准入规则ID',
            key: 'approveRuleCode'
          },
          {
            title: '准入规则名称',
            key: 'approveRuleName'
          },
          {
            title: '客户类型',
            key: 'custType',
            render: (h, params) => {
              return this.enumCode2Name(params.row.custType, 'CustTypeEnum');
            }
          }
        ],
        data1: []
      };
    },
    mounted() {
      this.getPrivateCustomerList();  // 获取模态框列表数据
    },
    methods: {
      // 获取模态框列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let productNo = this.childMsg.productNo;
        let resp = await this.$http.get('/pms/product/approveRuleList', {
          productNo
        });
        this.$data.dataLoading = false;
        if (resp.body.length !== 0) {
          let _data = resp.body.map(item => {
            if (item.isSelected === 1) {
              item._checked = true;
            }
            return item;
          });
          this.$data.data1 = _data;
        } else {
          this.$data.data1 = [];
        }
      },
      async formSubmit() {
        let productNo = this.childMsg.productNo;
        let productName = this.childMsg.productName;
        let resp = await this.$http.post('/pms/product/bindApproveRule', {
          productNo,
          productName,
          approveRuleCode: this.$data.approveRuleCode
        });
        if (resp.success) {
          this.$Message.success('配置成功');
          this.$emit('notice-rule');
        }
      },
      formCancel() {
        this.$emit('notice-rule');// 通知其父组件执行自定义事件“notice-rule”
      },
      selectRow(selection) {      // selection 已选项数据
        let _dataArray = selection.map(item => {
          let json = {};
          json['approveRuleCode'] = item.approveRuleCode;
          json['approveRuleName'] = item.approveRuleName;
          return json;
        });
        this.$data.approveRuleCode = _dataArray;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
