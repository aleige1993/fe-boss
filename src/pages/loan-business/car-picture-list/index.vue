<template>
  <div class="loan-file-list">
    <div class="list-files clearfix">
      <template v-for="(item, index) in data">
        <template>
          <bs-big-img  style="float: left" :thumbWidth="128" :thumbHeight="128" :fullWidth="1280"
                       :thumb="item.carPicUrl"
                       :full="item.carPicUrl">
            <span v-if="!isDetails" class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item, index)"><i-icon type="close"></i-icon></span>
          </bs-big-img>
        </template>
      </template>
      <i-upload v-if="!isDetails" style="display: inline-block; float: left; width:128px; margin-left: 5px; position: relative" :show-upload-list="false"
                multiple type="drag"
                :format="['jpg','jpeg','png','gif','bmp','jpeg','pic']"
                :on-progress="uploading"
                :max-size="uploadMaxSize"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="uploadBefore"
                :on-success="uploadFileSuccess"
                :action="$config.HTTPBASEURL+'/common/upload'">
        <div style="width: 126px;height:128px;line-height: 150px; text-align: center; border: 1px dashed #2196f3; color: #2196f3">
          <Icon type="ios-cloud-upload" size="42"></Icon>
        </div>
        <i-spin v-if="isUploading" fix></i-spin>
      </i-upload>
    </div>
    <Spin fix v-if="isUploading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div style="margin-top: 10px">正在上传中，请勿关闭...</div>
    </Spin>
  </div>
</template>
<script>
  export default {
    name: 'carFileList',
    data() {
      return {
        isUploading: false
      };
    },
    props: {
      data: {
        type: Array,
        required: true,
        default: []
      },
      isDetails: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    watch: {
      data(newVal, oldVal) {
      }
    },
    methods: {
      deleteFile(file, index) {
        Alertify.confirm('确定要删除当前文件吗？', ok => {
          if (ok) {
            this.data.splice(index, 1);
            this.$emit('on-data-remove', index);
          }
        });
      },
      uploading() {
        this.$data.isUploading = true;
      },
      // 上传之前对上传的文件进行验证 必须为图片格式
      uploadBefore(file) {
        if (!this.isImg(file.name)) {
          this.$Message.error('请上传图片格式的文件！');
          return false;
        } else {
        }
      },
      uploadFileSuccess(res) {
        this.$data.isUploading = false;
        if (res.success) {
          let file = res.body;
          this.$emit('on-data-add', {
            carPicName: file.fileName,
            carPicUrl: file.url
          });
          this.data.push({
            carPicName: file.fileName,
            carPicUrl: file.url
          });
        }
      },
      getFileSuffix(fileUrl) {
        if (fileUrl) {
          return fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
        } else {
          return '';
        }
      },
      isImg(fileUrl) {
        let suffix = this.getFileSuffix(fileUrl);
        return suffix === 'png' ||
          suffix === 'jpg' ||
          suffix === 'gif' ||
          suffix === 'jpeg' ||
          suffix === 'bmp' ||
          suffix === 'pic' ||
          suffix === 'PNG' ||
          suffix === 'JPG' ||
          suffix === 'GIF' ||
          suffix === 'JPEG' ||
          suffix === 'BMP' ||
          suffix === 'PIC';
      }
    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  .loan-file-list{
    border: 1px solid #ccc;
    margin-bottom: 10px;
    .list-title{
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: bold;
      background-color: #ecf4f8;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .list-files{
      padding: 10px;

    }
  }
  .icon-remove{
    position: absolute;
    top: -3px;
    right: 1px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #f00;
    color: #fff;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    z-index: 1;
  }
</style>
