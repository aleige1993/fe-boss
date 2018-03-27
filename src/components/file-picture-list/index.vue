<template>
  <div class="pic-file-list">
    <div class="list-files clearfix">
      <template v-for="(item, index) in picData">
        <template v-if="isImg(item.attachmentUrl)">
          <bs-big-img  style="float: left" :thumbWidth="128" :thumbHeight="128" :fullWidth="1280"
                       :thumb="item.attachmentUrl"
                       :full="item.attachmentUrl">
            <span v-if="!isDetails" class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item, index)"><i-icon type="close"></i-icon></span>
          </bs-big-img>
        </template>
        <template v-else>
          <bs-file-item style="float: left" :type="getFileSuffix(item.attachmentUrl)" :fileUrl="item.attachmentUrl" :fileName="item.attachmentName">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item, index)"><i-icon type="close"></i-icon></span>
          </bs-file-item>
        </template>
      </template>
      <i-upload v-if="!isDetails" style="display: inline-block; float: left; width:128px; margin-left: 5px; position: relative" :show-upload-list="false"
                multiple type="drag"
                :on-progress="uploading"
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
    name: 'picFileList',
    data() {
      return {
        isDetails: false,
        isUploading: false
      };
    },
    props: {
      picData: {
        type: Array,
        required: true,
        default: []
      },
      details: {
        type: Boolean,
        required: false,
        default: false
      },
      regularText: {
        type: String,
        required: false,
        default: ''
      }
    },
    mounted() {
      this.$data.isDetails = this.details || this.details === 'true';
    },
    methods: {
      deleteFile(file, index) {
        Alertify.confirm('确定要删除当前文件吗？', ok => {
          if (ok) {
            this.picData.splice(index, 1);
            this.$emit('on-data-remove', index);
          }
        });
      },
      uploading() {
        this.$data.isUploading = true;
      },
      uploadBefore(file) {
        if (this.regularText !== '' && file.name.includes(this.regularText)) {
          this.$Message.error({
            content: `上传的文件名称中不能包含“${this.regularText}”字符！`,
            duration: 2
          });
          return false;
        }
      },
      closeUploading() {
        this.$data.isUploading = false;
      },
      uploadFileSuccess(res) {
        this.$data.isUploading = false;
        if (res.success) {
          let file = res.body;
          this.$emit('on-data-add', {
            attachmentName: file.fileName,
            attachmentUrl: file.url
          });
          this.picData.push({
            attachmentName: file.fileName,
            attachmentUrl: file.url
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
