<template>
<!--渠道商列表-->
  <div id="table-distributor-list">
    <div class="form-block-title">
      客户信息
    </div>
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="corpName">
          <i-input style="width: 240px;" type="text" placeholder="公司名称" v-model="formSearch.corpName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="searchSubmit" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction" v-if="!isModal"></slot>
    <i-table :loading="dataLoading" highlight-row border ref="distributorTable" :columns="resultColumns" :data="distributorList" @on-current-change="radioFun" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tableDistributorList',
    mixins: [MixinData],
    data() {
      return {
        isModal: false,
        isAdd: true,
        pageSize: 15,
        currentPage: 1,
        total: 0,
        dataLoading: false,
        formSearch: {
          corpName: ''
        }
      };
    },
    props: {
      type: String,
      default: 'page',
      required: false
    },
    computed: {
      resultColumns() {
        if (this.type === 'modal') {
          this.$data.isModal = true;
          return this.$data.distributorColumns;
        } else {
          this.$data.isModal = false;
          return [...this.$data.distributorColumns, ...this.$data.columnsFeatureActionColumns];
        }
      }
    },
    mounted() {
      this.getPrivateCustomerList();
    },
    methods: {
      // 父组件告知 取消选中状态
      handleClearCurrentRow() {
        this.$refs.distributorTable.clearCurrentRow();
      },
      // 查询列表数据
      async getPrivateCustomerList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        // 当组件以modal形式显示的时候 传merchantStatus值为2（显示授信通过的数据）
        let merchantStatusCode = '';
        if (this.type === 'page') {
          merchantStatusCode = '';
        } else if (this.type === 'modal') {
          merchantStatusCode = '2';
        }
        let resp = await this.$http.post('merchant/listMerchant', {
          corpName: this.$data.formSearch.corpName, // 公司名称，模糊查询
          merchantStatus: merchantStatusCode, // 当组件以modal形式显示的时候 传merchantStatus值为5（显示授信通过的数据）
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize
        });
        this.$data.clickRow = {};
        // 告诉父组件取消了点选行状态
        this.$emit('on-cancel-clickRow'); //  this.$data.isClickRow = false;
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.distributorList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$data.distributorList = [];
        }
      },
      // 删除
      async remove(row) {
        Alertify.confirm('确定要删除吗？', async (ok) => {
          if (ok) {
            const loadingMsg = this.$Message.loading('删除中...', 0);
            let respDel = await this.$http.get('merchant/deleteMerchant', {
              merchantStatus: row.merchantStatus,
              merchantNo: row.merchantNo
            });
            loadingMsg();
            if (respDel.success) {
              this.$Message.success('删除成功');
              let jumpPage = this.$JumpPage.getPageRemove(this.$data.currentPage, this.$data.pageSize, this.$data.total);
              this.getPrivateCustomerList(jumpPage);
            }
          }
        });
      },
      // 模糊查询
      searchSubmit() {
        this.getPrivateCustomerList();
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 冻结
      async congeal(row) {
        const msg = this.$Message.loading('正在冻结...', 0);
        let resp = await this.$http.get('merchant/statusMerchant', {
          merchantNo: row.merchantNo,
          merchantStatus: '6'
        });
        msg();
        if (resp.success) {
          this.$Message.success('冻结成功');
          this.getPrivateCustomerList();
        } else {
          this.$Message.error('冻结失败');
        }
      },
      // 单选每一行时出触发 执行父组件的on-radio-fun事件
      radioFun(currentRow, oldCurrentRow) {
        this.$emit('on-radio-fun', currentRow);
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
