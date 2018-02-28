<template>
  <i-date-picker v-if="!isNowStart" format="yyyy-MM-dd" :readonly="readonly"
  @on-change="valueChange" :placement="placement" :value="value" type="date" placeholder="选择日期" style="width: 100%"></i-date-picker>
  <i-date-picker v-else format="yyyy-MM-dd" :readonly="readonly" :options="optionsNow"
  @on-change="valueChange" :placement="placement" :value="value" type="date" placeholder="选择日期" style="width: 100%"></i-date-picker>
</template>
<script>
export default {
  name: 'bsDatePicker',
  data() {
    return {
      optionsNow: {
        disabledDate(date) {
          // 86400000，它的意思是说1天的时间=24小时 x 60分钟 x 60秒 x 1000毫秒。
          return date && date.valueOf() < Date.now() - 86400000;
        }
      }
    };
  },
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
    },
    isNowStart: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    valueChange(val) {
      this.$emit('input', val);
      this.$emit('on-change', val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
