<template>
  <div class="bs-form-block">
    <div class="block-title">
      {{title}}
    </div>
    <div class="block-body" v-bind:style="{padding: padding, borderWidth: borderWidth}" >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bsFormBlock',
  data() {
    return {};
  },
  props: {
    title: {
      default: '标题',
      type: String
    },
    padding: {
      default: '20px 15px',
      type: String
    },
    borderWidth: {
      default: '1px',
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.bs-form-block{
  margin-bottom: 10px;
}
.block-title{
  font-size: 14px;
  font-weight: bold;
  height: 36px;
  line-height: 36px;
  background-color: #ecf4f8;
  padding: 0 10px;
  border: 1px solid #dddee1;
  border-left: 4px solid #2196f3;
  // margin-bottom: 20px;
}
.block-body{
  border: 1px solid #dddee1;
  border-top: 0;
  padding: 20px 15px;
}
</style>
