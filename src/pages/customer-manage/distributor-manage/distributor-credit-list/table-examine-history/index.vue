<template>
<!--渠道商管理-审核历史信息-->
  <div id="tableExamineHistory">
    <i-breadcrumb separator=">" v-if="$route.query.from==='detail'">
      <i-breadcrumb-item href="/">首页</i-breadcrumb-item>
      <i-breadcrumb-item href="/index/customer/distributor">渠道商管理</i-breadcrumb-item>
      <i-breadcrumb-item>渠道商授信额度审核历史</i-breadcrumb-item>
    </i-breadcrumb>
    <br>
    <br>
    <bs-form-block :title="'审核历史意见'">
      <i-table border :loading="dataLoading" ref="tableHistory" :columns="columns1" :data="data1"></i-table>
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
        console.log(resp);
        this.$data.dataLoading = false;
        if (resp.body.resultList.length !== 0) {
          this.$data.data1 = resp.body.resultList;
        } else {
          this.$Notice.warning({
            title: '没有数据可加载',
            duration: 2
          });
          this.$data.data1 = [];
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
