<template>
  <!--合同制作-->
  <div id="pageContractMake">
    <!--
    taskNode:6==>合同制作
    taskNode:7==>合同复核
    taskNode:8==>合同签署确认
    -->
    <page-contract-list :taskNode="'6'"></page-contract-list>
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
