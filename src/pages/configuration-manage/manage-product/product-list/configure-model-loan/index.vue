<template>
<div id="configure-model-loan">
  <i-table :loading="dataLoading" border ref="loanTable" :columns="columns1" :data="data1" @on-selection-change="selectRowLoan"></i-table>
  <br>
  <br>
  <div class="text-right">
    <i-button type="primary" @click="formSubmitLoan" :loading="buttonLoading">
      <span v-if="!buttonLoading">确认</span>
      <span v-else>确认中...</span>
    </i-button>
    <i-button type="ghost" style="margin-left: 8px" @click="formCancelLoan">取消</i-button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'configureModelLoan',
    props: {
      childMsg: Object
    },
    loanDocCode: [],
    data() {
      return {
        dataLoading: false,
        buttonLoading: false,
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '贷款材料ID',
            key: 'loanDocCode'
          },
          {
            title: '贷款材料名称',
            key: 'loanDocName'
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
        let resp = await this.$http.get('/pms/product/loanDocList', {
          productNo,
          custType: ''
        });
        this.$data.dataLoading = false;
        if (resp.success && resp.body.length !== 0) {
          let _data = resp.body.map(item => {
            if (item.isSelectd === 1 || item.isSelectd === '1') {
              item._checked = true;
            }
            return item;
          });
          this.$data.data1 = _data;
        } else {
          this.$data.data1 = [];
        }
      },
      async formSubmitLoan() {
        this.$data.buttonLoading = true;
        let productNo = this.childMsg.productNo;
        let productName = this.childMsg.productName;
        let resp = await this.$http.post('/pms/product/bindLoanDoc', {
          productNo,
          productName,
          loanDocCode: this.$data.loanDocCode
        });
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$Message.success('配置成功');
          this.$emit('notice-loan');
        }
      },
      formCancelLoan() {
        this.$emit('notice-loan');// 通知其父组件执行自定义事件“notice-loan”
      },
      selectRowLoan(selection) {      // selection 已选项数据
        let _dataArray = selection.map(item => {
          let json = {};
          json['loanDocCode'] = item.loanDocCode;
          json['loanDocName'] = item.loanDocName;
          json['custType'] = item.custType;
          return json;
        });
        this.$data.loanDocCode = _dataArray;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
