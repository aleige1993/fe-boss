<template>
  <h5>
    <span>{{title}}</span>
  </h5>
</template>
<script>
  export default {
    name: 'formChildTitle',
    data() {
      return {};
    },
    props: {
      title: {
        required: true,
        type: String
      }
    }
  };
</script>
<style lang="scss" scoped>
  h5{
    border-bottom: 2px solid #e9eaec;
    height: 26px;
    margin: 20px;
    span{
      display: inline-block;
      height: 26px;
      border-bottom: 2px solid $color-primary;
      font-weight: bold;
    }
  }
</style>
