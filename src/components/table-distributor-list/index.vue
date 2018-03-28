<template>
<!--渠道商列表-->
  <div id="table-distributor-list">
    <div class="form-block-title">
      搜索信息
    </div>
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="corpName">
          <i-input style="width: 240px;" type="text" placeholder="渠道商名称" v-model="formSearch.corpName"></i-input>
        </i-form-item>
        <i-form-item prop="channelType" style="width: 150px;">
          <i-select v-model="formSearch.channelType" placeholder="渠道商类型">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('MerchantChannelTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item prop="merchantType" style="width: 150px;">
          <i-select v-model="formSearch.merchantType" placeholder="经销商类型">
            <i-option value="" style="height: 26px; color: #bbbec4">-请选择-</i-option>
            <i-option v-for="item in enumSelectData.get('MerchantTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
          </i-select>
        </i-form-item>
        <i-form-item>
          <i-button @click="searchSubmit" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction" v-if="!isModal"></slot>
    <i-table :height="!isModal?(tableFixHeight-20):tableFixHeight" :loading="dataLoading" highlight-row border ref="distributorTable" :columns="resultColumns" :data="distributorList" @on-current-change="radioFun" @on-row-dblclick="selectRow"></i-table>
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
          corpName: '',
          channelType: '',
          merchantType: ''
        }
      };
    },
    props: {
      type: {
        type: String,
        default: 'page',
        required: false
      },
      status: {
        type: String,
        default: 'allStatus',
        required: false
      },
      treeAllList: {
        type: Boolean,
        default: false,
        required: false
      }
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
          if (this.status === 'allStatus') {
            merchantStatusCode = '';
          } else {
            merchantStatusCode = this.status;
          }
        } else if (this.type === 'modal') {
          if (this.status === 'allStatus') {
            merchantStatusCode = '2';
          } else {
            merchantStatusCode = this.status;
          }
        }
        let resData = {};
        let resUrl = '';
        // 查询带顶级渠道商的所有信息列表(分页查询渠道商基础信息)
        if (this.treeAllList) {
          resUrl = '/merchant/listAll';
          resData = {
            ...this.$data.formSearch,
            currentPage: this.$data.currentPage,
            pageSize: this.$data.pageSize
          };
        } else {
          // 查询不带顶级渠道商的信息列表(渠道商信息分页查询)
          resUrl = 'merchant/listMerchant';
          resData = {
            ...this.$data.formSearch,
            merchantStatus: merchantStatusCode, // 当组件以modal形式显示的时候 传merchantStatus值为5（显示授信通过的数据）
            currentPage: this.$data.currentPage,
            pageSize: this.$data.pageSize
          };
        }
        let resp = await this.$http.post(resUrl, resData);
        this.$data.clickRow = {};
        // 告诉父组件取消了点选行状态
        this.$emit('on-cancel-clickRow'); //  this.$data.isClickRow = false;
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.distributorList = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage / 1;
          this.$data.total = resp.body.totalNum / 1;
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
        let statusText = '';
        let posStatus = '';
        if (row.enableStatus === '0') { // 0=冻结；1=激活
          statusText = '激活';
          posStatus = '1';
        }
        if (row.enableStatus === '1') { // 0=冻结；1=激活
          statusText = '冻结';
          posStatus = '0';
        }
        Alertify.confirm('确定要' + statusText + '当前用户吗？', async (ok) => {
          if (ok) {
            const msg = this.$Message.loading('正在冻结' + statusText + '...', 0);
            let resp = await this.$http.post('merchant/changeStatus', {
              merchantNo: row.merchantNo,
              enableStatus: posStatus
            });
            msg();
            if (resp.success) {
              this.$Message.success(statusText + '成功');
              this.getPrivateCustomerList();
            } else {
              this.$Message.error(statusText + '失败');
            }
          }
        });
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
