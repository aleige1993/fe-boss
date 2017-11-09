<template>
  <div class="bs-form-block">
    <div class="block-title">
      {{title}}
    </div>
    <div class="block-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {};
  },
  props: {
    title: {
      default: '标题',
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
  background-color: #eee;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-left: 6px solid #6D7781;
  // margin-bottom: 20px;
}
.block-body{
  border: 1px solid #ccc;
  border-top: 0;
  padding: 20px 0;
}
</style>
