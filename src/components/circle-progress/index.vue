<template>
  <div :id="id">

  </div>
</template>
<script>
import '@/assets/js/radialIndicator.min';
import Tools from '@/utils/Tools';
export default {
  name: '',
  data() {
    return {
      id: 'rp-' + Tools.generateUUID()
    };
  },
  props: ['options'],
  mounted() {
    const self = this;
    let _id = this.$data.id;
    let defaultOptions = {
      showPercentage: false, // option,
      initValue: 0,
      barBgColor: '#fff',
      barColor: '#f00',
      roundCorner: true,
      barWidth: 10,
      radius: 40,
      fontSize: 18,
      fontWeight: 500,
      fontColor: '#333',
      format(number) {
        return number + '%';
      }
    };
    let _settings = $.extend({}, defaultOptions, self.options);
    let percentTemp = _settings.initValue;
    _settings.initValue = 0;
    let radiusObj = radialIndicator('#' + _id, _settings);
    // 把实例化的chart图标对象绑在组件实例上，供父组件的ref调用（虽然一般不推荐直接操作ref）
    this.chart = radiusObj;
    radiusObj.animate(percentTemp);
  }
};
</script>
<style lang="scss" scoped>

</style>
