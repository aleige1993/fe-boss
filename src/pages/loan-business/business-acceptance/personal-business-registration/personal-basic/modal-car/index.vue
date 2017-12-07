<template>
<!--车辆新增修改的弹窗-->
  <div id="modal-car">
    <i-form  ref="formCar" :model="formCar" label-position="right" :label-width="160">
      <i-form-item label="权利人类型" prop="select">
        <i-select v-model="formCar.select">
          <i-option value="beijing">个人</i-option>
          <i-option value="shanghai">企业</i-option>
        </i-select>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
  export default {
    name: 'loanPersonalBasicModalCar',
    data() {
      return {
        formCar: {}
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
