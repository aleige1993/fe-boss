<template>
  <i-form  ref="formCar" :model="formCar" label-position="right" :label-width="100">
    <i-form-item label="权利人类型" prop="obligeeType">
      <i-select v-model="formCar.obligeeType">
        <i-option value="beijing">个人</i-option>
        <i-option value="shanghai">企业</i-option>
      </i-select>
    </i-form-item>
    <i-form-item label="权利人编号" prop="obligeeNo">
      <i-input v-model="formCar.obligeeNo" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item label="权利人名称" prop="obligeeName">
      <i-input v-model="formCar.obligeeName" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item label="车辆型号" prop="carModel">
      <i-input v-model="formCar.carModel" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item label="车牌号" prop="carNo">
      <i-input v-model="formCar.carNo" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item label="发动机号" prop="engineNo">
      <i-input v-model="formCar.engineNo" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item label="车架号" prop="carFrameNo">
      <i-input v-model="formCar.carFrameNo" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item label="车辆价值" prop="carMoney">
      <i-input v-model="formCar.carMoney" placeholder="">
      </i-input>
    </i-form-item>
    <i-form-item class="text-right">
      <i-button type="primary" @click="carSuBmit">提交</i-button>
    </i-form-item>
  </i-form>
</template>
<script>
  export default {
    name: 'companyBusinessCarinfo',
    data() {
      return {
        formCar: {
          obligeeType: '1',
          obligeeNo: '1',
          obligeeName: '1',
          carModel: '1',
          carNo: '1',
          engineNo: '1',
          carFrameNo: '1',
          carMoney: '1'
        },
        carbuttonLoading: false
      };
    },
    methods: {
      carSuBmit() {
        let actionType = 'add';
        this.$emit('on-updated', this.$data.formCar, actionType);
      }
    }
  };
</script>
<style lang="scss" scoped="">

</style>