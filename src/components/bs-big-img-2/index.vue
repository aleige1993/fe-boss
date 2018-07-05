<template>
  <div class="bs-big-img2">
    <div class="image-dialog">
      <img class="image-viewer" @click="imageView(thumb + imageHowCut)"
           :width="thumbWidth" :height="thumbHeight" :original="thumb" :src="thumb + imageHowCut" alt="">
      <slot name="icon-remove"></slot>
    </div>
    <ul class="image-viewer-container" :id="viewId">
      <li v-for="image in imageList">
        <img :width="thumbWidth" :height="thumbHeight" :data-original="image.original" :src="image.src" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
  import Viewer from 'viewerjs';
  import Tools from '@/utils/Tools';
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
        viewId: 'image-viewer-container-' + Tools.generateUUID(),
        imageHowCut: '?x-oss-process=image/resize,h_128',
        imageList: []
      };
    },
    methods: {
      imageView(thumb) {
        let _this = this;
        _this.$data.imageList = [];
        $('.image-viewer').each(function() {
          let $this = $(this);
          _this.$data.imageList.push({
            original: $this.attr('original'),
            src: $this.attr('src')
          });
        });
        _this.$nextTick(function() {
          _this.Viewer = new Viewer(document.getElementById(_this.$data.viewId), {
            url: 'data-original',
            loading: true
          });
          $('img[src="' + thumb + '"]', '#' + _this.$data.viewId).trigger('click');
        });
      }
    }
  };
</script>
<style lang="scss">
  @import '../../assets/style/viewer.min.css';
  .image-dialog {
    position: relative;
    display: inline-block;
  }
  .image-viewer {
    cursor: pointer;
  }
  .image-viewer-container {
    display: none;
  }
</style>
