<template>
  <!--归档材料-->
<div id="configure-model-file">
  <i-table :height="this.$store.getters.viewHeight + 98" border ref="proTable" :columns="columns1" :data="data1" @on-selection-change="selectRow"></i-table>
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
    name: 'configureModelFile',
    props: {
      childMsg: Object
    },
    data() {
      return {
        buttonLoading: false,
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '归档材料ID',
            key: 'finishedDocCode'
          },
          {
            title: '归档材料名称',
            key: 'finishedDocName'
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
        finishedDocCode: []
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
        let resp = await this.$http.get('/pms/product/finishedDocList', {
          productNo
        });
        this.$data.dataLoading = false;
        if (resp.success && resp.body.length !== 0) {
          let _data = resp.body.map(item => {
            if (item.isSelected === 1) {
              item._checked = true;
              this.finishedDocCode.push({
                finishedDocCode: item.finishedDocCode,
                finishedDocName: item.finishedDocName,
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
        let resp = await this.$http.post('/pms/product/bindFinishedDoc', {
          productNo,
          productName,
          finishedDocCode: this.$data.finishedDocCode
        });
        this.$data.buttonLoading = false;
        if (resp.success) {
          this.$Message.success('配置成功');
          this.$emit('notice-file');
        }
      },
      formCancel() {
        this.$emit('notice-file');// 通知其父组件执行自定义事件“notice-file”
      },
      selectRow(selection) {      // selection 已选项数据
        let _dataArray = selection.map(item => {
          let json = {};
          json['finishedDocCode'] = item.finishedDocCode;
          json['finishedDocName'] = item.finishedDocName;
          json['custType'] = item.custType;
          return json;
        });
        this.$data.finishedDocCode = _dataArray;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
