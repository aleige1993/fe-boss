<template>
  <!--渠道商角色管理列表-->
  <div id="roleList">
    <div class="search-form-container">
      <i-form inline ref="formSearch" :model="formSearch">
        <i-form-item prop="corpName">
          <i-input style="width: 240px;" type="text" placeholder="角色名称" v-model="formSearch.roleName"></i-input>
        </i-form-item>
        <i-form-item>
          <i-button @click="searchSubmit" type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
        </i-form-item>
      </i-form>
    </div>
    <slot name="topAction" v-if="!isModal"></slot>
    <i-table :loading="dataLoading" highlight-row border ref="distributorRoleTable" :columns="resultColumns" :data="roleList" @on-row-dblclick="selectRow"></i-table>
    <div class="page-container">
      <i-page @on-change="jumpPage" :total="total" :page-size="pageSize" :current="currentPage" size="small" show-elevator show-total></i-page>
    </div>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'roleList',
    mixins: [MixinData],
    data() {
      return {
        total: 0,
        pageSize: 15,
        currentPage: 1,
        isModal: false,
        dataLoading: false,
        formSearch: {
          roleName: ''
        }
      };
    },
    props: {
      type: {
        type: String,
        default: 'page',
        required: false
      }
    },
    computed: {
      resultColumns() {
        if (this.type === 'modal') {
          this.$data.isModal = true;
          return this.$data.roleColumns;
        } else {
          this.$data.isModal = false;
          return [...this.$data.roleColumns, ...this.$data.columnsFeatureActionColumns];
        }
      }
    },
    mounted() {
      console.log(this.type);
      this.getPrivateCustomerList();
    },
    methods: {
      // 双击传值给父组件 触发on-row-dbclick事件
      selectRow(row, index) {
        this.$emit('on-row-dbclick', row, index);
      },
      // 模糊查询
      searchSubmit() {
        this.getPrivateCustomerList();
      },
      jumpPage(page) {
        this.getPrivateCustomerList(page);
      },
      // 查询列表数据
      async getPrivateCustomerList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('/roleListMockjs', {
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.roleList = resp.body.resultList;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
