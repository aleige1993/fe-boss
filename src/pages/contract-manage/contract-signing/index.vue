<template>
  <!--待签署合同列表-->
  <div id="pageContractSigning">
    <!--
    taskNode:6==>待制作合同列表
    taskNode:8==>待签署合同列表
    -->
    <page-contract-list :taskNode="'8'" :status="'0;1'" :succeed="succeed" :query="query"></page-contract-list>
  </div>
</template>
<script>
  import pageContractList from '@/components/table-contract-manage-list';
  export default {
    name: 'pageContractSigning',
    components: {
      pageContractList
    },
    props: {
      succeed: {
        type: Boolean,
        required: false,
        default: false
      },
      query: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
      };
    }
  };
</script>
<style lang="scss">

</style>
