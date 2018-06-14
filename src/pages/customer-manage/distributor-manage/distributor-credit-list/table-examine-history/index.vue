<template>
<!--渠道商管理-审核历史信息-->
  <div id="tableExamineHistory">
    <i-breadcrumb separator=">" v-if="!$route.query.hasTab">
      <!--<i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商授信额度审核历史</i-breadcrumb-item>-->
      <i-button type="primary" @click="$router.back(-1)"><Icon type="chevron-left"></Icon> 返回</i-button>
    </i-breadcrumb>
    <br>
    <br>
    <bs-form-block :title="'审核历史意见'">
      <div class="scrollBarStyle">
        <i-table :height="tableFixHeight" border :loading="dataLoading" ref="tableHistory" :columns="columns1" :data="data1"></i-table>
      </div>
    </bs-form-block>
  </div>
</template>

<script>
  import MixinData from './mixin-data';
  export default {
    name: 'tableExamineHistory',
    mixins: [MixinData],
    data() {
      return {
        dataLoading: false
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 渠道商授信额度分页查询
      async getList() {
        this.$data.dataLoading = true;
        let resp = await this.$http.post('merchant/credit/approveHistList', {
          applyNo: this.$route.query.applyNo
        });
        this.$data.dataLoading = false;
        if (resp.success) {
          this.$data.data1 = resp.body.resultList;
        } else {
          this.$data.data1 = [];
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
