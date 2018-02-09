<template>
  <!--待制作合同列表-->
  <div id="pageContractMake">
    <!--
    taskNode:6==>待制作合同列表
    taskNode:8==>待签署合同列表
    -->
    <page-contract-list :taskNode="'6'" :status="'0;1'"></page-contract-list>
  </div>
</template>
<script>
  import pageContractList from '@/components/table-contract-manage-list';
  export default {
    name: 'pageContractMake',
    components: {
      pageContractList
    },
    data() {
      return {
      };
    }
  };
</script>
<style lang="scss">

</style>
