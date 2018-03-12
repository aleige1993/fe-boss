<template>
  <div id="configure-model-rule">
    <i-table :height="this.$store.getters.viewHeight + 98" :loading="dataLoading" border ref="proTable" :columns="columns1" :data="data1" @on-selection-change="selectRow"></i-table>
    <br>
    <br>
    <div class="text-right">
      <i-button type="primary" @click="formSubmit" :loading="buttonLoading">
        <span v-if="!buttonLoading">确认</span>
        <span v-else>确认中...</span>
      </i-button>
      <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'configureModelRule',
    props: {
      childMsg: Object
    },
    data() {
      return {
        dataLoading: false,
        buttonLoading: false,
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
            width: 100,
            key: 'custType',
            render: (h, params) => {
              return this.enumCode2Name(params.row.custType, 'CustTypeEnum');
            }
          }
        ],
        data1: [],
        approveRuleCode: []
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
        if (resp.success && resp.body.length !== 0) {
          let _data = resp.body.map(item => {
            if (item.isSelected === 1) {
              item._checked = true;
              this.$data.approveRuleCode.push({
                approveRuleCode: item.approveRuleCode,
                approveRuleName: item.approveRuleName,
                custType: item.custType
              });
            }
            return item;
          });
          this.$data.data1 = _data;
        } else {
          this.$data.data1 = [];
        }
      },
      async formSubmit() {
        this.$data.buttonLoading = true;
        let productNo = this.childMsg.productNo;
        let productName = this.childMsg.productName;
        let resp = await this.$http.post('/pms/product/bindApproveRule', {
          productNo,
          productName,
          approveRuleCode: this.$data.approveRuleCode
        });
        this.$data.buttonLoading = false;
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
          json['custType'] = item.custType;
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
