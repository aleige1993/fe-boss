<template>
<div id="configure-model-loan">
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
    name: 'configure-model-loan',
    submitData: {},
    data() {
      return {
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '贷款材料ID',
            width: 100,
            key: 'id'
          },
          {
            title: '贷款材料名称',
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
    methods: {
      formSubmit() {
      },
      formCancel() {
        this.$emit('notice-loan');// 通知其父组件执行自定义事件“notice-loan”
      },
      selectRow(selection) {      // selection 已选项数据
        this.$data.submitData = selection;
        alert(JSON.stringify(selection));
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
