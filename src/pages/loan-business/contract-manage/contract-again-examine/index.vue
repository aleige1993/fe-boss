<template>
  <!--复核-->
  <div id="contract-again-examine">
    <page-contract-again-examine :isDetails="isDetails"></page-contract-again-examine>
  </div>
</template>
<script>
  import PageContractAgainExamine from '../contract-list';
  export default {
    name: 'contractAgainExamine',
    components: {
      PageContractAgainExamine
    },
    data() {
      return {
        isDetails: true
      };
    }
  };
</script>
<style lang="scss">

</style>
