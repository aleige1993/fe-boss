<template>
  <div class="image-dialog" style="display: inline-block; position: relative">
    <img class="viewer" @click="imageView(thumb)" :width="thumbWidth" :height="thumbHeight" :src="thumb" alt="">
    <slot name="icon-remove"></slot>
    <ul :id="id" style="display: none">
      <li v-for="img in imageList">
        <img :width="thumbWidth" :height="thumbHeight" :data-original="img.src" :src="img.src" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
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
        id: `bs-big-img-${Tools.generateUUID()}`,
        imageList: []
      };
    },
    methods: {
      imageView(thumb) {
        let _this = this;
        if (!_this.$data.imageList.length) {
          $('img.viewer').each(function() {
            _this.$data.imageList.push({
              src: $(this).attr('src')
            });
          });
        }
        _this.$nextTick(function() {
          let $viewer = $('#' + _this.$data.id);
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
