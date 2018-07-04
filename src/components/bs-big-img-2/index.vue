<template>
  <div class="bs-big-img2">
    <div class="image-dialog" style="display: inline-block; position: relative">
      <img style="cursor: pointer" class="image-viewer" @click="imageView(thumb)" :width="thumbWidth" :height="thumbHeight" :src="thumb" alt="">
      <slot name="icon-remove"></slot>
    </div>
    <ul v-if="createViewer" id="imageViewer" style="display: none">
      <li v-for="img in imageList">
        <img :width="thumbWidth" :height="thumbHeight" :data-original="img.src" :src="img.src" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'bs-big-img2',
    props: {
      thumb: String,
      full: String,
      thumbWidth: Number,
      thumbHeight: Number,
      fullWidth: Number
    },
    data() {
      return {
        imageList: []
      };
    },
    computed: {
      createViewer() {
        return $('#imageViewer').length === 0;
      }
    },
    methods: {
      imageView(thumb) {
        let _this = this;
        if (!_this.$data.imageList.length) {
          $('img.image-viewer').each(function() {
            _this.$data.imageList.push({
              src: $(this).attr('src')
            });
          });
        }
        _this.$nextTick(function() {
          let $viewer = $('#imageViewer');
          $viewer.viewer();
          $('img[src="' + thumb + '"]', $viewer).trigger('click');
        });
      }
    },
    mounted() {
      if (!$.fn.viewer) {
        require('../../assets/js/viewer-jquery.min');
      }
    }
  };
</script>
<style lang="scss">
  @import '../../assets/style/viewer.min.css';
</style>
