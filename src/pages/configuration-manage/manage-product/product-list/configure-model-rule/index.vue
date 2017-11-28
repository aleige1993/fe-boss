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
    name: 'configure-model-rule',
    loanDocCode: [],
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
            key: 'id'
          },
          {
            title: '准入规则名称',
            key: 'name'
          }
        ],
        data1: [
          {
            id: '001',
            name: 'adasdasd'
          },
          {
            id: '002',
            name: 'cvbcvbcvb'
          },
          {
            id: '003',
            name: 'yuiyuif'
          }
        ]
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
          productNo: productNo
        });
        this.$data.dataLoading = false;
        if (resp.body.length !== 0) {
          let _data = resp.body.map(item => {
            if (item.isSelectd === 1) {
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
        let productNo = this.childMsg.productNo;
        let productName = this.childMsg.productName;
        let resp = await this.$http.post('/pms/product/bindApproveRule', {
          productNo: productNo,
          productName: productName,
          loanDocCode: this.$data.loanDocCode
        });
        if (resp.success) {
          this.$emit('notice-rule');
        }
      },
      formCancel() {
        this.$emit('notice-rule');// 通知其父组件执行自定义事件“notice-rule”
      },
      selectRow(selection) {      // selection 已选项数据
        let _dataArray = selection.map(item => {
          let json = {};
          json['loanDocCode'] = item.loanDocCode;
          json['loanDocName'] = item.loanDocName;
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
