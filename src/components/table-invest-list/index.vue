<template>
<!--资方维护列表-->
  <div id="table-invest-list">
    <slot name="topAction" v-if="!isModal"></slot>
    <i-table :loading="dataLoading" border ref="proTable" :columns="resultColumns" :data="data1" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page :page-size="pageSize" :current="currentPage" :total="total" size="small" show-elevator show-total @on-change="jumpPage">
      </i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tableInvestList',
    mixins: [MixinData],
    components: {},
    data() {
      return {
        dataLoading: false,
        isModal: false,
        isAdd: true,
        pageSize: 15,
        currentPage: 1,
        total: 0
      };
    },
    computed: {
      resultColumns() {
        if (this.type === 'modal') {
          this.$data.isModal = true;
          return this.$data.columns1;
        } else {
          this.$data.isModal = false;
          return [...this.$data.columns1, ...this.$data.columnsFeatureActionColumns];
        }
      }
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 获取资方维护列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let resp = await this.$http.get('/pms/capital/accBaseInfoList', {
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.dataLoading = false;
        if (resp.success && resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
        } else {
          this.$data.data1 = [];
        }
      },
      // 分页跳转
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 双击传值给父组件 触发on-row-dbclick事件
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
