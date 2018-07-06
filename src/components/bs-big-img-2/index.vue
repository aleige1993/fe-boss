<template>
  <div class="image-dialog" style="display: inline-block; position: relative">
    <ul :id="vmId">
      <li style="cursor: pointer">
        <img :width="thumbWidth" :height="thumbHeight" :data-original="full" :src="thumb" alt="">
      </li>
    </ul>
    <slot name="icon-remove"></slot>
  </div>
</template>
<script>
  // import {} from '../../assets/js/viewer-jquery.min';
  import Tools from '@/utils/Tools';
  export default {
    name: '',
    props: {
      thumb: String,
      full: String,
      thumbWidth: Number,
      thumbHeight: Number,
      fullWidth: Number
    },
    data() {
      return {
        vmId: ''
      };
    },
    methods: {},
    mounted() {
      if (!$.fn.viewer) {
        require('../../assets/js/viewer-jquery.min');
      }
      let _id = `bs-big-img-${Tools.generateUUID()}`;
      this.$data.vmId = _id;
      setTimeout(function() {
        $('#' + _id).viewer();
        // viewer.show();
      }, 500);
    }
  };
</script>
<style lang="scss">
@import '../../assets/style/viewer.min.css';
.viewer-prev, .viewer-next{
  display: none !important;
}
</style>
