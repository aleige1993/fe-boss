<template>
<div id="configure-model-lending">
  <i-table :loading="dataLoading" border ref="lendingTable" :columns="columns1" :data="data1" @on-selection-change="selectRow"></i-table>
  <br>
  <br>
  <div class="text-right">
    <i-button type="primary" @click="formSubmit" :loading="btnLoading">
      <span v-if="!btnLoading">确认</span>
      <span v-else>loading...</span>
    </i-button>
    <i-button type="ghost" style="margin-left: 8px" @click="formCancel">取消</i-button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'configureModelLoan',
    props: {
      childMsg: Object
    },
    loanRuleNoArray: [],
    data() {
      return {
        dataLoading: false,
        btnLoading: false,
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '放款条件ID',
            key: 'loanRuleNo'
          },
          {
            title: '放款条件名称',
            key: 'loanRule'
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
        let resp = await this.$http.get('/pms/productLoan/list', {
          productNo,
          currentPage: 1,
          pageSize: 99999
        });
        console.log(resp.body.resultList);
        this.$data.dataLoading = false;
        if (resp.body.length !== 0) {
          let _data = resp.body.resultList.map(item => {
            console.log(item);
            if (item.isSelected === 1) {
              item._checked = true;
            }
            return item;
          });
          this.$data.data1 = _data;
        } else {
          this.$Notice.warning({
            title: '列表没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      },
      async formSubmit() {
        this.$data.btnLoading = true;
        let productNo = this.childMsg.productNo;
        let productName = this.childMsg.productName;
        let resp = await this.$http.post('/pms/product/bindLoanRule', {
          productNo,
          productName,
          rules: this.$data.loanRuleNoArray
        });
        this.$data.btnLoading = false;
        if (resp.success) {
          this.$Message.success('配置成功');
          this.$emit('notice-lending');
        }
      },
      formCancel() {
        this.$emit('notice-lending');// 通知其父组件执行自定义事件“notice-lending”
      },
      selectRow(selection) {      // selection 已选项数据
        let _dataArray = selection.map(item => {
          let json = {};
          json['loanRuleNo'] = item.loanRuleNo;
          json['loanRule'] = item.loanRule;
          return json;
        });
        this.$data.loanRuleNoArray = _dataArray;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
