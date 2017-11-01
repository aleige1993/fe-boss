<template>
  <div :id="id">

  </div>
</template>
<script>
import '@/assets/js/radialIndicator.min';
export default {
  name: '',
  data() {
    return {
      id: 'rp'+new Date().getTime()
    }
  },
  mounted() {
    var _id = this.$data.id;
    let radiusObj = radialIndicator('#'+_id, {
      showPercentage : false, // option,
      initValue: 50,
      barBgColor: '#fff',
      barColor: '#f00',
      roundCorner: true,
      barWidth: 10,
      radius: 60,
      fontSize: 18
    });
    radiusObj.animate(80);
  }
}
</script>
<style lang="scss" scoped>

</style>
