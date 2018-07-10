<template>
  <div class="bs-big-img2">
    <div class="image-dialog">
      <img class="image-viewer" @click="imageView(thumb)"
           :width="thumbWidth" :height="thumbHeight" :src="thumb" alt="">
      <slot name="icon-remove"></slot>
    </div>
    <ul v-if="crrateViewer" id="image-viewer-container">
    </ul>
  </div>
</template>
<script>
  import Viewer from 'viewerjs';
  export default {
    name: 'bs-big-img2',
    props: {
      thumb: String,
      full: String,
      thumbWidth: Number,
      thumbHeight: Number,
      fullWidth: Number
    },
    computed: {
      crrateViewer() {
        return $('#image-viewer-container').length === 0;
      }
    },
    methods: {
      imageView(thumb) {
        this.Viewer = new Viewer(document.getElementById('image-viewer-container'), {
          url: 'data-original',
          transition: false,
          loading: true
        });
        $('img[src="' + thumb + '"]', '#image-viewer-container').trigger('click');
      }
    },
    mounted() {
      $(`<li v-for="image in imageList">
        <img width="${this.thumbWidth}" height="${this.thumbHeight}" src="${this.thumb}" alt="">
      </li>`).appendTo($('#image-viewer-container'));
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
  #image-viewer-container {
    display: none;
  }
</style>
