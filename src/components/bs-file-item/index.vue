<template>
  <div class="bs-file-item" @click="downLoad">
    <a :href="fileUrl" target="_blank">
      <img :src="'./static/img/file-icons/'+suffix+'.png'" alt="">
      <p :title="fileName">{{fileName}}</p>
      <slot name="icon-remove"></slot>
    </a>
  </div>
</template>
<script>
  export default {
    name: 'bsFileItem',
    props: {
      type: {
        type: String,
        default: 'text',
        required: false
      },
      fileName: {
        type: String,
        default: '文件',
        required: false
      },
      fileUrl: String
    },
    computed: {
      suffix() {
        switch (this.type.toLowerCase()) {
        case 'png':
          return 'png';
        case 'doc':
          return 'docx_win';
        case 'docx':
          return 'docx_win';
        case 'xls':
          return 'xlsx_win';
        case 'xlsx':
          return 'xlsx_win';
        case 'ppt':
          return 'pptx_mac';
        case 'pptx':
          return 'pptx_mac';
        case 'zip':
          return 'zip';
        case 'rar':
          return 'rar';
        case 'gif':
          return 'gif';
        case 'bmp':
          return 'bmp';
        case 'jpeg':
          return 'jpeg';
        case 'txt':
          return 'text';
        case 'pdf':
          return 'pdf';
        case 'mp4' || 'avi' || 'mpeg4' || 'rmvb' || 'mkv' || 'mov' || 'f4v':
          return 'mpeg';
        default:
          return 'file';
        }
      }
    },
    data() {
      return {};
    },
    methods: {
      downLoad() {
        window.open(this.fileUrl);
      }
    }
  };
</script>
<style lang="scss">
.bs-file-item{
  display: inline-block;
  width: 128px;
  height: 150px;
  position: relative;
  cursor: pointer;
  img{
    width: 128px;
    height: 128px;
  }
  p{
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    @include single-ellipsis
  }
}
</style>
