<template>
  <!--合同制作-->
  <div id="contractMaking">
    <i-breadcrumb separator=">">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/loanbusiness">贷款业务</i-breadcrumb-item>
      <i-breadcrumb-item :href="!isDetails?'/index/loanbusiness/contract':'/index/loanbusiness/contract/againExamine'">签约管理</i-breadcrumb-item>
      <i-breadcrumb-item v-if="!isDetails">合同制作</i-breadcrumb-item>
      <i-breadcrumb-item v-else>合同复核</i-breadcrumb-item>
    </i-breadcrumb>
    <i-row>
      <i-col span="24">
        <div class="form-block-title">
          查询条件
        </div>
        <div class="search-form-container">
          <i-form inline ref="formSearch" :model="formSearch" label-position="right">
            <i-form-item prop="loanNo" style="margin-right:20px;">
              <i-input type="text" placeholder="项目编号" v-model="formSearch.loanNo"></i-input>
            </i-form-item>
            <i-form-item prop="corpName" style="margin-right:20px;">
              <i-input type="text" placeholder="客户名称" v-model="formSearch.corpName"></i-input>
            </i-form-item>
            <i-form-item prop="certType" style="margin-right:20px;">
              <i-select v-model="formSearch.certType" style="width:150px" placeholder="证件类型">
                <i-option v-for="item in enumSelectData.get('CertTypeEnum')" :key="item.itemCode" :value="item.itemCode">{{item.itemName}}</i-option>
              </i-select>
            </i-form-item>
            <i-form-item prop="certNo" style="margin-right:20px;">
              <i-input  v-model="formSearch.certNo" placeholder="证件号码"></i-input>
            </i-form-item>
            <i-form-item prop="startDate" style="width: 120px;margin-right: 0px">
              <bs-datepicker v-model="formSearch.startDate" type="text" placeholder="申请时间"></bs-datepicker>
            </i-form-item>
            <i-form-item style="margin-left:5px;margin-right: 5px">-</i-form-item>
            <i-form-item prop="endDate" style="width: 120px">
              <bs-datepicker v-model="formSearch.endDate" type="text" placeholder="申请时间"></bs-datepicker>
            </i-form-item>
            <i-form-item style="margin-left:20px;">
              <i-button type="primary"><i-icon type="ios-search-strong"></i-icon> 搜索</i-button>
            </i-form-item>
          </i-form>
        </div>
        <i-table border :loading="dataLoading" ref="contractTable" :columns="columns1" :data="data1"></i-table>
        <div class="page-container">
          <i-page :total="total" :page-size="pageSize" :current="currentPage" @on-change="jumpPage" size="small" show-elevator show-total></i-page>
        </div>
      </i-col>
    </i-row>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'contractMaking',
    mixins: [MixinData],
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        dataLoading: false,
        clickRow: {},
        formSearch: {
          loanNo: '',
          corpName: '',
          certType: '',
          certNo: '',
          startDate: '',
          endDate: ''
        }
      };
    },
    props: {
      isDetails: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this.$route.query.currentPage) {
        this.$data.currentPage = this.$route.query.currentPage;
      }
      this.getList();
    },
    methods: {
      // 设置当前处理人
      async settingHandleUser(row) {
        let resp = await this.$http.post('/biz/sign/settingHandleUser', {
          signNo: row.signNo
        });
        if (resp.success) {
          return true;
        } else {
          return false;
        }
      },
      // 查询列表数据
      async getList(page) {
        this.$data.dataLoading = true;
        if (page) {
          this.$data.currentPage = page;
        }
        let taskNodeCode = '6';
        if (this.isDetails) {
          taskNodeCode = '7';
        }
        let resp = await this.$http.post('/biz/sign/page', {
          taskNode: taskNodeCode,
          currentPage: this.$data.currentPage,
          pageSize: this.$data.pageSize,
          ...this.$data.formSearch
        });
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
          this.$data.currentPage = resp.body.currentPage;
          this.$data.total = resp.body.totalNum;
        } else {
          this.$data.data1 = [];
        }
      },
      jumpPage(page) {
        this.getList();
      },
      // 打开合同制作模态框
      openMakingModal(row) {
        this.$router.push({
          currentPage: this.$data.currentPage,
          path: '/index/loanbusiness/contract/making',
          query: {
            isDetails: this.isDetails,
            loanNo: row.loanNo, // 项目编号（业务申请编号）
            certNo: row.certNo, // 证件号码
            custNo: row.custNo // 客户编号
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
