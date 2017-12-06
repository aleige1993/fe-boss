<template>
  <!--归档材料-->
<div id="configure-model-file">
  <i-table border ref="proTable" :columns="columns1" :data="data1" @on-selection-change="selectRow"></i-table>
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
    name: 'configureModelFile',
    props: {
      childMsg: Object
    },
    finishedDocCode: [],
    data() {
      return {
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
        let resp = await this.$http.get('/pms/product/finishedDocList', {
          productNo: productNo
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
        let resp = await this.$http.post('/pms/product/bindFinishedDoc', {
          productNo: productNo,
          productName: productName,
          finishedDocCode: this.$data.finishedDocCode
        });
        console.log(this.$data.finishedDocCode);
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
