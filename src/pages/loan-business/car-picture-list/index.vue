<template>
  <div class="loan-file-list">
    <div class="list-files clearfix">
      <template v-for="(item, index) in data">
        <template>
          <bs-big-img  style="float: left" :thumbWidth="128" :thumbHeight="128" :fullWidth="1280"
                       :thumb="item.attachUrl"
                       :full="item.attachUrl">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile"><i-icon type="close"></i-icon></span>
          </bs-big-img>
        </template>
        <!--<template v-else>
          <bs-file-item style="float: left" :type="getFileSuffix(item.attachUrl)" :fileUrl="item.attachUrl" :fileName="item.attachName">
            <span class="icon-remove" slot="icon-remove" @click.stop="deleteFile(item, index)"><i-icon type="close"></i-icon></span>
          </bs-file-item>
        </template>-->
      </template>
      <i-upload style="display: inline-block; float: left; width:128px; margin-left: 5px; position: relative" :show-upload-list="false"
                multiple type="drag"
                :on-progress="uploading"
                :before-upload="beforeUpload"
                :on-success="uploadFileSuccess"
                :action="$config.HTTPBASEURL+'/common/upload'">
        <div style="width: 126px;height:128px;line-height: 150px; text-align: center; border: 1px dashed #2196f3; color: #2196f3">
          <Icon type="ios-cloud-upload" size="42"></Icon>
        </div>
        <i-spin v-if="isUploading" fix></i-spin>
      </i-upload>
    </div>
  </div>
</template>
<script>
  import Tools from '../../../utils/Tools';
  export default {
    name: 'loanFileList',
    data() {
      return {
        isUploading: false
      };
    },
    props: {
      data: {
        type: Array,
        required: false,
        default: function() {
          return [];
        }
      }
    },
    methods: {
      deleteFile(file, index) {
        Alertify.confirm('确定要删除当前文件吗？', ok => {
          if (ok) {
            // this.data.splice(index, 1);
            this.$emit('on-data-remove', index);
          }
        });
      },
      uploading() {
        this.$data.isUploading = true;
      },
      // 上传之前对上传的文件进行验证 必须为图片格式
      beforeUpload(file) {
        if (!this.isImg(file.url)) {
          this.$Message.error('请上传图片格式的文件！');
          return false;
        }
      },
      uploadFileSuccess(res) {
        this.$data.isUploading = false;
        if (res.success) {
          let file = res.body;
          /*this.data.push({
            attachName: file.fileName,
            attachUrl: file.url
          });*/
          this.$emit('on-data-add', {
            attachName: file.fileName,
            attachUrl: file.url
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
        return suffix === 'png' || suffix === 'jpg' || suffix === 'gif' || suffix === 'jpeg' || suffix === 'bmp' || suffix === 'pic';
      }
    },
    mounted() {
    }
  };
</script>
<style lang="scss" scoped>
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
