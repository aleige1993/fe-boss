<template>
  <i-date-picker format="yyyy-MM-dd" :readonly="readonly"
                 @on-change="valueChange" :placement="placement" :value="value" type="daterange" placeholder="选择日期" style="width: 100%"></i-date-picker>
</template>
<script>
  export default {
    name: 'bsDatePicker',
    data: () => ({

    }),
    props: {
      readonly: {
        type: Boolean,
        required: false,
        default: false
      },
      value: {
        type: String
      },
      placement: {
        type: String,
        required: false,
        default: 'bottom-start'
      }
    },
    methods: {
      valueChange(val) {
        console.log(val);
        // this.$emit('input', val);
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
